"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_isom_tags_ts-src_avutil_codecs_opus_ts"],{

/***/ "./src/avformat/formats/isom/tags.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/isom/tags.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   codecMovAudioTags: () => (/* binding */ codecMovAudioTags),
/* harmony export */   codecMovSubtiteTags: () => (/* binding */ codecMovSubtiteTags),
/* harmony export */   codecMovVideoTags: () => (/* binding */ codecMovVideoTags)
/* harmony export */ });
/* harmony import */ var _function_mktagle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktagle */ "./src/avformat/function/mktagle.ts");
/*
 * libmedia isom tag defined
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

const codecMovVideoTags = {
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4v')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVID')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('3IV2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vvc1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vvi1')]: 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hvc1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvhe')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('hev1')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc2')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc3')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc4')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai5p')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai5q')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai52')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai53')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai55')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai56')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai1p')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai1q')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai12')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai13')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai15')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ai16')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AVin')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('aivx')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('rv64')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('xalg')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avlg')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dva1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvav')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vp08')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('vp09')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('av01')]: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
};
const codecMovAudioTags = {
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4a')]: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sac3')]: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ac-4')]: 86119 /* AVCodecID.AV_CODEC_ID_AC4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsc')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsh')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtsl')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dtse')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DTS ')]: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ec-3')]: 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('.mp3')]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp3 ')]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [0x6D730055]: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('spex')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SPXN')]: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fLaC')]: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('Opus')]: 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('alaw')]: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ulaw')]: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fl32')]: 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('fl64')]: 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('twos')]: 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('lpcm')]: 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sowt')]: 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('in24')]: 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('in32')]: 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('sowt')]: 65540 /* AVCodecID.AV_CODEC_ID_PCM_S8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('raw ')]: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('NONE')]: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */
};
const codecMovSubtiteTags = {
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('text')]: 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('tx3g')]: 94213 /* AVCodecID.AV_CODEC_ID_MOV_TEXT */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('c608')]: 94218 /* AVCodecID.AV_CODEC_ID_EIA_608 */
};


/***/ }),

/***/ "./src/avutil/codecs/opus.ts":
/*!***********************************!*\
  !*** ./src/avutil/codecs/opus.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   getBufferSamples: () => (/* binding */ getBufferSamples),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* unused harmony export durations */
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var _util_rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/rational */ "./src/avutil/util/rational.ts");
/*
 * libmedia opus util
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



const durations = [
    /* Silk NB */
    480, 960, 1920, 2880,
    /* Silk MB */
    480, 960, 1920, 2880,
    /* Silk WB */
    480, 960, 1920, 2880,
    /* Hybrid SWB */
    480, 960,
    /* Hybrid FB */
    480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960,
    /* CELT NB */
    120, 240, 480, 960
];
function getBufferSamples(buffer) {
    let toc = 0, frameDuration = 0, nframes = 0;
    if (buffer.length < 1) {
        return 0;
    }
    toc = buffer[0];
    frameDuration = durations[toc >> 3];
    switch (toc & 3) {
        case 0:
            nframes = 1;
            break;
        case 1:
            nframes = 2;
            break;
        case 2:
            nframes = 2;
            break;
        case 3:
            if (buffer.length < 2) {
                return 0;
            }
            nframes = buffer[1] & 63;
            break;
    }
    return nframes * frameDuration;
}
/**
 * opus extradata
 *
 * - 8 bytes Magic Signature: OpusHead
 * - 1 bytes unsigned, 对应值 0x01 version
 * - 1 bytes unsigned, channels 它可能和编码声道数不一致， 它可能被修改成 packet-by-packet, 对应值 0x01
 * - 2 bytes unsigned, preSkip 这是要从开始播放时的解码器输出， 从页面的颗粒位置减去以计算其 PCM 样本位置。
 * - 4 bytes unsigned, sampleRate 原始输入采样率
 * - 2 bytes signed, outputGain 这是解码时要应用的增益， 20 * log10 缩放解码器输出以实现所需的播放音量
 * - 1 bytes unsigned, channelMappingFamily 指示输出渠道的顺序和语音含义。该八位位组的每个当前指定的值表示一个映射系列，它定义了一组允许的通道数，以及每个允许的通道数的通道名称的有序集合
 * - channelMappingTable 可选， 当 Channel Mapping Family 为 0 时被省略。
 *  - 1 bytes, streamCount, unsigned ogg packet 里面编码了多少路 stream
 *  - 1 bytes, coupledStreamCount, unsigned 标识有多少路流是双声声道，必须小于 streamCount
 *  - C bytes, C 为总输出声道数 coupledStreamCount + streamCount
 *
 */
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 19) {
        const reader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_0__["default"](extradata, false);
        reader.skip(9);
        stream.codecpar.chLayout.nbChannels = reader.readUint8();
        stream.codecpar.initialPadding = reader.readUint16();
        stream.codecpar.sampleRate = reader.readUint32();
        stream.codecpar.seekPreroll = Number((0,_util_rational__WEBPACK_IMPORTED_MODULE_2__.avRescaleQ)(BigInt(80), {
            den: 1000,
            num: 1
        }, {
            den: 48000,
            num: 1
        }));
    }
}
function avCodecParameters2Extradata(codecpar) {
    const extradata = new Uint8Array(19);
    const writer = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_1__["default"](extradata, false);
    writer.writeString('OpusHead');
    writer.writeUint8(0x01);
    writer.writeUint8(codecpar.chLayout.nbChannels);
    writer.writeUint16(codecpar.initialPadding);
    writer.writeUint32(codecpar.sampleRate);
    return extradata;
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_isom_tags_ts-src_avutil_codecs_opus_ts.avplayer.js.map