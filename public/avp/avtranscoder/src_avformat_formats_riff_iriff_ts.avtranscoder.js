"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_riff_iriff_ts"],{

/***/ "./src/avformat/formats/riff/iriff.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/riff/iriff.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readBmpHeader: () => (/* binding */ readBmpHeader),
/* harmony export */   readFormatTag: () => (/* binding */ readFormatTag),
/* harmony export */   readInfo: () => (/* binding */ readInfo),
/* harmony export */   readWavHeader: () => (/* binding */ readWavHeader)
/* harmony export */ });
/* unused harmony exports getWavCodecId, getGuidCodecId, readWaveformatex */
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./riff */ "./src/avformat/formats/riff/riff.ts");
/* harmony import */ var avutil_util_pcm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/pcm */ "./src/avutil/util/pcm.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");
/* harmony import */ var avutil_util_channel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/channel */ "./src/avutil/util/channel.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\riff\\iriff.ts";











function getWavCodecId(tag, bitsPerCodedSample) {
    let codecId = _riff__WEBPACK_IMPORTED_MODULE_5__.WavTag2CodecId[tag];
    if (!codecId) {
        return 0 /* AVCodecID.AV_CODEC_ID_NONE */;
    }
    if (codecId === 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */) {
        codecId = (0,avutil_util_pcm__WEBPACK_IMPORTED_MODULE_6__.getPcmCodecId)(bitsPerCodedSample, false, false, ~1);
    }
    else if (codecId === 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */) {
        codecId = (0,avutil_util_pcm__WEBPACK_IMPORTED_MODULE_6__.getPcmCodecId)(bitsPerCodedSample, true, false, 0);
    }
    if (codecId === 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */ && bitsPerCodedSample === 8) {
        codecId = 69676 /* AVCodecID.AV_CODEC_ID_ADPCM_ZORK */;
    }
    return codecId;
}
function getGuidCodecId(guid) {
    let codecId = _riff__WEBPACK_IMPORTED_MODULE_5__.codecBmpGuid[guid.toLocaleUpperCase()];
    if (!codecId) {
        return 0 /* AVCodecID.AV_CODEC_ID_NONE */;
    }
    return codecId;
}
async function readFormatTag(ioReader, codecpar, size) {
    if (size < 14) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('wav format size < 14', cheap__fileName__0, 49);
        return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
    const audioFormat = await ioReader.readUint16();
    let channels = await ioReader.readUint16();
    const sampleRate = await ioReader.readUint32();
    let bitrate = await ioReader.readUint32() * 8;
    const blockAlgin = await ioReader.readUint16();
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 136, sampleRate);
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 140, blockAlgin);
    if (size === 14) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 40, 8);
    }
    else {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 40, await ioReader.readUint16());
    }
    if (audioFormat === 0xfffe) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[8](codecpar + 8, 0);
    }
    else {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[8](codecpar + 8, audioFormat);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 4, getWavCodecId(audioFormat, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 40)));
    }
    if (size >= 18 && audioFormat !== 0x0165) {
        let cbSize = await ioReader.readUint16();
        size -= 18;
        cbSize = Math.min(size, cbSize);
        if (cbSize >= 22 && audioFormat === 0xfffe) {
            // TODO parse wave format ex
            await ioReader.skip(22);
            cbSize -= 22;
            size -= 22;
        }
        if (cbSize > 0) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](codecpar + 12, (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(cbSize));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 16, cbSize);
            await ioReader.readBuffer(cbSize, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](codecpar + 12), cbSize));
            size -= cbSize;
        }
        if (size > 0) {
            await ioReader.skip(size);
        }
    }
    else if (audioFormat === 0x0165 && size >= 32) {
        size -= 4;
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[20](codecpar + 12, (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(size));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 16, size);
        await ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](codecpar + 12), size));
        const streams = avutil_util_intread__WEBPACK_IMPORTED_MODULE_9__.rl16(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](codecpar + 12) + 4);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 136, avutil_util_intread__WEBPACK_IMPORTED_MODULE_9__.rl32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](codecpar + 12) + 12));
        channels = 0;
        bitrate = 0;
        if (size < 8 + streams * 20) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        for (let i = 0; i < streams; i++) {
            channels += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[2](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](codecpar + 12) + (8 + i * 20 + 17));
        }
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](codecpar + 32, BigInt(bitrate));
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 136) < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`Invalid sample rate: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 136)}`, cheap__fileName__0, 129);
        return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
    }
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 4) === 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */) {
        channels = 0;
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 136, 0);
    }
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 4) == 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */ && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 136)) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 40, Number(BigInt.asIntN(32, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](codecpar + 32))) / cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 136));
    }
    if (channels != cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](codecpar + 116)) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 112, 0 /* AVChannelOrder.AV_CHANNEL_ORDER_UNSPEC */);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](codecpar + 116, channels);
    }
    return 0;
}
async function readInfo(ioReader, size, metadata) {
    const end = ioReader.getPos() + size;
    while (ioReader.getPos() < end) {
        const key = await ioReader.readString(4);
        const size = await ioReader.readUint32();
        const value = await ioReader.readString(size);
        metadata[key] = value;
        if (size % 2) {
            await ioReader.skip(1);
        }
    }
}
async function readBmpHeader(ioReader, stream) {
    const esize = await ioReader.readUint32();
    stream.codecpar.width = await ioReader.readUint32();
    stream.codecpar.height = await ioReader.readUint32();
    await ioReader.skip(2);
    stream.codecpar.bitsPerCodedSample = await ioReader.readUint16();
    stream.codecpar.codecTag = await ioReader.readUint32();
    await ioReader.skip(20);
    return esize;
}
async function readWaveformatex(ioReader, stream) {
    const bsp = await ioReader.readUint16();
    if (bsp) {
        stream.codecpar.bitsPerCodedSample = bsp;
    }
    const mask = await ioReader.readUint32();
    (0,avutil_util_channel__WEBPACK_IMPORTED_MODULE_10__.setChannelLayoutFromMask)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112, BigInt(mask));
    const subFormat = (await ioReader.readHex(16)).toLocaleUpperCase();
    if (subFormat.slice(4) === _riff__WEBPACK_IMPORTED_MODULE_5__.AMBISONIC_BASE_GUID
        || subFormat.slice(4) === _riff__WEBPACK_IMPORTED_MODULE_5__.BROKEN_BASE_GUID
        || subFormat.slice(4) === _riff__WEBPACK_IMPORTED_MODULE_5__.MEDIASUBTYPE_BASE_GUID) {
        stream.codecpar.codecTag = await ioReader.readUint32();
        stream.codecpar.codecId = getWavCodecId(stream.codecpar.codecTag, stream.codecpar.bitsPerCodedSample);
    }
    else {
        stream.codecpar.codecId = getGuidCodecId(subFormat);
        if (!stream.codecpar.codecId) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.warn(`unknown subformat: ${subFormat}`, cheap__fileName__0, 190);
        }
    }
}
async function readWavHeader(ioReader, stream, size) {
    if (size < 14) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('wav header size < 14', cheap__fileName__0, 197);
        return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
    }
    (0,avutil_util_channel__WEBPACK_IMPORTED_MODULE_10__.unInitChannelLayout)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112);
    let id;
    let channels;
    let bitrate;
    id = await ioReader.readUint16();
    if (id !== 0x0165 || ioReader.isBigEndian()) {
        channels = await ioReader.readUint16();
        stream.codecpar.sampleRate = await ioReader.readUint32();
        bitrate = (await ioReader.readUint32()) * 8;
        stream.codecpar.blockAlign = await ioReader.readUint16();
    }
    if (size === 14) {
        stream.codecpar.bitsPerCodedSample = 8;
    }
    else {
        stream.codecpar.bitsPerCodedSample = await ioReader.readUint16();
    }
    if (id === 0xFFFE) {
        stream.codecpar.codecTag = 0;
    }
    else {
        stream.codecpar.codecTag = id;
        stream.codecpar.codecId = getWavCodecId(id, stream.codecpar.bitsPerCodedSample);
    }
    if (size >= 18 && id != 0x0165) {
        let cbSize = await ioReader.readUint16();
        if (ioReader.isBigEndian()) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('WAVEFORMATEX support for RIFX files', cheap__fileName__0, 229);
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        size -= 18;
        cbSize = Math.min(cbSize, size);
        if (cbSize >= 22 && id == 0xfffe) {
            await readWaveformatex(ioReader, stream);
            cbSize -= 22;
            size -= 22;
        }
        if (cbSize > 0) {
            if (stream.codecpar.extradata) {
                (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avFree)(stream.codecpar.extradata);
            }
            stream.codecpar.extradataSize = cbSize;
            stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(cbSize);
            await ioReader.readBuffer(cbSize, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__.mapSafeUint8Array)(stream.codecpar.extradata, cbSize));
            size -= cbSize;
        }
        if (size > 0) {
            await ioReader.skip(size);
        }
    }
    else if (id == 0x0165 && size >= 32) {
        size -= 4;
        if (stream.codecpar.extradata) {
            (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avFree)(stream.codecpar.extradata);
        }
        stream.codecpar.extradataSize = size;
        stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(size);
        await ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_8__.mapSafeUint8Array)(stream.codecpar.extradata, size));
        const nbStreams = avutil_util_intread__WEBPACK_IMPORTED_MODULE_9__.rl16(stream.codecpar.extradata + 4);
        stream.codecpar.sampleRate = avutil_util_intread__WEBPACK_IMPORTED_MODULE_9__.rl32(stream.codecpar.extradata + 12);
        if (size < 8 + nbStreams * 20) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        for (let i = 0; i < nbStreams; i++) {
            channels += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[2](stream.codecpar.extradata + (8 + i * 20 + 17));
        }
    }
    stream.codecpar.bitrate = BigInt(bitrate >> 0);
    if (stream.codecpar.sampleRate < 0) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`Invalid sample rate ${stream.codecpar.sampleRate}`, cheap__fileName__0, 272);
        return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
    }
    if (stream.codecpar.codecId === 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */) {
        channels = 0;
        stream.codecpar.sampleRate = 0;
    }
    if (stream.codecpar.codecId === 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */ && stream.codecpar.sampleRate) {
        stream.codecpar.bitsPerCodedSample = Number(stream.codecpar.bitrate) / stream.codecpar.sampleRate;
    }
    if (channels !== stream.codecpar.chLayout.nbChannels) {
        (0,avutil_util_channel__WEBPACK_IMPORTED_MODULE_10__.unInitChannelLayout)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 112);
        stream.codecpar.chLayout.order = 0 /* AVChannelOrder.AV_CHANNEL_ORDER_UNSPEC */;
        stream.codecpar.chLayout.nbChannels = channels;
    }
    return 0;
}


/***/ }),

/***/ "./src/avutil/util/pcm.ts":
/*!********************************!*\
  !*** ./src/avutil/util/pcm.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBitsPerSample: () => (/* binding */ getBitsPerSample),
/* harmony export */   getPcmCodecId: () => (/* binding */ getPcmCodecId)
/* harmony export */ });
/* unused harmony export getExactBitsPerSample */
/*
 * libmedia pcm util
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
function getPcmCodecId(bps, flt, be, flags) {
    if (bps <= 0 || bps > 64) {
        return 0 /* AVCodecID.AV_CODEC_ID_NONE */;
    }
    if (flt) {
        switch (bps) {
            case 32:
                return be ? 65556 /* AVCodecID.AV_CODEC_ID_PCM_F32BE */ : 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */;
            case 64:
                return be ? 65558 /* AVCodecID.AV_CODEC_ID_PCM_F64BE */ : 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */;
            default:
                return 0 /* AVCodecID.AV_CODEC_ID_NONE */;
        }
    }
    else {
        bps += 7;
        bps >>>= 3;
        if (flags & (1 << (bps - 1))) {
            switch (bps) {
                case 1:
                    return 65540 /* AVCodecID.AV_CODEC_ID_PCM_S8 */;
                case 2:
                    return be ? 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */ : 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */;
                case 3:
                    return be ? 65549 /* AVCodecID.AV_CODEC_ID_PCM_S24BE */ : 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */;
                case 4:
                    return be ? 65545 /* AVCodecID.AV_CODEC_ID_PCM_S32BE */ : 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */;
                case 8:
                    return be ? 65568 /* AVCodecID.AV_CODEC_ID_PCM_S64BE */ : 65567 /* AVCodecID.AV_CODEC_ID_PCM_S64LE */;
                default:
                    return 0 /* AVCodecID.AV_CODEC_ID_NONE */;
            }
        }
        else {
            switch (bps) {
                case 1:
                    return 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */;
                case 2:
                    return be ? 65539 /* AVCodecID.AV_CODEC_ID_PCM_U16BE */ : 65538 /* AVCodecID.AV_CODEC_ID_PCM_U16LE */;
                case 3:
                    return be ? 65551 /* AVCodecID.AV_CODEC_ID_PCM_U24BE */ : 65550 /* AVCodecID.AV_CODEC_ID_PCM_U24LE */;
                case 4:
                    return be ? 65547 /* AVCodecID.AV_CODEC_ID_PCM_U32BE */ : 65546 /* AVCodecID.AV_CODEC_ID_PCM_U32LE */;
                default:
                    return 0 /* AVCodecID.AV_CODEC_ID_NONE */;
            }
        }
    }
}
function getExactBitsPerSample(codecId) {
    switch (codecId) {
        case 86070 /* AVCodecID.AV_CODEC_ID_8SVX_EXP */:
        case 86071 /* AVCodecID.AV_CODEC_ID_8SVX_FIB */:
        case 69674 /* AVCodecID.AV_CODEC_ID_ADPCM_ARGO */:
        case 69644 /* AVCodecID.AV_CODEC_ID_ADPCM_CT */:
        case 69678 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_ALP */:
        case 69651 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_AMV */:
        case 69661 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_APC */:
        case 69677 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_APM */:
        case 69655 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_EA_SEAD */:
        case 69664 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_OKI */:
        case 69636 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WS */:
        case 69675 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_SSI */:
        case 69660 /* AVCodecID.AV_CODEC_ID_ADPCM_G722 */:
        case 69646 /* AVCodecID.AV_CODEC_ID_ADPCM_YAMAHA */:
        case 69670 /* AVCodecID.AV_CODEC_ID_ADPCM_AICA */:
            return 4;
        case 86089 /* AVCodecID.AV_CODEC_ID_DSD_LSBF */:
        case 86090 /* AVCodecID.AV_CODEC_ID_DSD_MSBF */:
        case 86091 /* AVCodecID.AV_CODEC_ID_DSD_LSBF_PLANAR */:
        case 86092 /* AVCodecID.AV_CODEC_ID_DSD_MSBF_PLANAR */:
        case 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */:
        case 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */:
        case 65571 /* AVCodecID.AV_CODEC_ID_PCM_VIDC */:
        case 65540 /* AVCodecID.AV_CODEC_ID_PCM_S8 */:
        case 65563 /* AVCodecID.AV_CODEC_ID_PCM_S8_PLANAR */:
        case 65572 /* AVCodecID.AV_CODEC_ID_PCM_SGA */:
        case 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */:
        case 81924 /* AVCodecID.AV_CODEC_ID_SDX2_DPCM */:
        case 81926 /* AVCodecID.AV_CODEC_ID_DERF_DPCM */:
            return 8;
        case 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */:
        case 65566 /* AVCodecID.AV_CODEC_ID_PCM_S16BE_PLANAR */:
        case 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */:
        case 65554 /* AVCodecID.AV_CODEC_ID_PCM_S16LE_PLANAR */:
        case 65539 /* AVCodecID.AV_CODEC_ID_PCM_U16BE */:
        case 65538 /* AVCodecID.AV_CODEC_ID_PCM_U16LE */:
            return 16;
        case 65552 /* AVCodecID.AV_CODEC_ID_PCM_S24DAUD */:
        case 65549 /* AVCodecID.AV_CODEC_ID_PCM_S24BE */:
        case 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */:
        case 65564 /* AVCodecID.AV_CODEC_ID_PCM_S24LE_PLANAR */:
        case 65551 /* AVCodecID.AV_CODEC_ID_PCM_U24BE */:
        case 65550 /* AVCodecID.AV_CODEC_ID_PCM_U24LE */:
            return 24;
        case 65545 /* AVCodecID.AV_CODEC_ID_PCM_S32BE */:
        case 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */:
        case 65565 /* AVCodecID.AV_CODEC_ID_PCM_S32LE_PLANAR */:
        case 65547 /* AVCodecID.AV_CODEC_ID_PCM_U32BE */:
        case 65546 /* AVCodecID.AV_CODEC_ID_PCM_U32LE */:
        case 65556 /* AVCodecID.AV_CODEC_ID_PCM_F32BE */:
        case 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */:
        case 65570 /* AVCodecID.AV_CODEC_ID_PCM_F24LE */:
        case 65569 /* AVCodecID.AV_CODEC_ID_PCM_F16LE */:
            return 32;
        case 65558 /* AVCodecID.AV_CODEC_ID_PCM_F64BE */:
        case 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */:
        case 65568 /* AVCodecID.AV_CODEC_ID_PCM_S64BE */:
        case 65567 /* AVCodecID.AV_CODEC_ID_PCM_S64LE */:
            return 64;
        default:
            return 0;
    }
}
function getBitsPerSample(codecId) {
    switch (codecId) {
        case 69649 /* AVCodecID.AV_CODEC_ID_ADPCM_SBPRO_2 */:
            return 2;
        case 69648 /* AVCodecID.AV_CODEC_ID_ADPCM_SBPRO_3 */:
            return 3;
        case 69647 /* AVCodecID.AV_CODEC_ID_ADPCM_SBPRO_4 */:
        case 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */:
        case 69632 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_QT */:
        case 69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */:
        case 69638 /* AVCodecID.AV_CODEC_ID_ADPCM_MS */:
            return 4;
        default:
            return getExactBitsPerSample(codecId);
    }
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_riff_iriff_ts.avtranscoder.js.map