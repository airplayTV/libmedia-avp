"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IWavFormat_ts"],{

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

/***/ "./src/avformat/formats/IWavFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IWavFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IWavFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _riff_iriff__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./riff/iriff */ "./src/avformat/formats/riff/iriff.ts");
/* harmony import */ var avutil_util_pcm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/util/pcm */ "./src/avutil/util/pcm.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\IWavFormat.ts";











const PACKET_SAMPLE_COUNT = 1024;
class IWavFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_5__["default"] {
    type = 16 /* AVFormat.WAV */;
    dataSize;
    sampleCount;
    pcmStartPos;
    currentPts;
    constructor() {
        super();
    }
    init(formatContext) {
        formatContext.ioReader.setEndian(false);
    }
    async readHeader(formatContext) {
        const signature = await formatContext.ioReader.readString(4);
        switch (signature) {
            case 'RIFF':
            case 'RF64':
            case 'BW64':
                break;
            case 'RIFX':
                formatContext.ioReader.setEndian(true);
                break;
            default:
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('the file format is not wav', cheap__fileName__0, 73);
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        // chunk size
        await formatContext.ioReader.skip(4);
        const dataType = await formatContext.ioReader.readString(4);
        if (dataType !== 'WAVE') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`invalid start code ${dataType} in RIFF header`, cheap__fileName__0, 83);
            return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
        }
        if (signature === 'RF64' || signature === 'BW64') {
            const tag = await formatContext.ioReader.readString(4);
            if (tag !== 'ds64') {
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            const size = await formatContext.ioReader.readUint32();
            if (size < 24) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            // riff size
            await formatContext.ioReader.skip(8);
            this.dataSize = await formatContext.ioReader.readUint64();
            this.sampleCount = await formatContext.ioReader.readUint64();
            if (this.dataSize < 0 || this.sampleCount < 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error('negative data_size and/or sample_count in ds64', cheap__fileName__0, 103);
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            await formatContext.ioReader.skip(size - 24);
        }
        const stream = formatContext.createStream();
        const fileSize = await formatContext.ioReader.fileSize();
        let gotFmt = false;
        let gotXma2 = false;
        while (formatContext.ioReader.getPos() < fileSize) {
            const tag = await formatContext.ioReader.readString(4);
            const size = await formatContext.ioReader.readUint32();
            if (tag === 'fmt ') {
                if (!gotFmt) {
                    let ret = await (0,_riff_iriff__WEBPACK_IMPORTED_MODULE_9__.readFormatTag)(formatContext.ioReader, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], size);
                    if (ret < 0) {
                        return ret;
                    }
                }
                else {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_3__.warn('found more than one \'fmt \' tag, ignore it', cheap__fileName__0, 128);
                }
            }
            else if (tag === 'data') {
                this.pcmStartPos = formatContext.ioReader.getPos();
                if (!this.dataSize) {
                    this.dataSize = BigInt(Math.floor(size));
                }
                if (this.pcmStartPos + this.dataSize === fileSize) {
                    break;
                }
                await formatContext.ioReader.seek(this.pcmStartPos + this.dataSize);
            }
            else {
                if (this.pcmStartPos + this.dataSize === fileSize) {
                    break;
                }
                await formatContext.ioReader.seek(formatContext.ioReader.getPos() + BigInt(Math.floor(size)));
            }
        }
        if (!this.sampleCount) {
            this.sampleCount = (this.dataSize << BigInt(3)) / BigInt(stream.codecpar.chLayout.nbChannels * (0,avutil_util_pcm__WEBPACK_IMPORTED_MODULE_10__.getBitsPerSample)(stream.codecpar.codecId));
        }
        stream.timeBase.den = stream.codecpar.sampleRate;
        stream.timeBase.num = 1;
        if (this.sampleCount) {
            stream.duration = this.sampleCount;
        }
        this.currentPts = BigInt(0);
        await formatContext.ioReader.seek(this.pcmStartPos);
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        });
        try {
            const length = (PACKET_SAMPLE_COUNT * stream.codecpar.chLayout.nbChannels * (0,avutil_util_pcm__WEBPACK_IMPORTED_MODULE_10__.getBitsPerSample)(stream.codecpar.codecId)) >>> 3;
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(length);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_8__.addAVPacketData)(avpacket, data, length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 16, this.currentPts), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 8, this.currentPts);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[17](avpacket + 56, formatContext.ioReader.getPos());
            await formatContext.ioReader.readBuffer(length, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_6__.mapSafeUint8Array)(data, length));
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
            this.currentPts += BigInt(PACKET_SAMPLE_COUNT);
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */
                && formatContext.ioReader.error !== -1048572 /* IOError.ABORT */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_3__.error(`read packet error, ${error}`, cheap__fileName__0, 193);
                return avutil_error__WEBPACK_IMPORTED_MODULE_4__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            const size = await formatContext.ioReader.fileSize();
            if (size <= BigInt(0)) {
                return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_4__.FORMAT_NOT_SUPPORT);
            }
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > size) {
                timestamp = size;
            }
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                this.currentPts = ((timestamp - this.pcmStartPos) << BigInt(3)) / BigInt(stream.codecpar.chLayout.nbChannels * (0,avutil_util_pcm__WEBPACK_IMPORTED_MODULE_10__.getBitsPerSample)(stream.codecpar.codecId));
            }
            return now;
        }
        else {
            const pos = this.pcmStartPos + (timestamp * BigInt(stream.codecpar.chLayout.nbChannels * (0,avutil_util_pcm__WEBPACK_IMPORTED_MODULE_10__.getBitsPerSample)(stream.codecpar.codecId)) >> BigInt(3));
            await formatContext.ioReader.seek(pos);
            this.currentPts = timestamp;
            return now;
        }
    }
    getAnalyzeStreamsCount() {
        return 1;
    }
}


/***/ }),

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

/***/ "./src/avformat/formats/riff/riff.ts":
/*!*******************************************!*\
  !*** ./src/avformat/formats/riff/riff.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AMBISONIC_BASE_GUID: () => (/* binding */ AMBISONIC_BASE_GUID),
/* harmony export */   BROKEN_BASE_GUID: () => (/* binding */ BROKEN_BASE_GUID),
/* harmony export */   MEDIASUBTYPE_BASE_GUID: () => (/* binding */ MEDIASUBTYPE_BASE_GUID),
/* harmony export */   WavTag2CodecId: () => (/* binding */ WavTag2CodecId),
/* harmony export */   codecBmpGuid: () => (/* binding */ codecBmpGuid),
/* harmony export */   codecBmpTags: () => (/* binding */ codecBmpTags)
/* harmony export */ });
/* unused harmony export RiffInfo */
/* harmony import */ var _function_mktagle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../function/mktagle */ "./src/avformat/function/mktagle.ts");

const WavTag2CodecId = {
    0x0001: 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */,
    0x0002: 69638 /* AVCodecID.AV_CODEC_ID_ADPCM_MS */,
    0x0003: 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    0x0006: 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */,
    0x0007: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    0x000A: 86052 /* AVCodecID.AV_CODEC_ID_WMAVOICE */,
    0x0010: 69664 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_OKI */,
    0x0011: 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */,
    0x0017: 69664 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_OKI */,
    0x0020: 69646 /* AVCodecID.AV_CODEC_ID_ADPCM_YAMAHA */,
    0x0022: 86037 /* AVCodecID.AV_CODEC_ID_TRUESPEECH */,
    0x0031: 86046 /* AVCodecID.AV_CODEC_ID_GSM_MS */,
    0x0032: 86046 /* AVCodecID.AV_CODEC_ID_GSM_MS */,
    0x0038: 73728 /* AVCodecID.AV_CODEC_ID_AMR_NB */,
    0x0042: 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
    0x0045: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0014: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0040: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0050: 86016 /* AVCodecID.AV_CODEC_ID_MP2 */,
    0x0055: 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    0x0057: 73728 /* AVCodecID.AV_CODEC_ID_AMR_NB */,
    0x0058: 73729 /* AVCodecID.AV_CODEC_ID_AMR_WB */,
    0x0061: 69635 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_DK4 */,
    0x0062: 69634 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_DK3 */,
    0x0064: 69643 /* AVCodecID.AV_CODEC_ID_ADPCM_G726 */,
    0x0069: 69633 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_WAV */,
    0x0075: 86079 /* AVCodecID.AV_CODEC_ID_METASOUND */,
    0x0083: 86069 /* AVCodecID.AV_CODEC_ID_G729 */,
    0x00ff: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x0111: 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
    0x0130: 86057 /* AVCodecID.AV_CODEC_ID_SIPR */,
    0x0135: 86106 /* AVCodecID.AV_CODEC_ID_ACELP_KELVIN */,
    0x0160: 86023 /* AVCodecID.AV_CODEC_ID_WMAV1 */,
    0x0161: 86024 /* AVCodecID.AV_CODEC_ID_WMAV2 */,
    0x0162: 86053 /* AVCodecID.AV_CODEC_ID_WMAPRO */,
    0x0163: 86054 /* AVCodecID.AV_CODEC_ID_WMALOSSLESS */,
    0x0165: 86095 /* AVCodecID.AV_CODEC_ID_XMA1 */,
    0x0166: 86096 /* AVCodecID.AV_CODEC_ID_XMA2 */,
    0x0180: 86116 /* AVCodecID.AV_CODEC_ID_FTR */,
    0x0200: 69644 /* AVCodecID.AV_CODEC_ID_ADPCM_CT */,
    0x0215: 86022 /* AVCodecID.AV_CODEC_ID_DVAUDIO */,
    0x0216: 86022 /* AVCodecID.AV_CODEC_ID_DVAUDIO */,
    0x0270: 86047 /* AVCodecID.AV_CODEC_ID_ATRAC3 */,
    0x028E: 86111 /* AVCodecID.AV_CODEC_ID_MSNSIREN */,
    0x028F: 69660 /* AVCodecID.AV_CODEC_ID_ADPCM_G722 */,
    0x0350: 86114 /* AVCodecID.AV_CODEC_ID_MISC4 */,
    0x0401: 86043 /* AVCodecID.AV_CODEC_ID_IMC */,
    0x0402: 86074 /* AVCodecID.AV_CODEC_ID_IAC */,
    0x0500: 86081 /* AVCodecID.AV_CODEC_ID_ON2AVC */,
    0x0501: 86081 /* AVCodecID.AV_CODEC_ID_ON2AVC */,
    0x1500: 86046 /* AVCodecID.AV_CODEC_ID_GSM_MS */,
    0x1501: 86037 /* AVCodecID.AV_CODEC_ID_TRUESPEECH */,
    // ADTS AAC
    0x1600: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x1602: 86065 /* AVCodecID.AV_CODEC_ID_AAC_LATM */,
    0x2000: 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    0x2001: 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    0x2048: 86085 /* AVCodecID.AV_CODEC_ID_SONIC */,
    0x2222: 86069 /* AVCodecID.AV_CODEC_ID_G729 */,
    0x6c75: 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */,
    0x706d: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x4143: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0x4180: 86116 /* AVCodecID.AV_CODEC_ID_FTR */,
    0x594a: 81922 /* AVCodecID.AV_CODEC_ID_XAN_DPCM */,
    0x729A: 86069 /* AVCodecID.AV_CODEC_ID_G729 */,
    0x8180: 86116 /* AVCodecID.AV_CODEC_ID_FTR */,
    0xA100: 86068 /* AVCodecID.AV_CODEC_ID_G723_1 */,
    0xA106: 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    0xA109: 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */,
    0xF1AC: 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    0xFFFE: 86112 /* AVCodecID.AV_CODEC_ID_DFPWM */,
    0x5346: 69645 /* AVCodecID.AV_CODEC_ID_ADPCM_SWF */,
    0x566f: 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */
};
const codecBmpTags = {
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('H261')]: 3 /* AVCodecID.AV_CODEC_ID_H261 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('H263')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('X263')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('T263')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('L263')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VX1K')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ZyGo')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M263')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('lsvm')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('I263')]: 20 /* AVCodecID.AV_CODEC_ID_H263I */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('U263')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSM4')]: 4 /* AVCodecID.AV_CODEC_ID_H263 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('H264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('h264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('X264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('x264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('avc1')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DAVC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SMV2')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSSH')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('Q264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('V264')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GAVC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('UMSV')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('tshd')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('INMC')]: 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DX50')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVID')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP4S')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4S2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIVX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [0x04]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ZMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV1')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('BLZ0')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mp4v')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('UMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WV1F')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SEDG')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('RMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('3IV2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WAWV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FFDS')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('FVFW')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DCOD')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MVXM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DXGM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VIDM')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4T3')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GEOX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('G264')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('HDX4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DMK2')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DYM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIGI')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EPHV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EM4A')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M4CC')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SN40')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VSPX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('ULDX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GEOV')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SIPP')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SM4V')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XVIX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DreX')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('QMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PLV1')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GLV4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GMP4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MNM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GTM4')]: 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPG4')]: 14 /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP41')]: 14 /* AVCodecID.AV_CODEC_ID_MSMPEG4V1 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP42')]: 15 /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV2')]: 15 /* AVCodecID.AV_CODEC_ID_MSMPEG4V2 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MP43')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPG3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV5')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV6')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DIV4')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DVX3')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AP41')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('COL1')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('COL0')]: 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WMV1')]: 17 /* AVCodecID.AV_CODEC_ID_WMV1 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('WMV2')]: 18 /* AVCodecID.AV_CODEC_ID_WMV2 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('GXVE')]: 18 /* AVCodecID.AV_CODEC_ID_WMV2 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvsd')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvhd')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvh1')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvsl')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dv25')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dv50')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('cdvc')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('CDVH')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('CDV5')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvc ')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvcs')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvh1')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('dvis')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('pdvc')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SL25')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('SLDV')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AVd1')]: 24 /* AVCodecID.AV_CODEC_ID_DVVIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mpg1')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mpg2')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MPEG')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PIM1')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('PIM2')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VCR2')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [0x10000001]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [0x10000002]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [0x10000004]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('DVR ')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MMES')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('LMP2')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('slif')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('EM2V')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M701')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M702')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M703')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M704')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('M705')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('mpgv')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('BW10')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('XMPG')]: 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('MJPG')]: 7 /* AVCodecID.AV_CODEC_ID_MJPEG */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('RV40')]: 69 /* AVCodecID.AV_CODEC_ID_RV40 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('AV01')]: 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VP80')]: 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('VP90')]: 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('HEVC')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    [(0,_function_mktagle__WEBPACK_IMPORTED_MODULE_0__["default"])('H265')]: 173 /* AVCodecID.AV_CODEC_ID_HEVC */
};
const MEDIASUBTYPE_BASE_GUID = '00001000800000AA00389B71';
const AMBISONIC_BASE_GUID = '2107D3118644C8C1CA000000';
const BROKEN_BASE_GUID = '0000000000001000800000AA';
const codecBmpGuid = {
    '2C806DE046DBCF11B4D100805F6CBBEA': 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    'BFAA23E958CB7144A119FFFA01E4CE62': 86055 /* AVCodecID.AV_CODEC_ID_ATRAC3P */,
    'D242E147BA368D4D88FC61654F8C836C': 86104 /* AVCodecID.AV_CODEC_ID_ATRAC9 */,
    'AF87FBA7022DFB42A4D405CD93843BDD': 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    '2B806DE046DBCF11B4D100805F6CBBEA': 86016 /* AVCodecID.AV_CODEC_ID_MP2 */,
    '82EC1F6ACADB1945BDE756D3B3EF981D': 69673 /* AVCodecID.AV_CODEC_ID_ADPCM_AGM */,
    '3AC1FA38811D4361A40DCE53CA607CD1': 86112 /* AVCodecID.AV_CODEC_ID_DFPWM */
};
const RiffInfo = {
    'IART': "artist" /* AVStreamMetadataKey.ARTIST */,
    'ICMT': "comment" /* AVStreamMetadataKey.COMMENT */,
    'ICOP': "copyright" /* AVStreamMetadataKey.COPYRIGHT */,
    'ICRD': "date" /* AVStreamMetadataKey.DATE */,
    'IGNR': "genre" /* AVStreamMetadataKey.GENRE */,
    'ILNG': "language" /* AVStreamMetadataKey.LANGUAGE */,
    'INAM': "language" /* AVStreamMetadataKey.LANGUAGE */,
    'IPRD': "album" /* AVStreamMetadataKey.ALBUM */,
    'IPRT': "track" /* AVStreamMetadataKey.TRACK */,
    'ITRK': "track" /* AVStreamMetadataKey.TRACK */,
    'ISFT': "encoder" /* AVStreamMetadataKey.ENCODER */,
    'ISMP': "timecode" /* AVStreamMetadataKey.TIME_CODE */,
    'ITCH': "vendor" /* AVStreamMetadataKey.VENDOR */
};


/***/ }),

/***/ "./src/avformat/function/mktagle.ts":
/*!******************************************!*\
  !*** ./src/avformat/function/mktagle.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mktagle)
/* harmony export */ });
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
const cheap__fileName__0 = "src\\avformat\\function\\mktagle.ts";
/*
 * libmedia string tag to uint32 in litten end
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

function mktagle(tag) {
    if (tag.length !== 4) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_0__.warn(`tag length is not 4, tag: ${tag}`, cheap__fileName__0, 30);
    }
    let value = 0;
    for (let i = 3; i >= 0; i--) {
        value = (value << 8) | tag.charCodeAt(i);
    }
    return value;
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
//# sourceMappingURL=src_avformat_formats_IWavFormat_ts.avtranscoder.js.map