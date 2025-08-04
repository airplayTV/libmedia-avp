"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avnetwork_ioLoader_RtmpIOLoader_ts"],{

/***/ "./src/avformat/formats/flv/FlvHeader.ts":
/*!***********************************************!*\
  !*** ./src/avformat/formats/flv/FlvHeader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlvHeader)
/* harmony export */ });
/*
 * libmedia flv header format
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
class FlvHeader {
    /**
     * 3 bytes 签名
     */
    signature;
    /**
     * 1 bytes 版本，比如 0x01 表示 FLV 版本 1
     */
    version;
    /**
     * 1 bytes 第一位标记是否有视频，第 4 位标记是否有音频，其余位保留
     */
    flags;
    /**
     * 4 bytes FLV header 的大小，单位是字节，目前是 9
     */
    dataOffset;
    /**
     * 是否有视频
     */
    hasVideo;
    /**
     * 是否有音频
     */
    hasAudio;
    constructor() {
        this.signature = 'FLV';
        this.version = 1;
        this.flags = 0;
        this.dataOffset = 9;
        this.hasAudio = false;
        this.hasVideo = false;
    }
    async read(ioReader) {
        this.signature = await ioReader.readString(3);
        this.version = await ioReader.readUint8();
        this.flags = await ioReader.readUint8();
        this.dataOffset = await ioReader.readUint32();
        this.hasAudio = !!(this.flags & 0x04);
        this.hasVideo = !!(this.flags & 0x01);
    }
    write(ioWriter) {
        this.flags = 0;
        if (this.hasAudio) {
            this.flags |= 0x04;
        }
        if (this.hasVideo) {
            this.flags |= 0x01;
        }
        ioWriter.writeString(this.signature);
        ioWriter.writeUint8(this.version);
        ioWriter.writeUint8(this.flags);
        ioWriter.writeUint32(this.dataOffset);
    }
}


/***/ }),

/***/ "./src/avformat/formats/flv/FlvScriptTag.ts":
/*!**************************************************!*\
  !*** ./src/avformat/formats/flv/FlvScriptTag.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlvScriptTag)
/* harmony export */ });
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _oflv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/amf */ "./src/avutil/util/amf.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\flv\\FlvScriptTag.ts";






class FlvScriptTag {
    onMetaData;
    constructor() {
        this.onMetaData = {
            canSeekToEnd: false
        };
    }
    async read(ioReader, size) {
        const now = ioReader.getPos();
        const endPos = now + BigInt(Math.floor(size));
        const key = await (0,avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue)(ioReader, endPos);
        const value = await (0,avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue)(ioReader, endPos);
        this[key] = value;
        if (endPos > ioReader.getPos()) {
            await ioReader.skip(Number(BigInt.asIntN(32, endPos - ioReader.getPos())));
        }
        const tagSize = Number(ioReader.getPos() - now);
        const prev = await ioReader.readUint32();
        if (tagSize + 11 !== prev) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`script size not match, size: ${tagSize + 11}, previousTagSize: ${prev}`, cheap__fileName__0, 63);
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        return 0;
    }
    computeSize() {
        const cache = [];
        const cacheWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_0__["default"]();
        cacheWriter.onFlush = (data) => {
            cache.push(data.slice());
            return 0;
        };
        (0,avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue)(cacheWriter, 'onMetaData');
        (0,avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue)(cacheWriter, this.onMetaData);
        cacheWriter.flush();
        const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Uint8Array, cache);
        return buffer.length;
    }
    write(ioWriter) {
        if (this.onMetaData) {
            const cache = [];
            const cacheWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_0__["default"]();
            cacheWriter.onFlush = (data) => {
                cache.push(data.slice());
                return 0;
            };
            (0,avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue)(cacheWriter, 'onMetaData');
            (0,avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue)(cacheWriter, this.onMetaData);
            cacheWriter.flush();
            const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Uint8Array, cache);
            _oflv__WEBPACK_IMPORTED_MODULE_3__.writeTag(ioWriter, 18 /* FlvTag.SCRIPT */, BigInt(0), undefined, buffer);
        }
    }
    dts2Position(dts) {
        if (this.canSeek()) {
            let index = -1;
            const times = this.onMetaData.keyframes.times;
            const position = this.onMetaData.keyframes.filepositions;
            let i;
            for (i = 0; i < times.length; i++) {
                if (times[i] === dts) {
                    index = i;
                    break;
                }
                else if (times[i] > dts) {
                    index = Math.max(i - 1, 0);
                    break;
                }
            }
            if (i && i === times.length) {
                index = times.length - 1;
            }
            return {
                pos: position[index],
                dts: times[index]
            };
        }
        return {
            pos: -1,
            dts: -1
        };
    }
    position2DTS(pos) {
        if (this.canSeek()) {
            let index = -1;
            const times = this.onMetaData.keyframes.times;
            const position = this.onMetaData.keyframes.filepositions;
            let i = 0;
            for (i = 0; i < position.length; i++) {
                if (position[i] > pos) {
                    index = i;
                    break;
                }
            }
            if (i === position.length) {
                return this.onMetaData.duration ?? times[times.length - 1];
            }
            return times[index];
        }
        return -1;
    }
    canSeek() {
        return !!(this.onMetaData.keyframes
            && this.onMetaData.keyframes.filepositions
            && this.onMetaData.keyframes.filepositions.length);
    }
}


/***/ }),

/***/ "./src/avformat/formats/flv/flv.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/flv/flv.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVCodecID2FlvCodecTag: () => (/* binding */ AVCodecID2FlvCodecTag),
/* harmony export */   AVCodecID2FlvCodecType: () => (/* binding */ AVCodecID2FlvCodecType),
/* harmony export */   FlvAudioCodecType2AVCodecID: () => (/* binding */ FlvAudioCodecType2AVCodecID),
/* harmony export */   FlvVideoCodecType2AVCodecID: () => (/* binding */ FlvVideoCodecType2AVCodecID)
/* harmony export */ });
/*
 * libmedia flv defined
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
const AVCodecID2FlvCodecType = {
    [65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */]: 0,
    [65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */]: 3,
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: 10,
    [86017 /* AVCodecID.AV_CODEC_ID_MP3 */]: 2,
    [86051 /* AVCodecID.AV_CODEC_ID_SPEEX */]: 11,
    [69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */]: 1,
    [86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */]: 6,
    [65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */]: 7,
    [65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */]: 8,
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: 7,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: 12,
    // [AVCodecID.AV_CODEC_ID_VVC]: 13,
    [12 /* AVCodecID.AV_CODEC_ID_MPEG4 */]: 9,
    [4 /* AVCodecID.AV_CODEC_ID_H263 */]: 2,
    [86 /* AVCodecID.AV_CODEC_ID_FLASHSV */]: 3,
    [92 /* AVCodecID.AV_CODEC_ID_VP6F */]: 4,
    [106 /* AVCodecID.AV_CODEC_ID_VP6A */]: 5,
    [131 /* AVCodecID.AV_CODEC_ID_FLASHSV2 */]: 6
};
const FlvAudioCodecType2AVCodecID = {
    10: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    2: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    11: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    1: 69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */,
    4: 86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
    5: 86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
    6: 86049 /* AVCodecID.AV_CODEC_ID_NELLYMOSER */,
    7: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    8: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */
};
const FlvVideoCodecType2AVCodecID = {
    7: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    12: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    // 13: AVCodecID.AV_CODEC_ID_VVC,
    9: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    2: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    3: 86 /* AVCodecID.AV_CODEC_ID_FLASHSV */,
    4: 92 /* AVCodecID.AV_CODEC_ID_VP6F */,
    5: 106 /* AVCodecID.AV_CODEC_ID_VP6A */,
    6: 131 /* AVCodecID.AV_CODEC_ID_FLASHSV2 */
};
const AVCodecID2FlvCodecTag = {
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: 'avc1',
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: 'hvc1',
    [196 /* AVCodecID.AV_CODEC_ID_VVC */]: 'vvc1',
    [139 /* AVCodecID.AV_CODEC_ID_VP8 */]: 'vp08',
    [167 /* AVCodecID.AV_CODEC_ID_VP9 */]: 'vp09',
    [225 /* AVCodecID.AV_CODEC_ID_AV1 */]: 'av01',
    [86019 /* AVCodecID.AV_CODEC_ID_AC3 */]: 'ac-3',
    [86056 /* AVCodecID.AV_CODEC_ID_EAC3 */]: 'ec-3',
    [86076 /* AVCodecID.AV_CODEC_ID_OPUS */]: 'Opus',
    [86028 /* AVCodecID.AV_CODEC_ID_FLAC */]: 'fLaC',
    [86017 /* AVCodecID.AV_CODEC_ID_MP3 */]: '.mp3',
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: 'mp4a'
};


/***/ }),

/***/ "./src/avformat/formats/flv/oflv.ts":
/*!******************************************!*\
  !*** ./src/avformat/formats/flv/oflv.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   writeTag: () => (/* binding */ writeTag)
/* harmony export */ });
/* unused harmony exports updateSize, isEnhancedCodecId, writeVideoHeader, writeAudioHeader */
/* harmony import */ var _flv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flv */ "./src/avformat/formats/flv/flv.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/*
 * libmedia flv encode
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





function updateSize(ioWriter, pos, size) {
    const now = ioWriter.getPos();
    const pointer = ioWriter.getPointer();
    const minPos = now - BigInt(Math.floor(pointer));
    if (pos < now && pos >= minPos) {
        ioWriter.seekInline(pointer + Number(pos - now));
        ioWriter.writeUint24(size);
        ioWriter.seekInline(pointer);
    }
    else {
        ioWriter.seek(pos);
        ioWriter.writeUint24(size);
        ioWriter.seek(now);
    }
}
function writeTag(ioWriter, type, timestamp, dataHeader, data, previousTagSizeCallback) {
    ioWriter.flush();
    // tagType
    ioWriter.writeUint8(type);
    const sizePos = ioWriter.getPos();
    // size
    ioWriter.writeUint24(0);
    // timestamp
    ioWriter.writeUint24(Number(timestamp & BigInt(0xffffff)));
    // timestampExtended
    ioWriter.writeUint8(Number((timestamp >> BigInt(24)) & BigInt(0xff)));
    // streamId always 0
    ioWriter.writeUint24(0);
    const dataPos = ioWriter.getPos();
    if (dataHeader) {
        dataHeader(ioWriter);
    }
    if (common_util_is__WEBPACK_IMPORTED_MODULE_4__.func(data)) {
        data(ioWriter);
        updateSize(ioWriter, sizePos, Number(ioWriter.getPos() - dataPos));
    }
    else if (data) {
        updateSize(ioWriter, sizePos, data.length + Number(ioWriter.getPos() - dataPos));
        ioWriter.writeBuffer(data);
    }
    const previousTagSize = Number(ioWriter.getPos() - sizePos) + 1;
    if (previousTagSizeCallback) {
        previousTagSizeCallback(previousTagSize);
    }
    ioWriter.writeUint32(previousTagSize);
}
function isEnhancedCodecId(codecId) {
    if (codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */
        || codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
        || codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */
        || codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
        return false;
    }
    return !!_flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecTag[codecId];
}
function writeVideoHeader(ioWriter, stream, context, enhanced, type, flags, timestamp, timeBase, ct = 0) {
    const streamContext = stream.privData;
    let header = enhanced ? 0x80 : 0;
    header |= ((flags & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) ? 1 /* VideoFrameType.KeyFrame */ : 2 /* VideoFrameType.InterFrame */) << 4;
    if (enhanced) {
        if (context.enableNanoTimestamp && timeBase) {
            const nano = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ2)(timestamp, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_NANO_TIME_BASE_Q);
            const mill = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ2)(timestamp, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_MILLI_TIME_BASE_Q);
            const offset = nano - mill * BigInt(1000000);
            if (offset) {
                header |= 7 /* VideoPacketType.ModEx */;
                ioWriter.writeUint8(header);
                // modExSize - 1
                ioWriter.writeUint8(2);
                ioWriter.writeUint24(Number(BigInt.asIntN(32, offset)));
                header = 0 /* VideoPacketModExType.TimestampOffsetNano */ << 4;
            }
        }
        if (context.multiVideoTracks) {
            header |= 6 /* VideoPacketType.MultiTrack */;
            ioWriter.writeUint8(header);
            header = 0 /* AVMultiTrackType.OneTrack */ << 4;
        }
        header |= type;
        ioWriter.writeUint8(header);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])(_flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecTag[stream.codecpar.codecId]));
        if (context.multiVideoTracks) {
            ioWriter.writeUint8(streamContext.trackId);
        }
        if (type === 1 /* VideoPacketType.CodedFrames */) {
            ioWriter.writeInt24(ct);
        }
    }
    else {
        header |= _flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecType[stream.codecpar.codecId] & 0x0f;
        ioWriter.writeUint8(header);
        if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
            || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
            || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
            || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
            ioWriter.writeUint8(type);
            ioWriter.writeInt24(ct);
        }
    }
}
function writeAudioHeader(ioWriter, stream, context, enhanced, type, timestamp, timeBase) {
    const streamContext = stream.privData;
    let header = (enhanced ? 9 : (_flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecType[stream.codecpar.codecId] & 0x0f)) << 4;
    if (enhanced) {
        if (context.enableNanoTimestamp) {
            const nano = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ2)(timestamp, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_NANO_TIME_BASE_Q);
            const mill = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ2)(timestamp, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_MILLI_TIME_BASE_Q);
            const offset = nano - mill * BigInt(1000000);
            if (offset) {
                header |= 7 /* AudioPacketType.ModEx */;
                ioWriter.writeUint8(header);
                // modExSize - 1
                ioWriter.writeUint8(2);
                ioWriter.writeUint24(Number(BigInt.asIntN(32, offset)));
                header = 0 /* AudioPacketModExType.TimestampOffsetNano */ << 4;
            }
        }
        if (context.multiVideoTracks) {
            header |= 5 /* AudioPacketType.MultiTrack */;
            ioWriter.writeUint8(header);
            header = 0 /* AVMultiTrackType.OneTrack */ << 4;
        }
        header |= type;
        ioWriter.writeUint8(header);
        ioWriter.writeUint32((0,_function_mktag__WEBPACK_IMPORTED_MODULE_3__["default"])(_flv__WEBPACK_IMPORTED_MODULE_0__.AVCodecID2FlvCodecTag[stream.codecpar.codecId]));
        if (context.multiVideoTracks) {
            ioWriter.writeUint8(streamContext.trackId);
        }
    }
    else {
        /**
         * SoundType 声道类型，对 Nellymoser 来说，永远是单声道；对 AAC 来说，永远是双声道
         * - 0 sndMono 单声道
         * - 1 sndStereo 双声道
         */
        if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */ || stream.codecpar.chLayout.nbChannels > 1) {
            header |= 0x01;
        }
        /**
         * SoundSize 采样精度，对于压缩过的音频，永远是 16 位
         * - 0 snd8Bit
         * - 1 snd16Bit
         */
        if (stream.codecpar.codecId !== 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */) {
            header |= 0x02;
        }
        /**
         * SoundRate 采样率，对 AAC 来说，永远等于 3
         * - 0 5.5-kHz
         * - 1 1-kHz
         * - 2 22-kHz
         * - 3 44-kHz
         */
        if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */ || stream.codecpar.sampleRate >= 44000) {
            header |= 0x0c;
        }
        else if (stream.codecpar.sampleRate >= 22000) {
            header |= 0x08;
        }
        else if (stream.codecpar.sampleRate >= 11000) {
            header |= 0x04;
        }
        ioWriter.writeUint8(header);
        if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
            ioWriter.writeUint8(type);
        }
    }
}


/***/ }),

/***/ "./src/avformat/function/mktag.ts":
/*!****************************************!*\
  !*** ./src/avformat/function/mktag.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mktag)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
const cheap__fileName__0 = "src\\avformat\\function\\mktag.ts";
/*
 * libmedia string tag to uint32 in big end
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

function mktag(tag) {
    if (tag.length !== 4) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`tag length is not 4, tag: ${tag}`, cheap__fileName__0, 30);
    }
    let value = 0;
    for (let i = 0; i < 4; i++) {
        value = (value << 8) | tag.charCodeAt(i);
    }
    return value;
}


/***/ }),

/***/ "./src/avnetwork/ioLoader/RtmpIOLoader.ts":
/*!************************************************!*\
  !*** ./src/avnetwork/ioLoader/RtmpIOLoader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RtmpIOLoader)
/* harmony export */ });
/* harmony import */ var _SocketIOLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SocketIOLoader */ "./src/avnetwork/ioLoader/SocketIOLoader.ts");
/* harmony import */ var _WebSocketIOLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebSocketIOLoader */ "./src/avnetwork/ioLoader/WebSocketIOLoader.ts");
/* harmony import */ var _WebTransportIOLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WebTransportIOLoader */ "./src/avnetwork/ioLoader/WebTransportIOLoader.ts");
/* harmony import */ var avprotocol_rtmp_RtmpSession__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avprotocol/rtmp/RtmpSession */ "./src/avprotocol/rtmp/RtmpSession.ts");
/* harmony import */ var common_io_IOReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/IOReader */ "./src/common/io/IOReader.ts");
/* harmony import */ var common_io_IOWriter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/io/IOWriter */ "./src/common/io/IOWriter.ts");
/* harmony import */ var common_util_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! common/util/url */ "./src/common/util/url.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var avformat_formats_flv_FlvHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avformat/formats/flv/FlvHeader */ "./src/avformat/formats/flv/FlvHeader.ts");
/* harmony import */ var avformat_formats_flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avformat/formats/flv/FlvScriptTag */ "./src/avformat/formats/flv/FlvScriptTag.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var avutil_util_amf__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/amf */ "./src/avutil/util/amf.ts");
/* harmony import */ var common_function_isDef__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/function/isDef */ "./src/common/function/isDef.ts");
/*
 * libmedia rtmp loader
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













class RtmpIOLoader extends _SocketIOLoader__WEBPACK_IMPORTED_MODULE_0__["default"] {
    info;
    socket;
    session;
    ioReader;
    ioWriter;
    flvWriter;
    flvHeader;
    packetQueue;
    flvHeaderWrote;
    hasMetadata;
    bufferReader;
    writeFlvData(packet) {
        this.flvWriter.writeUint8(packet.type);
        this.flvWriter.writeUint24(packet.payload.length);
        this.flvWriter.writeUint24(packet.timestamp);
        this.flvWriter.writeUint8(packet.timestamp >> 24);
        this.flvWriter.writeUint24(0);
        this.flvWriter.writeBuffer(packet.payload);
        this.flvWriter.writeUint32(packet.payload.length + 11);
        this.flvWriter.flush();
    }
    async handleRtmpPacket(packet) {
        if (this.flvHeaderWrote) {
            this.writeFlvData(packet);
        }
        else {
            this.packetQueue.push(packet);
            if (packet.type === 8 /* RtmpPacketType.PT_AUDIO */) {
                this.flvHeader.hasAudio = true;
            }
            else if (packet.type === 9 /* RtmpPacketType.PT_VIDEO */) {
                this.flvHeader.hasVideo = true;
            }
            else if (packet.type === 18 /* RtmpPacketType.PT_NOTIFY */) {
                if (!this.bufferReader) {
                    this.bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_10__["default"](packet.payload);
                }
                else {
                    this.bufferReader.resetBuffer(packet.payload);
                }
                const command = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_11__.parseValue(this.bufferReader, BigInt(packet.payload.length));
                if (command === 'onMetaData') {
                    this.hasMetadata = true;
                    const metadata = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_11__.parseValue(this.bufferReader, BigInt(packet.payload.length));
                    this.flvHeader.hasAudio = (0,common_function_isDef__WEBPACK_IMPORTED_MODULE_12__["default"])(metadata.audiocodecid);
                    this.flvHeader.hasVideo = (0,common_function_isDef__WEBPACK_IMPORTED_MODULE_12__["default"])(metadata.videocodecid);
                }
            }
            if (this.packetQueue.length > 10 || this.hasMetadata) {
                this.flvHeader.write(this.flvWriter);
                this.flvWriter.writeUint32(0);
                if (!this.hasMetadata && this.session.getDuration()) {
                    const script = new avformat_formats_flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_9__["default"]();
                    script.onMetaData = {
                        duration: this.session.getDuration()
                    };
                    script.write(this.flvWriter);
                }
                this.packetQueue.forEach((p) => {
                    this.writeFlvData(p);
                });
                this.packetQueue.length = 0;
                this.flvHeaderWrote = true;
            }
        }
    }
    async send(buffer) {
        if (this.socket) {
            await this.socket.send(buffer);
            return 0;
        }
        return -1048574 /* IOError.INVALID_OPERATION */;
    }
    async open(info) {
        this.info = info;
        this.status = 1 /* IOLoaderStatus.CONNECTING */;
        if (info.subProtocol === 3 /* IOType.WEBTRANSPORT */) {
            this.socket = new _WebTransportIOLoader__WEBPACK_IMPORTED_MODULE_2__["default"](this.options);
            await this.socket.open({
                url: info.url,
                webtransportOptions: info.webtransportOptions
            });
        }
        else {
            this.socket = new _WebSocketIOLoader__WEBPACK_IMPORTED_MODULE_1__["default"](this.options);
            await this.socket.open({
                url: info.url
            });
        }
        this.ioReader = new common_io_IOReader__WEBPACK_IMPORTED_MODULE_4__["default"]();
        this.ioReader.onFlush = async (buffer) => {
            return this.socket.read(buffer);
        };
        this.ioReader.onSeek = async (pos) => {
            return this.socket.seek(pos);
        };
        this.ioReader.onSize = async () => {
            return this.socket.size();
        };
        this.ioWriter = new common_io_IOWriter__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.ioWriter.onFlush = async (buffer) => {
            return this.socket.write(buffer);
        };
        this.ioWriter.onSeek = async (pos) => {
            return this.socket.seek(pos);
        };
        this.flvWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_7__["default"]();
        this.flvWriter.onFlush = (buffer) => {
            this.readQueue.push(buffer.slice());
            if (this.consume) {
                this.consume();
            }
            return 0;
        };
        this.flvHeader = new avformat_formats_flv_FlvHeader__WEBPACK_IMPORTED_MODULE_8__["default"]();
        this.packetQueue = [];
        this.flvHeaderWrote = false;
        this.hasMetadata = false;
        this.session = new avprotocol_rtmp_RtmpSession__WEBPACK_IMPORTED_MODULE_3__["default"](this.ioReader, this.ioWriter, {
            isLive: this.options.isLive,
            isPull: true
        });
        this.session.onMediaPacket = async (packet, streamName) => {
            return this.handleRtmpPacket(packet);
        };
        this.session.onError = () => {
            this.status = 3 /* IOLoaderStatus.ERROR */;
            if (this.consume) {
                this.consume();
            }
        };
        await this.session.handshake();
        const result = common_util_url__WEBPACK_IMPORTED_MODULE_6__.parse(this.info.uri);
        const paths = result.pathname.split('/');
        await this.session.connect(paths[1], `rtmp://${result.host}${result.port ? (':' + result.port) : ''}/${paths[1]}`);
        const streamName = paths.slice(2);
        this.session.play((streamName.length > 1 ? streamName.join('/') : streamName[0]) || '');
        return 0;
    }
    async seek(pos) {
        await this.session.seek(Number(pos));
        return 0;
    }
    async size() {
        return BigInt(0);
    }
    async stop() {
        if (this.socket) {
            await this.socket.stop();
            this.socket = null;
        }
        this.status = 4 /* IOLoaderStatus.COMPLETE */;
    }
}


/***/ }),

/***/ "./src/avprotocol/rtmp/RtmpPacket.ts":
/*!*******************************************!*\
  !*** ./src/avprotocol/rtmp/RtmpPacket.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RtmpPacket: () => (/* binding */ RtmpPacket)
/* harmony export */ });
/* unused harmony export RtmpChunk */
/*
 * libmedia rtmp packet
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
class RtmpPacket {
    /**
     * RTMP channel ID (nothing to do with audio/video channels though
     */
    channelId;
    /**
     * packet payload type
     */
    type;
    /**
     * packet full timestamp
     */
    timestamp;
    /**
     * 24-bit timestamp or increment to the previous one, in milliseconds (latter only for media packets).
     * Clipped to a maximum of 0xFFFFFF, indicating an extended timestamp field.
     */
    tsField = 0;
    /**
     * probably an additional channel ID used during streaming data
     */
    extra = 0;
    /**
     * packet payload
     */
    payload;
    constructor(channelId, type, timestamp, size) {
        this.channelId = channelId;
        this.type = type;
        this.timestamp = timestamp;
        this.payload = size instanceof Uint8Array ? size : new Uint8Array(size);
    }
}
class RtmpChunk {
    /**
   * RTMP channel ID (nothing to do with audio/video channels though
   */
    channelId;
    /**
    * packet payload type
    */
    type;
    /**
    * packet full timestamp
    */
    timestamp;
    /**
    * 24-bit timestamp or increment to the previous one, in milliseconds (latter only for media packets).
    * Clipped to a maximum of 0xFFFFFF, indicating an extended timestamp field.
    */
    tsField = 0;
    /**
    * probably an additional channel ID used during streaming data
    */
    extra = 0;
    /**
     * packet payload
     */
    payload;
}


/***/ }),

/***/ "./src/avprotocol/rtmp/RtmpSession.ts":
/*!********************************************!*\
  !*** ./src/avprotocol/rtmp/RtmpSession.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RtmpSession)
/* harmony export */ });
/* harmony import */ var _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RtmpPacket */ "./src/avprotocol/rtmp/RtmpPacket.ts");
/* harmony import */ var avutil_util_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/crypto */ "./src/avutil/util/crypto.ts");
/* harmony import */ var common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/getTimestamp */ "./src/common/function/getTimestamp.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var _rtmp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rtmp */ "./src/avprotocol/rtmp/rtmp.ts");
/* harmony import */ var avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/util/amf */ "./src/avutil/util/amf.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util */ "./src/avprotocol/rtmp/util.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_timer_Sleep__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/timer/Sleep */ "./src/common/timer/Sleep.ts");
/* harmony import */ var cheap_thread_sync__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! cheap/thread/sync */ "./src/cheap/thread/sync.ts");
const cheap__fileName__0 = "src\\avprotocol\\rtmp\\RtmpSession.ts";













class RtmpSession {
    ioReader;
    ioWriter;
    prevReadPacket;
    prevWritePacket;
    inChunkSize;
    outChunkSize;
    seq;
    bufferWriter;
    bufferReader;
    requestMap;
    state;
    maxSentUnacked;
    receiveReportSize;
    duration;
    options;
    streamIdMap;
    sendAsync;
    onMediaPacket;
    onError;
    constructor(ioReader, ioWriter, options) {
        this.ioReader = ioReader;
        this.ioWriter = ioWriter;
        this.options = options;
        this.prevReadPacket = new Map();
        this.prevWritePacket = new Map();
        this.requestMap = new Map();
        this.streamIdMap = new Map();
        this.inChunkSize = 128;
        this.outChunkSize = 128;
        this.seq = 0;
        this.maxSentUnacked = 2500000;
        this.receiveReportSize = 1048576;
        this.sendAsync = new cheap_thread_sync__WEBPACK_IMPORTED_MODULE_12__.Sync();
        this.bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_3__["default"](new Uint8Array(1));
        this.bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_7__["default"](new Uint8Array(1));
        this.state = 0 /* ClientState.START */;
    }
    async handshake() {
        const startTime = (0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_2__["default"])();
        // c0
        await this.ioWriter.writeUint8(0x03);
        // c1
        // time
        await this.ioWriter.writeUint32(0);
        // zero
        await this.ioWriter.writeUint32(0);
        // random
        const random = new Uint8Array(1528);
        avutil_util_crypto__WEBPACK_IMPORTED_MODULE_1__.random(random);
        await this.ioWriter.writeBuffer(random);
        await this.ioWriter.flush();
        // s0
        await this.ioReader.readUint8();
        // s1
        const s1Time = await this.ioReader.readUint32();
        await this.ioReader.skip(4);
        const s1Random = await this.ioReader.readBuffer(1528);
        // c2
        await this.ioWriter.writeUint32(s1Time);
        await this.ioWriter.writeUint32((0,common_function_getTimestamp__WEBPACK_IMPORTED_MODULE_2__["default"])() - startTime);
        await this.ioWriter.writeBuffer(s1Random);
        await this.ioWriter.flush();
        // s2
        await this.ioReader.skip(1536);
        this.readRtmpPacket();
    }
    async sendPacket(packet) {
        await (0,cheap_thread_sync__WEBPACK_IMPORTED_MODULE_12__.lock)(this.sendAsync);
        await (0,_util__WEBPACK_IMPORTED_MODULE_6__.sendRtmpPacket)(this.ioWriter, this.outChunkSize, packet, this.prevWritePacket.get(packet.channelId));
        this.prevWritePacket.set(packet.channelId, packet);
        (0,cheap_thread_sync__WEBPACK_IMPORTED_MODULE_12__.unlock)(this.sendAsync);
    }
    async readPacket() {
        const packet = await (0,_util__WEBPACK_IMPORTED_MODULE_6__.readRtmpPacket)(this.ioReader, this.inChunkSize, this.prevReadPacket);
        this.prevReadPacket.set(packet.channelId, packet);
        return packet;
    }
    handleChunkSize(packet) {
        if (packet.payload.length >= 4) {
            this.bufferReader.resetBuffer(packet.payload);
            this.inChunkSize = this.bufferReader.readUint32();
        }
    }
    handleUserControl(packet) {
        if (packet.payload.length >= 2) {
            this.bufferReader.resetBuffer(packet.payload);
            const type = this.bufferReader.readUint16();
            // PingRequest
            if (type === 6) {
                this.sendPong(packet, this.bufferReader.readUint32());
            }
        }
    }
    handleSetPeerBW(packet) {
        if (packet.payload.length >= 4) {
            this.bufferReader.resetBuffer(packet.payload);
            this.maxSentUnacked = this.bufferReader.readUint32();
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`Max sent, unacked = ${this.maxSentUnacked}`, cheap__fileName__0, 205);
        }
    }
    handleWindowSizeACK(packet) {
        if (packet.payload.length >= 4) {
            this.bufferReader.resetBuffer(packet.payload);
            this.receiveReportSize = this.bufferReader.readUint32();
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`Window acknowledgement size = ${this.receiveReportSize}`, cheap__fileName__0, 212);
            // Send an Acknowledgement packet after receiving half the maximum
            // size, to make sure the peer can keep on sending without waiting
            // for acknowledgements.
            this.receiveReportSize >>= 1;
        }
    }
    async handleInvoke(packet) {
        this.bufferReader.resetBuffer(packet.payload);
        const endPos = BigInt(packet.payload.length);
        const key = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, endPos);
        const seq = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, endPos);
        if (key === '_result' || key === '_error') {
            if (this.requestMap.has(seq)) {
                const options = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, endPos);
                const info = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, endPos);
                if (key === '_result') {
                    this.requestMap.get(seq).resolve({
                        options,
                        info
                    });
                }
                else {
                    this.requestMap.get(seq).reject({
                        options,
                        info
                    });
                }
                this.requestMap.delete(seq);
            }
        }
        else if (key === 'onStatus') {
            const options = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, endPos);
            let info = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, endPos);
            if (info.level === 'error') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_8__.error(`Server error: ${info.description}, ${info.code}`, cheap__fileName__0, 248);
                if (this.requestMap.has(seq)) {
                    this.requestMap.get(seq).reject({
                        options,
                        info
                    });
                    this.requestMap.delete(seq);
                }
                else if (this.onError) {
                    this.onError();
                }
            }
            else {
                switch (info.code) {
                    case 'NetStream.Play.Start':
                        this.state = 3 /* ClientState.PLAYING */;
                        break;
                    case 'NetStream.Play.Stop':
                        this.state = 8 /* ClientState.STOPPED */;
                        break;
                    case 'NetStream.Play.UnpublishNotify':
                        this.state = 8 /* ClientState.STOPPED */;
                        break;
                    case 'NetStream.Publish.Start':
                        this.state = 5 /* ClientState.PUBLISHING */;
                        break;
                    case 'NetStream.Seek.Notify':
                        this.state = 3 /* ClientState.PLAYING */;
                        break;
                }
                if (this.requestMap.has(seq)) {
                    this.requestMap.get(seq).resolve({
                        options,
                        info
                    });
                    this.requestMap.delete(seq);
                }
            }
        }
        else if (key === 'onBWDone') {
            await this.sendCheckBW();
        }
    }
    async handleNotify(packet) {
        this.bufferReader.resetBuffer(packet.payload);
        const command = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.parseValue(this.bufferReader, BigInt(packet.payload.length));
        if (command === '@setDataFrame') {
            packet.payload = packet.payload.subarray(Number(this.bufferReader.getPos()));
        }
        if (packet.payload.length && this.onMediaPacket) {
            await this.onMediaPacket(packet, this.streamIdMap.get(packet.extra));
        }
    }
    async readRtmpPacket() {
        while (true) {
            try {
                const packet = await this.readPacket();
                switch (packet.type) {
                    case 3 /* RtmpPacketType.PT_BYTES_READ */:
                        break;
                    case 1 /* RtmpPacketType.PT_CHUNK_SIZE */:
                        this.handleChunkSize(packet);
                        break;
                    case 4 /* RtmpPacketType.PT_USER_CONTROL */:
                        this.handleUserControl(packet);
                        break;
                    case 6 /* RtmpPacketType.PT_SET_PEER_BW */:
                        this.handleSetPeerBW(packet);
                        break;
                    case 5 /* RtmpPacketType.PT_WINDOW_ACK_SIZE */:
                        this.handleWindowSizeACK(packet);
                        break;
                    case 20 /* RtmpPacketType.PT_INVOKE */:
                        await this.handleInvoke(packet);
                        break;
                    case 18 /* RtmpPacketType.PT_NOTIFY */:
                        await this.handleNotify(packet);
                        break;
                    case 22 /* RtmpPacketType.PT_METADATA */:
                    case 8 /* RtmpPacketType.PT_AUDIO */:
                    case 9 /* RtmpPacketType.PT_VIDEO */:
                        if (this.onMediaPacket) {
                            await this.onMediaPacket(packet, this.streamIdMap.get(packet.extra));
                        }
                        break;
                    default:
                        break;
                }
            }
            catch (error) {
                break;
            }
        }
    }
    async sendPong(packet, value) {
        if (packet.payload.length < 6) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`Too short ping packet (${packet.payload.length})`, cheap__fileName__0, 348);
            return;
        }
        const p = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(2 /* RtmpChannel.NETWORK_CHANNEL */, 4 /* RtmpPacketType.PT_USER_CONTROL */, packet.timestamp + 1, 6);
        this.bufferWriter.resetBuffer(p.payload);
        this.bufferWriter.writeUint16(7);
        this.bufferWriter.writeUint32(value);
        this.sendPacket(p);
    }
    async sendWindowAckSize() {
        const p = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(2 /* RtmpChannel.NETWORK_CHANNEL */, 5 /* RtmpPacketType.PT_WINDOW_ACK_SIZE */, 0, 4);
        this.bufferWriter.resetBuffer(p.payload);
        this.bufferWriter.writeUint32(this.maxSentUnacked);
        await this.sendPacket(p);
    }
    async sendBufferTime(streamId) {
        const p = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(2 /* RtmpChannel.NETWORK_CHANNEL */, 4 /* RtmpPacketType.PT_USER_CONTROL */, 1, 10);
        this.bufferWriter.resetBuffer(p.payload);
        // SetBuffer Length
        this.bufferWriter.writeUint16(3);
        this.bufferWriter.writeUint32(streamId);
        this.bufferWriter.writeUint32(this.options.clientBufferTime || 3000);
        await this.sendPacket(p);
    }
    async sendFCSubscribe(subscribe) {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 27 + subscribe.length);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 'FCSubscribe');
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, ++this.seq);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, null);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, subscribe);
        await this.sendPacket(packet);
    }
    async sendFCPublish(publish) {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 25 + publish.length);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 'FCPublish');
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, ++this.seq);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, null);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, publish);
        await this.sendPacket(packet);
    }
    async sendReleaseStream(streamName) {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 29 + streamName.length);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 'releaseStream');
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, ++this.seq);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, null);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, streamName);
        await this.sendPacket(packet);
    }
    async sendCheckBW() {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 21);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, '_checkbw');
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, ++this.seq);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, null);
        await this.sendPacket(packet);
    }
    async request(method, data) {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 4096 + _rtmp__WEBPACK_IMPORTED_MODULE_4__.APP_MAX_LENGTH);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, method);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, ++this.seq);
        common_util_array__WEBPACK_IMPORTED_MODULE_9__.each(data, (value) => {
            avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, value);
        });
        packet.payload = packet.payload.subarray(0, this.bufferWriter.getPos());
        return new Promise((resolve, reject) => {
            this.requestMap.set(this.seq, {
                resolve,
                reject
            });
            this.sendPacket(packet);
        });
    }
    async connect(appName, url) {
        await this.request('connect', [{
                app: appName,
                fourCcList: ['hvc1', 'av01', 'vp09'],
                flashVer: 'LNX 9,0,124,2',
                tcUrl: url,
                fpad: 0,
                capabilities: 15.0,
                /* Tell the server we support all the audio codecs except
                 * SUPPORT_SND_INTEL (0x0008) and SUPPORT_SND_UNUSED (0x0010)
                 * which are unused in the RTMP protocol implementation.
                 */
                audioCodecs: 4071.0,
                videoCodecs: 252.0,
                videoFunction: 1.0
            }]);
        if (this.options.isPull) {
            await this.sendWindowAckSize();
        }
    }
    async createStream() {
        const result = await this.request('createStream', [null]);
        return result.info;
    }
    async play(streamName) {
        const streamId = await this.createStream();
        this.streamIdMap.set(streamId, streamName);
        if (!this.options.isLive) {
            const result = await Promise.race([
                this.request('getStreamLength', [null, streamName]),
                new common_timer_Sleep__WEBPACK_IMPORTED_MODULE_11__["default"](1)
            ]);
            if (!common_util_is__WEBPACK_IMPORTED_MODULE_10__.number(result)) {
                this.duration = result.info;
            }
        }
        await this.sendFCSubscribe(streamName);
        this.request('play', [null, streamName, -1, -1, true]);
        await this.sendBufferTime(streamId);
    }
    async publish(streamName) {
        await this.sendReleaseStream(streamName);
        await this.sendFCPublish(streamName);
        const streamId = await this.createStream();
        this.streamIdMap.set(streamId, streamName);
        await this.request('publish', [null, streamName, 'live']);
    }
    async sendStreamPacket(packet, streamName) {
        let streamId = 0;
        this.streamIdMap.forEach((v, k) => {
            if (v === streamName) {
                streamId = k;
            }
        });
        packet.extra = streamId;
        await this.sendPacket(packet);
    }
    async seek(timestamp) {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 26);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 'seek');
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 0);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, null);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, timestamp);
        await this.sendPacket(packet);
    }
    async pause(paused, timestamp) {
        const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(3 /* RtmpChannel.SYSTEM_CHANNEL */, 20 /* RtmpPacketType.PT_INVOKE */, 0, 29);
        this.bufferWriter.resetBuffer(packet.payload);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 'pause');
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, 0);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, null);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, paused);
        avutil_util_amf__WEBPACK_IMPORTED_MODULE_5__.writeValue(this.bufferWriter, timestamp);
        await this.sendPacket(packet);
    }
    getDuration() {
        return this.duration;
    }
}


/***/ }),

/***/ "./src/avprotocol/rtmp/rtmp.ts":
/*!*************************************!*\
  !*** ./src/avprotocol/rtmp/rtmp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_MAX_LENGTH: () => (/* binding */ APP_MAX_LENGTH)
/* harmony export */ });
/* unused harmony exports RTMP_CHANNELS, TCURL_MAX_LENGTH, FLASHVER_MAX_LENGTH, RTMP_PKTDATA_DEFAULT_SIZE, RTMP_HEADER */
/*
 * libmedia rtmp
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
/**
 * maximum possible number of different RTMP channels
 */
const RTMP_CHANNELS = 65599;
const APP_MAX_LENGTH = 1024;
const TCURL_MAX_LENGTH = 1024;
const FLASHVER_MAX_LENGTH = 64;
const RTMP_PKTDATA_DEFAULT_SIZE = 4096;
const RTMP_HEADER = 11;


/***/ }),

/***/ "./src/avprotocol/rtmp/util.ts":
/*!*************************************!*\
  !*** ./src/avprotocol/rtmp/util.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readRtmpPacket: () => (/* binding */ readRtmpPacket),
/* harmony export */   sendRtmpPacket: () => (/* binding */ sendRtmpPacket)
/* harmony export */ });
/* harmony import */ var _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RtmpPacket */ "./src/avprotocol/rtmp/RtmpPacket.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
const cheap__fileName__0 = "src\\avprotocol\\rtmp\\util.ts";



async function writeChannelId(ioWriter, channelId, mode) {
    if (channelId < 64) {
        await ioWriter.writeUint8(channelId | (mode << 6));
    }
    else if (channelId < 320) {
        await ioWriter.writeUint8(0 | (mode << 6));
        await ioWriter.writeUint8(channelId - 64);
    }
    else {
        await ioWriter.writeUint8(1 | (mode << 6));
        const id = channelId - 64;
        await ioWriter.writeUint8(id & 0xff);
        await ioWriter.writeUint8(id >>> 8);
    }
}
async function sendRtmpPacket(ioWriter, chunkSize, packet, prevPacket) {
    const useDelta = prevPacket
        && prevPacket.extra === packet.extra
        && packet.timestamp >= prevPacket.timestamp;
    let timestamp = packet.timestamp;
    if (useDelta) {
        timestamp -= prevPacket.timestamp;
    }
    if (timestamp > 0xFFFFFF) {
        packet.tsField = 0xFFFFFF;
    }
    else {
        packet.tsField = timestamp;
    }
    let mode = 0 /* RtmpPacketHeaderSize.PS_TWELVE_BYTES */;
    if (useDelta) {
        if (packet.type === prevPacket.type
            && packet.payload.length === prevPacket.payload.length) {
            mode = 2 /* RtmpPacketHeaderSize.PS_FOUR_BYTES */;
            if (packet.tsField === prevPacket.tsField) {
                mode = 3 /* RtmpPacketHeaderSize.PS_ONE_BYTE */;
            }
        }
        else {
            mode = 1 /* RtmpPacketHeaderSize.PS_EIGHT_BYTES */;
        }
    }
    await writeChannelId(ioWriter, packet.channelId, mode);
    if (mode !== 3 /* RtmpPacketHeaderSize.PS_ONE_BYTE */) {
        await ioWriter.writeUint24(packet.tsField);
        if (mode !== 2 /* RtmpPacketHeaderSize.PS_FOUR_BYTES */) {
            await ioWriter.writeUint24(packet.payload.length);
            await ioWriter.writeUint8(packet.type);
            if (mode === 0 /* RtmpPacketHeaderSize.PS_TWELVE_BYTES */) {
                await ioWriter.writeUint8(packet.extra);
                await ioWriter.writeUint8(packet.extra >> 8);
                await ioWriter.writeUint8(packet.extra >> 16);
                await ioWriter.writeUint8(packet.extra >> 24);
            }
        }
    }
    if (packet.tsField === 0xFFFFFF) {
        await ioWriter.writeUint32(timestamp);
    }
    let offset = 0;
    while (offset < packet.payload.length) {
        const len = Math.min(chunkSize, packet.payload.length - offset);
        await ioWriter.writeBuffer(packet.payload.subarray(offset, offset + len));
        offset += len;
        if (offset < packet.payload.length) {
            await writeChannelId(ioWriter, packet.channelId, 3 /* RtmpPacketHeaderSize.PS_ONE_BYTE */);
            if (packet.tsField === 0xFFFFFF) {
                await ioWriter.writeUint32(timestamp);
            }
        }
    }
    await ioWriter.flush();
}
async function readRtmpPacket(ioReader, chunkSize, prevPacketMap) {
    const buffers = [];
    const header = await ioReader.readUint8();
    let channelId = header & 0x3F;
    // special case for channel number >= 64
    if (channelId < 2) {
        const total = await ioReader.readUint8();
        if (total === 0) {
            channelId = (await ioReader.readUint8()) + 64;
        }
        else {
            channelId = ((await ioReader.readUint8()) | ((await ioReader.readUint8()) << 8)) + 64;
        }
    }
    const mode = header >>> 6;
    const prevPacket = prevPacketMap.get(channelId);
    let size = prevPacket ? prevPacket.payload.length : 0;
    let type = prevPacket ? prevPacket.type : 0;
    let extra = prevPacket ? prevPacket.extra : 0;
    let tsField = 0;
    let timestamp = 0;
    if (mode === 3 /* RtmpPacketHeaderSize.PS_ONE_BYTE */) {
        tsField = prevPacket.tsField;
    }
    else {
        tsField = await ioReader.readUint24();
        if (mode !== 2 /* RtmpPacketHeaderSize.PS_FOUR_BYTES */) {
            size = await ioReader.readUint24();
            type = await ioReader.readUint8();
            if (mode === 0 /* RtmpPacketHeaderSize.PS_TWELVE_BYTES */) {
                extra = await ioReader.readUint8();
                extra |= (await ioReader.readUint8()) << 8;
                extra |= (await ioReader.readUint8()) << 16;
                extra |= (await ioReader.readUint8()) << 24;
            }
        }
    }
    if (tsField === 0xFFFFFF) {
        timestamp = await ioReader.readUint32();
    }
    else {
        timestamp = tsField;
    }
    if (mode !== 0 /* RtmpPacketHeaderSize.PS_TWELVE_BYTES */) {
        if (prevPacket) {
            timestamp += prevPacket.timestamp;
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`got invalid message fmt, channel id ${channelId} can not find prev message with fmt ${mode}`, cheap__fileName__0, 171);
        }
    }
    if (size < chunkSize) {
        buffers.push(await ioReader.readBuffer(size));
    }
    else {
        let total = size;
        while (total) {
            const len = Math.min(chunkSize, total);
            buffers.push(await ioReader.readBuffer(len));
            total -= len;
            if (total) {
                const next = (await ioReader.readUint8()) & 0x3F;
                if (next < 2) {
                    await ioReader.skip(next + 1);
                }
                if (tsField === 0xFFFFFF) {
                    await ioReader.skip(4);
                }
            }
        }
    }
    const packet = new _RtmpPacket__WEBPACK_IMPORTED_MODULE_0__.RtmpPacket(channelId, type, timestamp, (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_1__["default"])(Uint8Array, buffers));
    packet.tsField = tsField;
    packet.extra = extra;
    return packet;
}


/***/ }),

/***/ "./src/avutil/constant.ts":
/*!********************************!*\
  !*** ./src/avutil/constant.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AV_MILLI_TIME_BASE: () => (/* binding */ AV_MILLI_TIME_BASE),
/* harmony export */   AV_MILLI_TIME_BASE_Q: () => (/* binding */ AV_MILLI_TIME_BASE_Q),
/* harmony export */   AV_NANO_TIME_BASE: () => (/* binding */ AV_NANO_TIME_BASE),
/* harmony export */   AV_NANO_TIME_BASE_Q: () => (/* binding */ AV_NANO_TIME_BASE_Q),
/* harmony export */   AV_TIME_BASE: () => (/* binding */ AV_TIME_BASE),
/* harmony export */   AV_TIME_BASE_Q: () => (/* binding */ AV_TIME_BASE_Q),
/* harmony export */   INT32_MAX: () => (/* binding */ INT32_MAX),
/* harmony export */   INT64_MAX: () => (/* binding */ INT64_MAX),
/* harmony export */   NOPTS_VALUE: () => (/* binding */ NOPTS_VALUE),
/* harmony export */   NOPTS_VALUE_BIGINT: () => (/* binding */ NOPTS_VALUE_BIGINT),
/* harmony export */   NTP_OFFSET_US: () => (/* binding */ NTP_OFFSET_US),
/* harmony export */   UINT16_MAX: () => (/* binding */ UINT16_MAX),
/* harmony export */   UINT32_MAX: () => (/* binding */ UINT32_MAX)
/* harmony export */ });
/* unused harmony exports NTP_OFFSET, AV_TIME_BASE1_Q, INT8_MAX, INT16_MAX, INT8_MIN, INT16_MIN, INT32_MIN, UINT8_MAX, UINT64_MAX */
/* harmony import */ var _struct_rational__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./struct/rational */ "./src/avutil/struct/rational.ts");
/*
 * libmedia constant
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

const NOPTS_VALUE_BIGINT = -BigInt(1);
const NOPTS_VALUE = -1;
const AV_TIME_BASE = 1000000;
const AV_MILLI_TIME_BASE = 1000;
const AV_NANO_TIME_BASE = 1000000000;
const NTP_OFFSET = BigInt(2208988800);
const NTP_OFFSET_US = (NTP_OFFSET * BigInt(1000000));
/**
 * 微秒时间基
 */
const AV_TIME_BASE_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: AV_TIME_BASE, num: 1 });
/**
 * 毫秒时间基
 */
const AV_MILLI_TIME_BASE_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: AV_MILLI_TIME_BASE, num: 1 });
/**
 * 纳秒时间基
 */
const AV_NANO_TIME_BASE_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: AV_NANO_TIME_BASE, num: 1 });
/**
 * 秒时间基
 */
const AV_TIME_BASE1_Q = new _struct_rational__WEBPACK_IMPORTED_MODULE_0__.Rational({ den: 1, num: 1 });
const INT8_MAX = 127;
const INT16_MAX = 32767;
const INT32_MAX = 2147483647;
const INT64_MAX = BigInt(9223372036854775807);
const INT8_MIN = -128;
const INT16_MIN = -32768;
const INT32_MIN = -INT32_MAX - 1;
const UINT8_MAX = 255;
const UINT16_MAX = 65535;
const UINT32_MAX = 4294967295;
const UINT64_MAX = BigInt(18446744073709551615);


/***/ }),

/***/ "./src/avutil/struct/rational.ts":
/*!***************************************!*\
  !*** ./src/avutil/struct/rational.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Rational: () => (/* binding */ Rational)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/function/definedMetaProperty */ "./src/cheap/function/definedMetaProperty.ts");


/*
 * libmedia Rational defined
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
class Rational {
    /**
     * 分子
     */
    num = 1;
    /**
     * 分母
     */
    den = 1;
    constructor(init) {
        if (init) {
            this.den = init.den;
            this.num = init.num;
        }
    }
}
(function (prototype) {
    var map = new Map();
    map.set("num", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
    map.set("den", { 0: 15, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 4, 8: 0 });
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStruct, true);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructMaxBaseTypeByteLength, 4);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructLength, 8);
    (0,cheap_function_definedMetaProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(prototype, cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructKeysMeta, map);
})(Rational.prototype);


/***/ }),

/***/ "./src/avutil/util/amf.ts":
/*!********************************!*\
  !*** ./src/avutil/util/amf.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseValue: () => (/* binding */ parseValue),
/* harmony export */   writeValue: () => (/* binding */ writeValue)
/* harmony export */ });
/* unused harmony export parseObject */
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/*
 * libmedia flv amf
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



async function parseObject(ioReader, endPos) {
    const key = await ioReader.readString(await ioReader.readUint16());
    const value = await parseValue(ioReader, endPos);
    return {
        key,
        value
    };
}
async function parseValue(ioReader, endPos) {
    const type = await ioReader.readUint8();
    let value;
    switch (type) {
        // double
        case 0:
            value = await ioReader.readDouble();
            break;
        // boolean
        case 1:
            value = await ioReader.readUint8() ? true : false;
            break;
        // string
        case 2:
            value = await ioReader.readString(await ioReader.readUint16());
            break;
        // object
        case 3:
            value = {};
            while (ioReader.getPos() < endPos) {
                const { key, value: val } = await parseObject(ioReader, endPos);
                value[key] = val;
                if (((await ioReader.peekUint24()) & 0x00FFFFFF) === 9) {
                    await ioReader.skip(3);
                    break;
                }
            }
            break;
        // ECMA array type (Mixed array)
        case 8:
            value = {};
            // skip ECMAArrayLength(UI32)
            await ioReader.skip(4);
            while (ioReader.getPos() < endPos) {
                const { key, value: val } = await parseObject(ioReader, endPos);
                value[key] = val;
                if (((await ioReader.peekUint24()) & 0x00FFFFFF) === 9) {
                    await ioReader.skip(3);
                    break;
                }
            }
            break;
        // ScriptDataObjectEnd
        case 9:
        case 5:
            value = null;
            break;
        // Strict array type
        case 10:
            value = [];
            const length = await ioReader.readUint32();
            for (let i = 0; i < length; i++) {
                value.push(await parseValue(ioReader, endPos));
            }
            break;
        // Date
        case 11:
            const timestamp = await ioReader.readDouble();
            const localTimeOffset = await ioReader.readInt16();
            value = new Date(timestamp + localTimeOffset * 60 * 1000);
            break;
        // Long string type
        case 12:
            value = await ioReader.readString(await ioReader.readUint32());
            break;
        default:
    }
    return value;
}
function writeValue(ioWriter, value) {
    // double
    if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.number(value)) {
        ioWriter.writeUint8(0);
        ioWriter.writeDouble(value);
    }
    else if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value)) {
        ioWriter.writeUint8(0);
        ioWriter.writeDouble(Number(value));
    }
    // boolean
    else if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.boolean(value)) {
        ioWriter.writeUint8(1);
        ioWriter.writeUint8(value ? 1 : 0);
    }
    // string
    else if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.string(value)) {
        // long string
        if (value.length >= 65536) {
            ioWriter.writeUint8(12);
            ioWriter.writeUint32(value.length);
            ioWriter.writeString(value);
        }
        // string
        else {
            ioWriter.writeUint8(2);
            ioWriter.writeUint16(value.length);
            ioWriter.writeString(value);
        }
    }
    // array type
    else if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.array(value)) {
        ioWriter.writeUint8(10);
        ioWriter.writeUint32(value.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_1__.each(value, (value) => {
            writeValue(ioWriter, value);
        });
    }
    // object
    else if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.object(value)) {
        ioWriter.writeUint8(3);
        common_util_object__WEBPACK_IMPORTED_MODULE_2__.each(value, (item, key) => {
            ioWriter.writeUint16(key.length);
            ioWriter.writeString(key);
            writeValue(ioWriter, item);
        });
        // object end flag
        ioWriter.writeUint24(9);
    }
    else if (value instanceof Date) {
        ioWriter.writeUint8(11);
        ioWriter.writeDouble(value.getTime());
        ioWriter.writeInt16(0);
    }
    else if (value == null) {
        ioWriter.writeUint8(5);
    }
}


/***/ }),

/***/ "./src/avutil/util/crypto.ts":
/*!***********************************!*\
  !*** ./src/avutil/util/crypto.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   random: () => (/* binding */ random)
/* harmony export */ });
/*
 * libmedia crypto util
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
function random(buffer) {
    {
        crypto.getRandomValues(buffer);
    }
}


/***/ }),

/***/ "./src/avutil/util/rational.ts":
/*!*************************************!*\
  !*** ./src/avutil/util/rational.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avD2Q: () => (/* binding */ avD2Q),
/* harmony export */   avQ2D: () => (/* binding */ avQ2D),
/* harmony export */   avReduce: () => (/* binding */ avReduce),
/* harmony export */   avRescaleQ: () => (/* binding */ avRescaleQ),
/* harmony export */   avRescaleQ2: () => (/* binding */ avRescaleQ2),
/* harmony export */   avRescaleQ3: () => (/* binding */ avRescaleQ3)
/* harmony export */ });
/* unused harmony exports avRescaleQ4, avQ2D2, avReduce2 */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_math_gcd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/math/gcd */ "./src/common/math/gcd.ts");


/*
 * libmedia rational util
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


/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 *
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
function avRescaleQ(a, bq, cq) {
    const b = a * BigInt(bq.num) * BigInt(cq.den);
    const c = BigInt(bq.den) * BigInt(cq.num);
    return b / c;
}
/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 *
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
function avRescaleQ2(a, bq, cq) {
    const b = a * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](bq)) * BigInt(cq.den);
    const c = BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](bq + 4)) * BigInt(cq.num);
    return b / c;
}
/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 *
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
function avRescaleQ3(a, bq, cq) {
    const b = a * BigInt(bq.num) * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](cq + 4));
    const c = BigInt(bq.den) * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](cq));
    return b / c;
}
/**
 * 将一个时间戳由一个时间基转换到另一个时间基
 *
 * @param a 待转换时间戳
 * @param bp 待转换时间戳的时间基
 * @param cq 目标时间基
 */
function avRescaleQ4(a, bq, cq) {
    const b = a * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](bq)) * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](cq + 4));
    const c = BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](bq + 4)) * BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](cq));
    return b / c;
}
/**
 * 将一个时间基转换成 double
 *
 * @param a
 */
function avQ2D(a) {
    return a.num / a.den;
}
/**
 * 将一个时间基转换成 double
 *
 * @param a
 */
function avQ2D2(a) {
    return cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a) / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a + 4);
}
function avD2Q(d, max) {
    if (isNaN(19)) {
        return {
            den: 0,
            num: 0
        };
    }
    if (Math.abs(d) > _constant__WEBPACK_IMPORTED_MODULE_2__.INT32_MAX + 3) {
        return {
            den: 0,
            num: d < 0 ? -1 : 1
        };
    }
    const q = d > 1
        ? {
            den: Math.floor(max / d + 0.5),
            num: max
        }
        : {
            den: max,
            num: Math.floor(d * max + 0.5)
        };
    avReduce(q);
    return q;
}
/**
 * 化简 Rational
 *
 * @param a
 */
function avReduce(a) {
    const gcdValue = (0,common_math_gcd__WEBPACK_IMPORTED_MODULE_3__["default"])(a.num, a.den);
    if (gcdValue <= 1) {
        return;
    }
    a.den /= gcdValue;
    a.num /= gcdValue;
}
/**
 * 化简 Rational
 *
 * @param a
 */
function avReduce2(a) {
    const gcdValue = (0,common_math_gcd__WEBPACK_IMPORTED_MODULE_3__["default"])(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a + 4));
    if (gcdValue <= 1) {
        return;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](a + 4, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a + 4) / gcdValue);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](a, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](a) / gcdValue);
}


/***/ }),

/***/ "./src/cheap/thread/sync.ts":
/*!**********************************!*\
  !*** ./src/cheap/thread/sync.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sync: () => (/* binding */ Sync),
/* harmony export */   lock: () => (/* binding */ lock),
/* harmony export */   unlock: () => (/* binding */ unlock)
/* harmony export */ });
/**
 * 同一个线程内异步方法串行执行
 */
class Sync {
    list = [];
}
async function lock(sync) {
    return new Promise((resolve) => {
        sync.list.push(resolve);
        if (sync.list.length === 1) {
            resolve();
        }
    });
}
function unlock(sync) {
    sync.list.shift();
    if (sync.list.length) {
        sync.list[0]();
    }
}


/***/ }),

/***/ "./src/common/function/split.ts":
/*!**************************************!*\
  !*** ./src/common/function/split.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ split)
/* harmony export */ });
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _util_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/array */ "./src/common/util/array.ts");
/**
 * @file 拆解字符串，并 trim 每个部分
 */


/**
 * 拆解字符串，并 trim 每个部分
 *
 * @param str 字符串
 * @param sep 分隔符
 */
function split(str, sep) {
    const result = [];
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.number(str)) {
        str = str + '';
    }
    if (str && _util_is__WEBPACK_IMPORTED_MODULE_0__.string(str)) {
        _util_array__WEBPACK_IMPORTED_MODULE_1__.each(str.split(sep), (part, index) => {
            part = part.trim();
            if (part) {
                result.push(part);
            }
        });
    }
    return result;
}


/***/ }),

/***/ "./src/common/io/IOReader.ts":
/*!***********************************!*\
  !*** ./src/common/io/IOReader.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOReader)
/* harmony export */ });
/* harmony import */ var _util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/* harmony import */ var _timer_Sleep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../timer/Sleep */ "./src/common/timer/Sleep.ts");
const cheap__fileName__0 = "src\\common\\io\\IOReader.ts";



class IOReader {
    data;
    buffer;
    pointer;
    endPointer;
    pos;
    size;
    littleEndian;
    fileSize_;
    error;
    onFlush;
    onSeek;
    onSize;
    flags;
    flushResolve;
    /**
     * @param data 待读取的字节
     * @param bigEndian 是否按大端字节序读取，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pos = BigInt(0);
        this.pointer = 0;
        this.error = 0;
        this.endPointer = 0;
        this.littleEndian = !bigEndian;
        this.flags = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.size = Math.max(size, 102400);
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 读取 8 位无符号整数
     *
     * @returns
     */
    async readUint8() {
        if (this.remainingLength() < 1) {
            await this.flush(1);
        }
        const value = this.data.getUint8(this.pointer);
        this.pointer++;
        this.pos++;
        return value;
    }
    /**
     * 读取 8 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekUint8() {
        if (this.remainingLength() < 1) {
            await this.flush(1);
        }
        return this.data.getUint8(this.pointer);
    }
    /**
     * 读取 16 位无符号整数
     *
     * @returns
     */
    async readUint16() {
        if (this.remainingLength() < 2) {
            await this.flush(2);
        }
        const value = this.data.getUint16(this.pointer, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
        return value;
    }
    /**
     * 读取 16 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekUint16() {
        if (this.remainingLength() < 2) {
            await this.flush(2);
        }
        return this.data.getUint16(this.pointer, this.littleEndian);
    }
    /**
     * 读取 24 位无符号整数
     *
     * @returns
     */
    async readUint24() {
        if (this.remainingLength() < 3) {
            await this.flush(3);
        }
        const high = await this.readUint16();
        const low = await this.readUint8();
        return this.littleEndian ? (low << 16 | high) : (high << 8 | low);
    }
    /**
     * 读取 24 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekUint24() {
        if (this.remainingLength() < 3) {
            await this.flush(3);
        }
        const pointer = this.pointer;
        const pos = this.pos;
        const high = await this.readUint16();
        const low = await this.readUint8();
        const value = this.littleEndian ? (low << 16 | high) : (high << 8 | low);
        this.pointer = pointer;
        this.pos = pos;
        return value;
    }
    /**
     * 读取 32 位无符号整数
     *
     * @returns
     */
    async readUint32() {
        if (this.remainingLength() < 4) {
            await this.flush(4);
        }
        const value = this.data.getUint32(this.pointer, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
        return value;
    }
    /**
     * 读取 32 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekUint32() {
        if (this.remainingLength() < 4) {
            await this.flush(4);
        }
        return this.data.getUint32(this.pointer, this.littleEndian);
    }
    /**
     * 读取 64 位无符号整数
     *
     * @returns
     */
    async readUint64() {
        if (this.remainingLength() < 8) {
            await this.flush(8);
        }
        const value = this.data.getBigUint64(this.pointer, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
        return value;
    }
    /**
     * 读取 64 位无符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekUint64() {
        if (this.remainingLength() < 8) {
            await this.flush(8);
        }
        return this.data.getBigUint64(this.pointer, this.littleEndian);
    }
    /**
     * 读取 8 位有符号整数
     *
     * @returns
     */
    async readInt8() {
        if (this.remainingLength() < 1) {
            await this.flush(1);
        }
        const value = this.data.getInt8(this.pointer);
        this.pointer++;
        this.pos++;
        return value;
    }
    /**
     * 读取 8 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekInt8() {
        if (this.remainingLength() < 1) {
            await this.flush(1);
        }
        return this.data.getInt8(this.pointer);
    }
    /**
     * 读取 16 位有符号整数
     *
     * @returns
     */
    async readInt16() {
        if (this.remainingLength() < 2) {
            await this.flush(2);
        }
        const value = this.data.getInt16(this.pointer, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
        return value;
    }
    /**
     * 读取 16 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekInt16() {
        if (this.remainingLength() < 2) {
            await this.flush(2);
        }
        return this.data.getInt16(this.pointer, this.littleEndian);
    }
    /**
     * 读取 24 位有符号整数
     *
     * @returns
     */
    async readInt24() {
        const value = await this.readUint24();
        return (value & 0x800000) ? (value - 0x1000000) : value;
    }
    /**
     * 读取 24 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekInt24() {
        const value = await this.peekUint24();
        return (value & 0x800000) ? (value - 0x1000000) : value;
    }
    /**
     * 读取 32 位有符号整数
     *
     * @returns
     */
    async readInt32() {
        if (this.remainingLength() < 4) {
            await this.flush(4);
        }
        const value = this.data.getInt32(this.pointer, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
        return value;
    }
    /**
     * 读取 32 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekInt32() {
        if (this.remainingLength() < 4) {
            await this.flush(4);
        }
        return this.data.getInt32(this.pointer, this.littleEndian);
    }
    /**
     * 读取 64 位有符号整数
     *
     * @returns
     */
    async readInt64() {
        if (this.remainingLength() < 8) {
            await this.flush(8);
        }
        const value = this.data.getBigInt64(this.pointer, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
        return value;
    }
    /**
     * 读取 64 位有符号整数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekInt64() {
        if (this.remainingLength() < 8) {
            await this.flush(8);
        }
        return this.data.getBigInt64(this.pointer, this.littleEndian);
    }
    /**
     * 读取单精度浮点数
     *
     * @returns
     */
    async readFloat() {
        if (this.remainingLength() < 4) {
            await this.flush(4);
        }
        const value = this.data.getFloat32(this.pointer, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
        return value;
    }
    /**
     * 读取单精度浮点数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekFloat() {
        if (this.remainingLength() < 4) {
            await this.flush(4);
        }
        return this.data.getFloat32(this.pointer, this.littleEndian);
    }
    /**
     * 读取双精度浮点数
     *
     * @returns
     */
    async readDouble() {
        if (this.remainingLength() < 8) {
            await this.flush(8);
        }
        const value = this.data.getFloat64(this.pointer, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
        return value;
    }
    /**
     * 读取双精度浮点数（不会移动读取指针位置）
     *
     * @returns
     */
    async peekDouble() {
        if (this.remainingLength() < 8) {
            await this.flush(8);
        }
        return this.data.getFloat64(this.pointer, this.littleEndian);
    }
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回
     *
     * @param length 默认 1
     * @returns
     */
    async readHex(length = 1) {
        let hexStr = '';
        for (let i = 0; i < length; i++) {
            const hex = (await this.readUint8()).toString(16);
            hexStr += (hex.length === 1 ? '0' + hex : hex);
        }
        return hexStr;
    }
    /**
     * 读取指定长度的字节，并以 16 进制字符串返回（不会移动读取指针位置）
     *
     * @param length 默认 1
     * @returns
     */
    async peekHex(length = 1) {
        if (length > this.size) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekHex, length too large', cheap__fileName__0, 416);
        }
        if (this.remainingLength() < length) {
            await this.flush(length);
        }
        const pointer = this.pointer;
        const pos = this.pos;
        let hexStr = '';
        for (let i = 0; i < length; i++) {
            const hex = (await this.readUint8()).toString(16);
            hexStr += (hex.length === 1 ? '0' + hex : hex);
        }
        this.pointer = pointer;
        this.pos = pos;
        return hexStr;
    }
    async readBuffer(length, buffer) {
        if (!buffer) {
            buffer = new Uint8Array(length);
        }
        if (this.remainingLength() < length) {
            let index = 0;
            if (this.remainingLength() > 0) {
                const len = this.remainingLength();
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
            while (length > 0) {
                await this.flush();
                const len = Math.min(this.endPointer - this.pointer, length);
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
        }
        else {
            buffer.set(this.buffer.subarray(this.pointer, this.pointer + length), 0);
            this.pointer += length;
            this.pos += BigInt(length);
        }
        return buffer;
    }
    async peekBuffer(length, buffer) {
        if (length > this.size) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekBuffer, length too large', cheap__fileName__0, 501);
        }
        if (this.remainingLength() < length) {
            await this.flush(length);
        }
        if (!buffer) {
            buffer = new Uint8Array(length);
        }
        buffer.set(this.buffer.subarray(this.pointer, this.pointer + length), 0);
        return buffer;
    }
    /**
     * 读取最多 length 字节的数据到指定 buffer，返回已写入的字节长度
     *
     * @param length
     * @param buffer
     * @returns
     */
    async readToBuffer(length, buffer) {
        if (this.remainingLength() < length) {
            let index = 0;
            if (this.remainingLength() > 0) {
                const len = this.remainingLength();
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
            while (length > 0) {
                try {
                    await this.flush();
                }
                catch (error) {
                    if (this.error === -1048576 /* IOError.END */ && index) {
                        return index;
                    }
                    else {
                        throw error;
                    }
                }
                const len = Math.min(this.endPointer - this.pointer, length);
                buffer.set(this.buffer.subarray(this.pointer, this.pointer + len), index);
                index += len;
                this.pointer += len;
                this.pos += BigInt(len);
                length -= len;
            }
            return index;
        }
        else {
            buffer.set(this.buffer.subarray(this.pointer, this.pointer + length), 0);
            this.pointer += length;
            this.pos += BigInt(length);
            return length;
        }
    }
    /**
     * 读取指定长度的字符串
     *
     * @param length 默认 1
     * @returns
     */
    async readString(length = 1) {
        const buffer = await this.readBuffer(length);
        return _util_text__WEBPACK_IMPORTED_MODULE_1__.decode(buffer);
    }
    /**
     * 读取指定长度的字符串（不会移动读取指针位置）
     *
     * @param length 默认 1
     * @returns
     */
    async peekString(length = 1) {
        const buffer = await this.peekBuffer(length);
        return _util_text__WEBPACK_IMPORTED_MODULE_1__.decode(buffer);
    }
    /**
     * 读取一行字符
     */
    async readLine() {
        let str = '';
        while (true) {
            let got = false;
            for (let i = this.pointer; i < this.endPointer; i++) {
                if (this.buffer[i] === 0x0a || this.buffer[i] === 0x0d) {
                    if (i !== this.pointer) {
                        str += await this.readString(i - this.pointer);
                    }
                    got = true;
                    break;
                }
            }
            if (!got) {
                str += await this.readString(this.remainingLength());
                await this.flush();
            }
            else {
                break;
            }
        }
        let next = await this.peekUint8();
        if (next === 0x0a || next === 0x0d) {
            this.pointer++;
            if (next === 0x0d) {
                next = await this.peekUint8();
                // \r\n
                if (next === 0x0a) {
                    this.pointer++;
                }
            }
        }
        return str;
    }
    /**
     * 读取一行字符（不会移动读取指针位置）
     */
    async peekLine() {
        if (this.remainingLength() < this.size) {
            try {
                await this.flush();
            }
            catch (error) {
                if (this.error !== -1048576 /* IOError.END */) {
                    throw error;
                }
            }
        }
        let str = '';
        let got = false;
        for (let i = this.pointer; i < this.endPointer; i++) {
            if (this.buffer[i] === 0x0a || this.buffer[i] === 0x0d) {
                str += await this.peekString(i - this.pointer);
                got = true;
                break;
            }
        }
        if (!got) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('peekLine, out of buffer', cheap__fileName__0, 659);
        }
        return str;
    }
    /**
     * 获取当前读取指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    /**
     * 获取已读字节偏移
     *
     * @returns
     */
    getPos() {
        return this.pos;
    }
    /**
     * 跳过指定字节长度
     *
     * @param length
     */
    async skip(length) {
        const backup = length;
        while (this.remainingLength() < length) {
            length -= this.remainingLength();
            this.pointer = this.endPointer;
            await this.flush();
        }
        if (this.remainingLength() >= length) {
            this.pointer += length;
        }
        this.pos += BigInt(backup);
    }
    /**
     * 获取剩余可读字节数
     *
     * @returns
     */
    remainingLength() {
        return this.endPointer - this.pointer;
    }
    async flush_(buffer) {
        return new Promise(async (resolve) => {
            this.flushResolve = resolve;
            while (true) {
                const len = await this.onFlush(buffer);
                if (len !== -1048575 /* IOError.AGAIN */) {
                    this.flushResolve = null;
                    resolve(len);
                    break;
                }
                await new _timer_Sleep__WEBPACK_IMPORTED_MODULE_2__["default"](0);
            }
        });
    }
    /**
     * 重新填充剩余缓冲区
     *
     * @param need
     * @returns
     */
    async flush(need = 0) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, flush failed because of no flush callback', cheap__fileName__0, 738);
        }
        if (this.size - this.remainingLength() <= 0) {
            return;
        }
        need = Math.min(need, this.size);
        if (this.pointer < this.endPointer) {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            this.endPointer = this.endPointer - this.pointer;
        }
        else {
            this.endPointer = 0;
        }
        this.pointer = 0;
        if (need) {
            while (this.remainingLength() < need) {
                const len = await this.flush_(this.buffer.subarray(this.endPointer));
                if (len < 0) {
                    this.error = len;
                    throw new Error(`IOReader error, flush ${len === -1048576 /* IOError.END */ ? 'ended' : 'failed'}, ret: ${len}`);
                }
                this.endPointer += len;
            }
        }
        else {
            const len = await this.flush_(this.buffer.subarray(this.endPointer));
            if (len < 0) {
                this.error = len;
                throw new Error(`IOReader error, flush ${len === -1048576 /* IOError.END */ ? 'ended' : 'failed'}, ret: ${len}`);
            }
            this.endPointer += len;
        }
        this.error = 0;
    }
    /**
     *
     * seek 到指定位置
     *
     * @param pos
     * @param force false 时可以在目前的缓冲区内 seek，否则丢弃缓冲区内容重新填充指定位置的数据，默认 false
     * @param flush 指定 seek 之后是否马上填充数据，否则只 seek 到目标位置，默认 true
     * @returns
     */
    async seek(pos, force = false, flush = true) {
        if (!force) {
            const len = Number(pos - this.pos);
            // 可以往回 seek
            if (len < 0 && Math.abs(len) < this.pointer) {
                this.pointer += len;
                this.pos = pos;
                return;
            }
            // 可以直接往后 seek
            else if (len > 0 && this.pointer + len < this.endPointer) {
                this.pointer += len;
                this.pos = pos;
                return;
            }
            else if (len === 0) {
                return;
            }
        }
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, seek failed because of no seek callback', cheap__fileName__0, 809);
        }
        this.pointer = this.endPointer = 0;
        this.pos = pos;
        const ret = await this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('IOReader error, seek failed', cheap__fileName__0, 818);
        }
        if (flush) {
            await this.flush();
        }
    }
    /**
     * 获取缓冲区
     */
    getBuffer() {
        return this.buffer;
    }
    /**
     * 写入数据到缓冲区
     *
     * @param buffer
     */
    appendBuffer(buffer) {
        if (this.size - this.endPointer >= buffer.length) {
            this.buffer.set(buffer, this.endPointer);
            this.endPointer += buffer.length;
        }
        else {
            this.buffer.set(this.buffer.subarray(this.pointer, this.endPointer), 0);
            this.endPointer = this.endPointer - this.pointer;
            this.pointer = 0;
            if (this.size - this.endPointer >= buffer.length) {
                this.buffer.set(buffer, this.endPointer);
                this.endPointer += buffer.length;
            }
            else {
                const len = Math.min(this.size - this.endPointer, buffer.length);
                this.buffer.set(buffer.subarray(0, len), this.endPointer);
                this.endPointer += len;
                _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('IOReader, call appendBuffer but the buffer\'s size is lagger then the remaining size', cheap__fileName__0, 856);
            }
        }
    }
    /**
     * 重置 reader
     */
    reset() {
        this.pointer = this.endPointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    /**
     * 设置读取是小端还是大端
     *
     * @param bigEndian
     */
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    /**
     * 当前读取模式是否是大端
     *
     * @returns
     */
    isBigEndian() {
        return !this.littleEndian;
    }
    /**
     * 获取源总字节长度
     *
     * @returns
     */
    async fileSize() {
        if (this.fileSize_) {
            return this.fileSize_;
        }
        if (!this.onSize) {
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn('IOReader error, fileSize failed because of no onSize callback', cheap__fileName__0, 898);
            return BigInt(0);
        }
        try {
            this.fileSize_ = await this.onSize();
        }
        catch (error) {
            _util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`IOReader error, call fileSize failed: ${error}`, cheap__fileName__0, 905);
            this.fileSize_ = BigInt(0);
        }
        return this.fileSize_;
    }
    /**
     * 获取缓冲区长度
     *
     * @returns
     */
    getBufferSize() {
        return this.size;
    }
    /**
     * 连接到 ioWriter
     *
     * @param ioWriter
     * @param length
     */
    async pipe(ioWriter, length) {
        if (length) {
            if (this.remainingLength() < length) {
                if (this.remainingLength() > 0) {
                    const len = this.remainingLength();
                    await ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                    this.pointer += len;
                    this.pos += BigInt(len);
                    length -= len;
                }
                while (length > 0) {
                    await this.flush();
                    const len = Math.min(this.remainingLength(), length);
                    await ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                    this.pointer += len;
                    this.pos += BigInt(len);
                    length -= len;
                }
            }
            else {
                await ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + length));
                this.pointer += length;
                this.pos += BigInt(length);
            }
        }
        else {
            if (this.remainingLength() > 0) {
                const len = this.remainingLength();
                await ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                this.pointer += len;
                this.pos += BigInt(len);
            }
            while (await this.flush_(this.buffer.subarray(0)) > 0) {
                const len = this.remainingLength();
                await ioWriter.writeBuffer(this.buffer.subarray(this.pointer, this.pointer + len));
                this.pointer += len;
                this.pos += BigInt(len);
            }
        }
    }
    /**
     * 中断 flush 操作
     */
    abort() {
        this.error = -1048572 /* IOError.ABORT */;
        if (this.flushResolve) {
            this.flushResolve(-1048572 /* IOError.ABORT */);
            this.flushResolve = null;
        }
    }
}


/***/ }),

/***/ "./src/common/io/IOWriter.ts":
/*!***********************************!*\
  !*** ./src/common/io/IOWriter.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOWriter)
/* harmony export */ });
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/**
 * 写字节流工具
 */

class IOWriter {
    data;
    buffer;
    pointer;
    pos;
    size;
    littleEndian;
    error;
    onFlush;
    onSeek;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.size = size;
        this.littleEndian = !bigEndian;
        this.error = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 写 8 位无符号整数
     */
    async writeUint8(value) {
        if (this.remainingLength() < 1) {
            await this.flush();
        }
        this.data.setUint8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 读取 16 位无符号整数
     */
    async writeUint16(value) {
        if (this.remainingLength() < 2) {
            await this.flush();
        }
        this.data.setUint16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位无符号整数
     */
    async writeUint24(value) {
        if (this.remainingLength() < 3) {
            await this.flush();
        }
        const high = (value & 0xff0000) >> 16;
        const middle = (value & 0x00ff00) >> 8;
        const low = value & 0x0000ff;
        if (this.littleEndian) {
            await this.writeUint8(low);
            await this.writeUint8(middle);
            await this.writeUint8(high);
        }
        else {
            await this.writeUint8(high);
            await this.writeUint8(middle);
            await this.writeUint8(low);
        }
    }
    /**
     * 写 32 位无符号整数
     */
    async writeUint32(value) {
        if (this.remainingLength() < 4) {
            await this.flush();
        }
        this.data.setUint32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位无符号整数
     */
    async writeUint64(value) {
        if (this.remainingLength() < 8) {
            await this.flush();
        }
        this.data.setBigUint64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    async writeInt8(value) {
        if (this.remainingLength() < 1) {
            await this.flush();
        }
        this.data.setInt8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 写 16 位有符号整数
     */
    async writeInt16(value) {
        if (this.remainingLength() < 2) {
            await this.flush();
        }
        this.data.setInt16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位有符号整数
     */
    async writeInt24(value) {
        await this.writeUint24(value < 0 ? (value + 0x1000000) : value);
    }
    /**
     * 写 32 位有符号整数
     */
    async writeInt32(value) {
        if (this.remainingLength() < 4) {
            await this.flush();
        }
        this.data.setInt32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位有符号整数
     */
    async writeInt64(value) {
        if (this.remainingLength() < 8) {
            await this.flush();
        }
        this.data.setBigInt64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    async writeFloat(value) {
        if (this.remainingLength() < 4) {
            await this.flush();
        }
        this.data.setFloat32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写双精度浮点数
     */
    async writeDouble(value) {
        if (this.remainingLength() < 8) {
            await this.flush();
        }
        this.data.setFloat64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    getPos() {
        return this.pos;
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    async writeBuffer(buffer) {
        if (!buffer.length) {
            return;
        }
        let length = buffer.length;
        if (this.remainingLength() < length) {
            let index = 0;
            while (length > 0) {
                await this.flush();
                const len = Math.min(this.size, length);
                this.buffer.set(buffer.subarray(index, index + len), this.pointer);
                this.pointer += len;
                this.pos += BigInt(len);
                index += len;
                length -= len;
            }
        }
        else {
            this.buffer.set(buffer, this.pointer);
            this.pointer += length;
            this.pos += BigInt(length);
        }
    }
    /**
     * 写一个字符串
     */
    async writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
        await this.writeBuffer(buffer);
        return buffer.length;
    }
    /**
     * 将缓冲区中数据写出
     */
    async flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = await this.onFlush(this.buffer.subarray(0, this.pointer));
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    /**
     * 将缓冲区中数据写出到指定位置
     *
     * @param pos
     */
    async flushToPos(pos) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = await this.onFlush(this.buffer.subarray(0, this.pointer), pos);
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    /**
     * seek 到指定位置
     *
     * @param pos
     */
    async seek(pos) {
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, seek failed because of no seek callback');
        }
        await this.flush();
        const ret = await this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            throw Error('IOWriter error, seek failed');
        }
        this.pos = pos;
    }
    /**
     * 在当前缓冲区映射区间内 seek
     *
     * @param pos
     */
    seekInline(pos) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, Math.min(this.size, pos));
        this.pos += BigInt(this.pointer - pointer);
    }
    /**
     * 跳过指定长度
     *
     * @param length
     */
    skip(length) {
        const pointer = this.pointer;
        this.pointer = Math.min(this.size, this.pointer + length);
        this.pos += BigInt(this.pointer - pointer);
    }
    /**
     * 回退指定长度，不能大于 pointer 大小
     *
     * @param length
     */
    back(length) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, this.pointer - length);
        this.pos += BigInt(this.pointer - pointer);
    }
    /**
     * 获取缓冲区
     *
     * @returns
     */
    getBuffer() {
        return this.buffer.subarray(0, this.pointer);
    }
    /**
     * 设置读取是小端还是大端
     *
     * @param bigEndian
     */
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    /**
     * 重置 writer
     */
    reset() {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    /**
     * 获取缓冲区长度
     *
     * @returns
     */
    getBufferSize() {
        return this.size;
    }
}


/***/ }),

/***/ "./src/common/io/IOWriterSync.ts":
/*!***************************************!*\
  !*** ./src/common/io/IOWriterSync.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IOWriterSync)
/* harmony export */ });
/* harmony import */ var _util_text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/text */ "./src/common/util/text.ts");
/**
 * 写字节流工具
 */

class IOWriterSync {
    data;
    buffer;
    pointer;
    pos;
    size;
    littleEndian;
    error;
    onFlush;
    onSeek;
    /**
     * @param data 待写的 Uint8Array
     * @param bigEndian 是否按大端字节序写，默认大端字节序（网络字节序）
     */
    constructor(size = 1048576, bigEndian = true, map) {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.size = size;
        this.littleEndian = !bigEndian;
        this.error = 0;
        if (map && map.view) {
            this.size = map.length;
            this.buffer = map;
            this.data = map.view;
        }
        else if (map && !map.byteOffset) {
            this.size = map.length;
            this.buffer = map;
            this.data = new DataView(this.buffer.buffer);
        }
        else {
            if (map) {
                throw new Error('not support subarray of ArrayBuffer');
            }
            this.buffer = new Uint8Array(this.size);
            this.data = new DataView(this.buffer.buffer);
        }
    }
    /**
     * 写 8 位无符号整数
     */
    writeUint8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setUint8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 读取 16 位无符号整数
     */
    writeUint16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setUint16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位无符号整数
     */
    writeUint24(value) {
        if (this.remainingLength() < 3) {
            this.flush();
        }
        const high = (value & 0xff0000) >> 16;
        const middle = (value & 0x00ff00) >> 8;
        const low = value & 0x0000ff;
        if (this.littleEndian) {
            this.writeUint8(low);
            this.writeUint8(middle);
            this.writeUint8(high);
        }
        else {
            this.writeUint8(high);
            this.writeUint8(middle);
            this.writeUint8(low);
        }
    }
    /**
     * 写 32 位无符号整数
     */
    writeUint32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setUint32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位无符号整数
     */
    writeUint64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigUint64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写 8 位有符号整数
     *
     * @returns
     */
    writeInt8(value) {
        if (this.remainingLength() < 1) {
            this.flush();
        }
        this.data.setInt8(this.pointer, value);
        this.pointer++;
        this.pos++;
    }
    /**
     * 写 16 位有符号整数
     */
    writeInt16(value) {
        if (this.remainingLength() < 2) {
            this.flush();
        }
        this.data.setInt16(this.pointer, value, this.littleEndian);
        this.pointer += 2;
        this.pos += BigInt(2);
    }
    /**
     * 写 24 位有符号整数
     */
    writeInt24(value) {
        this.writeUint24(value < 0 ? (value + 0x1000000) : value);
    }
    /**
     * 写 32 位有符号整数
     */
    writeInt32(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setInt32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写 64 位有符号整数
     */
    writeInt64(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setBigInt64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 写单精度浮点数
     *
     * @returns
     */
    writeFloat(value) {
        if (this.remainingLength() < 4) {
            this.flush();
        }
        this.data.setFloat32(this.pointer, value, this.littleEndian);
        this.pointer += 4;
        this.pos += BigInt(4);
    }
    /**
     * 写双精度浮点数
     */
    writeDouble(value) {
        if (this.remainingLength() < 8) {
            this.flush();
        }
        this.data.setFloat64(this.pointer, value, this.littleEndian);
        this.pointer += 8;
        this.pos += BigInt(8);
    }
    /**
     * 获取当前写指针
     *
     * @returns
     */
    getPointer() {
        return this.pointer;
    }
    getPos() {
        return this.pos;
    }
    /**
     * 获取剩余可写节数
     *
     * @returns
     */
    remainingLength() {
        return this.size - this.pointer;
    }
    /**
     * 写指定长度的二进制 buffer 数据
     *
     * @param length
     * @returns
     */
    writeBuffer(buffer) {
        if (!buffer.length) {
            return;
        }
        let length = buffer.length;
        if (this.remainingLength() < length) {
            let index = 0;
            while (length > 0) {
                this.flush();
                const len = Math.min(this.size, length);
                this.buffer.set(buffer.subarray(index, index + len), this.pointer);
                this.pointer += len;
                this.pos += BigInt(len);
                index += len;
                length -= len;
            }
        }
        else {
            this.buffer.set(buffer, this.pointer);
            this.pointer += length;
            this.pos += BigInt(length);
        }
    }
    /**
     * 写一个字符串
     */
    writeString(str) {
        const buffer = _util_text__WEBPACK_IMPORTED_MODULE_0__.encode(str);
        this.writeBuffer(buffer);
        return buffer.length;
    }
    /**
     * 将缓冲区中数据写出
     */
    flush() {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer));
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    /**
     * 将缓冲区中数据写出到指定位置
     *
     * @param pos
     */
    flushToPos(pos) {
        if (!this.onFlush) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, flush failed because of no flush callback');
        }
        if (this.pointer) {
            const ret = this.onFlush(this.buffer.subarray(0, this.pointer), pos);
            if (ret !== 0) {
                this.error = ret;
                throw Error('IOWriter error, flush failed');
            }
        }
        this.pointer = 0;
    }
    /**
     * seek 到指定位置
     *
     * @param pos
     */
    seek(pos) {
        if (!this.onSeek) {
            this.error = -1048574 /* IOError.INVALID_OPERATION */;
            throw Error('IOWriter error, seek failed because of no seek callback');
        }
        this.flush();
        const ret = this.onSeek(pos);
        if (ret !== 0) {
            this.error = ret;
            throw Error('IOWriter error, seek failed');
        }
        this.pos = pos;
    }
    /**
     * 在当前缓冲区映射区间内 seek
     *
     * @param pos
     */
    seekInline(pos) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, Math.min(this.size, pos));
        this.pos += BigInt(this.pointer - pointer);
    }
    /**
     * 跳过指定长度
     *
     * @param length
     */
    skip(length) {
        const pointer = this.pointer;
        this.pointer = Math.min(this.size, this.pointer + length);
        this.pos += BigInt(this.pointer - pointer);
    }
    /**
     * 回退指定长度，不能大于 pointer 大小
     *
     * @param length
     */
    back(length) {
        const pointer = this.pointer;
        this.pointer = Math.max(0, this.pointer - length);
        this.pos += BigInt(this.pointer - pointer);
    }
    /**
     * 获取缓冲区
     *
     * @returns
     */
    getBuffer() {
        return this.buffer.subarray(0, this.pointer);
    }
    /**
     * 设置读取是小端还是大端
     *
     * @param bigEndian
     */
    setEndian(bigEndian) {
        this.littleEndian = !bigEndian;
    }
    /**
     * 重置 writer
     */
    reset() {
        this.pointer = 0;
        this.pos = BigInt(0);
        this.error = 0;
    }
    /**
     * 获取缓冲区长度
     *
     * @returns
     */
    getBufferSize() {
        return this.size;
    }
}


/***/ }),

/***/ "./src/common/math/gcd.ts":
/*!********************************!*\
  !*** ./src/common/math/gcd.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gcd)
/* harmony export */ });
/**
 * 计算最大公约数（GCD）
 *
 * @param a
 * @param b
 * @returns
 */
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}


/***/ }),

/***/ "./src/common/util/url.ts":
/*!********************************!*\
  !*** ./src/common/util/url.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildAbsoluteURL: () => (/* binding */ buildAbsoluteURL),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseQuery: () => (/* binding */ parseQuery)
/* harmony export */ });
/* unused harmony exports stringifyQuery, mixin, normalizePath */
/* harmony import */ var _util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/is */ "./src/common/util/is.ts");
/* harmony import */ var _function_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../function/split */ "./src/common/function/split.ts");
/* harmony import */ var _util_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/array */ "./src/common/util/array.ts");
/* harmony import */ var _util_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/object */ "./src/common/util/object.ts");
/**
 * @file url 操作
 */




/**
 * 把查询字符串解析成对象
 * @param queryStr
 */
function parseQuery(queryStr, separator = '&') {
    const result = {};
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.string(queryStr) && queryStr.indexOf('=') >= 0) {
        let firstChar = queryStr.charAt(0);
        let startIndex = (firstChar === '?' || firstChar === '#') ? 1 : 0;
        if (startIndex > 0) {
            queryStr = queryStr.substr(startIndex);
        }
        _util_array__WEBPACK_IMPORTED_MODULE_2__.each((0,_function_split__WEBPACK_IMPORTED_MODULE_1__["default"])(queryStr, separator), (item) => {
            let terms = item.split('=');
            if (terms.length === 2) {
                let key = terms[0]?.trim();
                if (key) {
                    result[key] = decodeURIComponent(terms[1]);
                }
            }
        });
    }
    return result;
}
/**
 * 把对象序列化成查询字符串
 *
 * @param query
 * @return
 */
function stringifyQuery(query, separator = '&') {
    const result = [];
    if (_util_is__WEBPACK_IMPORTED_MODULE_0__.isPlainObject(query)) {
        _util_object__WEBPACK_IMPORTED_MODULE_3__.each(query, (value, key) => {
            result.push(key + '=' + encodeURIComponent(_util_is__WEBPACK_IMPORTED_MODULE_0__.object(value) ? JSON.stringify(value) : value));
        });
    }
    return result.join(separator);
}
/**
 * 解析 url，返回格式遵循 location 属性的命名
 *
 * @param url 如果不传，使用当前地址
 */
function parse(url) {
    const source = url;
    const key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
    const parser = /^(?:(?![^:@\/]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    const ipv6Reg = /:\/\/([^\/@]*@?)\[(\S+)\]/;
    let ipv6Host = '';
    if (ipv6Reg.test(url)) {
        url = url.replace(ipv6Reg, (s0, s1, s2) => {
            ipv6Host = s2;
            return `://${s1 || ''}a.b`;
        });
    }
    const result = {};
    const m = parser.exec(url);
    let i = 14;
    while (i--) {
        result[key[i]] = m[i] ?? '';
    }
    if (ipv6Host) {
        result.host = ipv6Host;
        result.source = source;
        result.authority = ipv6Host + (result.port ? (':' + result.port) : '');
    }
    return {
        protocol: result.protocol,
        file: result.file,
        host: result.host,
        port: result.port,
        user: result.user,
        password: result.password,
        origin: `${result.protocol}://${result.authority}`,
        pathname: result.path,
        search: `?${result.query}`,
        hash: result.anchor ? `#${result.anchor}` : ''
    };
}
/**
 * 把参数混入一个 url
 *
 * @param query
 * @param url
 * @param applyHash
 */
function mixin(query, applyHash, url) {
    if (url == null) {
        url = document.URL;
    }
    let scheme = parse(url);
    let params = parseQuery(applyHash ? scheme.hash : scheme.search);
    _util_object__WEBPACK_IMPORTED_MODULE_3__.extend(params, query);
    let paramStr = _util_object__WEBPACK_IMPORTED_MODULE_3__.param(params);
    url = scheme.origin + scheme.pathname;
    if (applyHash) {
        url += scheme.search;
    }
    else if (paramStr) {
        url += '?' + paramStr;
    }
    if (!applyHash) {
        url += scheme.hash;
    }
    else if (paramStr) {
        url += '#' + paramStr;
    }
    return url;
}
const SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
const SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;
const FIRST_SEGMENT_REGEX = /^(?=([^\/?#]*))\1([^]*)$/;
const URL_REGEX = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/;
function buildURLFromParts(parts) {
    return (parts.scheme +
        parts.netLoc +
        parts.path +
        parts.params +
        parts.query +
        parts.fragment);
}
function parseURL(url) {
    const parts = URL_REGEX.exec(url);
    if (!parts) {
        return null;
    }
    return {
        scheme: parts[1] || '',
        netLoc: parts[2] || '',
        path: parts[3] || '',
        params: parts[4] || '',
        query: parts[5] || '',
        fragment: parts[6] || ''
    };
}
function normalizePath(path) {
    // The following operations are
    // then applied, in order, to the new path:
    // 6a) All occurrences of "./", where "." is a complete path
    // segment, are removed.
    // 6b) If the path ends with "." as a complete path segment,
    // that "." is removed.
    path = path.split('').reverse().join('').replace(SLASH_DOT_REGEX, '');
    // 6c) All occurrences of "<segment>/../", where <segment> is a
    // complete path segment not equal to "..", are removed.
    // Removal of these path segments is performed iteratively,
    // removing the leftmost matching pattern on each iteration,
    // until no matching pattern remains.
    // 6d) If the path ends with "<segment>/..", where <segment> is a
    // complete path segment not equal to "..", that
    // "<segment>/.." is removed.
    while (path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, '')).length) { }
    return path.split('').reverse().join('');
}
/**
 * from https://github.com/tjenkinson/url-toolkit
 *
 */
function buildAbsoluteURL(baseURL, relativeURL, opts) {
    opts = opts || {};
    // remove any remaining space and CRLF
    baseURL = baseURL.trim();
    relativeURL = relativeURL.trim();
    if (!relativeURL) {
        // 2a) If the embedded URL is entirely empty, it inherits the
        // entire base URL (i.e., is set equal to the base URL)
        // and we are done.
        if (!opts.alwaysNormalize) {
            return baseURL;
        }
        let basePartsForNormalize = parseURL(baseURL);
        if (!basePartsForNormalize) {
            throw new Error('Error trying to parse base URL.');
        }
        basePartsForNormalize.path = normalizePath(basePartsForNormalize.path);
        return buildURLFromParts(basePartsForNormalize);
    }
    let relativeParts = parseURL(relativeURL);
    if (!relativeParts) {
        throw new Error('Error trying to parse relative URL.');
    }
    if (relativeParts.scheme) {
        // 2b) If the embedded URL starts with a scheme name, it is
        // interpreted as an absolute URL and we are done.
        if (!opts.alwaysNormalize) {
            return relativeURL;
        }
        relativeParts.path = normalizePath(relativeParts.path);
        return buildURLFromParts(relativeParts);
    }
    let baseParts = parseURL(baseURL);
    if (!baseParts) {
        throw new Error('Error trying to parse base URL.');
    }
    if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== '/') {
        // If netLoc missing and path doesn't start with '/', assume everything before the first '/' is the netLoc
        // This causes 'example.com/a' to be handled as '//example.com/a' instead of '/example.com/a'
        let pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
        baseParts.netLoc = pathParts[1];
        baseParts.path = pathParts[2];
    }
    if (baseParts.netLoc && !baseParts.path) {
        baseParts.path = '/';
    }
    const builtParts = {
        // 2c) Otherwise, the embedded URL inherits the scheme of
        // the base URL.
        scheme: baseParts.scheme,
        netLoc: relativeParts.netLoc,
        path: null,
        params: relativeParts.params,
        query: relativeParts.query,
        fragment: relativeParts.fragment,
    };
    if (!relativeParts.netLoc) {
        // 3) If the embedded URL's <net_loc> is non-empty, we skip to
        // Step 7.  Otherwise, the embedded URL inherits the <net_loc>
        // (if any) of the base URL.
        builtParts.netLoc = baseParts.netLoc;
        // 4) If the embedded URL path is preceded by a slash "/", the
        // path is not relative and we skip to Step 7.
        if (relativeParts.path[0] !== '/') {
            if (!relativeParts.path) {
                // 5) If the embedded URL path is empty (and not preceded by a
                // slash), then the embedded URL inherits the base URL path
                builtParts.path = baseParts.path;
                // 5a) if the embedded URL's <params> is non-empty, we skip to
                // step 7; otherwise, it inherits the <params> of the base
                // URL (if any) and
                if (!relativeParts.params) {
                    builtParts.params = baseParts.params;
                    // 5b) if the embedded URL's <query> is non-empty, we skip to
                    // step 7; otherwise, it inherits the <query> of the base
                    // URL (if any) and we skip to step 7.
                    if (!relativeParts.query) {
                        builtParts.query = baseParts.query;
                    }
                }
            }
            else {
                // 6) The last segment of the base URL's path (anything
                // following the rightmost slash "/", or the entire path if no
                // slash is present) is removed and the embedded URL's path is
                // appended in its place.
                let baseURLPath = baseParts.path;
                let newPath = baseURLPath.substring(0, baseURLPath.lastIndexOf('/') + 1) +
                    relativeParts.path;
                builtParts.path = normalizePath(newPath);
            }
        }
    }
    if (builtParts.path === null) {
        builtParts.path = opts.alwaysNormalize
            ? normalizePath(relativeParts.path)
            : relativeParts.path;
    }
    return buildURLFromParts(builtParts);
}


/***/ })

}]);
//# sourceMappingURL=src_avnetwork_ioLoader_RtmpIOLoader_ts.avplayer.js.map