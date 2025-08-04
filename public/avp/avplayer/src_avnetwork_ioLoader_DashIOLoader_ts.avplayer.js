"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avnetwork_ioLoader_DashIOLoader_ts"],{

/***/ "./src/avnetwork/ioLoader/DashIOLoader.ts":
/*!************************************************!*\
  !*** ./src/avnetwork/ioLoader/DashIOLoader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DashIOLoader)
/* harmony export */ });
/* harmony import */ var common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/timer/Sleep */ "./src/common/timer/Sleep.ts");
/* harmony import */ var _IOLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IOLoader */ "./src/avnetwork/ioLoader/IOLoader.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avprotocol_dash_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avprotocol/dash/parser */ "./src/avprotocol/dash/parser.ts");
/* harmony import */ var _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FetchIOLoader */ "./src/avnetwork/ioLoader/FetchIOLoader.ts");
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
const cheap__fileName__0 = "src\\avnetwork\\ioLoader\\DashIOLoader.ts";
/*
 * libmedia dash loader
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 *
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 *
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */








const FETCHED_HISTORY_LIST_MAX = 100;
class DashIOLoader extends _IOLoader__WEBPACK_IMPORTED_MODULE_1__["default"] {
    info;
    mediaPlayList;
    fetchMediaPlayListPromise;
    minBuffer;
    audioResource;
    videoResource;
    subtitleResource;
    aborted;
    signal;
    createResource(type) {
        return {
            type,
            fetchedMap: new Map(),
            fetchedHistoryListMax: FETCHED_HISTORY_LIST_MAX,
            fetchedHistoryList: [],
            loader: null,
            segmentIndex: 0,
            currentUri: '',
            selectedIndex: 0,
            segments: [],
            initSegmentPadding: '',
            initedSegment: '',
            sleep: null,
            lastPendingSegmentFetchTs: 0,
            lastPendingSegmentDuration: 0
        };
    }
    addHistory(resource, segments, index) {
        resource.fetchedMap.clear();
        resource.fetchedHistoryList.length = 0;
        for (let i = 0; i < index; i++) {
            resource.fetchedMap.set(segments[i].url, true);
            resource.fetchedHistoryList.push(segments[i].url);
        }
        while (resource.fetchedHistoryList.length >= resource.fetchedHistoryListMax) {
            resource.fetchedMap.delete(resource.fetchedHistoryList.shift());
        }
    }
    async fetchMediaPlayList(resolve) {
        if (!resolve) {
            if (this.fetchMediaPlayListPromise) {
                return;
            }
            this.fetchMediaPlayListPromise = new Promise((r) => {
                resolve = r;
            });
        }
        const params = {
            method: 'GET',
            headers: {},
            mode: 'cors',
            cache: 'default',
            referrerPolicy: 'no-referrer-when-downgrade'
        };
        if (this.info.httpOptions?.headers) {
            common_util_object__WEBPACK_IMPORTED_MODULE_2__.each(this.info.httpOptions.headers, (value, key) => {
                params.headers[key] = value;
            });
        }
        if (this.info.httpOptions?.credentials) {
            params.credentials = this.info.httpOptions.credentials;
        }
        if (this.info.httpOptions?.referrerPolicy) {
            params.referrerPolicy = this.info.httpOptions.referrerPolicy;
        }
        try {
            if (typeof AbortController === 'function') {
                this.signal = new AbortController();
            }
            const res = await fetch(this.info.url, {
                ...params,
                signal: this.signal?.signal
            });
            this.signal = null;
            const text = await res.text();
            this.mediaPlayList = (0,avprotocol_dash_parser__WEBPACK_IMPORTED_MODULE_4__["default"])(text, this.info.url);
            this.minBuffer = this.mediaPlayList.minBufferTime;
            if (this.mediaPlayList.type === 'vod') {
                this.options.isLive = false;
            }
            else {
                this.options.isLive = true;
            }
            const addIgnoreSegment = (resource, segments, minBuffer) => {
                let index = 0;
                let cache = 0;
                for (let i = segments.length - 2; i >= 0; i--) {
                    if (segments[i].pending !== true) {
                        cache += segments[i].segmentDuration;
                        if (cache >= minBuffer) {
                            index = i;
                            break;
                        }
                    }
                }
                resource.lastPendingSegmentFetchTs = this.mediaPlayList.maxSegmentDuration;
                resource.lastPendingSegmentDuration = this.mediaPlayList.maxSegmentDuration;
                resource.fetchedHistoryListMax = Math.max(resource.fetchedHistoryListMax, segments.length + 1);
                this.addHistory(resource, segments, index);
            };
            if (this.mediaPlayList.mediaList.audio.length) {
                const media = this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];
                if (media.file) {
                    this.audioResource.segments = [{
                            url: media.file
                        }];
                }
                else {
                    if (this.options.isLive && this.audioResource.initedSegment === media.initSegment) {
                        this.audioResource.segments = media.mediaSegments.map((s) => {
                            return {
                                url: s.url,
                                pending: s.pending,
                                duration: s.segmentDuration
                            };
                        });
                        this.audioResource.lastPendingSegmentFetchTs = this.mediaPlayList.timestamp;
                        this.audioResource.lastPendingSegmentDuration = this.mediaPlayList.maxSegmentDuration;
                    }
                    else {
                        if (this.options.isLive) {
                            addIgnoreSegment(this.audioResource, media.mediaSegments, this.minBuffer);
                        }
                        this.audioResource.segments = [{ url: media.initSegment }].concat(media.mediaSegments.map((s) => {
                            return {
                                url: s.url,
                                pending: s.pending,
                                duration: s.segmentDuration
                            };
                        }));
                        this.audioResource.initedSegment = media.initSegment;
                    }
                }
            }
            if (this.mediaPlayList.mediaList.video.length) {
                const media = this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];
                if (media.file) {
                    this.videoResource.segments = [{
                            url: media.file
                        }];
                }
                else {
                    if (this.options.isLive && this.videoResource.initedSegment === media.initSegment) {
                        this.videoResource.segments = media.mediaSegments.map((s) => {
                            return {
                                url: s.url,
                                pending: s.pending,
                                duration: s.segmentDuration
                            };
                        });
                        this.videoResource.lastPendingSegmentFetchTs = this.mediaPlayList.maxSegmentDuration;
                        this.videoResource.lastPendingSegmentDuration = this.mediaPlayList.maxSegmentDuration;
                    }
                    else {
                        if (this.options.isLive) {
                            addIgnoreSegment(this.videoResource, media.mediaSegments, this.minBuffer);
                        }
                        this.videoResource.segments = [{ url: media.initSegment }].concat(media.mediaSegments.map((s) => {
                            return {
                                url: s.url,
                                pending: s.pending,
                                duration: s.segmentDuration
                            };
                        }));
                        this.videoResource.initedSegment = media.initSegment;
                    }
                }
            }
            if (this.mediaPlayList.mediaList.subtitle.length) {
                const media = this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];
                if (media.file) {
                    this.subtitleResource.segments = [{
                            url: media.file
                        }];
                }
                else {
                    if (this.options.isLive && this.subtitleResource.initedSegment === media.initSegment) {
                        this.subtitleResource.segments = media.mediaSegments.map((s) => {
                            return {
                                url: s.url,
                                pending: s.pending,
                                duration: s.segmentDuration
                            };
                        });
                        this.subtitleResource.lastPendingSegmentFetchTs = this.mediaPlayList.maxSegmentDuration;
                        this.subtitleResource.lastPendingSegmentDuration = this.mediaPlayList.maxSegmentDuration;
                    }
                    else {
                        if (this.options.isLive) {
                            addIgnoreSegment(this.subtitleResource, media.mediaSegments, this.minBuffer);
                        }
                        this.subtitleResource.segments = [{ url: media.initSegment }].concat(media.mediaSegments.map((s) => {
                            return {
                                url: s.url,
                                pending: s.pending,
                                duration: s.segmentDuration
                            };
                        }));
                        this.subtitleResource.initedSegment = media.initSegment;
                    }
                }
            }
            resolve();
            this.fetchMediaPlayListPromise = null;
            this.status = 2 /* IOLoaderStatus.BUFFERING */;
            this.retryCount = 0;
            return this.mediaPlayList;
        }
        catch (error) {
            if (this.aborted) {
                this.status = 3 /* IOLoaderStatus.ERROR */;
                resolve();
                return;
            }
            if (this.retryCount < this.options.retryCount) {
                this.retryCount++;
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`failed fetch mpd file ${error}, retry(${this.retryCount}/3)`, cheap__fileName__0, 300);
                await new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](this.status === 2 /* IOLoaderStatus.BUFFERING */ ? this.options.retryInterval : 5);
                return this.fetchMediaPlayList(resolve);
            }
            else {
                this.status = 3 /* IOLoaderStatus.ERROR */;
                resolve();
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.fatal(`DashLoader: exception, fetch slice error, error: ${error.message}`, cheap__fileName__0, 308);
            }
        }
    }
    async open(info) {
        if (this.status === 2 /* IOLoaderStatus.BUFFERING */) {
            return 0;
        }
        if (this.status !== 0 /* IOLoaderStatus.IDLE */) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_7__.INVALID_OPERATE;
        }
        this.info = info;
        this.videoResource = this.createResource(0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        this.audioResource = this.createResource(1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
        this.subtitleResource = this.createResource(3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */);
        this.status = 1 /* IOLoaderStatus.CONNECTING */;
        this.retryCount = 0;
        this.aborted = false;
        await this.fetchMediaPlayList();
        return 0;
    }
    async readResource(buffer, resource) {
        let ret = 0;
        if (resource.loader) {
            ret = await resource.loader.read(buffer);
            if (ret !== -1048576 /* IOError.END */) {
                return ret;
            }
            else {
                if (this.options.isLive) {
                    resource.fetchedMap.set(resource.currentUri, true);
                    if (resource.fetchedHistoryList.length === resource.fetchedHistoryListMax) {
                        resource.fetchedMap.delete(resource.fetchedHistoryList.shift());
                    }
                    resource.fetchedHistoryList.push(resource.currentUri);
                }
                else {
                    resource.segmentIndex++;
                    if (resource.segmentIndex >= resource.segments.length) {
                        return -1048576 /* IOError.END */;
                    }
                }
                resource.loader = null;
            }
        }
        if (this.options.isLive) {
            const segments = resource.segments.filter((s) => {
                return !resource.fetchedMap.get(s.url);
            });
            if (!segments.length) {
                if (this.mediaPlayList.isEnd) {
                    return -1048576 /* IOError.END */;
                }
                const wait = ((this.mediaPlayList.duration || this.mediaPlayList.minimumUpdatePeriod)
                    - ((0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__["default"])() - this.mediaPlayList.timestamp) / 1000);
                if (wait > 0) {
                    resource.sleep = new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](wait);
                    await resource.sleep;
                    resource.sleep = null;
                    if (this.aborted) {
                        return -1048576 /* IOError.END */;
                    }
                }
                if (this.fetchMediaPlayListPromise) {
                    await this.fetchMediaPlayListPromise;
                    if (this.status === 3 /* IOLoaderStatus.ERROR */ || this.aborted) {
                        return -1048576 /* IOError.END */;
                    }
                }
                else {
                    await this.fetchMediaPlayList();
                    if (this.aborted) {
                        return -1048576 /* IOError.END */;
                    }
                }
                return this.readResource(buffer, resource);
            }
            resource.currentUri = segments[0].url;
            if (this.options.isLive && segments[0].pending) {
                if (resource.lastPendingSegmentFetchTs) {
                    const wait = resource.lastPendingSegmentDuration
                        - (((0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__["default"])() - resource.lastPendingSegmentFetchTs) / 1000);
                    if (wait > 0) {
                        resource.sleep = new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_0__["default"](wait);
                        await resource.sleep;
                        resource.sleep = null;
                        if (this.aborted) {
                            return -1048576 /* IOError.END */;
                        }
                    }
                }
                resource.lastPendingSegmentFetchTs = (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_6__["default"])();
                resource.lastPendingSegmentDuration = segments[0].duration || this.mediaPlayList.maxSegmentDuration;
            }
            resource.loader = new _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__["default"](common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.options, { disableSegment: true, loop: false }));
            await resource.loader.open(common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.info, {
                url: resource.currentUri
            }), {
                from: 0,
                to: -1
            });
            return resource.loader.read(buffer);
        }
        else {
            resource.loader = new _FetchIOLoader__WEBPACK_IMPORTED_MODULE_5__["default"](common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.options, { disableSegment: true, loop: false }));
            if (resource.initSegmentPadding) {
                await resource.loader.open(common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.info, {
                    url: resource.initSegmentPadding
                }), {
                    from: 0,
                    to: -1
                });
                resource.initSegmentPadding = null;
                resource.segmentIndex--;
            }
            else {
                await resource.loader.open(common_util_object__WEBPACK_IMPORTED_MODULE_2__.extend({}, this.info, {
                    url: resource.segments[resource.segmentIndex].url
                }), {
                    from: 0,
                    to: -1
                });
            }
            return resource.loader.read(buffer);
        }
    }
    async read(buffer, options) {
        if (options.mediaType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            return this.readResource(buffer, this.audioResource);
        }
        else if (options.mediaType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            return this.readResource(buffer, this.videoResource);
        }
        else if (options.mediaType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */) {
            return this.readResource(buffer, this.subtitleResource);
        }
        return avutil_error__WEBPACK_IMPORTED_MODULE_7__.INVALID_ARGUMENT;
    }
    async seekResource(timestamp, resource) {
        let currentSegment = '';
        if (resource.loader) {
            currentSegment = resource.loader.getUrl();
            await resource.loader.abort();
            resource.loader = null;
        }
        let seekTime = Number(BigInt.asIntN(32, timestamp));
        if (resource.segments) {
            let index = 0;
            const mediaList = resource.type === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
                ? this.mediaPlayList.mediaList.audio
                : (resource.type === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                    ? this.mediaPlayList.mediaList.video
                    : this.mediaPlayList.mediaList.subtitle);
            const segmentList = mediaList[resource.selectedIndex].mediaSegments;
            if (segmentList?.length) {
                for (let i = 0; i < segmentList.length; i++) {
                    if (seekTime >= segmentList[i].start * 1000 && seekTime < segmentList[i].end * 1000) {
                        index = i;
                        break;
                    }
                }
            }
            resource.segmentIndex = index + (mediaList[resource.selectedIndex].initSegment ? 1 : 0);
            let initSegment = '';
            if (resource.type === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                initSegment = this.mediaPlayList.mediaList.video[resource.selectedIndex].initSegment;
            }
            else if (resource.type === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                initSegment = this.mediaPlayList.mediaList.audio[resource.selectedIndex].initSegment;
            }
            else if (resource.type === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */) {
                initSegment = this.mediaPlayList.mediaList.subtitle[resource.selectedIndex].initSegment;
            }
            if (initSegment && initSegment === currentSegment) {
                resource.initSegmentPadding = initSegment;
            }
        }
    }
    async seek(timestamp, options) {
        if (options.mediaType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */ && this.audioResource.loader) {
            await this.seekResource(timestamp, this.audioResource);
        }
        if (options.mediaType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */ && this.videoResource.loader) {
            await this.seekResource(timestamp, this.videoResource);
        }
        if (options.mediaType === 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */ && this.subtitleResource.loader) {
            await this.seekResource(timestamp, this.subtitleResource);
        }
        if (this.status === 4 /* IOLoaderStatus.COMPLETE */) {
            this.status = 2 /* IOLoaderStatus.BUFFERING */;
        }
        this.aborted = false;
        return 0;
    }
    async size() {
        return BigInt(0);
    }
    abortSleep() {
        this.aborted = true;
        if (this.videoResource.loader) {
            this.videoResource.loader.abortSleep();
        }
        if (this.videoResource.sleep) {
            this.videoResource.sleep.stop();
            this.videoResource.sleep = null;
        }
        if (this.audioResource.loader) {
            this.audioResource.loader.abortSleep();
        }
        if (this.audioResource.sleep) {
            this.audioResource.sleep.stop();
            this.audioResource.sleep = null;
        }
        if (this.subtitleResource.loader) {
            this.subtitleResource.loader.abortSleep();
        }
        if (this.subtitleResource.sleep) {
            this.subtitleResource.sleep.stop();
            this.subtitleResource.sleep = null;
        }
    }
    async abort() {
        this.abortSleep();
        if (this.signal) {
            this.signal.abort();
        }
        if (this.videoResource.loader) {
            await this.videoResource.loader.abort();
            this.videoResource.loader = null;
        }
        if (this.audioResource.loader) {
            await this.audioResource.loader.abort();
            this.audioResource.loader = null;
        }
        if (this.subtitleResource.loader) {
            await this.subtitleResource.loader.abort();
            this.subtitleResource.loader = null;
        }
    }
    async stop() {
        await this.abort();
        this.status = 0 /* IOLoaderStatus.IDLE */;
    }
    getDuration() {
        return this.mediaPlayList.duration;
    }
    hasVideo() {
        return this.mediaPlayList?.mediaList.video.length > 0;
    }
    hasAudio() {
        return this.mediaPlayList?.mediaList.audio.length > 0;
    }
    hasSubtitle() {
        return this.mediaPlayList?.mediaList.subtitle.length > 0;
    }
    getVideoList() {
        if (this.hasVideo()) {
            return {
                list: this.mediaPlayList.mediaList.video.map((media) => {
                    return {
                        width: media.width,
                        height: media.height,
                        frameRate: media.frameRate,
                        codec: media.codecs,
                        bandwidth: media.bandwidth
                    };
                }),
                selectedIndex: this.videoResource.selectedIndex
            };
        }
        return {
            list: [],
            selectedIndex: 0
        };
    }
    getAudioList() {
        if (this.hasAudio()) {
            return {
                list: this.mediaPlayList.mediaList.audio.map((media) => {
                    return {
                        lang: media.lang,
                        codec: media.codecs,
                        bandwidth: media.bandwidth
                    };
                }),
                selectedIndex: this.audioResource.selectedIndex
            };
        }
        return {
            list: [],
            selectedIndex: 0
        };
    }
    getSubtitleList() {
        if (this.hasSubtitle()) {
            return {
                list: this.mediaPlayList.mediaList.subtitle.map((media) => {
                    return {
                        lang: media.lang,
                        codec: media.codecs
                    };
                }),
                selectedIndex: this.subtitleResource.selectedIndex
            };
        }
        return {
            list: [],
            selectedIndex: 0
        };
    }
    selectVideo(index) {
        if (index !== this.videoResource.selectedIndex
            && this.hasVideo()
            && index >= 0
            && index < this.mediaPlayList.mediaList.video.length) {
            this.videoResource.selectedIndex = index;
            const media = this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];
            if (media.file) {
                this.videoResource.segments = [{
                        url: media.file
                    }];
            }
            else {
                if (this.options.isLive) {
                    let segmentIndex = this.videoResource.segmentIndex;
                    this.videoResource.segments.find((s, i) => {
                        if (s.url === this.videoResource.currentUri) {
                            segmentIndex = i;
                            return true;
                        }
                    });
                    this.addHistory(this.videoResource, media.mediaSegments, segmentIndex + 1);
                }
                this.videoResource.segments = [{ url: media.initSegment }].concat(media.mediaSegments.map((s) => {
                    return {
                        url: s.url,
                        pending: s.pending,
                        duration: s.segmentDuration
                    };
                }));
                this.videoResource.initSegmentPadding = media.initSegment;
            }
        }
    }
    selectAudio(index) {
        if (index !== this.audioResource.selectedIndex
            && this.hasAudio()
            && index >= 0
            && index < this.mediaPlayList.mediaList.audio.length) {
            this.audioResource.selectedIndex = index;
            const media = this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];
            if (media.file) {
                this.audioResource.segments = [{
                        url: media.file
                    }];
            }
            else {
                if (this.options.isLive) {
                    let segmentIndex = this.audioResource.segmentIndex;
                    this.audioResource.segments.find((s, i) => {
                        if (s.url === this.audioResource.currentUri) {
                            segmentIndex = i;
                            return true;
                        }
                    });
                    this.addHistory(this.audioResource, media.mediaSegments, segmentIndex + 1);
                }
                this.audioResource.segments = [{ url: media.initSegment }].concat(media.mediaSegments.map((s) => {
                    return {
                        url: s.url,
                        pending: s.pending,
                        duration: s.segmentDuration
                    };
                }));
                this.audioResource.initSegmentPadding = media.initSegment;
            }
        }
    }
    selectSubtitle(index) {
        if (index !== this.subtitleResource.selectedIndex
            && this.hasSubtitle()
            && index >= 0
            && index < this.mediaPlayList.mediaList.subtitle.length) {
            this.subtitleResource.selectedIndex = index;
            const media = this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];
            if (media.file) {
                this.subtitleResource.segments = [{
                        url: media.file
                    }];
            }
            else {
                if (this.options.isLive) {
                    let segmentIndex = this.subtitleResource.segmentIndex;
                    this.subtitleResource.segments.find((s, i) => {
                        if (s.url === this.subtitleResource.currentUri) {
                            segmentIndex = i;
                            return true;
                        }
                    });
                    this.addHistory(this.subtitleResource, media.mediaSegments, segmentIndex + 1);
                }
                this.subtitleResource.segments = [{ url: media.initSegment }].concat(media.mediaSegments.map((s) => {
                    return {
                        url: s.url,
                        pending: s.pending,
                        duration: s.segmentDuration
                    };
                }));
                this.subtitleResource.initSegmentPadding = media.initSegment;
            }
        }
    }
    getCurrentProtection(mediaType) {
        if (mediaType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            const media = this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];
            return media.protection;
        }
        else if (mediaType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            const media = this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];
            return media.protection;
        }
    }
    getMinBuffer() {
        return this.minBuffer;
    }
}


/***/ }),

/***/ "./src/avprotocol/dash/parser.ts":
/*!***************************************!*\
  !*** ./src/avprotocol/dash/parser.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ parser)
/* harmony export */ });
/* harmony import */ var common_util_xml2Json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/xml2Json */ "./src/common/util/xml2Json.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_function_toString__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/function/toString */ "./src/common/function/toString.ts");
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/**
 * from https://github.com/bytedance/xgplayer/blob/main/packages/xgplayer-dash/src/m4s/mpd.js
 * MIT license
 */





function parseMPD(xmlString) {
    if (!xmlString) {
        return null;
    }
    return (0,common_util_xml2Json__WEBPACK_IMPORTED_MODULE_0__["default"])(xmlString, {
        aloneValueName: 'value'
    });
}
function durationConvert(value) {
    const regex = /^PT?(?:(\d+)Y)?(?:(\d+)D)?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/;
    const match = value.match(regex);
    if (!match) {
        throw new Error('Invalid DASH PT duration: ' + value);
    }
    const [, year, day, hours, minutes, seconds] = match;
    return ((parseInt(year || '0') * 3600 * 24 * 365) +
        (parseInt(day || '0') * 3600 * 24) +
        (parseInt(hours || '0') * 3600) +
        (parseInt(minutes || '0') * 60) +
        parseFloat(seconds || '0'));
}
function preFixInteger(num, n) {
    const str = (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(num);
    return str.length >= n ? str : '0'.repeat(n - str.length) + str;
}
function parseRational(value) {
    if (!value) {
        return 0;
    }
    if (value.indexOf('/') > -1) {
        const rational = value.split('/');
        return parseFloat(rational[0]) / parseFloat(rational[1]);
    }
    return parseFloat(value);
}
function uuid2Uint8Array(s) {
    s = s.replaceAll('-', '');
    const r = [];
    for (let i = 0; i < s.length; i += 2) {
        r.push(+`0x${s.substring(i, i + 2)}`);
    }
    return new Uint8Array(r);
}
function parseProtection(protection) {
    let result = {};
    protection.forEach((item) => {
        const obj = {};
        common_util_object__WEBPACK_IMPORTED_MODULE_2__.each(item, (value, key) => {
            obj[key.toLocaleLowerCase()] = value;
        });
        if (obj['cenc:default_kid']) {
            result.kid = uuid2Uint8Array(obj['cenc:default_kid']);
            result.scheme = obj.value;
        }
        if (obj['schemeiduri']) {
            const url = obj['schemeiduri'].split(':');
            if (url.length === 3 && url[0] === 'urn' && url[1] === 'uuid') {
                result.systemId = uuid2Uint8Array(url[2]);
            }
        }
        if (obj['clearkey:laurl']) {
            result.url = obj['clearkey:laurl'].value;
        }
        if (obj['dashif:laurl']) {
            result.url = obj['dashif:laurl'].value;
        }
    });
    return result;
}
function joinPath(base, path) {
    if (/^https?:\/\//.test(path)) {
        return path;
    }
    return base + path;
}
function parsePeriod(result, period, url) {
    const list = {
        mediaList: {
            audio: [],
            video: [],
            subtitle: []
        },
        type: 'live',
        isEnd: false,
        duration: 0,
        minBufferTime: 0,
        maxSegmentDuration: 0,
        minimumUpdatePeriod: 0,
        timeShiftBufferDepth: 0,
        timestamp: (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_4__["default"])()
    };
    const repID = [];
    if (result.type === 'static') {
        list.type = 'vod';
        list.isEnd = true;
    }
    if (result.minBufferTime) {
        list.minBufferTime = durationConvert(result.minBufferTime);
    }
    if (result.maxSegmentDuration) {
        list.maxSegmentDuration = durationConvert(result.maxSegmentDuration);
    }
    if (result.minimumUpdatePeriod) {
        list.minimumUpdatePeriod = Math.min(durationConvert(result.minimumUpdatePeriod), Math.max(list.maxSegmentDuration, 2) * 30);
    }
    if (result.availabilityStartTime) {
        list.availabilityStartTime = new Date(result.availabilityStartTime).getTime();
    }
    if (result.timeShiftBufferDepth) {
        list.timeShiftBufferDepth = durationConvert(result.timeShiftBufferDepth);
    }
    if (result.mediaPresentationDuration) {
        list.duration = durationConvert(result.mediaPresentationDuration);
    }
    let MpdBaseURL = '';
    if (result.BaseURL) {
        MpdBaseURL = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(result.BaseURL) ? result.BaseURL[0].value : (common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(result.BaseURL) ? result.BaseURL : result.BaseURL.value);
    }
    if (period?.duration) {
        list.duration = durationConvert(period.duration);
    }
    if (period.BaseURL) {
        MpdBaseURL = joinPath(MpdBaseURL, common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(period.BaseURL) ? period.BaseURL : period.BaseURL.value);
    }
    const AdaptationSet = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(period.AdaptationSet) ? period.AdaptationSet : [period.AdaptationSet];
    AdaptationSet.forEach((asItem, asIndex) => {
        let mimeType = '';
        let contentType = '';
        let codecs = '';
        let width = 0;
        let height = 0;
        let maxWidth = 0;
        let maxHeight = 0;
        let frameRate = 0;
        let sar = '1:1';
        let startWithSAP = '1';
        let bandwidth = 0;
        let adaptationSetBaseUrl = MpdBaseURL;
        let lang = 'und';
        let protection;
        if (asItem.BaseURL) {
            adaptationSetBaseUrl = joinPath(adaptationSetBaseUrl, common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(asItem.BaseURL) ? asItem.BaseURL : asItem.BaseURL.value);
        }
        if (asItem.lang) {
            lang = asItem.lang;
        }
        if (asItem.mimeType || asItem.contentType) {
            mimeType = asItem.mimeType;
            contentType = asItem.contentType;
            if (mimeType === 'video/mp4' || contentType === 'video') {
                codecs = asItem.codecs;
                width = parseFloat(asItem.width);
                height = parseFloat(asItem.height);
                if (asItem.maxWidth) {
                    maxWidth = parseFloat(asItem.maxWidth);
                }
                if (asItem.maxHeight) {
                    maxHeight = parseFloat(asItem.maxHeight);
                }
                if (asItem.frameRate) {
                    frameRate = parseRational(asItem.frameRate);
                }
                sar = asItem.sar;
                startWithSAP = asItem.startWithSAP;
                bandwidth = parseFloat(asItem.bandwidth);
            }
            else if (mimeType === 'audio/mp4' || contentType === 'audio') {
                codecs = asItem.codecs;
                startWithSAP = asItem.startWithSAP;
                bandwidth = parseFloat(asItem.bandwidth);
            }
        }
        else {
            if (asItem.maxWidth) {
                maxWidth = parseFloat(asItem.maxWidth);
            }
            if (asItem.maxHeight) {
                maxHeight = parseFloat(asItem.maxHeight);
            }
            if (asItem.frameRate) {
                frameRate = parseRational(asItem.frameRate);
            }
        }
        if (asItem.ContentProtection) {
            protection = parseProtection(asItem.ContentProtection);
        }
        const Representation = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(asItem.Representation) ? asItem.Representation : [asItem.Representation];
        Representation.forEach((rItem, rIndex) => {
            if (repID.indexOf(rItem.id) > -1) {
                rItem.id = (parseInt(repID[repID.length - 1]) + 1).toString();
            }
            repID.push(rItem.id);
            let initSegment = '';
            const mediaSegments = [];
            let timescale = 0;
            let duration = list.duration;
            let baseURL = joinPath(url.slice(0, url.lastIndexOf('/') + 1), adaptationSetBaseUrl);
            if (rItem.mimeType) {
                mimeType = rItem.mimeType;
            }
            if (mimeType === 'video/mp4' || contentType === 'video') {
                if (rItem.codecs) {
                    codecs = rItem.codecs;
                }
                if (rItem.width) {
                    width = parseFloat(rItem.width);
                }
                if (rItem.height) {
                    height = parseFloat(rItem.height);
                }
                if (rItem.maxWidth) {
                    maxWidth = parseFloat(rItem.maxWidth);
                }
                if (rItem.maxHeight) {
                    maxHeight = parseFloat(rItem.maxHeight);
                }
                if (rItem.frameRate) {
                    frameRate = parseFloat(rItem.frameRate);
                }
                if (rItem.sar) {
                    sar = rItem.sar;
                }
                if (rItem.startWithSAP) {
                    startWithSAP = rItem.startWithSAP;
                }
                if (rItem.bandwidth) {
                    bandwidth = parseFloat(rItem.bandwidth);
                }
            }
            else {
                if (rItem.codecs) {
                    codecs = rItem.codecs;
                }
                if (rItem.startWithSAP) {
                    startWithSAP = rItem.startWithSAP;
                }
                if (rItem.bandwidth) {
                    bandwidth = parseFloat(rItem.bandwidth);
                }
            }
            if (rItem.BaseURL) {
                baseURL = joinPath(baseURL, common_util_is__WEBPACK_IMPORTED_MODULE_1__.string(rItem.BaseURL) ? rItem.BaseURL : rItem.BaseURL.value);
            }
            if (rItem.ContentProtection) {
                protection = parseProtection(rItem.ContentProtection);
            }
            if (rItem.SegmentBase) {
                if (mimeType === 'video/mp4' || contentType === 'video') {
                    list.mediaList.video.push({
                        id: rItem.id,
                        file: baseURL,
                        mimeType,
                        codecs,
                        width,
                        height,
                        maxWidth,
                        maxHeight,
                        frameRate,
                        sar,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        protection
                    });
                }
                else if (mimeType === 'audio/mp4' || contentType === 'audio') {
                    list.mediaList.audio.push({
                        id: rItem.id,
                        file: baseURL,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        protection,
                        lang
                    });
                }
                else if (mimeType === 'application/mp4' || contentType === 'text') {
                    list.mediaList.subtitle.push({
                        id: rItem.id,
                        file: baseURL,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        protection,
                        lang
                    });
                }
            }
            else {
                let ST;
                if (asItem.SegmentTemplate) {
                    ST = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(asItem.SegmentTemplate) ? asItem.SegmentTemplate[0] : asItem.SegmentTemplate;
                }
                if (rItem.SegmentTemplate) {
                    ST = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(rItem.SegmentTemplate) ? rItem.SegmentTemplate[0] : rItem.SegmentTemplate;
                }
                if (ST) {
                    let start = ST.startNumber ? parseInt(ST.startNumber) : 1;
                    initSegment = ST.initialization;
                    timescale = parseFloat(ST.timescale || '1');
                    if (ST.duration && !ST.SegmentTimeline) {
                        duration = parseFloat(ST.duration);
                        let segmentDuration = duration / timescale;
                        let end = start + Math.ceil((list.duration || segmentDuration) / segmentDuration) - 1;
                        let generateIndex = end;
                        if (list.type === 'live' && (common_util_is__WEBPACK_IMPORTED_MODULE_1__.number(list.availabilityStartTime) || ST.presentationTimeOffset)) {
                            const now = list.timestamp || (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_4__["default"])();
                            const startTs = list.availabilityStartTime;
                            const elapsed = ((now - startTs) / 1000) - (ST.presentationTimeOffset ? parseInt(ST.presentationTimeOffset) : 0);
                            const segmentOffset = Math.floor(elapsed / segmentDuration);
                            end = start + segmentOffset;
                            if (list.timeShiftBufferDepth) {
                                start = end - Math.ceil(list.timeShiftBufferDepth / segmentDuration) + 1;
                            }
                            generateIndex = end;
                            if (ST.availabilityTimeComplete === 'false' || list.minimumUpdatePeriod > list.minBufferTime * 2) {
                                end += Math.ceil(list.minimumUpdatePeriod / segmentDuration);
                            }
                        }
                        for (let i = start; i <= end; i++) {
                            const startTime = segmentDuration * (i - start);
                            let endTime = segmentDuration * (i - start + 1);
                            if (i === end && list.duration) {
                                segmentDuration = list.duration - segmentDuration * (end - start);
                                endTime = list.duration;
                            }
                            mediaSegments.push({
                                idx: i,
                                start: startTime,
                                end: endTime,
                                url: baseURL + ST.media.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Number(%(\d+)d)?\$/g, (s0, s1, s2) => {
                                    if (s2) {
                                        return preFixInteger(i, +s2);
                                    }
                                    return (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(i);
                                }),
                                segmentDuration,
                                pending: i > generateIndex
                            });
                        }
                    }
                    else if (ST.SegmentTimeline && ST.SegmentTimeline.S) {
                        const S = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(ST.SegmentTimeline.S) ? ST.SegmentTimeline.S : [ST.SegmentTimeline.S];
                        let startTime = 0;
                        let index = start;
                        for (let i = 0; i < S.length; i++) {
                            let d = parseFloat(S[i].d);
                            if (S[i].t) {
                                startTime = parseFloat(S[i].t);
                            }
                            let r = 1;
                            if (S[i].r) {
                                r = parseInt(S[i].r);
                                if (r === -1 && duration) {
                                    r = Math.ceil(duration * timescale / d);
                                }
                                else {
                                    r += 1;
                                }
                            }
                            for (let j = 0; j < r; j++) {
                                mediaSegments.push({
                                    idx: index,
                                    start: startTime / timescale,
                                    end: (startTime + d) / timescale,
                                    url: baseURL + ST.media.replace(/\$RepresentationID\$/g, rItem.id)
                                        .replace(/\$Number(%(\d+)d)?\$/g, (s0, s1, s2) => {
                                        if (s2) {
                                            return preFixInteger(index, +s2);
                                        }
                                        return (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(index);
                                    })
                                        .replace(/\$Time\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(startTime)),
                                    segmentDuration: d / timescale
                                });
                                index++;
                                startTime += d;
                            }
                        }
                    }
                }
                else if (rItem.SegmentList) {
                    const segmentList = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(rItem.SegmentList.SegmentURL) ? rItem.SegmentList.SegmentURL : [rItem.SegmentList.SegmentURL];
                    let startTime = 0;
                    let duration = parseFloat(rItem.SegmentList.duration);
                    for (let i = 0; i < segmentList.length; i++) {
                        mediaSegments.push({
                            idx: i,
                            start: startTime / timescale,
                            end: (startTime + duration) / timescale,
                            url: baseURL + segmentList[i].media,
                            segmentDuration: duration / timescale
                        });
                        startTime += duration;
                    }
                }
                if (mimeType === 'video/mp4' || contentType === 'video') {
                    list.mediaList.video.push({
                        id: rItem.id,
                        baseURL,
                        initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(bandwidth)),
                        mediaSegments,
                        mimeType,
                        codecs,
                        width,
                        height,
                        maxWidth,
                        maxHeight,
                        frameRate,
                        sar,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        protection
                    });
                }
                else if (mimeType === 'audio/mp4' || contentType === 'audio') {
                    list.mediaList.audio.push({
                        id: rItem.id,
                        baseURL,
                        initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(bandwidth)),
                        mediaSegments,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        protection,
                        lang
                    });
                }
                else if (mimeType === 'application/mp4' || contentType === 'text') {
                    list.mediaList.subtitle.push({
                        id: rItem.id,
                        baseURL,
                        initSegment: baseURL + initSegment.replace(/\$RepresentationID\$/g, rItem.id).replace(/\$Bandwidth\$/g, (0,common_function_toString__WEBPACK_IMPORTED_MODULE_3__["default"])(bandwidth)),
                        mediaSegments,
                        mimeType,
                        codecs,
                        startWithSAP: startWithSAP === '1',
                        bandwidth,
                        timescale,
                        duration,
                        protection,
                        lang
                    });
                }
            }
        });
    });
    ['video', 'audio'].forEach((mediaType) => {
        list.mediaList[mediaType].sort((a, b) => {
            return a.bandwidth - b.bandwidth;
        });
    });
    return list;
}
function parser(xml, url) {
    const result = parseMPD(xml).MPD;
    if (result.type === 'dynamic') {
        const period = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(result.Period) ? result.Period[result.Period.length - 1] : result.Period;
        return parsePeriod(result, period, url);
    }
    else {
        const periods = common_util_is__WEBPACK_IMPORTED_MODULE_1__.array(result.Period) ? result.Period : [result.Period];
        const list = periods.map((period) => {
            return parsePeriod(result, period, url);
        });
        const mediaList = list[0];
        for (let i = 1; i < list.length; i++) {
            mediaList.duration += list[i].duration;
            list[i].mediaList.video.forEach((video) => {
                const prev = mediaList.mediaList.video.find((p) => {
                    return video.initSegment && video.initSegment === p.initSegment || video.id === p.id;
                });
                if (prev) {
                    if (prev.mediaSegments?.length && video.mediaSegments?.length) {
                        video.mediaSegments.forEach((s) => {
                            s.start += prev.mediaSegments[prev.mediaSegments.length - 1].end;
                            s.end += prev.mediaSegments[prev.mediaSegments.length - 1].end;
                        });
                    }
                    prev.mediaSegments = (prev.mediaSegments || []).concat(video.mediaSegments || []);
                }
                else {
                    mediaList.mediaList.video.push(video);
                }
            });
            list[i].mediaList.audio.forEach((audio) => {
                const prev = mediaList.mediaList.audio.find((p) => {
                    return audio.initSegment && audio.initSegment === p.initSegment || audio.id === p.id;
                });
                if (prev) {
                    if (prev.mediaSegments?.length && audio.mediaSegments?.length) {
                        audio.mediaSegments.forEach((s) => {
                            s.start += prev.mediaSegments[prev.mediaSegments.length - 1].end;
                            s.end += prev.mediaSegments[prev.mediaSegments.length - 1].end;
                        });
                    }
                    prev.mediaSegments = (prev.mediaSegments || []).concat(audio.mediaSegments || []);
                }
                else {
                    mediaList.mediaList.audio.push(audio);
                }
            });
            list[i].mediaList.subtitle.forEach((subtitle) => {
                const prev = mediaList.mediaList.subtitle.find((p) => {
                    return subtitle.initSegment && subtitle.initSegment === p.initSegment || subtitle.id === p.id;
                });
                if (prev) {
                    if (prev.mediaSegments?.length && subtitle.mediaSegments?.length) {
                        subtitle.mediaSegments.forEach((s) => {
                            s.start += prev.mediaSegments[prev.mediaSegments.length - 1].end;
                            s.end += prev.mediaSegments[prev.mediaSegments.length - 1].end;
                        });
                    }
                    prev.mediaSegments = (prev.mediaSegments || []).concat(subtitle.mediaSegments || []);
                }
                else {
                    mediaList.mediaList.subtitle.push(subtitle);
                }
            });
        }
        if (result.mediaPresentationDuration) {
            mediaList.duration = durationConvert(result.mediaPresentationDuration);
        }
        return mediaList;
    }
}


/***/ }),

/***/ "./src/common/util/xml2Json.ts":
/*!*************************************!*\
  !*** ./src/common/util/xml2Json.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ xml2Json)
/* harmony export */ });
/* harmony import */ var _array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array */ "./src/common/util/array.ts");

const defaultOptions = {
    aloneValueName: '_@attribute'
};
const splitChar = [' ', '/', '"', '\'', '<', '>'];
function xml2Json(xmlStr, options = defaultOptions) {
    // remove commented lines
    xmlStr = xmlStr.replace(/<!--[\s\S]*?-->/g, '');
    // replace special characters
    xmlStr = xmlStr.replace(/[\n\t\r]/g, '');
    // replace leading spaces and tabs between elements
    xmlStr = xmlStr.replace(/>[ \t]+</g, '><');
    // delete docType tags
    xmlStr = xmlStr.replace(/<\?[^>]*\?>/g, '');
    const stack = [];
    let pos = 0;
    function addData(key, value) {
        const item = stack[stack.length - 1];
        if (!item) {
            return;
        }
        if (key === options.aloneValueName && item.obj[options.aloneValueName] != null) {
            item.obj[options.aloneValueName] = [item.obj[options.aloneValueName], {
                    tagName: key,
                    ...value
                }];
            return;
        }
        if (item.obj[key] == null) {
            item.obj[key] = value;
        }
        else if (Array.isArray(item.obj[key])) {
            item.obj[key].push(value);
        }
        else {
            item.obj[key] = [item.obj[key], value];
        }
    }
    function gotoToken(token) {
        while (pos < xmlStr.length) {
            if (xmlStr[pos] === token) {
                return true;
            }
            pos++;
        }
        return false;
    }
    function readIdentity() {
        skipSpace();
        let key = '';
        while (pos < xmlStr.length) {
            if (_array__WEBPACK_IMPORTED_MODULE_0__.has(splitChar, xmlStr[pos])) {
                break;
            }
            key += xmlStr[pos];
            pos++;
        }
        return key;
    }
    function skipSpace() {
        while (pos < xmlStr.length) {
            if (!/\s|\r|\n/.test(xmlStr[pos])) {
                break;
            }
            pos++;
        }
    }
    const emptyEndReg = /\s/;
    const singleQuotation = /'/;
    const doubleQuotation = /"/;
    function readAttrValue() {
        if (pos >= xmlStr.length) {
            return true;
        }
        skipSpace();
        // 默认属性值结束符为空格
        let end = emptyEndReg;
        if (xmlStr[pos] === '"' || xmlStr[pos] == '\'') {
            // 属性值是引号开始则结束符也是引号
            end = xmlStr[pos] === '"' ? doubleQuotation : singleQuotation;
            pos++;
        }
        let value = '';
        while (pos < xmlStr.length) {
            if (end.test(xmlStr[pos])) {
                pos++;
                break;
            }
            value += xmlStr[pos];
            pos++;
        }
        return value;
    }
    function readAttr() {
        while (true) {
            skipSpace();
            // 判断标签属性结束
            if (xmlStr[pos] === '>' || xmlStr[pos] === '/') {
                break;
            }
            let key = readIdentity();
            if (!key) {
                break;
            }
            if (key[key.length - 1] === '=') {
                key = key.substring(0, key.length - 1);
            }
            else {
                gotoToken('=');
                pos++;
            }
            const value = readAttrValue();
            addData(key, value);
        }
    }
    // innerText 当前位置到 < 之前
    function readText() {
        skipSpace();
        let text = '';
        while (pos < xmlStr.length) {
            if (xmlStr[pos] === '<') {
                break;
            }
            text += xmlStr[pos];
            pos++;
        }
        return text;
    }
    function pop() {
        // 处理 </> 跳出当前 tag
        // 若是 <xx 则是子标签，进入下一次处理 
        while (xmlStr[pos] === '<') {
            const now = pos;
            pos++;
            skipSpace();
            if (xmlStr[pos] === '/') {
                pos++;
                const tag = readIdentity();
                if (tag === stack[stack.length - 1].tag) {
                    if (stack.length > 1) {
                        const item = stack.pop();
                        addData(item.tag, item.obj);
                    }
                    gotoToken('>');
                    pos++;
                    skipSpace();
                }
                else {
                    stack.pop();
                    gotoToken('>');
                    pos++;
                    skipSpace();
                }
            }
            else {
                pos = now;
                break;
            }
        }
    }
    function readTag() {
        if (pos >= xmlStr.length) {
            return;
        }
        let start = pos;
        skipSpace();
        // innerText 的后面部分，中间被标签分割出现这种情况，将其加入 context 中
        if (xmlStr[pos] !== '<') {
            pos = start;
            addData(options.aloneValueName, readText());
            pop();
            return readTag();
        }
        let has = gotoToken('<');
        if (!has) {
            return;
        }
        start = pos;
        pos++;
        const tag = readIdentity();
        stack.push({
            obj: {},
            tag,
            start
        });
        readAttr();
        skipSpace();
        // 自闭合 tag
        if (xmlStr[pos] === '/') {
            pos++;
            if (stack.length > 1) {
                const item = stack.pop();
                addData(item.tag, item.obj);
            }
            gotoToken('>');
            pos++;
            pop();
            return readTag();
        }
        has = gotoToken('>');
        if (!has) {
            return;
        }
        pos++;
        skipSpace();
        // 检查有 innerText 内容
        if (xmlStr[pos] !== '<') {
            addData(options.aloneValueName, readText());
            skipSpace();
        }
        pop();
        readTag();
    }
    readTag();
    return {
        [stack[0].tag]: stack[0].obj
    };
}


/***/ })

}]);
//# sourceMappingURL=src_avnetwork_ioLoader_DashIOLoader_ts.avplayer.js.map