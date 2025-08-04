"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_flv_FlvHeader_ts-src_avformat_formats_flv_FlvScriptTag_ts"],{

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
/* harmony export */   isEnhancedCodecId: () => (/* binding */ isEnhancedCodecId),
/* harmony export */   writeAudioHeader: () => (/* binding */ writeAudioHeader),
/* harmony export */   writeTag: () => (/* binding */ writeTag),
/* harmony export */   writeVideoHeader: () => (/* binding */ writeVideoHeader)
/* harmony export */ });
/* unused harmony export updateSize */
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_flv_FlvHeader_ts-src_avformat_formats_flv_FlvScriptTag_ts.avtranscoder.js.map