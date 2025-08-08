"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IFlacFormat_ts"],{

/***/ "./src/avformat/formats/IFlacFormat.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/IFlacFormat.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFlacFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _flac_iflac__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flac/iflac */ "./src/avformat/formats/flac/iflac.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _ogg_vorbis__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./ogg/vorbis */ "./src/avformat/formats/ogg/vorbis.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\IFlacFormat.ts";
















const PACKET_SIZE = 1024;
class IFlacFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 17 /* AVFormat.FLAC */;
    context;
    constructor() {
        super();
    }
    init(formatContext) {
        formatContext.ioReader.setEndian(true);
        this.context = {
            streamInfo: {
                minimumBlockSize: 0,
                maximumBlockSize: 0,
                minimumFrameSize: 0,
                maximumFrameSize: 0,
                sampleRate: 0,
                channels: 0,
                bitPerSample: 0,
                samples: BigInt(0),
                md5: ''
            },
            frameInfo: {
                sampleRate: 0,
                channels: 0,
                bps: 0,
                blocksize: 0,
                chMode: 0,
                frameOrSampleNum: BigInt(0),
                isVarSize: 0
            },
            seekPoints: [],
            cueSheet: {
                catalogNumber: '',
                leadInSamples: BigInt(0),
                compactDisc: false,
                tracks: []
            },
            picture: {
                type: 0,
                mimeType: '',
                description: '',
                width: 0,
                height: 0,
                colorDepth: 0,
                indexedColor: 0,
                data: null
            },
            cacheBuffer: null,
            cachePos: BigInt(0),
            bitReader: new common_io_BitReader__WEBPACK_IMPORTED_MODULE_9__["default"](16),
            fileSize: BigInt(0),
            firstFramePos: BigInt(0),
            isVarSize: -1
        };
    }
    async readHeader(formatContext) {
        const signature = await formatContext.ioReader.readString(4);
        if (signature !== 'fLaC') {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('the file format is not flac', cheap__fileName__0, 118);
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        this.context.fileSize = await formatContext.ioReader.fileSize();
        const stream = formatContext.createStream();
        stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        stream.codecpar.codecId = 86028 /* AVCodecID.AV_CODEC_ID_FLAC */;
        while (true) {
            const blockHeader = await formatContext.ioReader.readUint8();
            const blockLen = await formatContext.ioReader.readUint24();
            const blockType = blockHeader & (~0x80);
            if (blockType === 0 /* MetaDataBlockType.STREAMINFO */) {
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(blockLen);
                stream.codecpar.extradataSize = blockLen;
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(stream.codecpar.extradata, blockLen, await formatContext.ioReader.peekBuffer(blockLen));
                this.context.streamInfo.minimumBlockSize = await formatContext.ioReader.readUint16();
                this.context.streamInfo.maximumBlockSize = await formatContext.ioReader.readUint16();
                this.context.streamInfo.minimumFrameSize = await formatContext.ioReader.readUint24();
                this.context.streamInfo.maximumFrameSize = await formatContext.ioReader.readUint24();
                const sampleRate = await formatContext.ioReader.readUint24();
                stream.codecpar.sampleRate = (sampleRate >> 4);
                stream.codecpar.chLayout.nbChannels = ((sampleRate & 0x0f) >>> 1) + 1;
                this.context.streamInfo.sampleRate = stream.codecpar.sampleRate;
                this.context.streamInfo.channels = stream.codecpar.chLayout.nbChannels;
                const bitPerSample = await formatContext.ioReader.readUint8();
                stream.codecpar.bitsPerRawSample = (((sampleRate & 0x01) << 4) | ((bitPerSample & 0xf0) >>> 4)) + 1;
                this.context.streamInfo.bitPerSample = stream.codecpar.bitsPerRawSample;
                const samplesLow = await formatContext.ioReader.readUint32();
                const samples = (BigInt(Math.floor(bitPerSample & 0x0f)) << BigInt(32)) | BigInt(Math.floor(samplesLow));
                this.context.streamInfo.samples = samples;
                stream.timeBase.den = stream.codecpar.sampleRate;
                stream.timeBase.num = 1;
                stream.duration = samples;
                stream.startTime = BigInt(0);
                this.context.streamInfo.md5 = await formatContext.ioReader.readString(16);
            }
            else if (blockType === 2 /* MetaDataBlockType.APPLICATION */) {
                const stream = formatContext.createStream();
                stream.codecpar.codecType = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
                stream.codecpar.codecTag = await formatContext.ioReader.readUint32();
                stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(blockLen - 4);
                stream.codecpar.extradataSize = blockLen - 4;
                await formatContext.ioReader.readBuffer(blockLen - 4, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
            }
            else if (blockType === 3 /* MetaDataBlockType.SEEKTABLE */) {
                for (let i = 0; i < blockLen / 18; i++) {
                    const pts = await formatContext.ioReader.readUint64();
                    const pos = await formatContext.ioReader.readUint64();
                    const samples = await formatContext.ioReader.readUint16();
                    this.context.seekPoints.push({
                        pts,
                        pos,
                        samples
                    });
                }
            }
            else if (blockType === 4 /* MetaDataBlockType.VORBIS_COMMENT */) {
                formatContext.ioReader.setEndian(false);
                const vendorStringLength = await formatContext.ioReader.readUint32();
                const vendorString = await formatContext.ioReader.readString(vendorStringLength);
                const userCommentListLength = await formatContext.ioReader.readUint32();
                const comments = [];
                for (let i = 0; i < userCommentListLength; i++) {
                    const length = await formatContext.ioReader.readUint32();
                    comments.push(await formatContext.ioReader.readString(length));
                }
                stream.metadata["vendor" /* AVStreamMetadataKey.VENDOR */] = vendorString;
                (0,_ogg_vorbis__WEBPACK_IMPORTED_MODULE_15__.parseVorbisComment)(comments, stream.metadata);
                formatContext.ioReader.setEndian(true);
            }
            else if (blockType === 5 /* MetaDataBlockType.CUESHEET */) {
                this.context.cueSheet.catalogNumber = await formatContext.ioReader.readString(128);
                this.context.cueSheet.leadInSamples = await formatContext.ioReader.readUint64();
                this.context.cueSheet.compactDisc = !!((await formatContext.ioReader.readUint8()) >>> 7);
                await formatContext.ioReader.skip(258);
                const trackCount = await formatContext.ioReader.readUint8();
                for (let i = 0; i < trackCount; i++) {
                    const offset = await formatContext.ioReader.readUint64();
                    const number = await formatContext.ioReader.readUint8();
                    const isrc = await formatContext.ioReader.readBuffer(12);
                    const flags = await formatContext.ioReader.readUint8();
                    await formatContext.ioReader.skip(13);
                    const pointCount = await formatContext.ioReader.readUint8();
                    const points = [];
                    for (let j = 0; j < pointCount; j++) {
                        points.push({
                            offset: await formatContext.ioReader.readUint64(),
                            point: await formatContext.ioReader.readUint8()
                        });
                        await formatContext.ioReader.skip(3);
                    }
                    this.context.cueSheet.tracks.push({
                        offset,
                        number,
                        isrc,
                        type: flags >>> 7,
                        preEmphasisFlag: (flags >>> 6) & 0x01,
                        points
                    });
                }
            }
            else if (blockType === 6 /* MetaDataBlockType.PICTURE */) {
                this.context.picture.type = await formatContext.ioReader.readUint32();
                let len = await formatContext.ioReader.readUint32();
                this.context.picture.mimeType = await formatContext.ioReader.readString(len);
                len = await formatContext.ioReader.readUint32();
                this.context.picture.description = await formatContext.ioReader.readString(len);
                this.context.picture.width = await formatContext.ioReader.readUint32();
                this.context.picture.height = await formatContext.ioReader.readUint32();
                this.context.picture.colorDepth = await formatContext.ioReader.readUint32();
                this.context.picture.indexedColor = await formatContext.ioReader.readUint32();
                len = await formatContext.ioReader.readUint32();
                this.context.picture.data = await formatContext.ioReader.readBuffer(len);
            }
            else {
                await formatContext.ioReader.skip(blockLen);
            }
            if (blockHeader & 0x80) {
                break;
            }
        }
        this.context.firstFramePos = formatContext.ioReader.getPos();
        stream.privData = this.context;
        return 0;
    }
    async getNextFrame(formatContext) {
        const buffers = [];
        while (true) {
            if (formatContext.ioReader.getPos() === this.context.fileSize) {
                if (this.context.cacheBuffer) {
                    buffers.push(this.context.cacheBuffer);
                    this.context.cacheBuffer = null;
                }
                break;
            }
            if (!this.context.cacheBuffer) {
                this.context.cachePos = formatContext.ioReader.getPos();
                this.context.cacheBuffer = await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, Number(BigInt.asIntN(32, this.context.fileSize - formatContext.ioReader.getPos()))));
            }
            else if (this.context.cacheBuffer.length < 17) {
                this.context.cacheBuffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [
                    this.context.cacheBuffer,
                    await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, Number(BigInt.asIntN(32, this.context.fileSize - formatContext.ioReader.getPos()))))
                ]);
            }
            let i = buffers.length ? 0 : 2;
            const sync = this.context.isVarSize < 0 ? [0xf8, 0xf9] : (this.context.isVarSize ? [0xf9] : [0xf8]);
            const end = this.context.cacheBuffer.length - 2;
            for (; i < end; i++) {
                if (this.context.cacheBuffer[i] === 0xff && common_util_array__WEBPACK_IMPORTED_MODULE_13__.has(sync, this.context.cacheBuffer[i + 1])) {
                    if (i) {
                        buffers.push(this.context.cacheBuffer.subarray(0, i));
                        this.context.cacheBuffer = this.context.cacheBuffer.subarray(i);
                        this.context.cachePos += BigInt(Math.floor(i));
                    }
                    break;
                }
            }
            if (i === end) {
                if (formatContext.ioReader.getPos() === this.context.fileSize) {
                    buffers.push(this.context.cacheBuffer);
                    this.context.cachePos += BigInt(Math.floor(this.context.cacheBuffer.length));
                    this.context.cacheBuffer = null;
                }
                else {
                    buffers.push(this.context.cacheBuffer.subarray(0, i));
                    this.context.cachePos += BigInt(Math.floor(i));
                    this.context.cacheBuffer = this.context.cacheBuffer.subarray(i);
                }
                continue;
            }
            if (this.context.cacheBuffer.length < 16) {
                this.context.cacheBuffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [
                    this.context.cacheBuffer,
                    await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, Number(BigInt.asIntN(32, this.context.fileSize - formatContext.ioReader.getPos()))))
                ]);
            }
            this.context.bitReader.reset();
            this.context.bitReader.appendBuffer(this.context.cacheBuffer.subarray(0, 16));
            const info = {};
            // 检查下一帧的数据是否合法，不合法说明和前面的是同一帧数据
            if ((0,_flac_iflac__WEBPACK_IMPORTED_MODULE_8__.decodeFrameHeader)(this.context.bitReader, info, true) < 0
                // || info.sampleRate !== this.context.frameInfo.sampleRate
                // || info.channels !== this.context.frameInfo.channels
                || ((info.frameOrSampleNum - this.context.frameInfo.frameOrSampleNum !== BigInt(this.context.frameInfo.blocksize >> 0))
                    && (info.frameOrSampleNum !== this.context.frameInfo.frameOrSampleNum + BigInt(1)))) {
                buffers.push(this.context.cacheBuffer.subarray(0, 2));
                this.context.cachePos += BigInt(2);
                this.context.cacheBuffer = this.context.cacheBuffer.subarray(2);
            }
            else {
                break;
            }
        }
        if (buffers.length === 1) {
            return buffers[0];
        }
        return (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, buffers);
    }
    async readAVPacket(formatContext, avpacket) {
        const stream = formatContext.streams.find((stream) => {
            return stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
        });
        try {
            let now = formatContext.ioReader.getPos();
            if (now === this.context.fileSize) {
                return -1048576 /* IOError.END */;
            }
            this.context.bitReader.reset();
            if (this.context.cacheBuffer) {
                now = this.context.cachePos;
                if (this.context.cacheBuffer.length < 16) {
                    this.context.cacheBuffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [
                        this.context.cacheBuffer,
                        await formatContext.ioReader.readBuffer(Math.min(PACKET_SIZE, Number(BigInt.asIntN(32, this.context.fileSize - formatContext.ioReader.getPos()))))
                    ]);
                }
                this.context.bitReader.appendBuffer(this.context.cacheBuffer.subarray(0, 16));
            }
            else {
                this.context.bitReader.appendBuffer(await formatContext.ioReader.peekBuffer(16));
            }
            if ((0,_flac_iflac__WEBPACK_IMPORTED_MODULE_8__.decodeFrameHeader)(this.context.bitReader, this.context.frameInfo) < 0) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            const nextFrame = await this.getNextFrame(formatContext);
            const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(nextFrame.length);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, nextFrame.length, nextFrame);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketData)(avpacket, data, nextFrame.length);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, now);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, this.context.frameInfo.isVarSize
                ? this.context.frameInfo.frameOrSampleNum
                : this.context.frameInfo.frameOrSampleNum * BigInt(this.context.frameInfo.blocksize >> 0)), cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, this.context.frameInfo.isVarSize
                ? this.context.frameInfo.frameOrSampleNum
                : this.context.frameInfo.frameOrSampleNum * BigInt(this.context.frameInfo.blocksize >> 0));
            if (this.context.isVarSize < 0) {
                this.context.isVarSize = this.context.frameInfo.isVarSize;
            }
            return 0;
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */
                && formatContext.ioReader.error !== -1048572 /* IOError.ABORT */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read packet error, ${error}`, cheap__fileName__0, 418);
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async syncFrame(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT;
        while (true) {
            try {
                const word = await formatContext.ioReader.peekUint16();
                if (word === 0xfff9 || word === 0xfff8) {
                    pos = formatContext.ioReader.getPos();
                    this.context.bitReader.reset();
                    this.context.bitReader.appendBuffer(await formatContext.ioReader.peekBuffer(16));
                    if (!(0,_flac_iflac__WEBPACK_IMPORTED_MODULE_8__.decodeFrameHeader)(this.context.bitReader, {}, true)) {
                        break;
                    }
                }
                await formatContext.ioReader.skip(1);
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_11__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        const context = stream.privData;
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            const size = await formatContext.ioReader.fileSize();
            if (size <= BigInt(0)) {
                return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT);
            }
            if (timestamp < BigInt(0)) {
                timestamp = BigInt(0);
            }
            else if (timestamp > size) {
                timestamp = size;
            }
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncFrame(formatContext);
            }
            return now;
        }
        if (stream && stream.sampleIndexes.length) {
            let index = common_util_array__WEBPACK_IMPORTED_MODULE_13__.binarySearch(stream.sampleIndexes, (item) => {
                if (item.pts > timestamp) {
                    return -1;
                }
                return 1;
            });
            if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_14__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_11__.AV_MILLI_TIME_BASE_Q) < BigInt(5000)) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__0, 485);
                await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                context.cacheBuffer = null;
                return now;
            }
        }
        if (context.seekPoints.length) {
            let index = 0;
            for (let i = 0; i < context.seekPoints.length; i++) {
                if (context.seekPoints[i].pts === timestamp) {
                    index = i;
                    break;
                }
                else if (context.seekPoints[i].pts > timestamp) {
                    index = Math.max(i - 1, 0);
                    break;
                }
            }
            const cue = context.seekPoints[index];
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`seek in seekPoints, found index: ${index}, pts: ${cue.pts}, pos: ${cue.pos + context.firstFramePos}`, cheap__fileName__0, 505);
            await formatContext.ioReader.seek(cue.pos + context.firstFramePos);
            context.cacheBuffer = null;
            return now;
        }
        common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 511);
        const ret = await (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_12__["default"])(formatContext, stream, timestamp, context.firstFramePos, this.readAVPacket.bind(this), this.syncFrame.bind(this));
        if (ret > 0) {
            context.cacheBuffer = null;
        }
        return ret;
    }
    getAnalyzeStreamsCount() {
        return 1;
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

/***/ "./src/avformat/formats/flac/iflac.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/flac/iflac.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeFrameHeader: () => (/* binding */ decodeFrameHeader)
/* harmony export */ });
/* unused harmony export getUtf8 */
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/codecs/flac */ "./src/avutil/codecs/flac.ts");
/* harmony import */ var common_math_crc8__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/math/crc8 */ "./src/common/math/crc8.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\flac\\iflac.ts";




function getUtf8(reader) {
    let value = BigInt(Math.floor(reader.readU(8)));
    let top = (value & BigInt(128)) >> BigInt(1);
    if ((value & BigInt(0xc0)) === BigInt(0x80) || value >= BigInt(0xfe)) {
        return -BigInt(1);
    }
    while (value & top) {
        const tmp = BigInt(Math.floor(reader.readU(8))) - BigInt(128);
        if (tmp >> BigInt(6)) {
            return -BigInt(1);
        }
        value = (value << BigInt(6)) + tmp;
        top <<= BigInt(5);
    }
    value &= (top << BigInt(1)) - BigInt(1);
    return value;
}
function decodeFrameHeader(bitReader, info, check = false) {
    const start = bitReader.getPointer();
    if ((bitReader.readU(15) & 0x7fff) != 0x7ffc) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('invalid sync code', cheap__fileName__0, 57);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    info.isVarSize = bitReader.readU1();
    const bsCode = bitReader.readU(4);
    const srCode = bitReader.readU(4);
    info.chMode = bitReader.readU(4);
    if (info.chMode < avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__.FLAC_MAX_CHANNELS) {
        info.channels = info.chMode + 1;
        info.chMode = 0 /* FlacCHMode.INDEPENDENT */;
    }
    else if (info.chMode < avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__.FLAC_MAX_CHANNELS + 3 /* FlacCHMode.MID_SIDE */) {
        info.channels = 2;
        info.chMode -= avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__.FLAC_MAX_CHANNELS - 1;
    }
    else {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error(`invalid channel mode: ${info.chMode}`, cheap__fileName__0, 76);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    const bpsCode = bitReader.readU(3);
    if (bpsCode === 3) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error(`invalid sample size code: ${bpsCode}`, cheap__fileName__0, 82);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    info.bps = avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__.SampleSizeTable[bpsCode];
    if (bitReader.readU1()) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('broken stream, invalid padding', cheap__fileName__0, 88);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    info.frameOrSampleNum = getUtf8(bitReader);
    if (info.frameOrSampleNum < 0) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('sample/frame number invalid', cheap__fileName__0, 95);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    if (bsCode === 0) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('reserved blocksize code: 0', cheap__fileName__0, 100);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    else if (bsCode === 6) {
        info.blocksize = bitReader.readU(8) + 1;
    }
    else if (bsCode === 7) {
        info.blocksize = bitReader.readU(16) + 1;
    }
    else {
        info.blocksize = avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__.BlockSizeTable[bsCode];
    }
    if (srCode < 12) {
        info.sampleRate = avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_2__.SampleRateTable[srCode];
    }
    else if (srCode === 12) {
        info.sampleRate = bitReader.readU(8) * 1000;
    }
    else if (srCode === 13) {
        info.sampleRate = bitReader.readU(16);
    }
    else if (srCode === 14) {
        info.sampleRate = bitReader.readU(16) * 10;
    }
    else {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error(`illegal sample rate code ${srCode}`, cheap__fileName__0, 126);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    const crc = (0,common_math_crc8__WEBPACK_IMPORTED_MODULE_3__["default"])(bitReader.getBuffer().subarray(start, bitReader.getPointer()));
    if (crc !== bitReader.readU(8)) {
        !check && common_util_logger__WEBPACK_IMPORTED_MODULE_1__.error('header crc mismatch', cheap__fileName__0, 133);
        return avutil_error__WEBPACK_IMPORTED_MODULE_0__.DATA_INVALID;
    }
    return 0;
}


/***/ }),

/***/ "./src/avformat/formats/ogg/OggPage.ts":
/*!*********************************************!*\
  !*** ./src/avformat/formats/ogg/OggPage.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OggPage: () => (/* binding */ OggPage),
/* harmony export */   OggsCommentPage: () => (/* binding */ OggsCommentPage)
/* harmony export */ });
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/*
 * libmedia oggs page parser
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


class UserComment {
    list;
    constructor() {
        this.list = [];
    }
    read(ioReader, count) {
        for (let i = 0; i < count; i++) {
            const length = ioReader.readUint32();
            this.list.push(ioReader.readString(length));
        }
    }
    write(ioWriter) {
        for (let i = 0; i < this.list.length; i++) {
            const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(this.list[i]);
            ioWriter.writeUint32(buffer.length);
            ioWriter.writeBuffer(buffer);
        }
    }
    addComment(comment) {
        this.list.push(comment);
    }
}
class OggPage {
    /**
     * 4 bytes 页标识， OggS ASCII 字符
     */
    capturePattern;
    /**
     * 1 bytes 版本 id, 目前为 0
     */
    streamStructureVersion;
    /**
     * 1 bytes 类型标识， 表示该页为逻辑流的第一页
     *
     * - 0x01：本页媒体编码数据与前一页属于同一个逻辑流的同一个 packet，若此位没有设，表示本页是以一个新的 packet 开始的；
     * - 0x02：表示该页为逻辑流的第一页，bos 标识，如果此位未设置，那表示不是第一页；
     * - 0x04：表示该页为逻辑流的最后一页，eos 标识，如果此位未设置，那表示本页不是最后一页；
     */
    headerTypeFlag;
    /**
     * 8 bytes 媒体编码相关的参数信息
     *
     * 对于音频流来说，它存储着到本页为止逻辑流在 PCM 输出中采样码的数目，可以由它来算得时间戳
     * 对于视频流来说，它存储着到本页为止视频帧编码的数目
     * 若此值为 -1，那表示截止到本页，逻辑流的 packet 未结束
     */
    granulePosition;
    /**
     * 4 bytes 当前页中的流的 id，它是区分本页所属逻辑流与其他逻辑流的序号，我们可以通过这个值来划分流
     */
    serialNumber;
    /**
     * 4 bytes 本页在逻辑流的序号
     */
    pageSequenceNumber;
    /**
     * 4 bytes 循环冗余效验码效验， 用来效验每页的有效性
     */
    crcCheckSum;
    /**
     * 1 bytes 给定本页在 segment_table 域中出现的 segment 个数
     */
    numberPageSegments;
    /**
     * segment 长度表
     *
     * 表示着每个 segment 的长度，取值范围是 0~255
     * 由 segment（1 个 segment 就是 1 个字节）可以得到 packet 的值，每个 packet 的大小是以最后一个不等于 255 的 segment 结束的
     */
    segmentTable;
    payload;
    pos;
    constructor() {
        this.reset();
    }
    reset() {
        this.capturePattern = 'OggS';
        this.streamStructureVersion = 0;
        this.headerTypeFlag = 0;
        this.granulePosition = avutil_constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE_BIGINT;
        this.serialNumber = 0;
        this.pageSequenceNumber = 0;
        this.crcCheckSum = 0;
        this.numberPageSegments = 0;
        this.segmentTable = [];
        this.pos = BigInt(0);
    }
    async read(ioReader) {
        this.pos = ioReader.getPos();
        await this.readPageHeader(ioReader);
        const length = this.segmentTable.reduce((prev, len) => {
            return prev + len;
        }, 0);
        if (length) {
            this.payload = await ioReader.readBuffer(length);
        }
    }
    async readPageHeader(ioReader) {
        this.capturePattern = await ioReader.readString(4);
        this.streamStructureVersion = await ioReader.readUint8();
        this.headerTypeFlag = await ioReader.readUint8();
        this.granulePosition = await ioReader.readUint64();
        this.serialNumber = await ioReader.readUint32();
        this.pageSequenceNumber = await ioReader.readUint32();
        this.crcCheckSum = await ioReader.readUint32();
        this.numberPageSegments = await ioReader.readUint8();
        if (this.numberPageSegments) {
            for (let i = 0; i < this.numberPageSegments; i++) {
                const len = await ioReader.readUint8();
                this.segmentTable.push(len);
            }
        }
    }
    write(ioWriter) {
        this.pos = ioWriter.getPos();
        ioWriter.writeString(this.capturePattern);
        ioWriter.writeUint8(this.streamStructureVersion);
        ioWriter.writeUint8(this.headerTypeFlag);
        ioWriter.writeUint64(this.granulePosition);
        ioWriter.writeUint32(this.serialNumber);
        ioWriter.writeUint32(this.pageSequenceNumber);
        ioWriter.writeUint32(this.crcCheckSum);
        if (this.payload) {
            this.numberPageSegments = Math.floor(this.payload.length / 255) + 1;
            const last = this.payload.length % 255;
            ioWriter.writeUint8(this.numberPageSegments);
            for (let i = 0; i < this.numberPageSegments - 1; i++) {
                ioWriter.writeUint8(255);
            }
            ioWriter.writeUint8(last);
            ioWriter.writeBuffer(this.payload);
        }
        else {
            ioWriter.writeUint8(0);
        }
    }
}
class OggsCommentPage {
    streamIndex;
    /**
     * 8 bytes Magic Signature: OpusTags
     */
    signature;
    /**
     * 4 bytes unsigned
     */
    vendorStringLength;
    /**
     * 长度由 Vendor String Length 指定， utf-8 编码
     */
    vendorString;
    /**
     * 4 bytes unsigned, 该字段指示用户提供的注释数。它可能表示用户提供的评论为零，在这种情况下数据包中没有其他字段。
     * 一定不要表示评论太多，以至于评论字符串长度将需要比其余的可用数据更多的数据数据包
     */
    userCommentListLength;
    comments;
    constructor() {
        this.vendorString = "v0.9.0-29-gc2ccb944";
        this.vendorStringLength = this.vendorString.length;
        this.userCommentListLength = 0;
        this.comments = new UserComment();
    }
    read(ioReader) {
        this.vendorStringLength = ioReader.readUint32();
        this.vendorString = ioReader.readString(this.vendorStringLength);
        this.userCommentListLength = ioReader.readUint32();
        if (this.userCommentListLength) {
            this.comments.read(ioReader, this.userCommentListLength);
        }
    }
    write(ioWriter) {
        const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(this.vendorString);
        ioWriter.writeUint32(buffer.length);
        ioWriter.writeBuffer(buffer);
        ioWriter.writeUint32(this.comments.list.length);
        this.comments.write(ioWriter);
    }
    addComment(comment) {
        this.comments.addComment(comment);
    }
    setCodec(codecpar) {
    }
}


/***/ }),

/***/ "./src/avformat/formats/ogg/vorbis.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/ogg/vorbis.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VorbisOggsCommentPage: () => (/* binding */ VorbisOggsCommentPage),
/* harmony export */   VorbisOggsIdPage: () => (/* binding */ VorbisOggsIdPage),
/* harmony export */   addVorbisComment: () => (/* binding */ addVorbisComment),
/* harmony export */   parseVorbisComment: () => (/* binding */ parseVorbisComment)
/* harmony export */ });
/* harmony import */ var _OggPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OggPage */ "./src/avformat/formats/ogg/OggPage.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_function_isDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/isDef */ "./src/common/function/isDef.ts");
/*
 * libmedia oggs vorbis page parser
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



const CommentKeyMap = {
    'album': "album" /* AVStreamMetadataKey.ALBUM */,
    'artist': "artist" /* AVStreamMetadataKey.ARTIST */,
    'description': "description" /* AVStreamMetadataKey.DESCRIPTION */,
    'encoder': "encoder" /* AVStreamMetadataKey.ENCODER */,
    'title': "title" /* AVStreamMetadataKey.TITLE */,
    'tracknumber': "track" /* AVStreamMetadataKey.TRACK */,
    'date': "date" /* AVStreamMetadataKey.DATE */,
    'genre': "genre" /* AVStreamMetadataKey.GENRE */,
    'comment': "comment" /* AVStreamMetadataKey.COMMENT */,
    'albumartist': "albumArtist" /* AVStreamMetadataKey.ALBUM_ARTIST */,
    'composer': "composer" /* AVStreamMetadataKey.COMPOSER */,
    'performer': "performer" /* AVStreamMetadataKey.PERFORMER */,
    'discnumber': "disc" /* AVStreamMetadataKey.DISC */,
    'organization': "vendor" /* AVStreamMetadataKey.VENDOR */,
    'copyright': "copyright" /* AVStreamMetadataKey.COPYRIGHT */,
    'license': "license" /* AVStreamMetadataKey.LICENSE */,
    'isrc': "isrc" /* AVStreamMetadataKey.ISRC */,
    'lyrics': "lyrics" /* AVStreamMetadataKey.LYRICS */,
    'language': "language" /* AVStreamMetadataKey.LANGUAGE */,
    'label': "vendor" /* AVStreamMetadataKey.VENDOR */,
    'script': "lyrics" /* AVStreamMetadataKey.LYRICS */,
    'encoded_by': "vendor" /* AVStreamMetadataKey.VENDOR */
};
function parseVorbisComment(list, metadata) {
    if (!list) {
        return;
    }
    list.forEach((value) => {
        const l = value.split('=');
        if (l.length === 2) {
            const k = l[0].trim().toLowerCase();
            const v = l[1].trim();
            if (CommentKeyMap[k]) {
                metadata[CommentKeyMap[k]] = v;
            }
            else {
                metadata[k.toLowerCase()] = v;
            }
        }
    });
}
function addVorbisComment(metadata) {
    const list = [];
    common_util_object__WEBPACK_IMPORTED_MODULE_1__.each(CommentKeyMap, (value, key) => {
        if ((0,common_function_isDef__WEBPACK_IMPORTED_MODULE_2__["default"])(metadata[value])) {
            list.push(`${key.toUpperCase()}=${metadata[value]}`);
        }
    });
    return list;
}
class VorbisOggsIdPage {
    streamIndex;
    /**
     * 8 bits packet_type
     */
    packetType;
    /**
     * 6 bytes Magic Signature: vorbis
     */
    signature;
    /**
     * 4 bytes unsigned, 对应值 0x01
     */
    version;
    /**
     * 1 bytes unsigned, 声道数
     */
    channels;
    /**
     * 4 bytes unsigned, 原始输入采样率
     */
    sampleRate;
    /**
     * 4 bytes
     */
    bitrateMaximum;
    /**
     * 4 bytes
     */
    bitrateNominal;
    /**
     * 4 bytes
     */
    bitrateMinimum;
    /**
     * 4 bits
     */
    blocksize0;
    /**
     * 4 bits
     */
    blocksize1;
    /**
     * 1 bit
     */
    framingFlag;
    constructor(signature = 'vorbis') {
        this.signature = signature;
        this.version = 0;
        this.channels = 1;
        this.sampleRate = 48000;
        this.bitrateMaximum = 0;
        this.bitrateNominal = 0;
        this.bitrateMinimum = 0;
        this.blocksize0 = 2048;
        this.blocksize1 = 256;
    }
    read(ioReader) {
        this.packetType = ioReader.readUint8();
        this.signature = ioReader.readString(6);
        this.version = ioReader.readUint32();
        this.channels = ioReader.readUint8();
        this.sampleRate = ioReader.readInt32();
        this.bitrateMaximum = ioReader.readInt32();
        this.bitrateNominal = ioReader.readInt32();
        this.bitrateMinimum = ioReader.readInt32();
        const block = ioReader.readUint8() & 0xff;
        this.blocksize0 = Math.pow(2, block >>> 4);
        this.blocksize1 = Math.pow(2, block & 0x0f);
        this.framingFlag = ioReader.readUint8();
    }
    write(ioWriter) {
        ioWriter.writeUint8(0x01);
        ioWriter.writeString(this.signature);
        ioWriter.writeUint32(this.version);
        ioWriter.writeUint8(this.channels);
        ioWriter.writeInt32(this.sampleRate);
        ioWriter.writeInt32(this.bitrateMaximum);
        ioWriter.writeInt32(this.bitrateNominal);
        ioWriter.writeInt32(this.bitrateMinimum);
        ioWriter.writeUint8((Math.log2(this.blocksize0) << 4) | Math.log2(this.blocksize1));
        ioWriter.writeUint8(0x01);
    }
    setCodec(codecpar) {
        this.sampleRate = codecpar.sampleRate;
        this.channels = codecpar.chLayout.nbChannels;
    }
}
class VorbisOggsCommentPage extends _OggPage__WEBPACK_IMPORTED_MODULE_0__.OggsCommentPage {
    /**
     * 8 bits packet_type
     */
    packetType;
    /**
     * 1 bit
     */
    framingFlag;
    constructor(signature = 'vorbis') {
        super();
        this.signature = signature;
        this.packetType = 0x01;
        this.framingFlag = 0x01;
    }
    read(ioReader) {
        this.packetType = ioReader.readUint8();
        this.signature = ioReader.readString(6);
        super.read(ioReader);
        if (this.signature === 'vorbis') {
            this.framingFlag = ioReader.readUint8();
        }
    }
    write(ioWriter) {
        ioWriter.writeUint8(this.packetType);
        ioWriter.writeString(this.signature);
        super.write(ioWriter);
        if (this.signature === 'vorbis') {
            ioWriter.writeUint8(this.framingFlag);
        }
    }
    addComment(comment) {
        this.comments.addComment(comment);
    }
    setCodec(codecpar) {
    }
}


/***/ }),

/***/ "./src/avformat/function/getBytesByDuration.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/function/getBytesByDuration.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBytesByDuration: () => (/* binding */ getBytesByDuration)
/* harmony export */ });
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/*
 * libmedia get bytes by duration
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



function getBytesByDuration(streams, duration, timeBase) {
    let bytes = BigInt(0);
    common_util_array__WEBPACK_IMPORTED_MODULE_0__.each(streams, (st) => {
        bytes += st.codecpar.bitrate * (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_1__.avRescaleQ)(duration, timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_2__.AV_MILLI_TIME_BASE_Q) / BigInt(8000);
    });
    return bytes;
}


/***/ }),

/***/ "./src/avformat/function/seekInBytes.ts":
/*!**********************************************!*\
  !*** ./src/avformat/function/seekInBytes.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ seekInBytes)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./..\..\avutil\struct\rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getBytesByDuration */ "./src/avformat/function/getBytesByDuration.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
const cheap__fileName__0 = "src\\avformat\\function\\seekInBytes.ts";









async function seekInBytes(context, stream, timestamp, firstPacketPos, readAVPacket, syncAVPacket) {
    const now = context.ioReader.getPos();
    const fileSize = await context.ioReader.fileSize();
    let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
    let duration = timestamp;
    if (stream.startTime !== avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT) {
        duration -= stream.startTime;
    }
    else {
        duration -= stream.firstDTS;
    }
    const pointPts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
    // 头十秒直接回到开始位置
    if (pointPts < BigInt(10000)) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`seek pts is earlier then 10s, seek to first packet pos(${firstPacketPos}) directly`, cheap__fileName__0, 63);
        await context.ioReader.seek(firstPacketPos);
        return now;
    }
    let bytes = (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, duration, stream.timeBase);
    // 最大到结尾往前 10 秒
    const max = fileSize - (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, BigInt(10000), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
    const length = (0,_getBytesByDuration__WEBPACK_IMPORTED_MODULE_5__.getBytesByDuration)(context.streams, BigInt(10000), avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
    if (bytes > max) {
        bytes = max;
    }
    if (bytes < firstPacketPos) {
        await context.ioReader.seek(firstPacketPos);
        return now;
    }
    const avpacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.createAVPacket)();
    let seekMax = fileSize;
    let seekMin = BigInt(0);
    failed: while (true) {
        if (seekMax - seekMin < length) {
            bytes = seekMin;
        }
        await context.ioReader.seek(bytes);
        await syncAVPacket(context);
        if (context.ioReader.flags & 8 /* IOFlags.ABORT */) {
            break;
        }
        let ret = await readAVPacket(context, avpacket);
        let now = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 56);
        if (ret >= 0) {
            const currentPts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
            let diff = currentPts - pointPts;
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`try to seek to pos: ${bytes}, got packet pts: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8)}(${currentPts}ms), diff: ${diff}ms`, cheap__fileName__0, 100);
            // seek 时间戳的前面 10 秒内
            if (diff <= BigInt(0) && -diff < BigInt(10000) || seekMax - seekMin < length) {
                // 查找最近的关键帧
                const keyPos = [now];
                while (diff <= 0) {
                    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 32) === stream.index && (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
                        keyPos.push(now);
                    }
                    (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.unrefAVPacket)(avpacket);
                    ret = await readAVPacket(context, avpacket);
                    if (ret < 0) {
                        if (ret === -1048576 /* IOError.END */) {
                            break;
                        }
                        else if (ret === -1048575 /* IOError.AGAIN */) {
                            continue;
                        }
                        // 失败了重新 seek 回原来的位置
                        else {
                            pos = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
                            break failed;
                        }
                    }
                    now = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 56);
                    diff = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q) - pointPts;
                }
                pos = keyPos.pop();
                break;
            }
            // seek 后面
            else if (diff > BigInt(0)) {
                seekMax = bytes;
                bytes = (seekMin + seekMax) >> BigInt(1);
            }
            // seek 前面 10 秒外
            else {
                seekMin = bytes;
                bytes = (seekMin + seekMax) >> BigInt(1);
            }
        }
        else {
            // 失败了重新 seek 回原来的位置
            pos = avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT;
            break;
        }
        if (context.ioReader.flags & 8 /* IOFlags.ABORT */) {
            break;
        }
    }
    (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_6__.destroyAVPacket)(avpacket);
    if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_3__.NOPTS_VALUE_BIGINT) {
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`finally seek to pos ${pos}`, cheap__fileName__0, 155);
        await context.ioReader.seek(pos);
        await syncAVPacket(context);
        return now;
    }
    else {
        await context.ioReader.seek(now);
        if (context.ioReader.flags & 8 /* IOFlags.ABORT */) {
            return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.EOF);
        }
    }
    return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_7__.FORMAT_NOT_SUPPORT);
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

/***/ "./src/common/math/crc8.ts":
/*!*********************************!*\
  !*** ./src/common/math/crc8.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ crc8)
/* harmony export */ });
function crc8(data, crc = 0x00) {
    const polynomial = 0x07;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) {
            if (crc & 0x80) {
                crc = (crc << 1) ^ polynomial;
            }
            else {
                crc <<= 1;
            }
        }
    }
    return crc & 0xFF;
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IFlacFormat_ts.avtranscoder.js.map