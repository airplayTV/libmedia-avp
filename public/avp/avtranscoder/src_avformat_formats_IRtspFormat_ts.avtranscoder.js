"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IRtspFormat_ts"],{

/***/ "./src/avformat/bsf/AVBSFilter.ts":
/*!****************************************!*\
  !*** ./src/avformat/bsf/AVBSFilter.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AVBSFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var avutil_struct_avcodecparameters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/struct/avcodecparameters */ "./src/avutil/struct/avcodecparameters.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/codecparameters */ "./src/avutil/util/codecparameters.ts");




class AVBSFilter {
    inCodecpar;
    inTimeBase;
    outCodecpar;
    init(codecpar, timeBase) {
        this.inCodecpar = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_2__.avMallocz)(168);
        (0,avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__.copyCodecParameters)(this.inCodecpar, codecpar);
        this.inTimeBase = {
            den: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](timeBase + 4),
            num: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](timeBase)
        };
        return 0;
    }
    destroy() {
        if (this.inCodecpar) {
            (0,avutil_util_codecparameters__WEBPACK_IMPORTED_MODULE_3__.freeCodecParameters)(this.inCodecpar);
            this.inCodecpar = 0;
        }
    }
}


/***/ }),

/***/ "./src/avformat/bsf/ac3/Ac32RawFilter.ts":
/*!***********************************************!*\
  !*** ./src/avformat/bsf/ac3/Ac32RawFilter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ac32RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _codecs_ac3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../codecs/ac3 */ "./src/avformat/codecs/ac3.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\ac3\\Ac32RawFilter.ts";













class Ac32RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    caches;
    cache;
    lastDts;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
        let buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)).slice();
        let firstGot = false;
        let hasCache = !!this.cache;
        if (hasCache) {
            buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__["default"])(Uint8Array, [this.cache, buffer]);
            this.cache = null;
        }
        while (i < buffer.length) {
            if (i > buffer.length - 10) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                return 0;
            }
            const info = _codecs_ac3__WEBPACK_IMPORTED_MODULE_10__.parseHeader(buffer.subarray(i));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_12__.number(info)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error('parse ac3 header failed', cheap__fileName__4, 84);
                return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
            }
            const item = {
                dts: lastDts,
                buffer: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE,
            };
            let frameLength = info.frameSize;
            item.buffer = buffer.subarray(i, i + frameLength);
            if (i + frameLength > buffer.length) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                return 0;
            }
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__.avRescaleQ)(BigInt(1536 / info.sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE), avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE_Q, this.inTimeBase);
            item.duration = Number(duration);
            this.caches.push(item);
            i += frameLength;
            lastDts += duration;
            if (!firstGot && hasCache) {
                firstGot = true;
                lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
            }
        }
        this.lastDts = BigInt(0);
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.EOF;
        }
    }
    reset() {
        this.cache = null;
        this.lastDts = BigInt(0);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/bsf/mp3/Mp32RawFilter.ts":
/*!***********************************************!*\
  !*** ./src/avformat/bsf/mp3/Mp32RawFilter.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mp32RawFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../formats/mp3/frameHeader */ "./src/avformat/formats/mp3/frameHeader.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
var cheap__fileName__4 = "src\\avformat\\bsf\\mp3\\Mp32RawFilter.ts";













class Mp32RawFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    frameHeader;
    caches;
    cache;
    lastDts;
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.caches = [];
        this.frameHeader = new _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__.FrameHeader();
        return 0;
    }
    sendAVPacket(avpacket) {
        let i = 0;
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
        let buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)).slice();
        let firstGot = false;
        let hasCache = !!this.cache;
        if (hasCache) {
            buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_12__["default"])(Uint8Array, [this.cache, buffer]);
            this.cache = null;
        }
        while (i < buffer.length) {
            const syncWord = (buffer[i] << 4) | ((buffer[i + 1] >> 4) & 0x0e);
            if (syncWord !== 0xFFE) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error(`found syncWord not 0xFFE, got: 0x${syncWord.toString(16)}`, cheap__fileName__4, 82);
                return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
            }
            const ver = (buffer[1] >>> 3) & 0x03;
            // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
            const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
            const item = {
                dts: lastDts,
                buffer: null,
                extradata: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE,
            };
            const sampleRate = _codecs_mp3__WEBPACK_IMPORTED_MODULE_11__.getSampleRateByVersionIndex(ver, samplingFreqIndex);
            _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__.parse(this.frameHeader, (buffer[i] << 24) | (buffer[i + 1] << 16) | (buffer[i + 2] << 8) | buffer[i + 3]);
            let frameLength = _formats_mp3_frameHeader__WEBPACK_IMPORTED_MODULE_10__.getFrameLength(this.frameHeader, sampleRate);
            item.buffer = buffer.subarray(i, i + frameLength);
            if (i + frameLength > buffer.length) {
                this.cache = buffer.subarray(i);
                this.lastDts = lastDts;
                break;
            }
            const duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_7__.avRescaleQ)(BigInt(Math.floor(frameLength / sampleRate * avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE)), avutil_constant__WEBPACK_IMPORTED_MODULE_6__.AV_TIME_BASE_Q, this.inTimeBase);
            item.duration = Number(duration);
            this.caches.push(item);
            i += frameLength;
            lastDts += duration;
            if (!firstGot && hasCache) {
                firstGot = true;
                lastDts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8);
            }
        }
        this.lastDts = BigInt(0);
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.caches.length) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.unrefAVPacket)(avpacket);
            const item = this.caches.shift();
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_8__.avMalloc)(item.buffer.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_3__.memcpyFromUint8Array)(data, item.buffer.length, item.buffer);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_9__.addAVPacketData)(avpacket, data, item.buffer.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, item.dts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, item.dts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 48, BigInt(Math.floor(item.duration)));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_5__.EOF;
        }
    }
    reset() {
        this.cache = null;
        this.lastDts = BigInt(0);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/codecs/aac.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/aac.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   MPEG4SamplingFrequencyIndex: () => (/* binding */ MPEG4SamplingFrequencyIndex),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   getAVCodecParameters: () => (/* binding */ getAVCodecParameters),
/* harmony export */   parseADTSHeader: () => (/* binding */ parseADTSHeader),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseLATMHeader: () => (/* binding */ parseLATMHeader)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencies, MPEG4Channels */
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/*
 * libmedia aac util
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


const AACProfile2Name = {
    [1 /* MPEG4AudioObjectTypes.AAC_MAIN */]: 'Main',
    [2 /* MPEG4AudioObjectTypes.AAC_LC */]: 'LC',
    [3 /* MPEG4AudioObjectTypes.AAC_SSR */]: 'LC',
    [4 /* MPEG4AudioObjectTypes.AAC_LTP */]: 'LC',
    [5 /* MPEG4AudioObjectTypes.AAC_SBR */]: 'HE',
    [6 /* MPEG4AudioObjectTypes.AAC_SCALABLE */]: 'HE'
};
const MPEG4SamplingFrequencyIndex = {
    96000: 0,
    88200: 1,
    64000: 2,
    48000: 3,
    44100: 4,
    32000: 5,
    24000: 6,
    22050: 7,
    16000: 8,
    12000: 9,
    11025: 10,
    8000: 11,
    7350: 12
};
const MPEG4SamplingFrequencies = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE
];
const MPEG4Channels = [
    avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    1,
    2,
    3,
    4,
    5,
    6,
    7
];
/**
 * 解析 AAC AudioSpecificConfig
 *
 *             frequency
 *              44100Hz        fill bit
 *               4 bit          3 bit
 *              -------         -----
 *    0 0 0 1 0 0 1 0 0 0 0 1 0 0 0 0
 *    ---------         -------
 *      5 bit            4 bit
 *     AAC LC           fl, fr
 *    profile           channel
 *
 * url: https://wiki.multimedia.cx/index.php/MPEG-4_Audio#Audio_Specific_Config
 *
 */
function getAVCodecParameters(extradata) {
    let profile = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let sampleRate = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let channels = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    if (extradata.length >= 2) {
        profile = (extradata[0] >> 3) & 0x1f;
        sampleRate = MPEG4SamplingFrequencies[((extradata[0] & 0x07) << 1)
            | (extradata[1] >> 7)] ?? 48000;
        channels = MPEG4Channels[(extradata[1] >> 3) & 0x0f] ?? 2;
    }
    return {
        profile,
        sampleRate,
        channels
    };
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata) {
        const { profile, sampleRate, channels } = getAVCodecParameters(extradata);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channels;
    }
}
function avCodecParameters2Extradata(codecpar) {
    const samplingFreqIndex = MPEG4SamplingFrequencyIndex[codecpar.sampleRate];
    const channelConfig = codecpar.chLayout.nbChannels;
    const extradata = new Uint8Array(2);
    extradata[0] = ((codecpar.profile & 0x1f) << 3) | ((samplingFreqIndex & 0x0e) >> 1);
    extradata[1] = ((samplingFreqIndex & 0x01) << 7) | ((channelConfig & 0x0f) << 3);
    return extradata;
}
/**
 *
 * adts 封装转 raw
 *
 * bits
 * - 12  syncword
 * - 1   ID (MPEG 标识位，固定为 1)
 * - 2   Layer ( 固定为 0)
 * - 1   Protection Absent ( 指示是否有 CRC 校验，1 表示没有校验）
 * - 2   Profile
 * - 4   Sampling Frequency Index ( 采样率的索引）
 * - 1   Private Bit ( 保留位，一般设置为 0)
 * - 3   Channel Configuration ( 音频通道数）
 * - 1   Original Copy ( 原始拷贝标志位，一般设置为 0)
 * - 1   Home ( 保留位，一般设置为 0)
 * - 1   Copyright Identification Bit（置 0）
 * - 1   Copyright Identification Start（置 0）
 * - 13  Frame Length ( 帧长度，包括 ADTS 头和音频帧数据的长度）
 * - 11  Buffer Fullness ( 缓冲区满度，可用于音频流的同步）
 * - 2   Number of Raw Data Blocks in Frame ( 帧中原始数据块的数量）
 * - 16  CRC (Protection Absent 控制）
 * - N  raw aac data
 *
 */
function parseADTSHeader(buffer) {
    if (buffer.length < 7) {
        return -1;
    }
    const syncWord = (buffer[0] << 4) | (buffer[1] >> 4);
    if (syncWord !== 0xFFF) {
        return -1;
    }
    /*
      * const id = (buffer[1] & 0x08) >>> 3
      * const layer = (buffer[1] & 0x06) >>> 1
      */
    const protectionAbsent = buffer[1] & 0x01;
    const profile = (buffer[2] & 0xC0) >>> 6;
    const samplingFrequencyIndex = (buffer[2] & 0x3C) >>> 2;
    const channelConfiguration = ((buffer[2] & 0x01) << 2) | ((buffer[3] & 0xC0) >>> 6);
    // adts_variable_header()
    const aacFrameLength = ((buffer[3] & 0x03) << 11)
        | (buffer[4] << 3)
        | ((buffer[5] & 0xE0) >>> 5);
    const numberOfRawDataBlocksInFrame = buffer[6] & 0x03;
    let headerLength = protectionAbsent === 1 ? 7 : 9;
    let framePayloadLength = aacFrameLength - headerLength;
    return {
        syncWord,
        profile: profile + 1,
        sampleRate: MPEG4SamplingFrequencies[samplingFrequencyIndex],
        channels: MPEG4Channels[channelConfiguration],
        aacFrameLength,
        numberOfRawDataBlocksInFrame,
        headerLength,
        framePayloadLength
    };
}
function parseLATMHeader(buffer, bitReader) {
    if (!bitReader) {
        bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        bitReader.appendBuffer(buffer);
    }
    function getLATMValue() {
        const bytesForValue = bitReader.readU(2);
        let value = 0;
        for (let i = 0; i <= bytesForValue; i++) {
            value = value << 8;
            value = value | bitReader.readU(8);
        }
        return value;
    }
    const now = bitReader.getPointer();
    const info = {
        syncWord: 0,
        profile: 0,
        sampleRate: 0,
        channels: 0,
        useSameStreamMux: false,
        headerLength: 0,
        framePayloadLength: 0,
        muxLengthBytes: 0
    };
    const syncWord = bitReader.readU(11);
    if (syncWord !== 0x2B7) {
        return -1;
    }
    info.syncWord = syncWord;
    info.muxLengthBytes = bitReader.readU(13);
    const useSameStreamMux = bitReader.readU1() === 0x01;
    info.useSameStreamMux = useSameStreamMux;
    if (!useSameStreamMux) {
        const audioMuxVersion = bitReader.readU1() === 0x01;
        const audioMuxVersionA = audioMuxVersion && bitReader.readU1() === 0x01;
        if (audioMuxVersionA) {
            return -1;
        }
        if (audioMuxVersion) {
            getLATMValue();
        }
        const allStreamsSameTimeFraming = bitReader.readU1() === 0x01;
        if (!allStreamsSameTimeFraming) {
            return -1;
        }
        const numSubFrames = bitReader.readU(6);
        if (numSubFrames !== 0) {
            return -1;
        }
        const numProgram = bitReader.readU(4);
        if (numProgram !== 0) {
            return -1;
        }
        const numLayer = bitReader.readU(3);
        if (numLayer !== 0) {
            return -1;
        }
        let fillBits = audioMuxVersion ? getLATMValue() : 0;
        const audioObjectType = bitReader.readU(5);
        fillBits -= 5;
        const samplingFreqIndex = bitReader.readU(4);
        fillBits -= 4;
        const channelConfig = bitReader.readU(4);
        fillBits -= 4;
        bitReader.readU(3);
        fillBits -= 3;
        if (fillBits > 0) {
            bitReader.readU(fillBits);
        }
        const frameLengthType = bitReader.readU(3);
        if (frameLengthType === 0) {
            bitReader.readU(8);
        }
        else {
            return -1;
        }
        const otherDataPresent = bitReader.readU1() === 0x01;
        if (otherDataPresent) {
            if (audioMuxVersion) {
                getLATMValue();
            }
            else {
                let otherDataLenBits = 0;
                while (true) {
                    otherDataLenBits = otherDataLenBits << 8;
                    const otherDataLenEsc = bitReader.readU1() === 0x01;
                    const otherDataLenTmp = bitReader.readU(8);
                    otherDataLenBits += otherDataLenTmp;
                    if (!otherDataLenEsc) {
                        break;
                    }
                }
            }
        }
        const crcCheckPresent = bitReader.readU1() === 0x01;
        if (crcCheckPresent) {
            bitReader.readU(8);
        }
        info.profile = audioObjectType + 1;
        info.sampleRate = MPEG4SamplingFrequencies[samplingFreqIndex];
        info.channels = MPEG4Channels[channelConfig];
    }
    let length = 0;
    while (true) {
        const tmp = bitReader.readU(8);
        length += tmp;
        if (tmp !== 0xff) {
            break;
        }
    }
    info.framePayloadLength = length;
    info.headerLength = bitReader.getPointer() - now + (bitReader.getBitLeft() === 8 ? 0 : 1);
    return info;
}


/***/ }),

/***/ "./src/avformat/codecs/ac3.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/ac3.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AC3ChannelLayout: () => (/* binding */ AC3ChannelLayout),
/* harmony export */   parseHeader: () => (/* binding */ parseHeader)
/* harmony export */ });
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/*
 * libmedia ac3 util
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

const AC3ChannelLayout = [
    3 /* AV_CH_LAYOUT.AV_CH_LAYOUT_STEREO */,
    4 /* AV_CH_LAYOUT.AV_CH_LAYOUT_MONO */,
    3 /* AV_CH_LAYOUT.AV_CH_LAYOUT_STEREO */,
    7 /* AV_CH_LAYOUT.AV_CH_LAYOUT_SURROUND */,
    259 /* AV_CH_LAYOUT.AV_CH_LAYOUT_2_1 */,
    263 /* AV_CH_LAYOUT.AV_CH_LAYOUT_4POINT0 */,
    1539 /* AV_CH_LAYOUT.AV_CH_LAYOUT_2_2 */,
    1543 /* AV_CH_LAYOUT.AV_CH_LAYOUT_5POINT0 */
];
const AC3FrameSizeTab = [
    [64, 69, 96],
    [64, 70, 96],
    [80, 87, 120],
    [80, 88, 120],
    [96, 104, 144],
    [96, 105, 144],
    [112, 121, 168],
    [112, 122, 168],
    [128, 139, 192],
    [128, 140, 192],
    [160, 174, 240],
    [160, 175, 240],
    [192, 208, 288],
    [192, 209, 288],
    [224, 243, 336],
    [224, 244, 336],
    [256, 278, 384],
    [256, 279, 384],
    [320, 348, 480],
    [320, 349, 480],
    [384, 417, 576],
    [384, 418, 576],
    [448, 487, 672],
    [448, 488, 672],
    [512, 557, 768],
    [512, 558, 768],
    [640, 696, 960],
    [640, 697, 960],
    [768, 835, 1152],
    [768, 836, 1152],
    [896, 975, 1344],
    [896, 976, 1344],
    [1024, 1114, 1536],
    [1024, 1115, 1536],
    [1152, 1253, 1728],
    [1152, 1254, 1728],
    [1280, 1393, 1920],
    [1280, 1394, 1920],
];
const CenterLevelsTab = [4, 5, 6, 5];
const SurroundLevelsTab = [4, 6, 7, 6];
const AC3SampleRateTab = [48000, 44100, 32000, 0];
const AC3BitrateTab = [
    32, 40, 48, 56, 64, 80, 96, 112, 128,
    160, 192, 224, 256, 320, 384, 448, 512, 576, 640
];
const AC3ChannelsTab = [
    2, 1, 2, 3, 3, 4, 4, 5
];
const EAC3Blocks = [
    1, 2, 3, 6
];
const AC3_HEADER_SIZE = 7;
function parseHeader(buf) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_0__["default"](buf.length);
    bitReader.appendBuffer(buf);
    const info = {
        syncWord: 0,
        crc1: 0,
        srCode: 0,
        bitstreamId: 0,
        bitstreamMode: 0,
        channelMode: 0,
        lfeOn: 0,
        frameType: 0,
        substreamId: 0,
        centerMixLevel: 0,
        surroundMixLevel: 0,
        channelMap: 0,
        numBlocks: 0,
        dolbySurroundMode: 0,
        srShift: 0,
        sampleRate: 0,
        bitrate: 0,
        channels: 0,
        frameSize: 0,
        channelLayout: BigInt(0),
        ac3BitrateCode: 0
    };
    info.syncWord = bitReader.readU(16);
    if (info.syncWord !== 0x0B77) {
        return -1;
    }
    info.bitstreamId = bitReader.peekU(29) & 0x1f;
    if (info.bitstreamId > 16) {
        return -2;
    }
    info.numBlocks = 6;
    info.ac3BitrateCode = -1;
    info.centerMixLevel = 5;
    info.surroundMixLevel = 6;
    info.dolbySurroundMode = 0 /* AC3DolbySurroundMode.AC3_DSURMOD_NOTINDICATED */;
    if (info.bitstreamId <= 10) {
        info.crc1 = bitReader.readU(16);
        info.srCode = bitReader.readU(2);
        if (info.srCode === 3) {
            return -3;
        }
        const frameSizeCode = bitReader.readU(6);
        if (frameSizeCode > 37) {
            return -4;
        }
        info.ac3BitrateCode = (frameSizeCode >> 1);
        bitReader.readU(5);
        info.bitstreamMode = bitReader.readU(3);
        info.channelMode = bitReader.readU(3);
        if (info.channelMode == 2 /* AC3ChannelMode.AC3_CHMODE_STEREO */) {
            info.dolbySurroundMode = bitReader.readU(2);
        }
        else {
            if ((info.channelMode & 1) && info.channelMode != 1 /* AC3ChannelMode.AC3_CHMODE_MONO */) {
                info.centerMixLevel = CenterLevelsTab[bitReader.readU(2)];
            }
            if (info.channelMode & 4) {
                info.surroundMixLevel = SurroundLevelsTab[bitReader.readU(2)];
            }
        }
        info.lfeOn = bitReader.readU(1);
        info.srShift = Math.max(info.bitstreamId, 8) - 8;
        info.sampleRate = AC3SampleRateTab[info.srCode] >> info.srShift;
        info.bitrate = (AC3BitrateTab[info.ac3BitrateCode] * 1000) >> info.srShift;
        info.channels = AC3ChannelsTab[info.channelMode] + info.lfeOn;
        info.frameSize = AC3FrameSizeTab[frameSizeCode][info.srCode] * 2;
        info.frameType = 2 /* EAC3FrameType.EAC3_FRAME_TYPE_AC3_CONVERT */;
        info.substreamId = 0;
    }
    else {
        /* Enhanced AC-3 */
        info.crc1 = 0;
        info.frameType = bitReader.readU(2);
        if (info.frameType == 3 /* EAC3FrameType.EAC3_FRAME_TYPE_RESERVED */) {
            return -5;
        }
        info.substreamId = bitReader.readU(3);
        info.frameSize = (bitReader.readU(11) + 1) << 1;
        if (info.frameSize < AC3_HEADER_SIZE) {
            return -6;
        }
        info.srCode = bitReader.readU(2);
        if (info.srCode == 3) {
            const srCode2 = bitReader.readU(2);
            if (srCode2 == 3) {
                return -7;
            }
            info.sampleRate = AC3SampleRateTab[srCode2] / 2;
            info.srShift = 1;
        }
        else {
            info.numBlocks = EAC3Blocks[bitReader.readU(2)];
            info.sampleRate = AC3SampleRateTab[info.srCode];
            info.srShift = 0;
        }
        info.channelMode = bitReader.readU(3);
        info.lfeOn = bitReader.readU(1);
        info.bitrate = 8 * info.frameSize * info.sampleRate / (info.numBlocks * 256);
        info.channels = AC3ChannelsTab[info.channelMode] + info.lfeOn;
    }
    info.channelLayout = BigInt(AC3ChannelLayout[info.channelMode]);
    if (info.lfeOn) {
        info.channelLayout |= BigInt(8 /* AV_CH_LAYOUT.AV_CH_LOW_FREQUENCY */);
    }
    return info;
}


/***/ }),

/***/ "./src/avformat/codecs/mp3.ts":
/*!************************************!*\
  !*** ./src/avformat/codecs/mp3.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MP3Profile2Name: () => (/* binding */ MP3Profile2Name),
/* harmony export */   getBitRateByVersionLayerIndex: () => (/* binding */ getBitRateByVersionLayerIndex),
/* harmony export */   getFrameSizeByVersionLayer: () => (/* binding */ getFrameSizeByVersionLayer),
/* harmony export */   getProfileByLayer: () => (/* binding */ getProfileByLayer),
/* harmony export */   getSampleRateByVersionIndex: () => (/* binding */ getSampleRateByVersionIndex),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia mp3 util
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

const MpegAudioV10SampleRateTable = [44100, 48000, 32000, 0];
const MpegAudioV20SampleRateTable = [22050, 24000, 16000, 0];
const MpegAudioV25SampleRateTable = [11025, 12000, 8000, 0];
const MpegAudioV10FrameSizeTable = [0, 1152, 1152, 384];
const MpegAudioV20FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV25FrameSizeTable = [0, 576, 1152, 384];
const MpegAudioV1L1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1];
const MpegAudioV1L2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1];
const MpegAudioV1L3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1];
const MpegAudioV2L1BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, -1];
const MpegAudioV2L2L3BitRateTable = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1];
function getSampleRateByVersionIndex(version, samplingFreqIndex) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25SampleRateTable[samplingFreqIndex];
        case 2:
            // MPEG 2
            return MpegAudioV20SampleRateTable[samplingFreqIndex];
        case 3:
            // MPEG 1
            return MpegAudioV10SampleRateTable[samplingFreqIndex];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getFrameSizeByVersionLayer(version, layer) {
    switch (version) {
        case 0:
            // MPEG 2.5
            return MpegAudioV25FrameSizeTable[layer];
        case 2:
            // MPEG 2
            return MpegAudioV20FrameSizeTable[layer];
        case 3:
            // MPEG 1
            return MpegAudioV10FrameSizeTable[layer];
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getBitRateByVersionLayerIndex(version, layer, index) {
    switch (layer) {
        // layer3
        case 1:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L3BitRateTable[index];
            }
            break;
        // layer2
        case 2:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L2L3BitRateTable[index];
                case 3:
                    return MpegAudioV1L2BitRateTable[index];
            }
        // layer1
        case 3:
            switch (version) {
                case 0:
                case 2:
                    return MpegAudioV2L1BitRateTable[index];
                case 3:
                    return MpegAudioV1L1BitRateTable[index];
            }
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
function getProfileByLayer(layer) {
    switch (layer) {
        case 1:
            // Layer 3
            return 34;
        case 2:
            // Layer 2
            return 33;
        case 3:
            // Layer 1
            return 32;
    }
    return avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
}
const MP3Profile2Name = {
    [32 /* MP3Profile.Layer1 */]: 'Layer1',
    [33 /* MP3Profile.Layer2 */]: 'Layer2',
    [34 /* MP3Profile.Layer3 */]: 'Layer3'
};
function parseAVCodecParameters(stream, buffer) {
    if (buffer && buffer.length >= 4) {
        const ver = (buffer[1] >>> 3) & 0x03;
        const layer = (buffer[1] & 0x06) >> 1;
        // const bitrateIndex = (buffer[2] & 0xF0) >>> 4
        const samplingFreqIndex = (buffer[2] & 0x0C) >>> 2;
        const channelMode = (buffer[3] >>> 6) & 0x03;
        const channelCount = channelMode !== 3 ? 2 : 1;
        const profile = getProfileByLayer(layer);
        const sampleRate = getSampleRateByVersionIndex(ver, samplingFreqIndex);
        stream.codecpar.profile = profile;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channelCount;
    }
}


/***/ }),

/***/ "./src/avformat/formats/IFormat.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/IFormat.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFormat)
/* harmony export */ });
/*
 * libmedia abstract format decoder
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
class IFormat {
    type = -1 /* AVFormat.UNKNOWN */;
    onStreamAdd;
    async destroy(formatContext) { }
}


/***/ }),

/***/ "./src/avformat/formats/IRtspFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/IRtspFormat.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IRtspFormat)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _avutil_struct_rational_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./..\..\avutil\struct\rational.ts */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var avutil_struct_avpacket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/struct/avpacket */ "./src/avutil/struct/avpacket.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avprotocol_rtsp_RtspSession__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avprotocol/rtsp/RtspSession */ "./src/avprotocol/rtsp/RtspSession.ts");
/* harmony import */ var avprotocol_libsdp_libsdp__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avprotocol/libsdp/libsdp */ "./src/avprotocol/libsdp/libsdp.ts");
/* harmony import */ var avutil_util_ntp__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/util/ntp */ "./src/avutil/util/ntp.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/* harmony import */ var avprotocol_rtp_rtp__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avprotocol/rtp/rtp */ "./src/avprotocol/rtp/rtp.ts");
/* harmony import */ var avprotocol_rtp_RTPFrameQueue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! avprotocol/rtp/RTPFrameQueue */ "./src/avprotocol/rtp/RTPFrameQueue.ts");
/* harmony import */ var avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avprotocol/rtp/depacketizer */ "./src/avprotocol/rtp/depacketizer.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avprotocol_rtcp_isRtcp__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! avprotocol/rtcp/isRtcp */ "./src/avprotocol/rtcp/isRtcp.ts");
/* harmony import */ var avprotocol_rtp_isRtp__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! avprotocol/rtp/isRtp */ "./src/avprotocol/rtp/isRtp.ts");
/* harmony import */ var avprotocol_rtp_parser__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! avprotocol/rtp/parser */ "./src/avprotocol/rtp/parser.ts");
/* harmony import */ var avprotocol_rtcp_parser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! avprotocol/rtcp/parser */ "./src/avprotocol/rtcp/parser.ts");
/* harmony import */ var avformat_bsf_mp3_Mp32RawFilter__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! avformat/bsf/mp3/Mp32RawFilter */ "./src/avformat/bsf/mp3/Mp32RawFilter.ts");
/* harmony import */ var avprotocol_rtp_fmtp__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! avprotocol/rtp/fmtp */ "./src/avprotocol/rtp/fmtp.ts");
/* harmony import */ var avformat_bsf_ac3_Ac32RawFilter__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! avformat/bsf/ac3/Ac32RawFilter */ "./src/avformat/bsf/ac3/Ac32RawFilter.ts");
var cheap__fileName__0 = "src\\avformat\\formats\\IRtspFormat.ts";































class IRtspFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_9__["default"] {
    type = 6 /* AVFormat.RTSP */;
    rtspSession;
    options;
    context;
    cacheAVPacket;
    constructor(options) {
        super();
        this.options = options;
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
        this.rtspSession = new avprotocol_rtsp_RtspSession__WEBPACK_IMPORTED_MODULE_12__["default"](this.options.uri, formatContext.ioReader, formatContext.ioWriter);
        this.context = {
            sessionId: '',
            canOutputPacket: true
        };
        this.cacheAVPacket = 0;
    }
    async readHeader(formatContext) {
        try {
            let response = await this.rtspSession.options();
            if (response.statusCode !== 200) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
            }
            response = await this.rtspSession.describe();
            if (response.statusCode !== 200) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(`describe failed, ${JSON.stringify(response)}`, cheap__fileName__0, 139);
                return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
            }
            const sdpDes = avprotocol_libsdp_libsdp__WEBPACK_IMPORTED_MODULE_13__.parse(response.context);
            let trackId = 1;
            let interleaved = 0;
            for (let i = 0; i < sdpDes.media.length; i++) {
                if (!sdpDes.media[i].rtp.length) {
                    continue;
                }
                const stream = formatContext.createStream();
                const staticPayloadCodec = avprotocol_rtp_rtp__WEBPACK_IMPORTED_MODULE_17__.StaticRTPPayloadCodec.find((codec) => {
                    return codec.payload === sdpDes.media[i].rtp[0].payload;
                });
                if (staticPayloadCodec) {
                    stream.codecpar.codecType = staticPayloadCodec.codecType;
                    stream.codecpar.codecId = staticPayloadCodec.codecId;
                    if (staticPayloadCodec.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                        stream.codecpar.sampleRate = sdpDes.media[i].rtp[0].rate || staticPayloadCodec.rate;
                        stream.codecpar.chLayout.nbChannels = sdpDes.media[i].rtp[0].encoding || staticPayloadCodec.encoding;
                        stream.timeBase.num = 1;
                        stream.timeBase.den = stream.codecpar.sampleRate;
                    }
                    else {
                        stream.timeBase.num = 1;
                        stream.timeBase.den = sdpDes.media[i].rtp[0].rate || staticPayloadCodec.rate;
                    }
                }
                else {
                    if (sdpDes.media[i].type === 'audio') {
                        stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                    }
                    else if (sdpDes.media[i].type === 'video') {
                        stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                    }
                    const codecName = sdpDes.media[i].rtp[0].codec;
                    let codecId = avprotocol_rtp_rtp__WEBPACK_IMPORTED_MODULE_17__.RTPCodecName2AVCodeId[codecName] || 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                    stream.codecpar.codecId = codecId;
                    if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                        stream.codecpar.sampleRate = sdpDes.media[i].rtp[0].rate;
                        stream.codecpar.chLayout.nbChannels = sdpDes.media[i].rtp[0].encoding;
                        stream.timeBase.num = 1;
                        stream.timeBase.den = stream.codecpar.sampleRate;
                    }
                    else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                        stream.timeBase.num = 1;
                        stream.timeBase.den = sdpDes.media[i].rtp[0].rate;
                    }
                }
                const context = {
                    ssrc: 0,
                    trackId: trackId++,
                    interleaved: interleaved,
                    payloadContext: null,
                    queue: null,
                    currentDTS: BigInt(0),
                    gopCount: 0,
                    maxPts: BigInt(0),
                    minPts: BigInt(0),
                    payloadType: sdpDes.media[i].rtp[0].payload,
                    dtsDelta: (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_21__.avRescaleQ)(BigInt(33), avutil_constant__WEBPACK_IMPORTED_MODULE_22__.AV_MILLI_TIME_BASE_Q, stream.timeBase),
                    rangeStartOffset: BigInt(0),
                    lastRtcpNtpTime: avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NOPTS_VALUE_BIGINT,
                    firstRtcpNtpTime: avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NOPTS_VALUE_BIGINT,
                    lastRtcpTimestamp: 0,
                    rtcpTsOffset: BigInt(0),
                    baseTimestamp: 0,
                    timestamp: 0,
                    unwrappedTimestamp: BigInt(0),
                    filter: null
                };
                if (sdpDes.media[i].control) {
                    let l1 = sdpDes.media[i].control.split(';');
                    let trackID = l1.find((l) => l.indexOf('trackID') > -1);
                    if (trackID) {
                        let l2 = trackID.split('=');
                        context.trackId = +l2[1].trim();
                    }
                }
                if (sdpDes.media[i].fmtp.length && avprotocol_rtp_fmtp__WEBPACK_IMPORTED_MODULE_28__.CodecIdFmtpHandler[stream.codecpar.codecId]) {
                    context.payloadContext = avprotocol_rtp_fmtp__WEBPACK_IMPORTED_MODULE_28__.CodecIdFmtpHandler[stream.codecpar.codecId](stream, sdpDes.media[i].fmtp[0].config);
                }
                context.queue = new avprotocol_rtp_RTPFrameQueue__WEBPACK_IMPORTED_MODULE_18__["default"](stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], context.payloadContext);
                interleaved += 2;
                stream.privData = context;
                response = await this.rtspSession.setup({
                    trackId: context.trackId,
                    streamMode: 2 /* RtspStreamingMode.TRANSPORT_TCP */,
                    interleaved: context.interleaved,
                    multcast: false
                }, this.context.sessionId);
                if (response.statusCode !== 200) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(`setup track ${context.trackId} failed, ${JSON.stringify(response)}`, cheap__fileName__0, 250);
                    return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
                }
                const ssrc = response.headers['Transport'].split(';').find((t) => t.indexOf('ssrc') > -1);
                if (ssrc) {
                    context.ssrc = +('0x' + ssrc.split('=')[1].trim());
                }
                this.context.sessionId = response.headers['Session'];
                if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                    this.context.canOutputPacket = false;
                }
                if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
                    context.filter = new avformat_bsf_mp3_Mp32RawFilter__WEBPACK_IMPORTED_MODULE_27__["default"]();
                }
                else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
                    context.filter = new avformat_bsf_ac3_Ac32RawFilter__WEBPACK_IMPORTED_MODULE_29__["default"]();
                }
                if (context.filter) {
                    context.filter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress]);
                }
            }
            if (!formatContext.streams.length) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error('not found stream', cheap__fileName__0, 276);
                return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
            }
            response = await this.rtspSession.play(this.context.sessionId);
            if (response.statusCode !== 200) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(`play failed, ${JSON.stringify(response)}`, cheap__fileName__0, 283);
                return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
            }
            return 0;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(error.message, cheap__fileName__0, 290);
            return formatContext.ioReader.error;
        }
    }
    addPrft(stream, avpacket, timestamp) {
        const context = stream.privData;
        if (context.lastRtcpNtpTime !== avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NOPTS_VALUE_BIGINT) {
            const prft = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(16);
            const rtcpTime = avutil_util_ntp__WEBPACK_IMPORTED_MODULE_14__.parse(context.lastRtcpNtpTime) - avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NTP_OFFSET_US;
            const deltaTimestamp = BigInt(timestamp) - context.lastRtcpNtpTime;
            const deltaTime = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_21__.avRescaleQ)(deltaTimestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_22__.AV_TIME_BASE_Q);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](prft, rtcpTime + deltaTime);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](prft + 8, 24);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.addAVPacketSideData)(avpacket, 27 /* AVPacketSideDataType.AV_PKT_DATA_PRFT */, prft, 16);
        }
    }
    getPacketPts(formatContext, stream, timestamp) {
        if (timestamp === -1) {
            return -BigInt(1);
        }
        const context = stream.privData;
        if (context.lastRtcpNtpTime !== avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NOPTS_VALUE_BIGINT && formatContext.streams.length > 1) {
            const deltaTimestamp = BigInt(timestamp - context.lastRtcpTimestamp >> 0);
            const addend = (context.lastRtcpNtpTime - context.firstRtcpNtpTime) * BigInt(stream.timeBase.den >> 0)
                / (BigInt(stream.timeBase.num >> 0) << BigInt(32));
            return context.rangeStartOffset + context.rtcpTsOffset + addend + deltaTimestamp;
        }
        if (!context.baseTimestamp) {
            context.baseTimestamp = timestamp;
        }
        if (!context.timestamp) {
            context.unwrappedTimestamp += BigInt(timestamp);
        }
        else {
            context.unwrappedTimestamp += BigInt(timestamp - context.timestamp >> 0);
        }
        context.timestamp = timestamp;
        return context.unwrappedTimestamp + context.rangeStartOffset - BigInt(context.baseTimestamp);
    }
    handleRtcpPacket(formatContext, data, interleaved = -1) {
        const payloadType = data[1];
        switch (payloadType) {
            case 200 /* RTCPPayloadType.SR */:
                const sr = (0,avprotocol_rtcp_parser__WEBPACK_IMPORTED_MODULE_26__.parseRTCPSendReport)(data);
                let stream = formatContext.streams.find((stream) => {
                    const context = stream.privData;
                    return context.ssrc === sr.ssrc
                        || context.interleaved === interleaved;
                });
                if (stream) {
                    const context = stream.privData;
                    context.lastRtcpNtpTime = sr.ntp;
                    context.lastRtcpTimestamp = sr.timestamp;
                    if (context.firstRtcpNtpTime === avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NOPTS_VALUE_BIGINT) {
                        context.firstRtcpNtpTime = sr.ntp;
                        if (!context.baseTimestamp) {
                            context.baseTimestamp = sr.timestamp;
                        }
                        context.rtcpTsOffset = BigInt(context.lastRtcpTimestamp - context.baseTimestamp >> 0);
                        if (context.timestamp) {
                            context.currentDTS = this.getPacketPts(formatContext, stream, context.timestamp);
                        }
                    }
                }
                break;
        }
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            while (true) {
                const { data, interleaved } = await this.rtspSession.readPacket();
                // rtcp
                if ((0,avprotocol_rtcp_isRtcp__WEBPACK_IMPORTED_MODULE_23__["default"])(data)) {
                    this.handleRtcpPacket(formatContext, data, interleaved);
                }
                // rtp
                else if ((0,avprotocol_rtp_isRtp__WEBPACK_IMPORTED_MODULE_24__["default"])(data)) {
                    const packet = (0,avprotocol_rtp_parser__WEBPACK_IMPORTED_MODULE_25__.parseRTPPacket)(data);
                    const stream = formatContext.streams.find((stream) => {
                        const context = stream.privData;
                        return context.ssrc === packet.header.ssrc
                            || context.interleaved === interleaved
                            || context.payloadType === packet.header.payloadType;
                    });
                    if (stream) {
                        const context = stream.privData;
                        context.queue.push(packet);
                        if (!context.ssrc) {
                            context.ssrc = packet.header.ssrc;
                        }
                        let firstGot = false;
                        const handleVideoFrame = (frame, isKey, pts) => {
                            let p = !firstGot ? avpacket : (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.createAVPacket)();
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 32, stream.index);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(p + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
                            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(frame.length);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data, frame.length, frame);
                            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.addAVPacketData)(p, data, frame.length);
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 16, pts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 8, pts);
                            if (isKey) {
                                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](p + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                                this.context.canOutputPacket = true;
                            }
                            if (firstGot) {
                                formatContext.interval.packetBuffer.push(p);
                                p = 0;
                            }
                            else {
                                firstGot = true;
                            }
                            return p;
                        };
                        const handleMultiAudioFrames = (frames, pts, delta = BigInt(0)) => {
                            if (!frames.length) {
                                return;
                            }
                            let p = !firstGot ? avpacket : (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.createAVPacket)();
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 32, stream.index);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(p + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
                            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(frames[0].length);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data, frames[0].length, frames[0]);
                            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.addAVPacketData)(p, data, frames[0].length);
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 16, pts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 8, pts);
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](p + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                            if (firstGot) {
                                formatContext.interval.packetBuffer.push(p);
                                p = 0;
                            }
                            else {
                                firstGot = true;
                            }
                            for (let i = 1; i < frames.length; i++) {
                                const p = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.createAVPacket)();
                                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 32, stream.index);
                                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(p + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
                                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 16, pts + BigInt(i) * delta), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 8, pts + BigInt(i) * delta);
                                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](p + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                                const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(frames[i].length);
                                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data, frames[i].length, frames[i]);
                                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.addAVPacketData)(p, data, frames[i].length);
                                formatContext.interval.packetBuffer.push(p);
                            }
                        };
                        const handleSingleAudioFrameWithFilter = (frame, pts) => {
                            let p = !firstGot ? avpacket : (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.createAVPacket)();
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 32, stream.index);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(p + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
                            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_10__.avMalloc)(frame.length);
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpyFromUint8Array)(data, frame.length, frame);
                            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.addAVPacketData)(p, data, frame.length);
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 16, pts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 8, pts);
                            let ret = context.filter.sendAVPacket(p);
                            if (ret < 0) {
                                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.fatal('send avpacket to bsf failed', cheap__fileName__0, 472);
                                return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
                            }
                            ret = context.filter.receiveAVPacket(p);
                            if (ret === avutil_error__WEBPACK_IMPORTED_MODULE_8__.EOF) {
                                return;
                            }
                            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(p + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 32, stream.index);
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](p + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                            if (firstGot) {
                                formatContext.interval.packetBuffer.push(p);
                                p = 0;
                            }
                            else {
                                firstGot = true;
                            }
                            while (true) {
                                const p = this.cacheAVPacket || (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.createAVPacket)();
                                ret = context.filter.receiveAVPacket(p);
                                if (ret === 0) {
                                    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(p + 72, stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress], 8);
                                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 32, stream.index);
                                    formatContext.interval.packetBuffer.push(p);
                                    this.cacheAVPacket = 0;
                                }
                                else {
                                    this.cacheAVPacket = p;
                                    break;
                                }
                            }
                        };
                        while (context.queue.hasFrame()) {
                            const packets = context.queue.getFrame();
                            if (!packets.length) {
                                continue;
                            }
                            const pts = this.getPacketPts(formatContext, stream, packets[0].header.timestamp);
                            if (stream.codecpar.codecType !== 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                                && !this.context.canOutputPacket) {
                                continue;
                            }
                            if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                                || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                                const { nalus, isKey } = stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                                    ? avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.h264(packets)
                                    : avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.hevc(packets, context.payloadContext);
                                if (!nalus.length) {
                                    continue;
                                }
                                if (!isKey && !this.context.canOutputPacket) {
                                    context.currentDTS = pts;
                                    continue;
                                }
                                const frame = avutil_util_nalu__WEBPACK_IMPORTED_MODULE_20__.joinNaluByStartCode(nalus);
                                const p = handleVideoFrame(frame, isKey, pts);
                                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](p + 80, stream.codecpar.bitFormat);
                                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](p + 16, context.currentDTS);
                                context.currentDTS += context.dtsDelta;
                                if (isKey) {
                                    if (context.gopCount > 1) {
                                        context.dtsDelta = (context.maxPts - context.minPts) / BigInt(context.gopCount - 1 >> 0);
                                    }
                                    context.gopCount = 1;
                                    context.minPts = pts;
                                    context.maxPts = pts;
                                }
                                else {
                                    context.gopCount++;
                                    if (context.gopCount > 5 && context.gopCount < 200) {
                                        context.dtsDelta = (context.maxPts - context.minPts) / BigInt(context.gopCount - 1 >> 0);
                                    }
                                }
                                if (pts > context.maxPts) {
                                    context.maxPts = pts;
                                }
                            }
                            else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                                const frames = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.mpeg4(packets, stream.privData.payloadContext);
                                handleMultiAudioFrames(frames, pts, BigInt(1024));
                            }
                            else if (stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                                const frame = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.concat(packets);
                                const byte = frame[4];
                                const isKey = (byte >>> 6) === 0 /* mpeg4.Mpeg4PictureType.I */;
                                if (!isKey && !this.context.canOutputPacket) {
                                    context.currentDTS = pts;
                                    continue;
                                }
                                handleVideoFrame(frame, isKey, pts);
                            }
                            else if (stream.codecpar.codecId === 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */
                                || stream.codecpar.codecId === 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */
                                || stream.codecpar.codecId === 69660 /* AVCodecID.AV_CODEC_ID_ADPCM_G722 */
                                || stream.codecpar.codecId === 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */
                                || stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */
                                || stream.codecpar.codecId === 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */) {
                                const frame = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.concat(packets);
                                handleMultiAudioFrames([frame], pts);
                            }
                            else if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
                                const frame = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.mpeg12(packets, stream.codecpar.codecType);
                                if (stream.codecpar.profile === avutil_constant__WEBPACK_IMPORTED_MODULE_22__.NOPTS_VALUE) {
                                    const layer = (frame[1] & 0x06) >> 1;
                                    stream.codecpar.profile = _codecs_mp3__WEBPACK_IMPORTED_MODULE_16__.getProfileByLayer(layer);
                                }
                                handleSingleAudioFrameWithFilter(frame, pts);
                            }
                            else if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */) {
                                const frame = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.ac3(packets);
                                handleSingleAudioFrameWithFilter(frame, pts);
                            }
                            else if (stream.codecpar.codecId === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */) {
                                const frame = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.mpeg12(packets, stream.codecpar.codecType);
                                const isKey = ((frame[5] >> 3) & 7) === 1 /* mpegvideo.MpegVideoPictureType.I */;
                                if (!isKey && !this.context.canOutputPacket) {
                                    context.currentDTS = pts;
                                    continue;
                                }
                                handleVideoFrame(frame, isKey, pts);
                            }
                            else if (stream.codecpar.codecId === 139 /* AVCodecID.AV_CODEC_ID_VP8 */) {
                                const { payload, isKey } = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.vp8(packets);
                                if (!isKey && !this.context.canOutputPacket) {
                                    context.currentDTS = pts;
                                    continue;
                                }
                                handleVideoFrame(payload, isKey, pts);
                            }
                            else if (stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */) {
                                const { payload, isKey } = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.vp9(packets);
                                if (!isKey && !this.context.canOutputPacket) {
                                    context.currentDTS = pts;
                                    continue;
                                }
                                handleVideoFrame(payload, isKey, pts);
                            }
                            else if (stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                                const { payload, isKey } = avprotocol_rtp_depacketizer__WEBPACK_IMPORTED_MODULE_19__.av1(packets);
                                if (!isKey && !this.context.canOutputPacket) {
                                    context.currentDTS = pts;
                                    continue;
                                }
                                handleVideoFrame(payload, isKey, pts);
                            }
                        }
                        if (firstGot) {
                            return 0;
                        }
                    }
                }
                else {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_7__.warn('received invalid data', cheap__fileName__0, 640);
                }
            }
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_7__.error(`read packet error, ${error}`, cheap__fileName__0, 646);
                return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_8__.FORMAT_NOT_SUPPORT);
    }
    getAnalyzeStreamsCount() {
        return 0;
    }
    async destroy(formatContext) {
        await this.rtspSession.teardown(this.context.sessionId);
        if (this.cacheAVPacket) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_11__.destroyAVPacket)(this.cacheAVPacket);
            this.cacheAVPacket = 0;
        }
        common_util_array__WEBPACK_IMPORTED_MODULE_15__.each(formatContext.streams, (stream) => {
            const streamContext = stream.privData;
            if (streamContext.filter) {
                streamContext.filter.destroy();
                streamContext.filter = null;
            }
        });
    }
}


/***/ }),

/***/ "./src/avformat/formats/mp3/frameHeader.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/mp3/frameHeader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FrameHeader: () => (/* binding */ FrameHeader),
/* harmony export */   getFrameLength: () => (/* binding */ getFrameLength),
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _codecs_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../codecs/mp3 */ "./src/avformat/codecs/mp3.ts");
/*
 * libmedia mp3 FrameHeader utils
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

class FrameHeader {
    version;
    layer;
    protection;
    bitrateIndex;
    samplingFrequency;
    padding;
    private;
    mode;
    modeExtension;
    copyright;
    original;
    emphasis;
}
function parse(header, value) {
    header.version = (value >> 19) & 3;
    header.layer = (value >> 17) & 3;
    header.protection = (value >> 16) & 1;
    header.bitrateIndex = (value >> 12) & 0x0f;
    header.samplingFrequency = (value >> 10) & 3;
    header.padding = (value >> 9) & 1;
    header.mode = (value >> 6) & 3;
    header.modeExtension = (value >> 4) & 3;
    header.copyright = (value >> 3) & 1;
    header.original = (value >> 2) & 1;
    header.emphasis = value & 3;
}
function getFrameLength(header, sampleRate) {
    let frameSize = _codecs_mp3__WEBPACK_IMPORTED_MODULE_0__.getBitRateByVersionLayerIndex(header.version, header.layer, header.bitrateIndex);
    switch (header.layer) {
        case 1:
        default:
            // Layer 3
            frameSize = ((frameSize * 144000) / (sampleRate << ((header.version === 3) ? 0 : 1))) >>> 0;
            frameSize += header.padding;
            break;
        case 2:
            // Layer 2
            frameSize = ((frameSize * 144000) / sampleRate) >>> 0;
            frameSize += header.padding;
            break;
        case 3:
            // Layer 1
            frameSize = ((frameSize * 12000) / sampleRate) >>> 0;
            frameSize = (frameSize + header.padding) * 4;
            break;
    }
    return frameSize;
}


/***/ }),

/***/ "./src/avprotocol/libsdp/grammars.ts":
/*!*******************************************!*\
  !*** ./src/avprotocol/libsdp/grammars.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   grammars: () => (/* binding */ grammars)
/* harmony export */ });
/* unused harmony exports defaultReg, defaultFormat, addGrammar */
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/*
 * libmedia sdp grammars
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

const defaultReg = /(.*)/;
const defaultFormat = '%s';
const grammars = {
    v: [
        {
            name: 'version',
            reg: /^(\d*)$/,
            format: defaultFormat
        }
    ],
    o: [
        {
            /*
                   * o=- 20518 0 IN IP4 203.0.113.1
                   * NB: sessionId will be a String in most cases because it is huge
                   */
            name: 'origin',
            reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
            names: ['username', 'sessionId', 'sessionVersion', 'netType', 'ipVer', 'address'],
            format: '%s %s %d %s IP%d %s'
        }
    ],
    // default parsing of these only (though some of these feel outdated)
    s: [
        {
            name: 'name',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    i: [
        {
            name: 'description',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    u: [
        {
            name: 'uri',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    e: [
        {
            name: 'email',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    p: [
        {
            name: 'phone',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    z: [
        // TODO: this one can actually be parsed properly...
        {
            name: 'timezones',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    r: [
        // TODO: this one can also be parsed properly
        {
            name: 'repeats',
            reg: defaultReg,
            format: defaultFormat
        }
    ],
    // k: [{}], // outdated thing ignored
    t: [
        {
            // t=0 0
            name: 'timing',
            reg: /^(\d*) (\d*)/,
            names: ['start', 'stop'],
            format: '%d %d'
        }
    ],
    c: [
        {
            // c=IN IP4 10.47.197.26
            name: 'connection',
            reg: /^IN IP(\d) (\S*)/,
            names: ['version', 'ip'],
            format: 'IN IP%d %s'
        }
    ],
    b: [
        {
            // b=AS:4000
            push: 'bandwidth',
            reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
            names: ['type', 'limit'],
            format: '%s:%s'
        }
    ],
    m: [
        {
            /*
                   * m=video 51744 RTP/AVP 126 97 98 34 31
                   * NB: special - pushes to session
                   * TODO: rtp/fmtp should be filtered by the payloads found here?
                   */
            reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
            names: ['type', 'port', 'protocol', 'payloads'],
            format: '%s %d %s %s'
        }
    ],
    a: [
        {
            // a=rtpmap:110 opus/48000/2
            push: 'rtp',
            reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
            names: ['payload', 'codec', 'rate', 'encoding'],
            format: function (o) {
                return (o.encoding)
                    ? 'rtpmap:%d %s/%s/%s'
                    : o.rate
                        ? 'rtpmap:%d %s/%s'
                        : 'rtpmap:%d %s';
            }
        },
        {
            /*
                   * a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
                   * a=fmtp:111 minptime=10; useinbandfec=1
                   */
            push: 'fmtp',
            reg: /^fmtp:(\d*) ([\S| ]*)/,
            names: ['payload', 'config'],
            format: 'fmtp:%d %s'
        },
        {
            // a=control:streamid=0
            name: 'control',
            reg: /^control:(.*)/,
            format: 'control:%s'
        },
        {
            // a=rtcp:65179 IN IP4 193.84.77.194
            name: 'rtcp',
            reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
            names: ['port', 'netType', 'ipVer', 'address'],
            format: function (o) {
                return (o.address != null)
                    ? 'rtcp:%d %s IP%d %s'
                    : 'rtcp:%d';
            }
        },
        {
            // a=rtcp-fb:98 trr-int 100
            push: 'rtcpFbTrrInt',
            reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
            names: ['payload', 'value'],
            format: 'rtcp-fb:%s trr-int %d'
        },
        {
            // a=rtcp-fb:98 nack rpsi
            push: 'rtcpFb',
            reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
            names: ['payload', 'type', 'subtype'],
            format: function (o) {
                return (o.subtype != null)
                    ? 'rtcp-fb:%s %s %s'
                    : 'rtcp-fb:%s %s';
            }
        },
        {
            /*
                   * a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
                   * a=extmap:1/recvonly URI-gps-string
                   * a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
                   */
            push: 'ext',
            reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
            names: ['value', 'direction', 'encrypt-uri', 'uri', 'config'],
            format: function (o) {
                return ('extmap:%d'
                    + (o.direction ? '/%s' : '%v')
                    + (o['encrypt-uri'] ? ' %s' : '%v')
                    + ' %s'
                    + (o.config ? ' %s' : ''));
            }
        },
        {
            // a=extmap-allow-mixed
            name: 'extmapAllowMixed',
            reg: /^(extmap-allow-mixed)/,
            format: defaultFormat
        },
        {
            // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
            push: 'crypto',
            reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
            names: ['id', 'suite', 'config', 'sessionConfig'],
            format: function (o) {
                return (o.sessionConfig != null)
                    ? 'crypto:%d %s %s %s'
                    : 'crypto:%d %s %s';
            }
        },
        {
            // a=setup:actpass
            name: 'setup',
            reg: /^setup:(\w*)/,
            format: 'setup:%s'
        },
        {
            // a=connection:new
            name: 'connectionType',
            reg: /^connection:(new|existing)/,
            format: 'connection:%s'
        },
        {
            // a=mid:1
            name: 'mid',
            reg: /^mid:([^\s]*)/,
            format: 'mid:%s'
        },
        {
            // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
            name: 'msid',
            reg: /^msid:(.*)/,
            format: 'msid:%s'
        },
        {
            // a=ptime:20
            name: 'ptime',
            reg: /^ptime:(\d*(?:\.\d*)*)/,
            format: 'ptime:%d'
        },
        {
            // a=maxptime:60
            name: 'maxptime',
            reg: /^maxptime:(\d*(?:\.\d*)*)/,
            format: 'maxptime:%d'
        },
        {
            // a=sendrecv
            name: 'direction',
            reg: /^(sendrecv|recvonly|sendonly|inactive)/,
            format: defaultFormat
        },
        {
            // a=ice-lite
            name: 'icelite',
            reg: /^(ice-lite)/,
            format: defaultFormat
        },
        {
            // a=ice-ufrag:F7gI
            name: 'iceUfrag',
            reg: /^ice-ufrag:(\S*)/,
            format: 'ice-ufrag:%s'
        },
        {
            // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
            name: 'icePwd',
            reg: /^ice-pwd:(\S*)/,
            format: 'ice-pwd:%s'
        },
        {
            // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
            name: 'fingerprint',
            reg: /^fingerprint:(\S*) (\S*)/,
            names: ['type', 'hash'],
            format: 'fingerprint:%s %s'
        },
        {
            /*
                   * a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
                   * a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
                   * a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
                   * a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
                   * a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
                   */
            push: 'candidates',
            reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
            // eslint-disable-next-line max-len
            names: ['foundation', 'component', 'transport', 'priority', 'ip', 'port', 'type', 'raddr', 'rport', 'tcptype', 'generation', 'network-id', 'network-cost'],
            format: function (o) {
                let str = 'candidate:%s %d %s %d %s %d typ %s';
                str += (o.raddr != null) ? ' raddr %s rport %d' : '%v%v';
                // NB: candidate has three optional chunks, so %void middles one if it's missing
                str += (o.tcptype != null) ? ' tcptype %s' : '%v';
                if (o.generation != null) {
                    str += ' generation %d';
                }
                str += (o['network-id'] != null) ? ' network-id %d' : '%v';
                str += (o['network-cost'] != null) ? ' network-cost %d' : '%v';
                return str;
            }
        },
        {
            // a=end-of-candidates (keep after the candidates line for readability)
            name: 'endOfCandidates',
            reg: /^(end-of-candidates)/,
            format: defaultFormat
        },
        {
            // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
            name: 'remoteCandidates',
            reg: /^remote-candidates:(.*)/,
            format: 'remote-candidates:%s'
        },
        {
            // a=ice-options:google-ice
            name: 'iceOptions',
            reg: /^ice-options:(\S*)/,
            format: 'ice-options:%s'
        },
        {
            // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
            push: 'ssrcs',
            reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
            names: ['id', 'attribute', 'value'],
            format: function (o) {
                let str = 'ssrc:%d';
                if (o.attribute != null) {
                    str += ' %s';
                    if (o.value != null) {
                        str += ':%s';
                    }
                }
                return str;
            }
        },
        {
            /*
                   * a=ssrc-group:FEC 1 2
                   * a=ssrc-group:FEC-FR 3004364195 1080772241
                   */
            push: 'ssrcGroups',
            // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
            reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
            names: ['semantics', 'ssrcs'],
            format: 'ssrc-group:%s %s'
        },
        {
            // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
            name: 'msidSemantic',
            reg: /^msid-semantic:\s?(\w*) (\S*)/,
            names: ['semantic', 'token'],
            // space after ':' is not accidental
            format: 'msid-semantic: %s %s'
        },
        {
            // a=group:BUNDLE audio video
            push: 'groups',
            reg: /^group:(\w*) (.*)/,
            names: ['type', 'mids'],
            format: 'group:%s %s'
        },
        {
            // a=rtcp-mux
            name: 'rtcpMux',
            reg: /^(rtcp-mux)/,
            format: defaultFormat
        },
        {
            // a=rtcp-rsize
            name: 'rtcpRsize',
            reg: /^(rtcp-rsize)/,
            format: defaultFormat
        },
        {
            // a=sctpmap:5000 webrtc-datachannel 1024
            name: 'sctpmap',
            reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
            names: ['sctpmapNumber', 'app', 'maxMessageSize'],
            format: function (o) {
                return (o.maxMessageSize != null)
                    ? 'sctpmap:%s %s %s'
                    : 'sctpmap:%s %s';
            }
        },
        {
            // a=x-google-flag:conference
            name: 'xGoogleFlag',
            reg: /^x-google-flag:([^\s]*)/,
            format: 'x-google-flag:%s'
        },
        {
            // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
            push: 'rids',
            reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
            names: ['id', 'direction', 'params'],
            format: function (o) {
                return (o.params) ? 'rid:%s %s %s' : 'rid:%s %s';
            }
        },
        {
            /*
                   * a=imageattr:97 send [x=800, y=640, sar=1.1, q=0.6] [x=480, y=320] recv [x=330, y=250]
                   * a=imageattr:* send [x=800, y=640] recv *
                   * a=imageattr:100 recv [x=320, y=240]
                   */
            push: 'imageattrs',
            // eslint-disable-next-line function-paren-newline
            reg: new RegExp(
            // a=imageattr:97
            '^imageattr:(\\d+|\\*)'
                // send [x=800, y=640, sar=1.1, q=0.6] [x=480, y=320]
                + '[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)'
                // recv [x=330, y=250]
                + '(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?'),
            names: ['pt', 'dir1', 'attrs1', 'dir2', 'attrs2'],
            format: function (o) {
                return 'imageattr:%s %s %s' + (o.dir2 ? ' %s %s' : '');
            }
        },
        {
            /*
                   * a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
                   * a=simulcast:recv 1;4,5 send 6;7
                   */
            name: 'simulcast',
            // eslint-disable-next-line function-paren-newline
            reg: new RegExp(
            // a=simulcast:
            '^simulcast:'
                // send 1,2,3;~4,~5
                + '(send|recv) ([a-zA-Z0-9\\-_~;,]+)'
                // space + recv 6;~7,~8
                + '(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?'
                // end
                + '$'),
            names: ['dir1', 'list1', 'dir2', 'list2'],
            format: function (o) {
                return 'simulcast:%s %s' + (o.dir2 ? ' %s %s' : '');
            }
        },
        {
            /*
                   * old simulcast draft 03 (implemented by Firefox)
                   *   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
                   * a=simulcast: recv pt=97;98 send pt=97
                   * a=simulcast: send rid=5;6;7 paused=6,7
                   */
            name: 'simulcast_03',
            reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
            names: ['value'],
            format: 'simulcast: %s'
        },
        {
            /*
                   * a=framerate:25
                   * a=framerate:29.97
                   */
            name: 'framerate',
            reg: /^framerate:(\d+(?:$|\.\d+))/,
            format: 'framerate:%s'
        },
        {
            /*
                   * RFC4570
                   * a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
                   */
            name: 'sourceFilter',
            reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
            names: ['filterMode', 'netType', 'addressTypes', 'destAddress', 'srcList'],
            format: 'source-filter: %s %s %s %s %s'
        },
        {
            // a=bundle-only
            name: 'bundleOnly',
            reg: /^(bundle-only)/,
            format: defaultFormat
        },
        {
            // a=label:1
            name: 'label',
            reg: /^label:(.+)/,
            format: 'label:%s'
        },
        {
            /*
                   * RFC version 26 for SCTP over DTLS
                   * https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
                   */
            name: 'sctpPort',
            reg: /^sctp-port:(\d+)$/,
            format: 'sctp-port:%s'
        },
        {
            /*
                   * RFC version 26 for SCTP over DTLS
                   * https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
                   */
            name: 'maxMessageSize',
            reg: /^max-message-size:(\d+)$/,
            format: 'max-message-size:%s'
        },
        {
            /*
                   * RFC7273
                   * a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
                   */
            push: 'tsRefClocks',
            reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
            names: ['clksrc', 'clksrcExt'],
            format: function (o) {
                return 'ts-refclk:%s' + (o.clksrcExt != null ? '=%s' : '');
            }
        },
        {
            /*
                   * RFC7273
                   * a=mediaclk:direct=963214424
                   */
            name: 'mediaClk',
            reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
            names: ['id', 'mediaClockName', 'mediaClockValue', 'rateNumerator', 'rateDenominator'],
            format: function (o) {
                let str = 'mediaclk:';
                str += (o.id != null ? 'id=%s %s' : '%v%s');
                str += (o.mediaClockValue != null ? '=%s' : '');
                str += (o.rateNumerator != null ? ' rate=%s' : '');
                str += (o.rateDenominator != null ? '/%s' : '');
                return str;
            }
        },
        {
            // a=keywds:keywords
            name: 'keywords',
            reg: /^keywds:(.+)$/,
            format: 'keywds:%s'
        },
        {
            // a=content:main
            name: 'content',
            reg: /^content:(.+)/,
            format: 'content:%s'
        },
        // BFCP https://tools.ietf.org/html/rfc4583
        {
            // a=floorctrl:c-s
            name: 'bfcpFloorCtrl',
            reg: /^floorctrl:(c-only|s-only|c-s)/,
            format: 'floorctrl:%s'
        },
        {
            // a=confid:1
            name: 'bfcpConfId',
            reg: /^confid:(\d+)/,
            format: 'confid:%s'
        },
        {
            // a=userid:1
            name: 'bfcpUserId',
            reg: /^userid:(\d+)/,
            format: 'userid:%s'
        },
        {
            // a=floorid:1
            name: 'bfcpFloorId',
            reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
            names: ['id', 'mStream'],
            format: 'floorid:%s mstrm:%s'
        },
        {
            // any a= that we don't understand is kept verbatim on media.invalid
            push: 'invalid',
            reg: defaultReg,
            names: ['value'],
            format: defaultFormat
        }
    ]
};
function addGrammar(attar, grammar) {
    if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.array(grammars[attar])) {
        if (attar === 'a') {
            const last = grammars[attar].pop();
            grammars[attar].push(...grammar);
            grammars[attar].push(last);
        }
        else {
            grammars[attar].push(...grammar);
        }
    }
    else {
        grammars[attar] = grammar;
    }
}


/***/ }),

/***/ "./src/avprotocol/libsdp/libsdp.ts":
/*!*****************************************!*\
  !*** ./src/avprotocol/libsdp/libsdp.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/* unused harmony export stringify */
/* harmony import */ var _grammars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grammars */ "./src/avprotocol/libsdp/grammars.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/*
 * libmedia sdp util
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


/*
 * RFC specified order
 * TODO: extend this with all the rest
 */
const defaultOuterOrder = [
    'v', 'o', 's', 'i',
    'u', 'e', 'p', 'c',
    'b', 't', 'r', 'z', 'a'
];
const defaultInnerOrder = ['i', 'c', 'b', 'a'];
const validLine = (line) => {
    return /^([a-z])=(.*)/.test(line);
};
function toIntIfInt(v) {
    return String(Number(v)) === v ? Number(v) : v;
}
function attachProperties(match, location, names, rawName) {
    if (rawName && !names) {
        location[rawName] = toIntIfInt(match[1]);
    }
    else {
        for (let i = 0; i < names.length; i += 1) {
            if (match[i + 1] != null) {
                location[names[i]] = toIntIfInt(match[i + 1]);
            }
        }
    }
}
function parseReg(grammar, location, content) {
    const needsBlank = grammar.name && grammar.names;
    if (grammar.push && !location[grammar.push]) {
        location[grammar.push] = [];
    }
    else if (needsBlank && !location[grammar.name]) {
        location[grammar.name] = {};
    }
    const keyLocation = grammar.push
        // blank object that will be pushed
        ? {}
        // otherwise, named location or root
        : needsBlank ? location[grammar.name] : location;
    attachProperties(content.match(grammar.reg), keyLocation, grammar.names, grammar.name);
    if (grammar.push) {
        location[grammar.push].push(keyLocation);
    }
}
// customized util.format - discards excess arguments and can void middle ones
const formatRegExp = /%[sdv%]/g;
function format(formatStr) {
    let i = 1;
    const args = arguments;
    const len = args.length;
    return formatStr.replace(formatRegExp, function (x) {
        if (i >= len) {
            // missing argument
            return x;
        }
        const arg = args[i];
        i += 1;
        switch (x) {
            case '%%':
                return '%';
            case '%s':
                return String(arg);
            case '%d':
                return Number(arg) + '';
            case '%v':
                return '';
        }
    });
}
function makeLine(type, grammar, location) {
    const str = common_util_is__WEBPACK_IMPORTED_MODULE_1__.func(grammar.format)
        ? (grammar.format(grammar.push ? location : location[grammar.name]))
        : grammar.format;
    const args = [
        type + '=' + str
    ];
    if (grammar.names) {
        for (let i = 0; i < grammar.names.length; i += 1) {
            const n = grammar.names[i];
            if (grammar.name) {
                args.push(location[grammar.name][n]);
            }
            else {
                // for mLine and push attributes
                args.push(location[grammar.names[i]]);
            }
        }
    }
    else {
        args.push(location[grammar.name]);
    }
    return format.apply(null, args);
}
/**
 * 解析 sdp
 *
 * @param sdp
 * @returns
 */
function parse(sdp) {
    // @ts-ignore
    const session = {};
    const media = [];
    let target = session;
    // parse lines we understand
    sdp.split(/(\r\n|\r|\n)/).filter(validLine).forEach((line) => {
        const type = line[0];
        // x=xx
        const content = line.slice(2);
        if (type === 'm') {
            // @ts-ignore
            media.push({
                rtp: [],
                fmtp: []
            });
            // point at latest media line
            target = media[media.length - 1];
        }
        for (let j = 0; j < (_grammars__WEBPACK_IMPORTED_MODULE_0__.grammars[type] || []).length; j += 1) {
            const grammar = _grammars__WEBPACK_IMPORTED_MODULE_0__.grammars[type][j];
            if (grammar.reg.test(content)) {
                return parseReg(grammar, target, content);
            }
        }
    });
    // link it up
    session.media = media;
    return session;
}
/**
 * 序列化 sdp
 *
 * @param session
 * @param options
 * @returns
 */
function stringify(session, options = {
    outerOrder: defaultOuterOrder,
    innerOrder: defaultInnerOrder
}) {
    // ensure certain properties exist
    if (session.version == null) {
        // 'v=0' must be there (only defined version atm)
        session.version = 0;
    }
    if (session.name == null) {
        // 's= ' must be there if no meaningful name set
        session.name = ' ';
    }
    session.media.forEach(function (mLine) {
        if (mLine.payloads == null) {
            mLine.payloads = '';
        }
    });
    const sdp = [];
    // loop through outerOrder for matching properties on session
    options.outerOrder.forEach((type) => {
        _grammars__WEBPACK_IMPORTED_MODULE_0__.grammars[type].forEach((grammar) => {
            if (grammar.name in session && session[grammar.name] != null) {
                sdp.push(makeLine(type, grammar, session));
            }
            else if (grammar.push in session && session[grammar.push] != null) {
                session[grammar.push].forEach((params) => {
                    sdp.push(makeLine(type, grammar, params));
                });
            }
        });
    });
    // then for each media line, follow the innerOrder
    session.media.forEach((mLine) => {
        sdp.push(makeLine('m', _grammars__WEBPACK_IMPORTED_MODULE_0__.grammars.m[0], mLine));
        options.innerOrder.forEach((type) => {
            _grammars__WEBPACK_IMPORTED_MODULE_0__.grammars[type].forEach((grammar) => {
                if (grammar.name in mLine && mLine[grammar.name] != null) {
                    sdp.push(makeLine(type, grammar, mLine));
                }
                else if (grammar.push in mLine && mLine[grammar.push] != null) {
                    mLine[grammar.push].forEach(function (el) {
                        sdp.push(makeLine(type, grammar, el));
                    });
                }
            });
        });
    });
    return sdp.join('\r\n') + '\r\n';
}


/***/ }),

/***/ "./src/avprotocol/rtcp/RTCPPacket.ts":
/*!*******************************************!*\
  !*** ./src/avprotocol/rtcp/RTCPPacket.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RTCPSendReport: () => (/* binding */ RTCPSendReport),
/* harmony export */   Report: () => (/* binding */ Report)
/* harmony export */ });
/* unused harmony exports RTCPCommonHeader, RTCPReceiveReport */
/*
 * libmedia rtcp packet
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
class RTCPCommonHeader {
    version;
    padding;
    count;
    payloadType;
    length;
}
class Report {
    ssrc;
    fractionLost;
    packetLost;
    highestSequence;
    interArrivalJitter;
    lsr;
    dlsr;
}
class RTCPSendReport extends RTCPCommonHeader {
    ssrc;
    ntp;
    timestamp;
    senderPacketCount;
    senderOctetCount;
    reports = [];
}
class RTCPReceiveReport extends RTCPCommonHeader {
    ssrc;
    reports = [];
}


/***/ }),

/***/ "./src/avprotocol/rtcp/isRtcp.ts":
/*!***************************************!*\
  !*** ./src/avprotocol/rtcp/isRtcp.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isRtcp)
/* harmony export */ });
/*
 * libmedia judge is rtcp packet
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
function isRtcp(data) {
    return data.length > 4
        // DOC: https://tools.ietf.org/html/draft-ietf-avtcore-rfc5764-mux-fixes
        && (data[0] > 127 && data[0] < 192)
        // RTP Version must be 2.
        && (data[0] >>> 6) === 2
        // RTCP packet types defined by IANA:
        // http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-4
        // RFC 5761 (RTCP-mux) states this range for secure RTCP/RTP detection.
        && (data[1] >= 192 && data[1] <= 223);
}


/***/ }),

/***/ "./src/avprotocol/rtcp/parser.ts":
/*!***************************************!*\
  !*** ./src/avprotocol/rtcp/parser.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseRTCPSendReport: () => (/* binding */ parseRTCPSendReport)
/* harmony export */ });
/* unused harmony export parseHeader */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var _RTCPPacket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RTCPPacket */ "./src/avprotocol/rtcp/RTCPPacket.ts");
/*
 * libmedia rtcp parser
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


function parseHeader(packet, reader) {
    let byte = reader.readUint8();
    packet.version = byte >>> 6;
    packet.padding = (byte >>> 5) & 0x01;
    packet.count = byte & 0x1f;
    packet.payloadType = reader.readUint8();
    packet.length = reader.readUint16();
}
function parseRTCPSendReport(data) {
    const reader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](data);
    const sr = new _RTCPPacket__WEBPACK_IMPORTED_MODULE_1__.RTCPSendReport();
    parseHeader(sr, reader);
    sr.ssrc = reader.readUint32();
    sr.ntp = reader.readUint64();
    sr.timestamp = reader.readUint32();
    sr.senderPacketCount = reader.readUint32();
    sr.senderOctetCount = reader.readUint32();
    for (let i = 0; i < sr.count; i++) {
        const report = new _RTCPPacket__WEBPACK_IMPORTED_MODULE_1__.Report();
        report.ssrc = reader.readUint32();
        report.fractionLost = reader.readUint8();
        report.packetLost = reader.readUint24();
        report.highestSequence = reader.readUint32();
        report.interArrivalJitter = reader.readUint32();
        report.lsr = reader.readUint32();
        report.dlsr = reader.readUint32();
    }
    return sr;
}


/***/ }),

/***/ "./src/avprotocol/rtp/RTPFrameQueue.ts":
/*!*********************************************!*\
  !*** ./src/avprotocol/rtp/RTPFrameQueue.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RTPFrameQueue)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _rtp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rtp */ "./src/avprotocol/rtp/rtp.ts");



const UINT16_MID = avutil_constant__WEBPACK_IMPORTED_MODULE_1__.UINT16_MAX >>> 1;
/**
 * TODO 支持 nack
 */
class RTPFrameQueue {
    queue;
    frameQueue;
    codecpar;
    currentSeqStart;
    readyPos;
    maskerQueue;
    payloadContext;
    constructor(codecpar, payloadContext) {
        this.codecpar = codecpar;
        this.queue = [];
        this.frameQueue = [];
        this.currentSeqStart = -1;
        this.readyPos = 0;
        this.maskerQueue = [];
        this.payloadContext = payloadContext;
    }
    /**
     * 判断 start 和 end 是否邻近
     *
     * @param start
     * @param end
     * @returns
     */
    isSeqIncreaseOne(start, end) {
        return start + 1 === end
            || start === avutil_constant__WEBPACK_IMPORTED_MODULE_1__.UINT16_MAX
                && end === 0;
    }
    /**
     * 判断 seq a 大于 b
     * 需要考虑回环
     *
     * @param a
     * @param b
     * @returns
     */
    seqAMoreThenB(a, b) {
        return (a > b && (a - b) < UINT16_MID) || (a < b && (b - a) > UINT16_MID);
    }
    isFirstStart() {
        if (this.currentSeqStart > -1) {
            return this.isSeqIncreaseOne(this.currentSeqStart, this.queue[0].header.sequence);
        }
        else {
            if (this.queue.length > 5) {
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar) === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                    return true;
                }
                else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                    const type = this.queue[0].payload[0] & 0x1f;
                    switch (type) {
                        case 24:
                            for (let i = 1; i < this.queue[0].payload.length - 2;) {
                                const size = (this.queue[0].payload[i] << 8) | this.queue[0].payload[i + 1];
                                const type = this.queue[0].payload[i + 2] & 0x1f;
                                if (type === 7 /* h264.H264NaluType.kSliceSPS */
                                    || type === 8 /* h264.H264NaluType.kSlicePPS */
                                    || type === 5 /* h264.H264NaluType.kSliceIDR */
                                    || type === 9 /* h264.H264NaluType.kSliceAUD */) {
                                    return true;
                                }
                                i += 2 + size;
                            }
                            break;
                        case 28:
                            const fuHeader = this.queue[0].payload[1];
                            if ((fuHeader & 0x80)) {
                                return true;
                            }
                            break;
                        // case h264.H264NaluType.kSliceIDR:
                        case 7 /* h264.H264NaluType.kSliceSPS */:
                        // case h264.H264NaluType.kSlicePPS:
                        case 9 /* h264.H264NaluType.kSliceAUD */:
                            return true;
                    }
                }
                else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                    const type = (this.queue[0].payload[0] >>> 1) & 0x3f;
                    switch (type) {
                        case 48:
                            let i = _rtp__WEBPACK_IMPORTED_MODULE_2__.RTP_HEVC_PAYLOAD_HEADER_SIZE + (this.payloadContext.usingDonlField ? _rtp__WEBPACK_IMPORTED_MODULE_2__.RTP_HEVC_DONL_FIELD_SIZE : 0);
                            for (; i < this.queue[0].payload.length - _rtp__WEBPACK_IMPORTED_MODULE_2__.RTP_HEVC_PAYLOAD_HEADER_SIZE;) {
                                const size = (this.queue[0].payload[i] << 8) | this.queue[0].payload[i + 1];
                                const type = (this.queue[0].payload[i + 2] >>> 1) & 0x3f;
                                if (type === 34 /* hevc.HEVCNaluType.kSlicePPS */
                                    || type === 32 /* hevc.HEVCNaluType.kSliceVPS */
                                    || type === 33 /* hevc.HEVCNaluType.kSliceSPS */
                                    || type === 20 /* hevc.HEVCNaluType.kSliceIDR_N_LP */
                                    || type === 19 /* hevc.HEVCNaluType.kSliceIDR_W_RADL */
                                    || type === 35 /* hevc.HEVCNaluType.kSliceAUD */) {
                                    return true;
                                }
                                i += 2 + size;
                                if (this.payloadContext.usingDonlField) {
                                    i += _rtp__WEBPACK_IMPORTED_MODULE_2__.RTP_HEVC_DOND_FIELD_SIZE;
                                }
                            }
                            break;
                        case 49:
                            const fuHeader = this.queue[0].payload[2];
                            if ((fuHeader & 0x80)) {
                                return true;
                            }
                            break;
                        // case hevc.HEVCNaluType.kSlicePPS:
                        // case hevc.HEVCNaluType.kSliceSPS:
                        case 32 /* hevc.HEVCNaluType.kSliceVPS */:
                        // case hevc.HEVCNaluType.kSliceIDR_N_LP:
                        // case hevc.HEVCNaluType.kSliceIDR_W_RADL:
                        case 35 /* hevc.HEVCNaluType.kSliceAUD */:
                            return true;
                    }
                }
                else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 139 /* AVCodecID.AV_CODEC_ID_VP8 */) {
                    if (this.queue[0].payload[0] & 0x10) {
                        return true;
                    }
                }
                else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 167 /* AVCodecID.AV_CODEC_ID_VP9 */) {
                    if (this.queue[0].payload[0] & 0x08) {
                        return true;
                    }
                }
                else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                    if (this.queue[0].payload[0] & 0x01) {
                        return true;
                    }
                }
                else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */) {
                    if (((this.queue[0].payload[2] >>> 5) & 0x01) === 1) {
                        return true;
                    }
                }
                // 超过 200 个包开始输出，不用再等前面的包了，因为可能没有了
                if (this.readyPos > 200) {
                    return true;
                }
                return false;
            }
            else {
                return false;
            }
        }
    }
    check() {
        // 移动已就绪指针并且保存 masker 索引
        for (; this.readyPos < this.queue.length - 1;) {
            if (this.isSeqIncreaseOne(this.queue[this.readyPos].header.sequence, this.queue[this.readyPos + 1].header.sequence)) {
                this.readyPos++;
                if (this.queue[this.readyPos].header.masker
                    || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */
                    || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */
                    || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */
                    || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 69660 /* AVCodecID.AV_CODEC_ID_ADPCM_G722 */
                    || cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.codecpar + 4) === 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */) {
                    this.maskerQueue.push(this.readyPos);
                }
            }
            else {
                break;
            }
        }
    }
    push(packet) {
        // 已经输出帧之前的包直接忽略
        if (this.currentSeqStart > -1 && this.seqAMoreThenB(this.currentSeqStart, packet.header.sequence)) {
            return;
        }
        // 第一个直接 push 返回
        if (!this.queue.length) {
            this.queue.push(packet);
            if (packet.header.masker) {
                this.maskerQueue.push(0);
            }
            return;
        }
        let added = false;
        // seq 比队列中的第一个包小，插入到队首并重新处理 readyPos 和 maskerQueue
        if (this.seqAMoreThenB(this.queue[0].header.sequence, packet.header.sequence)) {
            this.queue.unshift(packet);
            this.readyPos = 0;
            this.maskerQueue.length = 0;
            added = true;
            this.check();
        }
        else {
            // 从 readyPos 开始查找当前的包需要插入的位置
            for (let i = this.readyPos; i < this.queue.length; i++) {
                if (this.seqAMoreThenB(this.queue[i].header.sequence, packet.header.sequence)) {
                    this.queue.splice(i, 0, packet);
                    added = true;
                    // 插入在当前的 readyPos 后一个位置，检查是否可以移动 readyPos 指针
                    if (i === this.readyPos + 1) {
                        this.check();
                    }
                    break;
                }
            }
        }
        // 没找到插入点，插入到最后
        if (!added) {
            this.queue.push(packet);
            // 插入在当前的 readyPos 后一个位置，检查是否可以移动 readyPos 指针
            if (this.readyPos + 2 === this.queue.length) {
                this.check();
            }
        }
        let offset = 0;
        // 将已经就绪的帧放进 frameQueue
        while (this.isFirstStart() && this.maskerQueue.length) {
            const makerPos = this.maskerQueue.shift() + 1;
            const packets = this.queue.slice(offset, makerPos);
            this.frameQueue.push(packets);
            offset = makerPos;
            this.currentSeqStart = packets[packets.length - 1].header.sequence;
        }
        if (offset) {
            this.queue = this.queue.slice(offset);
            // 更新 readyPos 和 剩余 masker 指针
            this.readyPos = Math.max(0, this.readyPos - offset);
            for (let i = 0; i < this.maskerQueue.length; i++) {
                this.maskerQueue[i] -= offset;
            }
        }
    }
    hasFrame() {
        return this.frameQueue.length;
    }
    getFrame() {
        return this.frameQueue.shift();
    }
}


/***/ }),

/***/ "./src/avprotocol/rtp/RTPPacket.ts":
/*!*****************************************!*\
  !*** ./src/avprotocol/rtp/RTPPacket.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RTPHeaderExtension: () => (/* binding */ RTPHeaderExtension),
/* harmony export */   RTPPacket: () => (/* binding */ RTPPacket),
/* harmony export */   RTPPacketHeader: () => (/* binding */ RTPPacketHeader)
/* harmony export */ });
/*
 * libmedia rtp packet
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
class RTPPacketHeader {
    version;
    padding;
    extension;
    csrc;
    masker;
    payloadType;
    sequence;
    timestamp;
    ssrc;
    csrcList = [];
}
class RTPHeaderExtension {
    id;
    length;
    extension;
    headers = new Map();
    hasOneByteExtensions() {
        return this.id === 0xBEDE;
    }
    hasTwoBytesExtensions() {
        return (this.id & 0b1111111111110000) == 0b0001000000000000;
    }
    parse() {
        if (this.hasOneByteExtensions()) {
            for (let i = 0; i < this.extension.length; i++) {
                const id = (this.extension[i] & 0xf0) >>> 4;
                const len = (this.extension[i] & 0x0f) + 1;
                // id=15 in One-Byte extensions means "stop parsing here".
                if (id === 15) {
                    break;
                }
                if (id !== 0) {
                    this.headers.set(id, this.extension.subarray(i + 1, i + 1 + len));
                    i += 1 + len;
                }
                else {
                    i++;
                }
            }
        }
        else if (this.hasTwoBytesExtensions()) {
            for (let i = 0; i < this.extension.length; i++) {
                const id = this.extension[i];
                const len = this.extension[i + 1];
                if (id !== 0) {
                    this.headers.set(id, this.extension.subarray(i + 2, i + 2 + len));
                    i += 2 + len;
                }
                else {
                    i++;
                }
            }
        }
    }
}
class RTPPacket {
    header;
    headerExtension;
    payload;
}


/***/ }),

/***/ "./src/avprotocol/rtp/depacketizer.ts":
/*!********************************************!*\
  !*** ./src/avprotocol/rtp/depacketizer.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ac3: () => (/* binding */ ac3),
/* harmony export */   av1: () => (/* binding */ av1),
/* harmony export */   concat: () => (/* binding */ concat),
/* harmony export */   h264: () => (/* binding */ h264),
/* harmony export */   hevc: () => (/* binding */ hevc),
/* harmony export */   mpeg12: () => (/* binding */ mpeg12),
/* harmony export */   mpeg4: () => (/* binding */ mpeg4),
/* harmony export */   vp8: () => (/* binding */ vp8),
/* harmony export */   vp9: () => (/* binding */ vp9)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _rtp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rtp */ "./src/avprotocol/rtp/rtp.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
var cheap__fileName__0 = "src\\avprotocol\\rtp\\depacketizer.ts";
/*
 * libmedia rtp depacketizer
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




function h264(rtps) {
    const nalus = [];
    let isKey = false;
    for (let i = 0; i < rtps.length; i++) {
        const payload = rtps[i].payload;
        const type = payload[0] & 0x1f;
        switch (type) {
            // STAP-A (one packet, multiple nalus)
            case 24:
                for (let j = 1; j < payload.length - 2;) {
                    const len = (payload[j] << 8) | payload[j + 1];
                    if (j + 2 + len > payload.length) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('pack h264 STAP-A failed', cheap__fileName__0, 52);
                        return {
                            nalus: [],
                            isKey
                        };
                    }
                    nalus.push(payload.subarray(j + 2, j + 2 + len));
                    if ((payload[j + 2] & 0x1f) === 5 /* h264Util.H264NaluType.kSliceIDR */) {
                        isKey = true;
                    }
                    j += 2 + len;
                }
                break;
            // STAP-B
            case 25:
            // MTAP-16            
            case 26:
            // MTAP-24           
            case 27:
            // FU-B              
            case 29:
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('not support nalu pack', cheap__fileName__0, 75);
                return {
                    nalus: [],
                    isKey
                };
            // FU-A
            case 28:
                const fuHeader = payload[1];
                if (((fuHeader >>> 7) & 0x01) !== 1) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('not the first FU-A packet', cheap__fileName__0, 84);
                    return {
                        nalus: [],
                        isKey
                    };
                }
                const nalType = fuHeader & 0x1f;
                const nal = (payload[0] & 0xe0) | nalType;
                if (nalType === 5 /* h264Util.H264NaluType.kSliceIDR */) {
                    isKey = true;
                }
                const buffers = [new Uint8Array([nal])];
                buffers.push(payload.subarray(2));
                i++;
                for (; i < rtps.length; i++) {
                    buffers.push(rtps[i].payload.subarray(2));
                    if ((rtps[i].payload[1] >>> 6) & 0x01) {
                        break;
                    }
                }
                nalus.push((0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers));
                break;
            default:
                if (type === 5 /* h264Util.H264NaluType.kSliceIDR */) {
                    isKey = true;
                }
                nalus.push(payload);
                break;
        }
    }
    return {
        nalus,
        isKey
    };
}
function hevc(rtps, context) {
    const nalus = [];
    let isKey = false;
    for (let i = 0; i < rtps.length; i++) {
        const payload = rtps[i].payload;
        const type = (payload[0] >>> 1) & 0x3f;
        if (type > 50) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('not support nalu pack', cheap__fileName__0, 131);
        }
        switch (type) {
            // STAP-A (one packet, multiple nalus)
            case 48:
                for (let j = _rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_HEVC_PAYLOAD_HEADER_SIZE + (context.usingDonlField ? _rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_HEVC_DONL_FIELD_SIZE : 0); j < payload.length - 2;) {
                    const len = (payload[j] << 8) | payload[j + 1];
                    if (j + 2 + len > payload.length) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('pack hevc STAP-A failed', cheap__fileName__0, 140);
                        return {
                            nalus: [],
                            isKey
                        };
                    }
                    nalus.push(payload.subarray(j + 2, j + 2 + len));
                    const nalType = (payload[j + 2] >>> 1) & 0x3f;
                    if (nalType === 20 /* hevcUtil.HEVCNaluType.kSliceIDR_N_LP */
                        || nalType === 19 /* hevcUtil.HEVCNaluType.kSliceIDR_W_RADL */) {
                        isKey = true;
                    }
                    j += 2 + len;
                    if (context.usingDonlField) {
                        j += _rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_HEVC_DOND_FIELD_SIZE;
                    }
                }
                break;
            // FU-A
            case 49:
                const fuHeader = payload[2];
                const nalType = fuHeader & 0x3f;
                if (nalType === 20 /* hevcUtil.HEVCNaluType.kSliceIDR_N_LP */
                    || nalType === 19 /* hevcUtil.HEVCNaluType.kSliceIDR_W_RADL */) {
                    isKey = true;
                }
                const buffers = [new Uint8Array([(payload[0] & 0x81 | (nalType << 1)), payload[1]])];
                buffers.push(payload.subarray(3 + (context.usingDonlField ? _rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_HEVC_DONL_FIELD_SIZE : 0)));
                i++;
                for (; i < rtps.length; i++) {
                    buffers.push(rtps[i].payload.subarray(3 + (context.usingDonlField ? _rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_HEVC_DONL_FIELD_SIZE : 0)));
                    if ((rtps[i].payload[2] >>> 6) & 0x01) {
                        break;
                    }
                }
                nalus.push((0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers));
                break;
            // PACI
            case 50:
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('not support nalu pack', cheap__fileName__0, 184);
                return {
                    nalus: [],
                    isKey
                };
            default:
                if (type === 20 /* hevcUtil.HEVCNaluType.kSliceIDR_N_LP */
                    || type === 19 /* hevcUtil.HEVCNaluType.kSliceIDR_W_RADL */) {
                    isKey = true;
                }
                nalus.push(payload);
                break;
        }
    }
    return {
        nalus,
        isKey
    };
}
function mpeg4(rtps, context) {
    const frames = [];
    const buffers = [];
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__["default"](_rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_MAX_PACKET_LENGTH);
    for (let i = 0; i < rtps.length; i++) {
        const payload = rtps[i].payload;
        if (context.latm) {
            let offset = 0;
            while (offset < payload.length) {
                let length = 0;
                while (true) {
                    const tmp = payload[offset++];
                    length += tmp;
                    if (tmp !== 0xff) {
                        break;
                    }
                }
                frames.push(payload.subarray(offset, offset + length));
                offset += length;
            }
        }
        else {
            if (payload.length < 2) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('invalid mpeg4 payload length', cheap__fileName__0, 228);
                return;
            }
            const auHeadersLength = (payload[0] << 8) | payload[1];
            if (auHeadersLength > _rtp__WEBPACK_IMPORTED_MODULE_1__.RTP_MAX_PACKET_LENGTH) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('invalid mpeg4 payload au header length', cheap__fileName__0, 233);
                return;
            }
            const auHeadersLengthBytes = ((auHeadersLength + 7) / 8) >>> 0;
            if (payload.length - 2 < auHeadersLengthBytes) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('invalid mpeg4 payload au length', cheap__fileName__0, 238);
                return;
            }
            const auHeaderSize = context.sizeLength + context.indexLength;
            // Wrong if optional additional sections are present (cts, dts etc...)
            if ((auHeadersLength % auHeaderSize) !== 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.error('not support mpeg4 payload au format', cheap__fileName__0, 245);
                return;
            }
            const nbAuHeaders = auHeadersLength / auHeaderSize;
            const sizes = [];
            const indexes = [];
            bitReader.reset();
            bitReader.appendBuffer(payload.subarray(2));
            for (let j = 0; j < nbAuHeaders; j++) {
                sizes.push(bitReader.readU(context.sizeLength));
                indexes.push(bitReader.readU(context.indexLength));
            }
            if (sizes.length === 1 && sizes[0] + auHeadersLengthBytes + 2 > payload.length) {
                buffers.push(payload.subarray(2 + auHeadersLengthBytes));
            }
            else if (sizes.length > 1) {
                let offset = auHeadersLengthBytes + 2;
                for (let j = 0; j < sizes.length; j++) {
                    if (!indexes[j] && buffers.length) {
                        frames.push((0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers));
                        buffers.length = 0;
                    }
                    frames.push(payload.subarray(offset, offset + sizes[j]));
                    offset += sizes[j];
                }
            }
        }
    }
    if (buffers.length) {
        frames.push(buffers.length === 1 ? buffers[0] : (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers));
    }
    return frames;
}
function vp8(rtps) {
    const buffers = [];
    let isKey = false;
    for (let i = 0; i < rtps.length; i++) {
        const X = rtps[i].payload[0] >>> 7;
        const S = (rtps[i].payload[0] >>> 4) & 0x01;
        const PID = rtps[i].payload[0] & 0x07;
        let offset = 1;
        if (X) {
            const I = rtps[i].payload[offset] >>> 7;
            const L = (rtps[i].payload[offset] >>> 6) & 0x01;
            const T = (rtps[i].payload[offset] >>> 5) & 0x01;
            const K = (rtps[i].payload[offset] >>> 4) & 0x01;
            offset++;
            // PictureID
            if (I) {
                // 7bit
                const M = rtps[i].payload[offset++] >>> 7;
                // 15 bit
                if (M) {
                    offset++;
                }
            }
            // TL0PICIDX
            if (L) {
                offset++;
            }
            if (T || K) {
                offset++;
            }
            if (S && PID === 0 && !(rtps[i].payload[offset] & 0x01)) {
                isKey = true;
            }
            buffers.push(rtps[i].payload.subarray(offset));
        }
    }
    if (buffers.length === 1) {
        return {
            payload: buffers[0],
            isKey
        };
    }
    return {
        payload: (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers),
        isKey
    };
}
// https://datatracker.ietf.org/doc/draft-uberti-payload-vp9/00/
function vp9(rtps) {
    const buffers = [];
    let isKey = false;
    for (let i = 0; i < rtps.length; i++) {
        const I = rtps[i].payload[0] >>> 7;
        const L = (rtps[i].payload[0] >>> 5) & 0x01;
        const F = (rtps[i].payload[0] >>> 4) & 0x01;
        const B = (rtps[i].payload[0] >>> 3) & 0x01;
        const V = (rtps[i].payload[0] >>> 1) & 0x01;
        let offset = 1;
        // PictureID
        if (I) {
            // 7bit
            const M = rtps[i].payload[offset++] >>> 7;
            // 15 bit
            if (M) {
                offset++;
            }
        }
        let R = 0;
        if (L) {
            if (F) {
                R = rtps[i].payload[offset] & 0x03;
            }
            offset++;
        }
        if (F) {
            for (let i = 0; i < R; i++) {
                if (rtps[i].payload[offset] & 0x10) {
                    offset += 2;
                }
                else {
                    offset += 1;
                }
            }
        }
        if (V) {
            const ns = rtps[i].payload[offset] >> 5;
            const y = !!(rtps[i].payload[offset] & 0x10);
            const g = !!(rtps[i].payload[offset] & 0x08);
            offset++;
            if (ns > 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_0__.fatal('VP9 scalability structure with multiple layers', cheap__fileName__0, 383);
            }
            if (y) {
                for (i = 0; i < ns + 1; i++) {
                    offset += 4;
                }
            }
            if (g) {
                const ng = rtps[i].payload[offset++];
                for (i = 0; i < ng; i++) {
                    const r = (rtps[i].payload[offset] >> 2) & 0x03;
                    offset++;
                    for (let j = 0; j < r; j++) {
                        offset++;
                    }
                }
            }
        }
        if (B) {
            const first = rtps[i].payload[offset];
            const version = (first >>> 5) & 0x01;
            const high = (first >>> 4) & 0x01;
            const profile = (high << 1) + version;
            const showExistingFrame = (first >>> (profile === 3 /* vp9Util.VP9Profile.Profile3 */ ? 2 : 3)) & 0x01;
            if (showExistingFrame) {
                isKey = false;
            }
            else {
                isKey = !((first >>> (profile === 3 /* vp9Util.VP9Profile.Profile3 */ ? 1 : 2)) & 0x01);
            }
        }
        buffers.push(rtps[i].payload.subarray(offset));
    }
    if (buffers.length === 1) {
        return {
            isKey,
            payload: buffers[0]
        };
    }
    return {
        isKey,
        payload: (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers)
    };
}
function av1(rtps) {
    const buffers = [];
    let isKey = false;
    function leb128(buffer, offset) {
        let value = 0;
        for (let i = 0; i < 8; i++) {
            let next = buffer[offset++];
            value |= ((next & 0x7f) << (i * 7));
            if (!(next & 0x80)) {
                break;
            }
        }
        return {
            value,
            offset
        };
    }
    for (let i = 0; i < rtps.length; i++) {
        const W = (rtps[i].payload[0] >>> 4) & 0x03;
        let offset = 1;
        if (W) {
            for (let i = 0; i < W - 1; i++) {
                const result = leb128(rtps[i].payload, offset);
                offset = result.offset;
                const type = (rtps[i].payload[offset] >>> 3) & 0x0f;
                if (type === 1 /* av1Util.OBUType.SEQUENCE_HEADER */) {
                    isKey = true;
                }
                buffers.push(rtps[i].payload.subarray(offset, offset + result.value));
                offset += result.value;
            }
            const type = (rtps[i].payload[offset] >>> 3) & 0x0f;
            if (type === 1 /* av1Util.OBUType.SEQUENCE_HEADER */) {
                isKey = true;
            }
            buffers.push(rtps[i].payload.subarray(offset));
        }
        else {
            while (offset < rtps[i].payload.length - 1) {
                const result = leb128(rtps[i].payload, offset);
                offset = result.offset;
                const type = (rtps[i].payload[offset] >>> 3) & 0x0f;
                if (type === 1 /* av1Util.OBUType.SEQUENCE_HEADER */) {
                    isKey = true;
                }
                buffers.push(rtps[i].payload.subarray(offset, offset + result.value));
                offset += result.value;
            }
        }
    }
    if (buffers.length === 1) {
        return {
            payload: buffers[0],
            isKey
        };
    }
    return {
        payload: (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers),
        isKey
    };
}
function mpeg12(rtps, mediaType) {
    const buffers = [];
    for (let i = 0; i < rtps.length; i++) {
        let offset = 4;
        if (mediaType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
            && ((rtps[i].payload[0] >>> 2) & 0x01) === 1) {
            offset = 8;
        }
        buffers.push(rtps[i].payload.subarray(offset));
    }
    if (buffers.length === 1) {
        return buffers[0];
    }
    return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers);
}
function ac3(rtps) {
    const frames = [];
    const buffers = [];
    for (let i = 0; i < rtps.length; i++) {
        const payload = rtps[i].payload;
        const ft = payload[0] & 0x03;
        switch (ft) {
            case 0:
                frames.push(payload.subarray(2));
                break;
            case 1:
            case 2:
                buffers.push(payload.subarray(2));
                break;
            case 3:
                buffers.push(payload.subarray(2));
                frames.push((0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers));
                buffers.length = 0;
                break;
        }
    }
    if (frames.length === 1) {
        return frames[0];
    }
    return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, frames);
}
function concat(rtps) {
    if (rtps.length === 1) {
        return rtps[0].payload;
    }
    const buffers = [];
    for (let i = 0; i < rtps.length; i++) {
        buffers.push(rtps[i].payload);
    }
    return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, buffers);
}


/***/ }),

/***/ "./src/avprotocol/rtp/fmtp.ts":
/*!************************************!*\
  !*** ./src/avprotocol/rtp/fmtp.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CodecIdFmtpHandler: () => (/* binding */ CodecIdFmtpHandler)
/* harmony export */ });
/* unused harmony exports parseH264Fmtp, parseHevcFmtp, parseMpeg4Fmtp, parseAacLatmFmtp */
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_base64__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/base64 */ "./src/common/util/base64.ts");
/* harmony import */ var avformat_codecs_h264__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avformat/codecs/h264 */ "./src/avformat/codecs/h264.ts");
/* harmony import */ var avformat_codecs_hevc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avformat/codecs/hevc */ "./src/avformat/codecs/hevc.ts");
/* harmony import */ var avformat_codecs_aac__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avformat/codecs/aac */ "./src/avformat/codecs/aac.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
var cheap__fileName__0 = "src\\avprotocol\\rtp\\fmtp.ts";









function eachConfig(config, callback) {
    const list = config.split(';');
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const l2 = item.split('=');
        const key = l2[0].trim();
        l2.shift();
        const value = l2.join('=').trim();
        callback(key, value);
    }
}
function parseH264Fmtp(stream, config) {
    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
    const context = {};
    eachConfig(config, (key, value) => {
        switch (key) {
            case 'profile-level-id':
                context.profile = +('0x' + value.substring(0, 2));
                context.level = +('0x' + value.substring(4, 6));
                break;
            case 'packetization-mode':
                context.packetizationMode = +value;
                break;
            case 'sprop-parameter-sets':
                const nalus = value.split(',').map((context) => {
                    return common_util_base64__WEBPACK_IMPORTED_MODULE_2__.base64ToUint8Array(context);
                });
                const extradata = avformat_codecs_h264__WEBPACK_IMPORTED_MODULE_3__.annexbExtradata2AvccExtradata(avutil_util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(nalus));
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(extradata.length);
                stream.codecpar.extradataSize = extradata.length;
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
                avformat_codecs_h264__WEBPACK_IMPORTED_MODULE_3__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                break;
        }
    });
    return context;
}
function parseHevcFmtp(stream, config) {
    const context = {};
    const nalus = [];
    stream.codecpar.bitFormat = 2 /* h264.BitFormat.ANNEXB */;
    eachConfig(config, (key, value) => {
        switch (key) {
            case 'profile-id':
                context.profile = +value;
                break;
            case 'sprop-vps':
            case 'sprop-sps':
            case 'sprop-pps':
            case 'sprop-sei':
                nalus.push(common_util_base64__WEBPACK_IMPORTED_MODULE_2__.base64ToUint8Array(value));
                break;
        }
    });
    if (nalus.length) {
        const extradata = avformat_codecs_hevc__WEBPACK_IMPORTED_MODULE_4__.annexbExtradata2AvccExtradata(avutil_util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(nalus));
        stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(extradata.length);
        stream.codecpar.extradataSize = extradata.length;
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.memcpyFromUint8Array)(stream.codecpar.extradata, extradata.length, extradata);
        avformat_codecs_hevc__WEBPACK_IMPORTED_MODULE_4__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
    }
    return context;
}
function parseMpeg4Fmtp(stream, config) {
    const context = {};
    eachConfig(config, (key, value) => {
        switch (key) {
            case 'streamtype':
                context.streamType = +value;
                break;
            case 'profile-level-id':
                context.profileLevelId = +value;
                break;
            case 'mode':
                context.mode = value;
                break;
            case 'sizelength':
                context.sizeLength = +value;
                break;
            case 'indexlength':
                context.indexLength = +value;
                break;
            case 'indexdeltalength':
                context.indexDeltaLength = +value;
                break;
            case 'config':
                context.config = value;
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(value.length / 2);
                stream.codecpar.extradataSize = value.length / 2;
                const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
                let offset = 0;
                for (let i = 0; i < value.length; i += 2) {
                    buffer[offset++] = +('0x' + value.substring(i, i + 2));
                }
                if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    avformat_codecs_aac__WEBPACK_IMPORTED_MODULE_5__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                }
                break;
        }
    });
    return context;
}
function parseAacLatmFmtp(stream, config) {
    const context = {
        latm: true
    };
    // change codec from AV_CODEC_ID_AAC_LATM to AV_CODEC_ID_AAC
    stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
    eachConfig(config, (key, value) => {
        switch (key) {
            case 'profile-level-id':
                context.profileLevelId = +value;
                break;
            case 'cpresent':
                context.cpresent = +value;
                break;
            case 'config':
                context.config = value;
                const config = new Uint8Array(value.length / 2);
                let offset = 0;
                for (let i = 0; i < value.length; i += 2) {
                    config[offset++] = +('0x' + value.substring(i, i + 2));
                }
                const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_7__["default"](config.length);
                bitReader.appendBuffer(config);
                const audioMuxVersion = bitReader.readU1();
                const sameTimeFraming = bitReader.readU1();
                bitReader.skip(6);
                const numPrograms = bitReader.readU(4);
                const numLayers = bitReader.readU(3);
                if (audioMuxVersion != 0
                    || sameTimeFraming != 1
                    || numPrograms != 0
                    || numLayers != 0) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_8__.fatal('LATM config not support', cheap__fileName__0, 186);
                }
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_0__.avMalloc)(2);
                stream.codecpar.extradataSize = 2;
                const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
                buffer[0] = bitReader.readU(8);
                buffer[1] = bitReader.readU(8);
                avformat_codecs_aac__WEBPACK_IMPORTED_MODULE_5__.parseAVCodecParameters(stream, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_1__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                break;
        }
    });
    return context;
}
const CodecIdFmtpHandler = {
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: parseH264Fmtp,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: parseHevcFmtp,
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: parseMpeg4Fmtp,
    [86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */]: parseAacLatmFmtp,
    [12 /* AVCodecID.AV_CODEC_ID_MPEG4 */]: parseMpeg4Fmtp
};


/***/ }),

/***/ "./src/avprotocol/rtp/isRtp.ts":
/*!*************************************!*\
  !*** ./src/avprotocol/rtp/isRtp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isRtp)
/* harmony export */ });
/*
 * libmedia judge is rtc packet
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
function isRtp(data) {
    return data.length > 12
        // DOC: https://tools.ietf.org/html/draft-ietf-avtcore-rfc5764-mux-fixes
        && (data[0] > 127 && data[0] < 192)
        // RTP Version must be 2.
        && (data[0] >>> 6) === 2;
}


/***/ }),

/***/ "./src/avprotocol/rtp/parser.ts":
/*!**************************************!*\
  !*** ./src/avprotocol/rtp/parser.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseRTPPacket: () => (/* binding */ parseRTPPacket)
/* harmony export */ });
/* harmony import */ var _RTPPacket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RTPPacket */ "./src/avprotocol/rtp/RTPPacket.ts");
/*
 * libmedia rtp parser
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

function parseRTPPacket(data) {
    const packet = new _RTPPacket__WEBPACK_IMPORTED_MODULE_0__.RTPPacket();
    const header = packet.header = new _RTPPacket__WEBPACK_IMPORTED_MODULE_0__.RTPPacketHeader();
    let offset = 0;
    header.version = data[offset] >> 6;
    header.padding = (data[offset] >> 5) & 0x01;
    header.extension = (data[offset] >> 4) & 0x01;
    header.csrc = data[offset] & 0x0f;
    offset++;
    header.masker = (data[offset] >> 7) & 0x01;
    header.payloadType = data[offset] & 0x7f;
    offset++;
    header.sequence = (data[offset] << 8) | data[offset + 1];
    offset += 2;
    header.timestamp = ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0;
    offset += 4;
    header.ssrc = ((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0;
    offset += 4;
    for (let i = 0; i < header.csrc; i++) {
        header.csrcList.push(((data[offset] << 24) | (data[offset + 1] << 16) | (data[offset + 2] << 8) | data[offset + 3]) >>> 0);
        offset += 4;
    }
    if (header.extension) {
        packet.headerExtension = packet.headerExtension = new _RTPPacket__WEBPACK_IMPORTED_MODULE_0__.RTPHeaderExtension();
        packet.headerExtension.id = (data[offset] << 8) | data[offset + 1];
        offset += 2;
        packet.headerExtension.length = (data[offset] << 8) | data[offset + 1];
        offset += 2;
        packet.headerExtension.extension = data.subarray(offset, packet.headerExtension.length * 4);
        offset += 4 * packet.headerExtension.length;
    }
    packet.payload = data.subarray(offset, data.length - (header.padding ? data[data.length - 1] : 0));
    return packet;
}


/***/ }),

/***/ "./src/avprotocol/rtp/rtp.ts":
/*!***********************************!*\
  !*** ./src/avprotocol/rtp/rtp.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RTPCodecName2AVCodeId: () => (/* binding */ RTPCodecName2AVCodeId),
/* harmony export */   RTP_HEVC_DOND_FIELD_SIZE: () => (/* binding */ RTP_HEVC_DOND_FIELD_SIZE),
/* harmony export */   RTP_HEVC_DONL_FIELD_SIZE: () => (/* binding */ RTP_HEVC_DONL_FIELD_SIZE),
/* harmony export */   RTP_HEVC_PAYLOAD_HEADER_SIZE: () => (/* binding */ RTP_HEVC_PAYLOAD_HEADER_SIZE),
/* harmony export */   RTP_MAX_PACKET_LENGTH: () => (/* binding */ RTP_MAX_PACKET_LENGTH),
/* harmony export */   StaticRTPPayloadCodec: () => (/* binding */ StaticRTPPayloadCodec)
/* harmony export */ });
/* unused harmony export RTP_PAYLOAD_PRIVATE */
/*
 * libmedia rtp
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
const RTP_MAX_PACKET_LENGTH = 8192;
const RTP_HEVC_PAYLOAD_HEADER_SIZE = 2;
const RTP_HEVC_DOND_FIELD_SIZE = 1;
const RTP_HEVC_DONL_FIELD_SIZE = 2;
const RTP_PAYLOAD_PRIVATE = 96;
const RTPCodecName2AVCodeId = {
    'PCMU': 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    'PCMA': 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    'G723': 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
    'G722': 69660 /* AVCodecID.AV_CODEC_ID_ADPCM_G722 */,
    'L16': 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    'MPA': 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    'MPV': 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    'MP2T': 131072 /* AVCodecID.AV_CODEC_ID_MPEG2TS */,
    'H264': 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    'H265': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'HEVC': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    'AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'opus': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'speex': 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    'vorbis': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'theora': 30 /* AVCodecID.AV_CODEC_ID_THEORA */,
    'MP4A-LATM': 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */,
    'MP4V-ES': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'mpeg4-generic': 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    'ac3': 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
};
const StaticRTPPayloadCodec = [
    {
        payload: 0,
        name: 'PCMU',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
        rate: 8000,
        encoding: 1
    },
    {
        payload: 4,
        name: 'G723',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
        rate: 8000,
        encoding: 1
    },
    {
        payload: 8,
        name: 'PCMA',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
        rate: 8000,
        encoding: 1
    },
    {
        payload: 9,
        name: 'G722',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 69660 /* AVCodecID.AV_CODEC_ID_ADPCM_G722 */,
        rate: 8000,
        encoding: 1
    },
    {
        payload: 10,
        name: 'L16',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
        rate: 44100,
        encoding: 2
    },
    {
        payload: 11,
        name: 'L16',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
        rate: 44100,
        encoding: 1
    },
    {
        payload: 14,
        name: 'MPA',
        codecType: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
        codecId: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
        rate: -1,
        encoding: -1
    },
    {
        payload: 31,
        name: 'H261',
        codecType: 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */,
        codecId: 3 /* AVCodecID.AV_CODEC_ID_H261 */,
        rate: 90000,
        encoding: -1
    },
    {
        payload: 32,
        name: 'MPV',
        codecType: 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */,
        codecId: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
        rate: 90000,
        encoding: -1
    },
    {
        payload: 33,
        name: 'MPV',
        codecType: 2 /* AVMediaType.AVMEDIA_TYPE_DATA */,
        codecId: 131072 /* AVCodecID.AV_CODEC_ID_MPEG2TS */,
        rate: 90000,
        encoding: -1
    },
    {
        payload: 34,
        name: 'H263',
        codecType: 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */,
        codecId: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
        rate: 90000,
        encoding: -1
    }
];


/***/ }),

/***/ "./src/avprotocol/rtsp/RtspSession.ts":
/*!********************************************!*\
  !*** ./src/avprotocol/rtsp/RtspSession.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RtspSession)
/* harmony export */ });
/* harmony import */ var common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/network/textMessage/message */ "./src/common/network/textMessage/message.ts");
/*
 * libmedia rtsp session
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

class RtspSession extends common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageSession {
    seq;
    version = 'RTSP/1.0';
    uri;
    authorization;
    constructor(uri, ioReader, ioWriter) {
        super(ioReader, ioWriter);
        this.seq = 1;
        this.uri = uri;
    }
    async options() {
        const req = new common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageRequest("OPTIONS" /* RtspMethod.OPTIONS */, this.uri, this.version, {
            CSeq: '' + this.seq++
        });
        return super.request(req);
    }
    async describe() {
        const req = new common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageRequest("DESCRIBE" /* RtspMethod.DESCRIBE */, this.uri, this.version, {
            CSeq: '' + this.seq++,
            Accept: 'application/sdp',
            Authorization: this.authorization
        });
        return super.request(req);
    }
    async setup(transport, sessionId = '') {
        let type = '';
        if (transport.streamMode === 2 /* RtspStreamingMode.TRANSPORT_TCP */) {
            type = '/TCP';
        }
        let interleaved = '';
        let clientPort = '';
        if (transport.streamMode === 1 /* RtspStreamingMode.TRANSPORT_UDP */) {
            clientPort = `;${transport.clientPort}-${transport.clientPort + 1}`;
        }
        else if (transport.streamMode === 2 /* RtspStreamingMode.TRANSPORT_TCP */) {
            interleaved = `;${transport.interleaved}-${transport.interleaved + 1}`;
        }
        const req = new common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageRequest("SETUP" /* RtspMethod.SETUP */, this.uri + `/trackID=${transport.trackId}`, this.version, {
            CSeq: '' + this.seq++,
            Session: sessionId,
            Authorization: this.authorization,
            Transport: `RTP/AVP${type};${transport.multcast ? 'multcast' : 'unicast'}${interleaved}${clientPort}`
        });
        return super.request(req);
    }
    async play(sessionId, range = { from: 0, to: -1 }) {
        const req = new common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageRequest("PLAY" /* RtspMethod.PLAY */, this.uri, this.version, {
            CSeq: '' + this.seq++,
            Session: sessionId,
            Authorization: this.authorization,
            Range: `npt=${range.from >= 0 ? range.from : 0}-${range.to > 0 ? range.to : ''}`
        });
        return super.request(req);
    }
    async pause(sessionId) {
        const req = new common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageRequest("PAUSE" /* RtspMethod.PAUSE */, this.uri, this.version, {
            CSeq: '' + this.seq++,
            Session: sessionId,
            Authorization: this.authorization
        });
        return super.request(req);
    }
    async teardown(sessionId) {
        const req = new common_network_textMessage_message__WEBPACK_IMPORTED_MODULE_0__.TextMessageRequest("TEARDOWN" /* RtspMethod.TEARDOWN */, this.uri, this.version, {
            CSeq: '' + this.seq++,
            Session: sessionId,
            Authorization: this.authorization
        });
        await super.notify(req);
    }
    async readPacket() {
        while (true) {
            // $
            if (await (this.ioReader.peekUint8()) !== 0x24) {
                await this.readResponse();
            }
            await this.ioReader.skip(1);
            const interleaved = await this.ioReader.readUint8();
            const len = await this.ioReader.readUint16();
            const data = await this.ioReader.readBuffer(len);
            return {
                interleaved,
                data
            };
        }
    }
}


/***/ }),

/***/ "./src/avutil/util/ntp.ts":
/*!********************************!*\
  !*** ./src/avutil/util/ntp.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
/*
 * libmedia ntp util
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
function parse(ntp) {
    const sec = ntp >> BigInt(32);
    const fracPart = ntp & BigInt(0xffffffff);
    const usec = (fracPart * BigInt(1000000)) / BigInt(0xffffffff);
    return (sec * BigInt(1000000)) + usec;
}


/***/ }),

/***/ "./src/common/network/textMessage/message.ts":
/*!***************************************************!*\
  !*** ./src/common/network/textMessage/message.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextMessageRequest: () => (/* binding */ TextMessageRequest),
/* harmony export */   TextMessageSession: () => (/* binding */ TextMessageSession)
/* harmony export */ });
/* unused harmony export TextMessageResponse */
/* harmony import */ var _util_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/object */ "./src/common/util/object.ts");

class TextMessageRequest {
    method;
    uri;
    protocol;
    headers;
    context;
    constructor(method, uri, protocol, headers = {}, context = '') {
        this.method = method;
        this.uri = uri;
        this.protocol = protocol;
        this.headers = headers;
        this.context = context;
    }
    setHeader(key, value) {
        this.headers[key] = value;
    }
    encode() {
        let text = `${this.method} ${this.uri} ${this.protocol}\r\n`;
        this.headers['Content-Length'] = this.context.length + '';
        _util_object__WEBPACK_IMPORTED_MODULE_0__.each(this.headers, (value, key) => {
            if (value) {
                text += `${key}: ${value}\r\n`;
            }
        });
        text += '\r\n';
        if (this.context) {
            text += this.context;
        }
        return text;
    }
}
class TextMessageResponse {
    protocol;
    statusCode;
    statusText;
    headers;
    context;
    constructor(protocol, statusCode, statusText, headers, context) {
        this.protocol = protocol;
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.headers = headers;
        this.context = context;
    }
}
class TextMessageSession {
    ioReader;
    ioWriter;
    constructor(ioReader, ioWriter) {
        this.ioReader = ioReader;
        this.ioWriter = ioWriter;
    }
    async readResponse() {
        let head = (await this.ioReader.readLine()).trim().split(' ');
        let context = '';
        let headers = {};
        while (true) {
            const line = (await this.ioReader.readLine()).trim();
            // 响应头结束
            if (!line) {
                break;
            }
            const item = line.split(':');
            headers[item[0].trim()] = item[1].trim();
        }
        if (headers['Content-Length']) {
            context = await this.ioReader.readString(+headers['Content-Length']);
        }
        return new TextMessageResponse(head[0].trim(), +head[1].trim(), head[2].trim(), headers, context);
    }
    async request(request) {
        this.ioWriter.reset();
        this.ioWriter.writeString(request.encode());
        this.ioWriter.flush();
        return this.readResponse();
    }
    async notify(request) {
        this.ioWriter.reset();
        this.ioWriter.writeString(request.encode());
        await this.ioWriter.flush();
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IRtspFormat_ts.avtranscoder.js.map