"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_mov_boxType_ts-src_avformat_formats_mov_function_createFragmentTrack_ts--47564e"],{

/***/ "./src/avformat/formats/mov/boxType.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/mov/boxType.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContainerBoxs: () => (/* binding */ ContainerBoxs),
/* harmony export */   FullBoxs: () => (/* binding */ FullBoxs)
/* harmony export */ });
/* unused harmony export BasicBoxs */
/*
 * libmedia mp4 box defined
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
const BasicBoxs = [
    "ftyp" /* BoxType.FTYP */,
    "mdat" /* BoxType.MDAT */,
    "idat" /* BoxType.IDAT */,
    "free" /* BoxType.FREE */,
    "skip" /* BoxType.SKIP */,
    "meco" /* BoxType.MECO */,
    "strk" /* BoxType.STRK */,
];
const FullBoxs = [
    "hmhd" /* BoxType.HMHD */,
    "nmhd" /* BoxType.NMHD */,
    "iods" /* BoxType.IODS */,
    "xml " /* BoxType.XML */,
    "url " /* BoxType.URL */,
    "bxml" /* BoxType.BXML */,
    "ipro" /* BoxType.IPRO */,
    "mere" /* BoxType.MERE */,
    "stts" /* BoxType.STTS */,
    "ctts" /* BoxType.CTTS */,
    "stss" /* BoxType.STSS */,
    "stsz" /* BoxType.STSZ */,
    "stz2" /* BoxType.STZ2 */,
    "stsc" /* BoxType.STSC */,
    "stco" /* BoxType.STCO */,
    "co64" /* BoxType.CO64 */,
    "stsd" /* BoxType.STSD */,
    "dref" /* BoxType.DREF */,
    "mvhd" /* BoxType.MVHD */,
    "tkhd" /* BoxType.TKHD */,
    "mdhd" /* BoxType.MDHD */,
    "hdlr" /* BoxType.HDLR */
];
const ContainerBoxs = [
    "moov" /* BoxType.MOOV */,
    "trak" /* BoxType.TRAK */,
    "edts" /* BoxType.EDTS */,
    "mdia" /* BoxType.MDIA */,
    "minf" /* BoxType.MINF */,
    "dinf" /* BoxType.DINF */,
    "stbl" /* BoxType.STBL */,
    "mvex" /* BoxType.MVEX */,
    "moof" /* BoxType.MOOF */,
    "traf" /* BoxType.TRAF */,
    "vttc" /* BoxType.VTTC */,
    "tref" /* BoxType.TREF */,
    "iref" /* BoxType.IREF */,
    "mfra" /* BoxType.MFRA */,
    "hnti" /* BoxType.HNTI */,
    "hinf" /* BoxType.HINF */,
    "strd" /* BoxType.STRD */,
    "sinf" /* BoxType.SINF */,
    "rinf" /* BoxType.RINF */,
    "schi" /* BoxType.SCHI */,
    "trgr" /* BoxType.TRGR */,
    "udta" /* BoxType.UDTA */,
    "iprp" /* BoxType.IPRP */,
    "ipco" /* BoxType.IPCO */,
    "strk" /* BoxType.STRK */,
    "meco" /* BoxType.MECO */,
    "encv" /* BoxType.ENCV */,
    "enca" /* BoxType.ENCA */,
    "sinf" /* BoxType.SINF */,
    "schi" /* BoxType.SCHI */
];


/***/ }),

/***/ "./src/avformat/formats/mov/function/createFragmentTrack.ts":
/*!******************************************************************!*\
  !*** ./src/avformat/formats/mov/function/createFragmentTrack.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createFragmentTrack)
/* harmony export */ });
/*
 * libmedia create fragment track
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
function createFragmentTrack() {
    return {
        trackId: 0,
        baseDataOffset: BigInt(0),
        defaultSampleDuration: 0,
        defaultSampleSize: 0,
        defaultSampleFlags: 0,
        baseMediaDecodeTime: BigInt(0),
        sampleCount: 0,
        dataOffset: 0,
        remainDataOffsets: [],
        remainDataOffsetIndex: [],
        dataOffsetPos: BigInt(0),
        firstSampleFlags: 0,
        sampleDurations: [],
        sampleSizes: [],
        sampleFlags: [],
        sampleCompositionTimeOffset: [],
        baseIsMoof: false,
        ioWriter: null,
        buffers: []
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/createMovContext.ts":
/*!***************************************************************!*\
  !*** ./src/avformat/formats/mov/function/createMovContext.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMovContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia create mov context
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

function createMovContext() {
    return {
        isom: false,
        timescale: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        duration: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT,
        foundMoov: false,
        foundMdat: false,
        majorBrand: 0,
        minorVersion: 0,
        compatibleBrand: [],
        creationTime: BigInt(0),
        modificationTime: BigInt(0),
        rate: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        volume: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        matrix: null,
        nextTrackId: 1,
        fragment: false,
        trexs: [],
        currentFragment: null,
        boxsPositionInfo: [],
        holdMoovPos: BigInt(0),
        currentChunk: null
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/function/createMovStreamContext.ts":
/*!*********************************************************************!*\
  !*** ./src/avformat/formats/mov/function/createMovStreamContext.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMovStreamContext)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia create mov stream context
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

function createMovStreamContext() {
    return {
        chunkOffsets: null,
        cttsSampleCounts: null,
        cttsSampleOffsets: null,
        stscFirstChunk: null,
        stscSamplesPerChunk: null,
        stscSampleDescriptionIndex: null,
        stssSampleNumbersMap: null,
        stssSampleNumbers: null,
        sampleSizes: null,
        sttsSampleCounts: null,
        sttsSampleDeltas: null,
        duration: BigInt(0),
        trackId: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        layer: 0,
        alternateGroup: 0,
        volume: 0,
        matrix: null,
        width: 0,
        height: 0,
        audioCid: 0,
        samplesPerFrame: 0,
        bytesPerFrame: 0,
        currentSample: 0,
        sampleEnd: false,
        samplesIndex: [],
        samplesEncryption: [],
        fragIndexes: [],
        lastPts: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT,
        lastDts: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT,
        startDts: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT,
        startCT: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
        startPts: avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT,
        lastDuration: 0,
        chunkCount: 0,
        firstWrote: false,
        lastStscCount: 0,
        perStreamGrouping: false,
        index: 0,
        flags: 0
    };
}


/***/ }),

/***/ "./src/avformat/formats/mov/mov.ts":
/*!*****************************************!*\
  !*** ./src/avformat/formats/mov/mov.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVCodecID2Mp4a: () => (/* binding */ AVCodecID2Mp4a),
/* harmony export */   HandlerType2MediaType: () => (/* binding */ HandlerType2MediaType),
/* harmony export */   Mp4aObj2AVCodecID: () => (/* binding */ Mp4aObj2AVCodecID),
/* harmony export */   tag2CodecId: () => (/* binding */ tag2CodecId)
/* harmony export */ });
/* unused harmony export Mp4Tag2AVCodecID */
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktag */ "./src/avformat/function/mktag.ts");
/*
 * libmedia mp4 identify defined
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

const Mp4Tag2AVCodecID = {
    mp4v: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    avc1: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    avc3: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    hev1: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    hvc1: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    vvc1: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    vvi1: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    vp09: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    av01: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    mp4a: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    opus: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */
};
const AVCodecID2Mp4a = {
    [86018 /* AVCodecID.AV_CODEC_ID_AAC */]: 0x40,
    [86017 /* AVCodecID.AV_CODEC_ID_MP3 */]: 0x69,
    [86076 /* AVCodecID.AV_CODEC_ID_OPUS */]: 0xAD,
    [86028 /* AVCodecID.AV_CODEC_ID_FLAC */]: 0xC1,
    [86021 /* AVCodecID.AV_CODEC_ID_VORBIS */]: 0xDD,
    [12 /* AVCodecID.AV_CODEC_ID_MPEG4 */]: 0x20,
    [27 /* AVCodecID.AV_CODEC_ID_H264 */]: 0x21,
    [173 /* AVCodecID.AV_CODEC_ID_HEVC */]: 0x23,
    [196 /* AVCodecID.AV_CODEC_ID_VVC */]: 0x33,
    [167 /* AVCodecID.AV_CODEC_ID_VP9 */]: 0xB1,
    [0 /* AVCodecID.AV_CODEC_ID_NONE */]: 0
};
const Mp4aObj2AVCodecID = {
    0x20: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    0x21: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    0x23: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    0x33: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    0xB1: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    0x40: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x66: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x67: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x68: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x69: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    0x6B: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    0xAD: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    0xC1: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    0xDD: 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    0: 0 /* AVCodecID.AV_CODEC_ID_NONE */
};
const HandlerType2MediaType = {
    vide: 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */,
    soun: 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */,
    clcp: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    sbtl: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    subt: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    subp: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */,
    text: 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */
};
const tag2CodecId = {
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])("mp4a" /* BoxType.MP4A */)]: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    [0x6D730055]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('Opus')]: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('fLaC')]: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('spex')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('SPXN')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('sac3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"]["mp4v" /* BoxType.MP4V */]]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('av01')]: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vp08')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vp09')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('hvc1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vvc1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('vvi1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('text')]: 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */,
    [(0,_function_mktag__WEBPACK_IMPORTED_MODULE_0__["default"])('tx3g')]: 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */
};


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

/***/ "./src/avutil/codecs/ac3.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/ac3.ts ***!
  \**********************************/
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
    3 /* AVChannelLayout.AV_CHANNEL_LAYOUT_STEREO */,
    4 /* AVChannelLayout.AV_CHANNEL_LAYOUT_MONO */,
    3 /* AVChannelLayout.AV_CHANNEL_LAYOUT_STEREO */,
    7 /* AVChannelLayout.AV_CHANNEL_LAYOUT_SURROUND */,
    259 /* AVChannelLayout.AV_CHANNEL_LAYOUT_2_1 */,
    263 /* AVChannelLayout.AV_CHANNEL_LAYOUT_4POINT0 */,
    1539 /* AVChannelLayout.AV_CHANNEL_LAYOUT_2_2 */,
    1543 /* AVChannelLayout.AV_CHANNEL_LAYOUT_5POINT0 */
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
        info.channelLayout |= BigInt(8 /* AVChannelLayout.AV_CHANNEL_LAYOUT_LOW_FREQUENCY */);
    }
    return info;
}


/***/ }),

/***/ "./src/avutil/codecs/flac.ts":
/*!***********************************!*\
  !*** ./src/avutil/codecs/flac.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlockSizeTable: () => (/* binding */ BlockSizeTable),
/* harmony export */   FLAC_MAX_CHANNELS: () => (/* binding */ FLAC_MAX_CHANNELS),
/* harmony export */   FLAC_STREAMINFO_SIZE: () => (/* binding */ FLAC_STREAMINFO_SIZE),
/* harmony export */   SampleRateTable: () => (/* binding */ SampleRateTable),
/* harmony export */   SampleSizeTable: () => (/* binding */ SampleSizeTable),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* unused harmony exports FLAC_MIN_BLOCKSIZE, FLAC_MAX_BLOCKSIZE, FLAC_MIN_FRAME_SIZE */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/*
 * libmedia flac util
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

const FLAC_STREAMINFO_SIZE = 34;
const FLAC_MAX_CHANNELS = 8;
const FLAC_MIN_BLOCKSIZE = 16;
const FLAC_MAX_BLOCKSIZE = 65535;
const FLAC_MIN_FRAME_SIZE = 10;
const SampleSizeTable = [0, 8, 12, 0, 16, 20, 24, 32];
const SampleRateTable = [
    0, 88200, 176400, 192000, 8000, 16000, 22050,
    24000, 32000, 44100, 48000, 96000,
    0, 0, 0, 0
];
const BlockSizeTable = [
    0, 192,
    576,
    1152,
    2304,
    4608,
    0, 0,
    256,
    512,
    1024,
    2048,
    4096,
    8192,
    16384,
    32768
];
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length === FLAC_STREAMINFO_SIZE) {
        const { bitsPerRawSample, sampleRate, channels } = getAVCodecParameters(extradata);
        stream.codecpar.bitsPerRawSample = bitsPerRawSample;
        stream.codecpar.sampleRate = sampleRate;
        stream.codecpar.chLayout.nbChannels = channels;
    }
}
function getAVCodecParameters(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](extradata);
    bufferReader.skip(10);
    const value = bufferReader.readUint24();
    const sampleRate = (value >> 4);
    const channels = ((value & 0x0f) >>> 1) + 1;
    const bitPerSample = bufferReader.readUint8();
    return {
        sampleRate,
        channels,
        bitsPerRawSample: (((value & 0x01) << 4) | ((bitPerSample & 0xf0) >>> 4)) + 1
    };
}


/***/ }),

/***/ "./src/avutil/util/encryption.ts":
/*!***************************************!*\
  !*** ./src/avutil/util/encryption.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encryptionInfo2SideData: () => (/* binding */ encryptionInfo2SideData),
/* harmony export */   encryptionInitInfo2SideData: () => (/* binding */ encryptionInitInfo2SideData),
/* harmony export */   encryptionSideData2Info: () => (/* binding */ encryptionSideData2Info),
/* harmony export */   encryptionSideData2InitInfo: () => (/* binding */ encryptionSideData2InitInfo)
/* harmony export */ });
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/*
 * libmedia encryption util
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


// The format of the AVEncryptionInfo side data:
// u32be scheme
// u32be crypt_byte_block
// u32be skip_byte_block
// u32be key_id_size
// u32be iv_size
// u32be subsample_count
// u8[key_id_size] key_id
// u8[iv_size] iv
// {
//   u32be bytes_of_clear_data
//   u32be bytes_of_protected_data
// }[subsample_count]
function encryptionSideData2Info(buffer) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](buffer, true);
    const scheme = bufferReader.readUint32();
    const cryptByteBlock = bufferReader.readUint32();
    const skipByteBlock = bufferReader.readUint32();
    const keyIdSize = bufferReader.readUint32();
    const ivSize = bufferReader.readUint32();
    const subsampleCount = bufferReader.readUint32();
    const info = {
        scheme,
        cryptByteBlock,
        skipByteBlock,
        keyId: bufferReader.readBuffer(keyIdSize),
        iv: bufferReader.readBuffer(ivSize),
        subsamples: []
    };
    if (subsampleCount) {
        for (let i = 0; i < subsampleCount; i++) {
            info.subsamples.push({
                bytesOfClearData: bufferReader.readUint32(),
                bytesOfProtectedData: bufferReader.readUint32()
            });
        }
    }
    return info;
}
function encryptionInfo2SideData(info) {
    const buffer = new Uint8Array(24 + info.keyId.length + info.iv.length + info.subsamples.length * 8);
    const writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](buffer, true);
    writer.writeUint32(info.scheme);
    writer.writeUint32(info.cryptByteBlock);
    writer.writeUint32(info.skipByteBlock);
    writer.writeUint32(info.keyId.length);
    writer.writeUint32(info.iv.length);
    writer.writeUint32(info.subsamples.length);
    writer.writeBuffer(info.keyId);
    writer.writeBuffer(info.iv);
    info.subsamples.forEach((item) => {
        writer.writeUint32(item.bytesOfClearData);
        writer.writeUint32(item.bytesOfProtectedData);
    });
    return buffer;
}
// The format of the AVEncryptionInitInfo side data:
// u32be init_info_count
// {
//   u32be system_id_size
//   u32be num_key_ids
//   u32be key_id_size
//   u32be data_size
//   u8[system_id_size] system_id
//   u8[key_id_size][num_key_id] key_ids
//   u8[data_size] data
// }[init_info_count]
function encryptionSideData2InitInfo(buffer) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](buffer, true);
    const count = bufferReader.readUint32();
    const infos = [];
    for (let i = 0; i < count; i++) {
        const systemIdSize = bufferReader.readUint32();
        const numKeyIds = bufferReader.readUint32();
        const keyIdSize = bufferReader.readUint32();
        const dataSize = bufferReader.readUint32();
        const info = {
            systemId: bufferReader.readBuffer(systemIdSize),
            keyIds: [],
            data: null
        };
        if (numKeyIds) {
            for (let i = 0; i < numKeyIds; i++) {
                info.keyIds.push(bufferReader.readBuffer(keyIdSize));
            }
        }
        info.data = bufferReader.readBuffer(dataSize);
        infos.push(info);
    }
    return infos;
}
function encryptionInitInfo2SideData(infos) {
    let size = 4;
    infos.forEach((info) => {
        size += 16 + info.systemId.length + info.keyIds.length * (info.keyIds.length ? info.keyIds[0].length : 0) + info.data.length;
    });
    const buffer = new Uint8Array(size);
    const writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](buffer, true);
    writer.writeUint32(infos.length);
    infos.forEach((info) => {
        writer.writeUint32(info.systemId.length);
        writer.writeUint32(info.keyIds.length);
        writer.writeUint32(info.keyIds.length ? info.keyIds[0].length : 0);
        writer.writeUint32(info.data.length);
        writer.writeBuffer(info.systemId);
        info.keyIds.forEach((keyId) => {
            writer.writeBuffer(keyId);
        });
        writer.writeBuffer(info.data);
    });
    return buffer;
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_mov_boxType_ts-src_avformat_formats_mov_function_createFragmentTrack_ts--47564e.avtranscoder.js.map