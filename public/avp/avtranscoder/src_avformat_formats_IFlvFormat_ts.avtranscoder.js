"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_IFlvFormat_ts"],{

/***/ "./src/avformat/formats/IFlvFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IFlvFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IFlvFormat)
/* harmony export */ });
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./..\..\avutil\struct\rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./flv/FlvHeader */ "./src/avformat/formats/flv/FlvHeader.ts");
/* harmony import */ var _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./flv/FlvScriptTag */ "./src/avformat/formats/flv/FlvScriptTag.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var _flv_flv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./flv/flv */ "./src/avformat/formats/flv/flv.ts");
/* harmony import */ var avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/codecs/h264 */ "./src/avutil/codecs/h264.ts");
/* harmony import */ var avutil_codecs_aac__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/codecs/aac */ "./src/avutil/codecs/aac.ts");
/* harmony import */ var avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/codecs/hevc */ "./src/avutil/codecs/hevc.ts");
/* harmony import */ var avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avutil/codecs/vvc */ "./src/avutil/codecs/vvc.ts");
/* harmony import */ var avutil_codecs_av1__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/codecs/av1 */ "./src/avutil/codecs/av1.ts");
/* harmony import */ var avutil_codecs_vp9__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/codecs/vp9 */ "./src/avutil/codecs/vp9.ts");
/* harmony import */ var avutil_codecs_vp8__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! avutil/codecs/vp8 */ "./src/avutil/codecs/vp8.ts");
/* harmony import */ var avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avutil/codecs/flac */ "./src/avutil/codecs/flac.ts");
/* harmony import */ var avutil_codecs_opus__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! avutil/codecs/opus */ "./src/avutil/codecs/opus.ts");
/* harmony import */ var avutil_codecs_ac3__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/codecs/ac3 */ "./src/avutil/codecs/ac3.ts");
/* harmony import */ var avutil_codecs_mp3__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/codecs/mp3 */ "./src/avutil/codecs/mp3.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _function_seekInBytes__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../function/seekInBytes */ "./src/avformat/function/seekInBytes.ts");
/* harmony import */ var common_function_isDef__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! common/function/isDef */ "./src/common/function/isDef.ts");
/* harmony import */ var avutil_util_amf__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! avutil/util/amf */ "./src/avutil/util/amf.ts");
/* harmony import */ var avutil_struct_avframe__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! avutil/struct/avframe */ "./src/avutil/struct/avframe.ts");
/* harmony import */ var avutil_util_channel__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! avutil/util/channel */ "./src/avutil/util/channel.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\IFlvFormat.ts";






/*
 * libmedia flv decoder
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






























class IFlvFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_22__["default"] {
    type = 0 /* AVFormat.FLV */;
    header;
    script;
    options;
    firstTagPos;
    constructor(options = {}) {
        super();
        this.header = new _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_6__["default"]();
        this.script = new _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_7__["default"]();
        this.options = options;
    }
    init(formatContext) {
        if (formatContext.ioReader) {
            formatContext.ioReader.setEndian(true);
        }
    }
    async readHeader(formatContext) {
        try {
            const signature = await formatContext.ioReader.peekString(3);
            if (signature !== 'FLV') {
                common_util_logger__WEBPACK_IMPORTED_MODULE_8__.error('the file format is not flv', cheap__fileName__0, 118);
                return avutil_error__WEBPACK_IMPORTED_MODULE_21__.DATA_INVALID;
            }
            await this.header.read(formatContext.ioReader);
            const prev = await formatContext.ioReader.readUint32();
            if (prev !== 0) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn('the previousTagSize0 is not 0', cheap__fileName__0, 125);
            }
            let ret = 0;
            const type = await formatContext.ioReader.peekUint8();
            if (type === 18 /* FlvTag.SCRIPT */) {
                await formatContext.ioReader.skip(1);
                const size = await formatContext.ioReader.readUint24();
                await formatContext.ioReader.skip(7);
                ret = await this.script.read(formatContext.ioReader, size);
            }
            if (ret >= 0) {
                this.firstTagPos = formatContext.ioReader.getPos();
            }
            return ret;
        }
        catch (error) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.error(error.message, cheap__fileName__0, 143);
            return formatContext.ioReader.error;
        }
    }
    async readModEx(formatContext, avpacket, mediaType) {
        let exSize = await formatContext.ioReader.readUint8() + 1;
        if (exSize === 256) {
            exSize = await formatContext.ioReader.readUint16() + 1;
        }
        const exBuffer = await formatContext.ioReader.readBuffer(exSize);
        const type = await formatContext.ioReader.readUint8();
        const exType = type & 0xf0;
        if (exType === 0 /* VideoPacketModExType.TimestampOffsetNano */
            && mediaType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
            || exType === 0 /* AudioPacketModExType.TimestampOffsetNano */
                && mediaType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            let nanoOffset = 0;
            if (exBuffer.length === 3) {
                nanoOffset = (exBuffer[0] << 16) | (exBuffer[1] << 8) | exBuffer[2];
                if (this.options.useNanoTimestamp) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16) + BigInt(nanoOffset));
                }
                else {
                    // 还是使用毫秒时间精度
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16) + BigInt(nanoOffset) / BigInt(1000000));
                }
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16));
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`Invalid ModEx size for Type TimestampOffsetNano!, need 3 but got ${exBuffer.length}`, cheap__fileName__0, 176);
            }
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`unknown ModEx type: ${exType}`, cheap__fileName__0, 180);
        }
        return type & 0x0f;
    }
    async readCodecConfigurationRecord(formatContext, stream, avpacket, len) {
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__.avMalloc)(len);
        if (stream.codecpar.extradata) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.addAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, data, len);
            await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapSafeUint8Array)(data, len));
        }
        else {
            stream.codecpar.extradata = data;
            stream.codecpar.extradataSize = len;
            await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapSafeUint8Array)(data, len));
            stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapUint8Array)(data, len).slice();
            if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_10__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_12__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_13__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                avutil_codecs_av1__WEBPACK_IMPORTED_MODULE_14__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */) {
                avutil_codecs_vp9__WEBPACK_IMPORTED_MODULE_15__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 139 /* AVCodecID.AV_CODEC_ID_VP8 */) {
                avutil_codecs_vp8__WEBPACK_IMPORTED_MODULE_16__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                avutil_codecs_aac__WEBPACK_IMPORTED_MODULE_11__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */) {
                avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_17__.parseAVCodecParameters(stream);
            }
            else if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                avutil_codecs_opus__WEBPACK_IMPORTED_MODULE_18__.parseAVCodecParameters(stream);
            }
        }
    }
    async readAVPacketData(formatContext, stream, avpacket, len) {
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__.avMalloc)(len);
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.addAVPacketData)(avpacket, data, len);
        await formatContext.ioReader.readBuffer(len, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.mapSafeUint8Array)(data, len));
    }
    parseColorInfo(stream, avpacket, info) {
        let hasMasteringPrimaries = false;
        let hasMasteringLuminance = false;
        if (info.hdrMdcv) {
            hasMasteringPrimaries = info.hdrMdcv.redX > 0
                && info.hdrMdcv.redY > 0
                && info.hdrMdcv.blueX > 0
                && info.hdrMdcv.blueY > 0
                && info.hdrMdcv.greenX > 0
                && info.hdrMdcv.greenY > 0
                && info.hdrMdcv.whitePointX > 0
                && info.hdrMdcv.whitePointY > 0;
            hasMasteringLuminance = info.hdrMdcv.maxLuminance > 0 && info.hdrMdcv.minLuminance > 0;
        }
        if (info.colorConfig.matrixCoefficients !== 3 /* AVColorSpace.AVCOL_SPC_RESERVED */) {
            stream.codecpar.colorSpace = info.colorConfig.matrixCoefficients;
        }
        if (info.colorConfig.colorPrimaries !== 3 /* AVColorPrimaries.AVCOL_PRI_RESERVED */
            && info.colorConfig.colorPrimaries !== 0 /* AVColorPrimaries.AVCOL_PRI_RESERVED0 */) {
            stream.codecpar.colorPrimaries = info.colorConfig.colorPrimaries;
        }
        if (info.colorConfig.transferCharacteristics !== 3 /* AVColorTransferCharacteristic.AVCOL_TRC_RESERVED */
            && info.colorConfig.transferCharacteristics !== 0 /* AVColorTransferCharacteristic.AVCOL_TRC_RESERVED0 */) {
            stream.codecpar.colorTrc = info.colorConfig.transferCharacteristics;
        }
        if (info.hdrCll && info.hdrCll.maxCLL && info.hdrCll.maxFall) {
            const metadata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__.avMallocz)(8);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[8](metadata, info.hdrCll.maxCLL);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[8](metadata + 4, info.hdrCll.maxFall);
            if ((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 24, 22 /* AVPacketSideDataType.AV_PKT_DATA_CONTENT_LIGHT_LEVEL */)) {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.addAVPacketSideData)(avpacket, 22 /* AVPacketSideDataType.AV_PKT_DATA_CONTENT_LIGHT_LEVEL */, metadata, 8);
            }
            else {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.addSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 24, 22 /* AVPacketSideDataType.AV_PKT_DATA_CONTENT_LIGHT_LEVEL */, metadata, 8);
            }
        }
        if (hasMasteringLuminance || hasMasteringPrimaries) {
            const metadata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_23__.avMallocz)(88);
            function setQ(q, d) {
                const s = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avD2Q)(d, avutil_constant__WEBPACK_IMPORTED_MODULE_27__.INT32_MAX);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](q + 4, s.den);
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](q, s.num);
            }
            if (hasMasteringLuminance) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](metadata + 84, 1);
                setQ(metadata + 72, info.hdrMdcv.maxLuminance);
                setQ(metadata + 64, info.hdrMdcv.minLuminance);
            }
            if (hasMasteringPrimaries) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](metadata + 80, 1);
                setQ(metadata, info.hdrMdcv.redX);
                setQ(metadata + 8, info.hdrMdcv.redY);
                setQ(metadata + 16, info.hdrMdcv.greenX);
                setQ(metadata + 16 + 8, info.hdrMdcv.greenY);
                setQ(metadata + 32, info.hdrMdcv.blueX);
                setQ(metadata + 32 + 8, info.hdrMdcv.blueY);
            }
            if ((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 24, 20 /* AVPacketSideDataType.AV_PKT_DATA_MASTERING_DISPLAY_METADATA */)) {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.addAVPacketSideData)(avpacket, 20 /* AVPacketSideDataType.AV_PKT_DATA_MASTERING_DISPLAY_METADATA */, metadata, 88);
            }
            else {
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.addSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 24, 20 /* AVPacketSideDataType.AV_PKT_DATA_MASTERING_DISPLAY_METADATA */, metadata, 88);
            }
        }
    }
    findStream(formatContext, mediaType, trackId) {
        for (let i = 0; i < formatContext.streams.length; i++) {
            if (formatContext.streams[i].codecpar.codecType === mediaType) {
                const streamContext = formatContext.streams[i].privData;
                if (streamContext && streamContext.trackId === trackId) {
                    return formatContext.streams[i];
                }
            }
        }
    }
    createStream(formatContext, mediaType, avpacket, trackId) {
        const stream = formatContext.createStream();
        stream.codecpar.codecType = mediaType;
        stream.timeBase.den = this.options.useNanoTimestamp ? avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_NANO_TIME_BASE : avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE;
        stream.timeBase.num = 1;
        stream.startTime = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 8);
        const streamContext = {
            trackId
        };
        stream.privData = streamContext;
        if (this.script.onMetaData?.duration) {
            stream.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ)(BigInt(Math.floor(this.script.onMetaData.duration * 1000)), avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q, stream.timeBase);
        }
        if (mediaType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            if (this.script.onMetaData?.width > 0) {
                stream.codecpar.width = this.script.onMetaData.width;
            }
            if (this.script.onMetaData?.height > 0) {
                stream.codecpar.height = this.script.onMetaData.height;
            }
            if (this.script.onMetaData?.videoTrackIdInfoMap?.[trackId]) {
                if (this.script.onMetaData.videoTrackIdInfoMap[trackId].title) {
                    stream.metadata["title" /* AVStreamMetadataKey.TITLE */] = this.script.onMetaData.videoTrackIdInfoMap[trackId].title;
                }
                if (this.script.onMetaData.videoTrackIdInfoMap[trackId].lang) {
                    stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */] = this.script.onMetaData.videoTrackIdInfoMap[trackId].lang;
                }
                if (this.script.onMetaData.videoTrackIdInfoMap[trackId].width > 0) {
                    stream.codecpar.width = this.script.onMetaData.videoTrackIdInfoMap[trackId].width;
                }
                if (this.script.onMetaData.videoTrackIdInfoMap[trackId].height > 0) {
                    stream.codecpar.height = this.script.onMetaData.videoTrackIdInfoMap[trackId].height;
                }
                if (this.script.onMetaData.videoTrackIdInfoMap[trackId].duration > 0) {
                    stream.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ)(BigInt(this.script.onMetaData.videoTrackIdInfoMap[trackId].duration * 1000), avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q, stream.timeBase);
                }
            }
        }
        else if (mediaType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            if (this.script.onMetaData?.audioTrackIdInfoMap?.[trackId]) {
                if (this.script.onMetaData.audioTrackIdInfoMap[trackId].title) {
                    stream.metadata["title" /* AVStreamMetadataKey.TITLE */] = this.script.onMetaData.audioTrackIdInfoMap[trackId].title;
                }
                if (this.script.onMetaData.audioTrackIdInfoMap[trackId].lang) {
                    stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */] = this.script.onMetaData.audioTrackIdInfoMap[trackId].lang;
                }
                if (this.script.onMetaData.audioTrackIdInfoMap[trackId].duration > 0) {
                    stream.duration = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ)(BigInt(this.script.onMetaData.audioTrackIdInfoMap[trackId].duration * 1000), avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q, stream.timeBase);
                }
            }
        }
        if (this.onStreamAdd) {
            this.onStreamAdd(stream);
        }
        return stream;
    }
    async readAVPacket_(formatContext, avpacket) {
        const now = formatContext.ioReader.getPos();
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 56, now);
        let needRedo = false;
        const type = (await formatContext.ioReader.readUint8()) & 0x1f;
        let size = await formatContext.ioReader.readUint24();
        let timestamp = await formatContext.ioReader.readUint24();
        const timestampExt = await formatContext.ioReader.readUint8();
        if (timestampExt) {
            timestamp = (timestampExt << 24) | timestamp;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 16, this.options.useNanoTimestamp
            ? (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ)(BigInt(Math.floor(timestamp)), avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q, avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_NANO_TIME_BASE_Q)
            : BigInt(Math.floor(timestamp)));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16));
        // streamId 总是 0
        await formatContext.ioReader.skip(3);
        if (type === 8 /* FlvTag.AUDIO */) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            const audioHeader = await formatContext.ioReader.readUint8();
            size--;
            const flvAudioCodecId = (audioHeader & 0xf0) >> 4;
            // new, used to signal FOURCC mode
            if (flvAudioCodecId === 9) {
                let isAudioMultiTrack = false;
                let audioPacketType = audioHeader & 0x0f;
                while (audioPacketType === 7 /* AudioPacketType.ModEx */) {
                    let now = formatContext.ioReader.getPos();
                    audioPacketType = await this.readModEx(formatContext, avpacket, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
                    size -= Number(BigInt.asIntN(32, formatContext.ioReader.getPos() - now));
                }
                let tag = 0;
                let audioMultiTrackType = 0;
                if (audioPacketType === 5 /* AudioPacketType.MultiTrack */) {
                    isAudioMultiTrack = true;
                    const type = await formatContext.ioReader.readUint8();
                    size--;
                    audioMultiTrackType = (type & 0xf0) >> 4;
                    audioPacketType = type & 0x0f;
                    if (audioMultiTrackType !== 2 /* AVMultiTrackType.ManyTracksManyCodecs */) {
                        tag = await formatContext.ioReader.readUint32();
                        size -= 4;
                    }
                }
                else {
                    tag = await formatContext.ioReader.readUint32();
                    size -= 4;
                }
                let nextAVPacket = avpacket;
                while (true) {
                    let trackSize = size;
                    let trackId = 0;
                    if (isAudioMultiTrack) {
                        if (audioMultiTrackType === 2 /* AVMultiTrackType.ManyTracksManyCodecs */) {
                            tag = await formatContext.ioReader.readUint32();
                            size -= 4;
                        }
                        trackId = await formatContext.ioReader.readUint8();
                        size--;
                        if (audioMultiTrackType !== 0 /* AVMultiTrackType.OneTrack */) {
                            trackSize = await formatContext.ioReader.readUint24();
                            size -= 3;
                        }
                        else {
                            trackSize = size;
                        }
                    }
                    let stream = this.findStream(formatContext, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, trackId);
                    if (!stream) {
                        stream = this.createStream(formatContext, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, nextAVPacket, trackId);
                        if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('ac-3')) {
                            stream.codecpar.codecId = 86019 /* AVCodecID.AV_CODEC_ID_AC3 */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('ec-3')) {
                            stream.codecpar.codecId = 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('Opus')) {
                            stream.codecpar.codecId = 86076 /* AVCodecID.AV_CODEC_ID_OPUS */;
                            stream.codecpar.sampleRate = 48000;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('.mp3')) {
                            stream.codecpar.codecId = 86017 /* AVCodecID.AV_CODEC_ID_MP3 */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('fLaC')) {
                            stream.codecpar.codecId = 86028 /* AVCodecID.AV_CODEC_ID_FLAC */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('mp4a')) {
                            stream.codecpar.codecId = 86018 /* AVCodecID.AV_CODEC_ID_AAC */;
                        }
                        else {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`unknown codec fourcc(${tag.toString(16)})`, cheap__fileName__0, 509);
                            stream.codecpar.codecId = 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                        }
                    }
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](nextAVPacket + 32, stream.index);
                    size -= trackSize;
                    if (audioPacketType === 4 /* AudioPacketType.MultichannelConfig */) {
                        const channelOrder = await formatContext.ioReader.readUint8();
                        const channelCount = await formatContext.ioReader.readUint8();
                        trackSize -= 2;
                        (0,avutil_util_channel__WEBPACK_IMPORTED_MODULE_33__.unInitChannelLayout)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 112);
                        if (channelOrder === 2 /* AudioChannelOrder.Custom */) {
                            (0,avutil_util_channel__WEBPACK_IMPORTED_MODULE_33__.initCustomChannelLayout)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 112, channelCount);
                            for (let i = 0; i < channelCount; i++) {
                                const id = await formatContext.ioReader.readUint8();
                                trackSize--;
                                if (id < 18) {
                                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](stream.codecpar.chLayout.u.map + i * 24, id);
                                }
                                else if (id >= 18 && id <= 23) {
                                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](stream.codecpar.chLayout.u.map + i * 24, id - 18 + 35 /* AVChannel.AV_CHANNEL_LOW_FREQUENCY_2 */);
                                }
                                else if (id === 0xFE) {
                                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](stream.codecpar.chLayout.u.map + i * 24, 512 /* AVChannel.AV_CHANNEL_UNUSED */);
                                }
                                else {
                                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](stream.codecpar.chLayout.u.map + i * 24, 768 /* AVChannel.AV_CHANNEL_UNKNOWN */);
                                }
                            }
                        }
                        else if (channelOrder === 1 /* AudioChannelOrder.Native */) {
                            let mask = BigInt((await formatContext.ioReader.readUint32()));
                            trackSize -= 4;
                            mask = (mask & BigInt(0x3ffff)) | ((mask & BigInt(0xfc0000)) << (BigInt(35 /* AVChannel.AV_CHANNEL_LOW_FREQUENCY_2 */) - BigInt(18)));
                            (0,avutil_util_channel__WEBPACK_IMPORTED_MODULE_33__.setChannelLayoutFromMask)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_1__.symbolStructAddress] + 112, mask);
                        }
                        needRedo = true;
                    }
                    else if (audioPacketType === 0 /* AudioPacketType.SequenceStart */) {
                        if (trackSize) {
                            await this.readCodecConfigurationRecord(formatContext, stream, nextAVPacket, trackSize);
                            trackSize = 0;
                            needRedo = false;
                            if (!(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)) {
                                needRedo = true;
                            }
                        }
                        else {
                            needRedo = true;
                        }
                    }
                    else if (audioPacketType === 2 /* AudioPacketType.SequenceEnd */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](nextAVPacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](nextAVPacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                        needRedo = false;
                    }
                    else if (audioPacketType === 1 /* AudioPacketType.CodedFrames */) {
                        await this.readAVPacketData(formatContext, stream, nextAVPacket, trackSize);
                        if ((stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
                            || stream.codecpar.codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */
                            || stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */)
                            && stream.codecpar.sampleRate === avutil_constant__WEBPACK_IMPORTED_MODULE_27__.NOPTS_VALUE) {
                            if (stream.codecpar.codecId === 86019 /* AVCodecID.AV_CODEC_ID_AC3 */
                                || stream.codecpar.codecId === 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */) {
                                const info = avutil_codecs_ac3__WEBPACK_IMPORTED_MODULE_19__.parseHeader((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.getAVPacketData)(nextAVPacket));
                                if (!common_util_is__WEBPACK_IMPORTED_MODULE_34__.number(info)) {
                                    stream.codecpar.sampleRate = info.sampleRate;
                                    stream.codecpar.chLayout.nbChannels = info.channels;
                                    stream.codecpar.bitrate = BigInt(info.bitrate);
                                }
                            }
                            else if (stream.codecpar.codecId === 86017 /* AVCodecID.AV_CODEC_ID_MP3 */) {
                                avutil_codecs_mp3__WEBPACK_IMPORTED_MODULE_20__.parseAVCodecParameters(stream, (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.getAVPacketData)(nextAVPacket));
                            }
                        }
                        needRedo = false;
                        trackSize = 0;
                    }
                    else {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`invalid audioPacketType ${audioPacketType}`, cheap__fileName__0, 591);
                    }
                    if (trackSize) {
                        await formatContext.ioReader.skip(trackSize);
                    }
                    if (nextAVPacket !== avpacket && !needRedo) {
                        formatContext.interval.packetBuffer.push(nextAVPacket);
                    }
                    if (isAudioMultiTrack
                        && audioMultiTrackType !== 0 /* AVMultiTrackType.OneTrack */
                        && size) {
                        nextAVPacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.createAVPacket)();
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 56, now);
                        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(nextAVPacket + 72, avpacket + 72, 8);
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16));
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 8));
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](nextAVPacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](nextAVPacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                        continue;
                    }
                    break;
                }
            }
            else {
                let stream = this.findStream(formatContext, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, 0);
                if (!stream) {
                    stream = this.createStream(formatContext, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */, avpacket, 0);
                    stream.disposition |= 1 /* AVDisposition.DEFAULT */;
                    stream.codecpar.chLayout.nbChannels = (audioHeader & 0x01) === 1 ? 2 : 1;
                    stream.codecpar.sampleRate = 44100 << ((audioHeader & 0x0c) >>> 2) >> 3;
                    stream.codecpar.bitsPerCodedSample = (audioHeader & 0x02) ? 16 : 8;
                    // FLV_CODECID_PCM
                    if (flvAudioCodecId === 0) {
                        stream.codecpar.codecId = stream.codecpar.bitsPerCodedSample === 8 ? 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */ : 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */;
                    }
                    // FLV_CODECID_PCM_LE
                    else if (flvAudioCodecId === 3) {
                        stream.codecpar.codecId = stream.codecpar.bitsPerCodedSample === 8 ? 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */ : 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */;
                    }
                    else {
                        stream.codecpar.codecId = _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvAudioCodecType2AVCodecID[flvAudioCodecId] ?? 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                    }
                    if (stream.codecpar.codecId === 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */) {
                        stream.codecpar.sampleRate = 16000;
                        stream.codecpar.chLayout.nbChannels = 1;
                    }
                    else if (stream.codecpar.codecId === 65543 /* AVCodecID.AV_CODEC_ID_PCM_ALAW */
                        || stream.codecpar.codecId === 65542 /* AVCodecID.AV_CODEC_ID_PCM_MULAW */) {
                        stream.codecpar.sampleRate = 8000;
                    }
                }
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    const packetType = await formatContext.ioReader.readUint8();
                    size--;
                    if (packetType === 0 /* AACPacketType.AAC_SEQUENCE_HEADER */) {
                        this.readCodecConfigurationRecord(formatContext, stream, avpacket, size);
                        size = 0;
                        if (!(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)) {
                            needRedo = true;
                        }
                    }
                }
                if (size) {
                    await this.readAVPacketData(formatContext, stream, avpacket, size);
                    size = 0;
                }
            }
        }
        else if (type === 9 /* FlvTag.VIDEO */) {
            const videoHeader = await formatContext.ioReader.readUint8();
            const isExVideoHeader = videoHeader & 0x80;
            const videoFrameType = (videoHeader & 0x70) >> 4;
            size--;
            if (videoFrameType === 1 /* VideoFrameType.KeyFrame */) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            }
            if (isExVideoHeader) {
                let processVideoBody = true;
                let isVideoMultiTrack = false;
                let videoPacketType = videoHeader & 0x0f;
                while (videoPacketType === 7 /* VideoPacketType.ModEx */) {
                    let now = formatContext.ioReader.getPos();
                    videoPacketType = await this.readModEx(formatContext, avpacket, 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
                    size -= Number(BigInt.asIntN(32, formatContext.ioReader.getPos() - now));
                }
                let tag = 0;
                let videoMultiTrackType = 0;
                if (videoPacketType !== 4 /* VideoPacketType.Metadata */
                    && videoFrameType === 5 /* VideoFrameType.Command */) {
                    processVideoBody = false;
                    needRedo = true;
                }
                else if (videoPacketType === 6 /* VideoPacketType.MultiTrack */) {
                    isVideoMultiTrack = true;
                    const type = await formatContext.ioReader.readUint8();
                    size--;
                    videoMultiTrackType = (type & 0xf0) >> 4;
                    videoPacketType = type & 0x0f;
                    if (videoMultiTrackType !== 2 /* AVMultiTrackType.ManyTracksManyCodecs */) {
                        tag = await formatContext.ioReader.readUint32();
                        size -= 4;
                    }
                }
                else {
                    tag = await formatContext.ioReader.readUint32();
                    size -= 4;
                }
                let nextAVPacket = avpacket;
                while (processVideoBody) {
                    let trackSize = size;
                    let trackId = 0;
                    if (isVideoMultiTrack) {
                        if (videoMultiTrackType === 2 /* AVMultiTrackType.ManyTracksManyCodecs */) {
                            tag = await formatContext.ioReader.readUint32();
                            size -= 4;
                        }
                        trackId = await formatContext.ioReader.readUint8();
                        size--;
                        if (videoMultiTrackType !== 0 /* AVMultiTrackType.OneTrack */) {
                            trackSize = await formatContext.ioReader.readUint24();
                            size -= 3;
                        }
                        else {
                            trackSize = size;
                        }
                    }
                    let stream = this.findStream(formatContext, 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, trackId);
                    if (!stream) {
                        stream = this.createStream(formatContext, 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, nextAVPacket, trackId);
                        if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('avc1')) {
                            stream.codecpar.codecId = 27 /* AVCodecID.AV_CODEC_ID_H264 */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('hvc1')) {
                            stream.codecpar.codecId = 173 /* AVCodecID.AV_CODEC_ID_HEVC */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('vvc1')) {
                            stream.codecpar.codecId = 196 /* AVCodecID.AV_CODEC_ID_VVC */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('av01')) {
                            stream.codecpar.codecId = 225 /* AVCodecID.AV_CODEC_ID_AV1 */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('vp09')) {
                            stream.codecpar.codecId = 167 /* AVCodecID.AV_CODEC_ID_VP9 */;
                        }
                        else if (tag === (0,_function_mktag__WEBPACK_IMPORTED_MODULE_25__["default"])('vp08')) {
                            stream.codecpar.codecId = 139 /* AVCodecID.AV_CODEC_ID_VP8 */;
                        }
                    }
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](nextAVPacket + 32, stream.index);
                    size -= trackSize;
                    if (videoPacketType === 4 /* VideoPacketType.Metadata */) {
                        const now = formatContext.ioReader.getPos();
                        const endPos = now + BigInt(Math.floor(trackSize));
                        const key = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_31__.parseValue(formatContext.ioReader, endPos);
                        const value = await avutil_util_amf__WEBPACK_IMPORTED_MODULE_31__.parseValue(formatContext.ioReader, endPos);
                        if (key === 'colorInfo') {
                            this.parseColorInfo(stream, nextAVPacket, value);
                        }
                        else {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`unknown metadata key ${key}`, cheap__fileName__0, 768);
                        }
                        if (formatContext.ioReader.getPos() < endPos) {
                            await formatContext.ioReader.seek(endPos);
                        }
                        needRedo = true;
                        trackSize = 0;
                    }
                    else if (videoPacketType === 0 /* VideoPacketType.SequenceStart */) {
                        if (trackSize) {
                            await this.readCodecConfigurationRecord(formatContext, stream, nextAVPacket, trackSize);
                            trackSize = 0;
                            needRedo = false;
                            if (!(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)) {
                                needRedo = true;
                            }
                        }
                        else {
                            needRedo = true;
                        }
                    }
                    else if (videoPacketType === 2 /* VideoPacketType.SequenceEnd */) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](nextAVPacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](nextAVPacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                        needRedo = false;
                    }
                    else if (videoPacketType === 5 /* VideoPacketType.MPEG2TSSequenceStart */) {
                        if (stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                            // descriptor_tag + descriptor_length
                            await this.readCodecConfigurationRecord(formatContext, stream, nextAVPacket, trackSize - 2);
                            needRedo = false;
                            trackSize = 0;
                            if (!(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)) {
                                needRedo = true;
                            }
                        }
                        else {
                            needRedo = true;
                        }
                    }
                    else if (videoPacketType === 1 /* VideoPacketType.CodedFrames */ || videoPacketType === 3 /* VideoPacketType.CodedFramesX */) {
                        if (videoPacketType === 1 /* VideoPacketType.CodedFrames */
                            && (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                                || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                                || stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */)) {
                            const ct = await formatContext.ioReader.readInt24();
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](nextAVPacket + 16) + (this.options.useNanoTimestamp
                                ? (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ3)(BigInt(ct >> 0), avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q, avpacket + 72)
                                : BigInt(ct >> 0)));
                            trackSize -= 3;
                        }
                        await this.readAVPacketData(formatContext, stream, nextAVPacket, trackSize);
                        trackSize = 0;
                        needRedo = false;
                    }
                    else {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`invalid videoPacketType ${videoPacketType}`, cheap__fileName__0, 827);
                    }
                    if (trackSize) {
                        await formatContext.ioReader.skip(trackSize);
                    }
                    if (!needRedo && nextAVPacket !== avpacket) {
                        formatContext.interval.packetBuffer.push(nextAVPacket);
                    }
                    if (isVideoMultiTrack
                        && videoMultiTrackType !== 0 /* AVMultiTrackType.OneTrack */
                        && size) {
                        nextAVPacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.createAVPacket)();
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 56, now);
                        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_0__.memcpy)(nextAVPacket + 72, avpacket + 72, 8);
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16));
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](nextAVPacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 8));
                        if (videoFrameType === 1 /* VideoFrameType.KeyFrame */) {
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](nextAVPacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](nextAVPacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                        }
                        continue;
                    }
                    break;
                }
            }
            else {
                if (videoFrameType !== 5 /* VideoFrameType.Command */) {
                    let stream = this.findStream(formatContext, 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, 0);
                    if (!stream) {
                        stream = this.createStream(formatContext, 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */, avpacket, 0);
                        stream.disposition |= 1 /* AVDisposition.DEFAULT */;
                        stream.codecpar.codecId = _flv_flv__WEBPACK_IMPORTED_MODULE_9__.FlvVideoCodecType2AVCodecID[videoHeader & 0x0f] ?? 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                    }
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 32, stream.index);
                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                        const packetType = await formatContext.ioReader.readUint8();
                        const ct = await formatContext.ioReader.readInt24();
                        size -= 4;
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[17](avpacket + 16) + (this.options.useNanoTimestamp
                            ? (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ3)(BigInt(ct >> 0), avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q, avpacket + 72)
                            : BigInt(ct >> 0)));
                        if (packetType === 0 /* AVCPacketType.AVC_SEQUENCE_HEADER */) {
                            await this.readCodecConfigurationRecord(formatContext, stream, avpacket, size);
                            if (!(0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_24__.hasAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */)) {
                                needRedo = true;
                            }
                        }
                        else if (packetType === 2 /* AVCPacketType.AVC_END_OF_ENQUENCE */) {
                            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_2__.CTypeEnumRead[15](avpacket + 36) | 32 /* AVPacketFlags.AV_PKT_FLAG_END */);
                        }
                        else {
                            await this.readAVPacketData(formatContext, stream, avpacket, size);
                        }
                    }
                    else {
                        await this.readAVPacketData(formatContext, stream, avpacket, size);
                    }
                    size = 0;
                }
                else {
                    needRedo = true;
                }
            }
        }
        else if (type === 18 /* FlvTag.SCRIPT */) {
            let ret = await this.script.read(formatContext.ioReader, size);
            if (ret < 0) {
                return ret;
            }
            return await this.readAVPacket_(formatContext, avpacket);
        }
        else if (type === 15 /* FlvTag.SCRIPT_AMF3 */) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn('not support script tag encoded by amf3, ignore it', cheap__fileName__0, 910);
        }
        else {
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`invalid tag type: ${type}, try to sync to next tag`, cheap__fileName__0, 913);
            await this.syncTag(formatContext);
            return this.readAVPacket_(formatContext, avpacket);
        }
        if (size) {
            await formatContext.ioReader.skip(size);
        }
        const tagSize = formatContext.ioReader.getPos() - now;
        const prev = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
        if (tagSize !== prev) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.warn(`tag ${type} size not match, size: ${tagSize}, previousTagSize: ${prev}`, cheap__fileName__0, 926);
            // 数据不合法，返回错误
            return avutil_error__WEBPACK_IMPORTED_MODULE_21__.DATA_INVALID;
        }
        if (needRedo) {
            return this.readAVPacket_(formatContext, avpacket);
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 76, this.options.useNanoTimestamp ? avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_NANO_TIME_BASE : avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE);
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_3__.CTypeEnumWrite[15](avpacket + 72, 1);
            return await this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */
                && formatContext.ioReader.error !== -1048572 /* IOError.ABORT */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_8__.error(`read packet error, ${error}`, cheap__fileName__0, 946);
                return avutil_error__WEBPACK_IMPORTED_MODULE_21__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async syncTag(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_27__.NOPTS_VALUE_BIGINT;
        const analyzeCount = 3;
        while (true) {
            try {
                if (formatContext.ioReader.flags & 8 /* IOFlags.ABORT */) {
                    break;
                }
                const byte = await formatContext.ioReader.readUint8();
                if (byte === 8 /* FlvTag.AUDIO */ || byte === 9 /* FlvTag.VIDEO */) {
                    pos = formatContext.ioReader.getPos() - BigInt(1);
                    const size = await formatContext.ioReader.readUint24();
                    if (size > 10485760) {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        continue;
                    }
                    await formatContext.ioReader.skip(4);
                    const streamId = await formatContext.ioReader.readUint24();
                    if (streamId !== 0) {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        continue;
                    }
                    await formatContext.ioReader.skip(size);
                    const tagSize = formatContext.ioReader.getPos() - pos;
                    const prev = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
                    if (tagSize === prev) {
                        let count = 0;
                        while (count <= analyzeCount) {
                            const now = formatContext.ioReader.getPos();
                            const type = await formatContext.ioReader.readUint8();
                            if (type === 8 /* FlvTag.AUDIO */ || type === 9 /* FlvTag.VIDEO */ || type === 18 /* FlvTag.SCRIPT */) {
                                const size = await formatContext.ioReader.readUint24();
                                await formatContext.ioReader.skip(7 + size);
                                const tagSize = formatContext.ioReader.getPos() - now;
                                const prev = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
                                if (tagSize === prev) {
                                    count++;
                                }
                                else {
                                    break;
                                }
                            }
                            else {
                                break;
                            }
                        }
                        if (count < analyzeCount) {
                            await formatContext.ioReader.seek(pos + BigInt(1));
                            pos = avutil_constant__WEBPACK_IMPORTED_MODULE_27__.NOPTS_VALUE_BIGINT;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        await formatContext.ioReader.seek(pos + BigInt(1));
                        pos = avutil_constant__WEBPACK_IMPORTED_MODULE_27__.NOPTS_VALUE_BIGINT;
                        continue;
                    }
                }
            }
            catch (error) {
                break;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_27__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncTag(formatContext);
            }
            return now;
        }
        else {
            if (stream && stream.sampleIndexes.length) {
                let index = common_util_array__WEBPACK_IMPORTED_MODULE_28__.binarySearch(stream.sampleIndexes, (item) => {
                    if (item.pts > timestamp) {
                        return -1;
                    }
                    return 1;
                });
                if (index > 0 && (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ)(timestamp - stream.sampleIndexes[index - 1].pts, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q) < BigInt(10000)) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`seek in sampleIndexes, found index: ${index}, pts: ${stream.sampleIndexes[index - 1].pts}, pos: ${stream.sampleIndexes[index - 1].pos}`, cheap__fileName__0, 1053);
                    await formatContext.ioReader.seek(stream.sampleIndexes[index - 1].pos);
                    return now;
                }
            }
            if (this.script.canSeek()) {
                const { pos, dts } = this.script.dts2Position(Number((0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_26__.avRescaleQ)(timestamp, stream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_27__.AV_MILLI_TIME_BASE_Q) / BigInt(1000)));
                if (pos > 0) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`seek in filepositions, found pts: ${dts}, pos: ${pos}`, cheap__fileName__0, 1062);
                    await formatContext.ioReader.seek(BigInt(Math.floor(pos)));
                    const nextTag = await formatContext.ioReader.peekUint8();
                    if (nextTag !== 8 /* FlvTag.AUDIO */ && nextTag !== 9 /* FlvTag.VIDEO */ && nextTag !== 18 /* FlvTag.SCRIPT */) {
                        await this.syncTag(formatContext);
                    }
                    return now;
                }
            }
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug('not found any keyframe index, try to seek in bytes', cheap__fileName__0, 1072);
            return (0,_function_seekInBytes__WEBPACK_IMPORTED_MODULE_29__["default"])(formatContext, stream, timestamp, this.firstTagPos, this.readAVPacket.bind(this), this.syncTag.bind(this));
        }
    }
    getAnalyzeStreamsCount() {
        let count = 0;
        if (this.header.hasAudio || (0,common_function_isDef__WEBPACK_IMPORTED_MODULE_30__["default"])(this.script.onMetaData.audiocodecid)) {
            count++;
        }
        if (this.header.hasVideo || (0,common_function_isDef__WEBPACK_IMPORTED_MODULE_30__["default"])(this.script.onMetaData.videocodecid)) {
            count++;
        }
        return count;
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

/***/ "./src/avutil/codecs/aac.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/aac.ts ***!
  \**********************************/
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
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
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
    [3 /* MPEG4AudioObjectTypes.AAC_SSR */]: 'SSR',
    [4 /* MPEG4AudioObjectTypes.AAC_LTP */]: 'LTP',
    [5 /* MPEG4AudioObjectTypes.AAC_SBR */]: 'HE',
    [6 /* MPEG4AudioObjectTypes.AAC_SCALABLE */]: 'SCALABLE',
    [29 /* MPEG4AudioObjectTypes.AAC_PS */]: 'HEv2',
    [23 /* MPEG4AudioObjectTypes.AAC_LD */]: 'LD',
    [39 /* MPEG4AudioObjectTypes.AAC_ELD */]: 'ELD'
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
    _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
    _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE
];
const MPEG4Channels = [
    _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE,
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
    let profile = _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let sampleRate = _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    let channels = _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
    if (extradata.length >= 2) {
        profile = (extradata[0] >> 3) & 0x1f;
        sampleRate = MPEG4SamplingFrequencies[((extradata[0] & 0x07) << 1)
            | (extradata[1] >> 7)];
        channels = MPEG4Channels[(extradata[1] >> 3) & 0x0f];
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
        stream.codecpar.frameSize = profile === 5 /* MPEG4AudioObjectTypes.AAC_SBR */ ? 2048 : 1024;
        stream.codecpar.format = 8 /* AVSampleFormat.AV_SAMPLE_FMT_FLTP */;
    }
}
function avCodecParameters2Extradata(codecpar) {
    const samplingFreqIndex = MPEG4SamplingFrequencyIndex[codecpar.sampleRate];
    const channelConfig = codecpar.chLayout.nbChannels;
    const profile = codecpar.profile === _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE ? 2 /* MPEG4AudioObjectTypes.AAC_LC */ : codecpar.profile;
    const extradata = new Uint8Array(2);
    extradata[0] = ((profile & 0x1f) << 3) | ((samplingFreqIndex & 0x0e) >> 1);
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

/***/ "./src/avutil/codecs/av1.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/av1.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AV1Profile2Name: () => (/* binding */ AV1Profile2Name),
/* harmony export */   generateExtradata: () => (/* binding */ generateExtradata),
/* harmony export */   getLevelByResolution: () => (/* binding */ getLevelByResolution),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, AV1LevelIdx, parseSequenceHeader, splitOBU */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/av1syntax */ "./src/avutil/util/av1syntax.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/* harmony import */ var _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");





const AV1Profile2Name = {
    [0 /* AV1Profile.Main */]: 'Main',
    [1 /* AV1Profile.High */]: 'High',
    [2 /* AV1Profile.Professional */]: 'Professional'
};
const LevelCapabilities = [
    { level: 20, maxResolution: 2359296 },
    { level: 21, maxResolution: 4460544 },
    { level: 30, maxResolution: 10653696 },
    { level: 31, maxResolution: 17040384 },
    { level: 40, maxResolution: 21233664 },
    { level: 41, maxResolution: 21233664 },
    { level: 50, maxResolution: 35651584 },
    { level: 51, maxResolution: 35651584 },
    { level: 52, maxResolution: 35651584 },
    { level: 53, maxResolution: 35651584 },
    { level: 60, maxResolution: 142606336 },
    { level: 61, maxResolution: 142606336 },
    { level: 62, maxResolution: 142606336 },
    { level: 63, maxResolution: 142606336 }
];
const AV1LevelIdx = [20, 21, 22, 23, 30, 31, 32, 33, 40, 41, 42, 43, 50, 51, 52, 53, 60, 61, 62, 63, 70, 71, 72, 73];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution) {
            return level.level;
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 4) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 bit marker
 * - 7 bit version
 * - 3 bit profile
 * - 5 bit level
 * - 1 bit tier
 * - 1 bit bitdepth > 8
 * - 1 bit bitdepth == 12
 * - 1 bit monochrome
 * - 1 bit chroma_subsampling_x
 * - 1 bit chroma_subsampling_y
 * - 2 bit chroma_sample_position
 * - 8 bit padding
 *
 * @param header
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](extradata.length);
    bitReader.appendBuffer(extradata);
    // marker
    bitReader.readU1();
    // version
    bitReader.readU(7);
    const profile = bitReader.readU(3);
    const level = bitReader.readU(5);
    const tier = bitReader.readU1();
    let bitDepth = bitReader.readU1() ? 10 : 8;
    if (bitReader.readU1()) {
        bitDepth = 12;
    }
    const monochrome = bitReader.readU1();
    const chromaSubsamplingX = bitReader.readU1();
    const chromaSubsamplingY = bitReader.readU1();
    const chromaSamplePosition = bitReader.readU(2);
    return {
        profile,
        level,
        tier,
        bitDepth,
        monochrome,
        chromaSubsamplingX,
        chromaSubsamplingY,
        chromaSamplePosition
    };
}
/* eslint-disable camelcase */
function parseSequenceHeader(header) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](header.length);
    bitReader.appendBuffer(header);
    bitReader.readU1();
    bitReader.readU(4);
    const extensionFlag = bitReader.readU1();
    const hasSizeFlag = bitReader.readU1();
    // obu_reserved_1bit
    bitReader.readU1();
    if (extensionFlag) {
        bitReader.readU(8);
    }
    if (hasSizeFlag) {
        _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.leb128(bitReader);
    }
    const seq_profile = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
    const still_picture = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    const reduced_still_picture_header = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let timing_info_present_flag = 0;
    let decoder_model_info_present_flag = 0;
    let initial_display_delay_present_flag = 0;
    let operating_points_cnt_minus_1 = 0;
    let operating_point_idc = [0];
    let seq_level_idx = [0];
    let seq_tier = [0];
    let decoder_model_present_for_this_op = [0];
    let initial_display_delay_present_for_this_op = [0];
    let initial_display_delay_minus_1 = [0];
    let buffer_delay_length_minus_1 = 0;
    let decoder_buffer_delay = [0];
    let encoder_buffer_delay = [0];
    let low_delay_mode_flag = [0];
    if (reduced_still_picture_header) {
        seq_level_idx[0] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
    }
    else {
        timing_info_present_flag = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (timing_info_present_flag) {
            let num_units_in_display_tick = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
            let time_scale = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
            let equal_picture_interval = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (equal_picture_interval) {
                let num_ticks_per_picture_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.uvlc(bitReader);
            }
            let decoder_model_info_present_flag = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (decoder_model_info_present_flag) {
                buffer_delay_length_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
                let num_units_in_decoding_tick = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 32);
                let buffer_removal_time_length_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
                let frame_presentation_time_length_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
            }
        }
        else {
            decoder_model_info_present_flag = 0;
        }
        let initial_display_delay_present_flag = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        let operating_points_cnt_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
        for (let i = 0; i <= operating_points_cnt_minus_1; i++) {
            operating_point_idc[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 12);
            seq_level_idx[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 5);
            if (seq_level_idx[i] > 7) {
                seq_tier[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            }
            else {
                seq_tier[i] = 0;
            }
            if (decoder_model_info_present_flag) {
                decoder_model_present_for_this_op[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (decoder_model_present_for_this_op[i]) {
                    let n = buffer_delay_length_minus_1 + 1;
                    decoder_buffer_delay[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
                    encoder_buffer_delay[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
                    low_delay_mode_flag[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                }
            }
            else {
                decoder_model_present_for_this_op[i] = 0;
            }
            if (initial_display_delay_present_flag) {
                initial_display_delay_present_for_this_op[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (initial_display_delay_present_for_this_op[i]) {
                    initial_display_delay_minus_1[i] = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
                }
            }
        }
    }
    let frame_width_bits_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
    let frame_height_bits_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
    let n = frame_width_bits_minus_1 + 1;
    let max_frame_width_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
    n = frame_height_bits_minus_1 + 1;
    let max_frame_height_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, n);
    let frame_id_numbers_present_flag = 0;
    let delta_frame_id_length_minus_2 = 0;
    let additional_frame_id_length_minus_1 = 0;
    if (reduced_still_picture_header) {
        frame_id_numbers_present_flag = 0;
    }
    else {
        frame_id_numbers_present_flag = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    if (frame_id_numbers_present_flag) {
        delta_frame_id_length_minus_2 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 4);
        additional_frame_id_length_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
    }
    let use_128x128_superblock = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_filter_intra = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_intra_edge_filter = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_interintra_compound = 0;
    let enable_masked_compound = 0;
    let enable_warped_motion = 0;
    let enable_dual_filter = 0;
    let enable_order_hint = 0;
    let enable_jnt_comp = 0;
    let enable_ref_frame_mvs = 0;
    let seq_force_screen_content_tools = 2;
    let seq_force_integer_mv = 2;
    let OrderHintBits = 0;
    if (!reduced_still_picture_header) {
        let enable_interintra_compound = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_masked_compound = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_warped_motion = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_dual_filter = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        enable_order_hint = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (enable_order_hint) {
            enable_jnt_comp = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            enable_ref_frame_mvs = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        }
        else {
            enable_jnt_comp = 0;
            enable_ref_frame_mvs = 0;
        }
        let seq_choose_screen_content_tools = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (seq_choose_screen_content_tools) {
            seq_force_screen_content_tools = 2;
        }
        else {
            seq_force_screen_content_tools = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        }
        if (seq_force_screen_content_tools > 0) {
            let seq_choose_integer_mv = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            if (seq_choose_integer_mv) {
                seq_force_integer_mv = 2;
            }
            else {
                seq_force_integer_mv = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
            }
        }
        else {
            seq_force_integer_mv = 2;
        }
        if (enable_order_hint) {
            const order_hint_bits_minus_1 = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 3);
            OrderHintBits = order_hint_bits_minus_1 + 1;
        }
        else {
            OrderHintBits = 0;
        }
    }
    let enable_superres = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_cdef = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let enable_restoration = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let high_bitdepth = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let twelve_bit = 0;
    let bit_depth = 0;
    let mono_chrome = 0;
    if (seq_profile == 2 && high_bitdepth) {
        twelve_bit = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        bit_depth = twelve_bit ? 12 : 10;
    }
    else if (seq_profile <= 2) {
        bit_depth = high_bitdepth ? 10 : 8;
    }
    if (seq_profile == 1) {
        mono_chrome = 0;
    }
    else {
        mono_chrome = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    const color_description_present_flag = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    let color_primaries = 0;
    let transfer_characteristics = 0;
    let matrix_coefficients = 0;
    if (color_description_present_flag) {
        color_primaries = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
        transfer_characteristics = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
        matrix_coefficients = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 8);
    }
    else {
        color_primaries = 2;
        transfer_characteristics = 2;
        matrix_coefficients = 2;
    }
    let color_range = 0;
    let subsampling_x = 0;
    let subsampling_y = 0;
    let chroma_sample_position = 0;
    let separate_uv_delta_q = 0;
    if (mono_chrome) {
        color_range = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        subsampling_x = 1;
        subsampling_y = 1;
        chroma_sample_position = 0;
        separate_uv_delta_q = 0;
    }
    else if (color_primaries == 1
        && transfer_characteristics == 13
        && matrix_coefficients == 0) {
        color_range = 1;
        subsampling_x = 0;
        subsampling_y = 0;
        separate_uv_delta_q = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    else {
        color_range = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
        if (seq_profile == 0) {
            subsampling_x = 1;
            subsampling_y = 1;
        }
        else if (seq_profile == 1) {
            subsampling_x = 0;
            subsampling_y = 0;
        }
        else {
            if (bit_depth == 12) {
                subsampling_x = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                if (subsampling_x) {
                    subsampling_y = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
                }
                else {
                    subsampling_y = 0;
                }
            }
            else {
                subsampling_x = 1;
                subsampling_y = 0;
            }
        }
        if (subsampling_x && subsampling_y) {
            chroma_sample_position = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 2);
        }
        separate_uv_delta_q = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    }
    let film_grain_params_present = _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.f(bitReader, 1);
    return {
        width: max_frame_width_minus_1 + 1,
        height: max_frame_height_minus_1 + 1,
        profile: seq_profile,
        level: AV1LevelIdx[seq_level_idx[0]],
        tier: seq_tier[0],
        bitDepth: bit_depth,
        monoChrome: mono_chrome,
        colorRange: color_range,
        colorPrimaries: color_primaries,
        transferCharacteristics: transfer_characteristics,
        matrixCoefficients: matrix_coefficients,
        subsamplingX: subsampling_x,
        subsamplingY: subsampling_y,
        chromaSamplePosition: chroma_sample_position
    };
}
function splitOBU(buffer) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"]();
    bitReader.appendBuffer(buffer);
    const list = [];
    while (bitReader.remainingLength()) {
        const now = bitReader.getPointer();
        // obu_forbidden_bit
        bitReader.readU1();
        const type = bitReader.readU(4);
        const extensionFlag = bitReader.readU1();
        const hasSizeFlag = bitReader.readU1();
        // obu_reserved_1bit
        bitReader.readU1();
        if (extensionFlag) {
            bitReader.readU(8);
        }
        const size = hasSizeFlag ? _util_av1syntax__WEBPACK_IMPORTED_MODULE_2__.leb128(bitReader) : buffer.length - 1 - extensionFlag;
        const headerSize = bitReader.getPointer() - now;
        list.push(buffer.subarray(now, now + headerSize + size));
        bitReader.skip(size * 8);
    }
    return list;
}
function generateExtradata(codecpar, buffer) {
    const bitWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_3__["default"](4);
    // marker
    bitWriter.writeU1(1);
    // version
    bitWriter.writeU(7, 1);
    const header = splitOBU(buffer).find((buffer) => {
        return ((buffer[0] >>> 3) & 0x0f) === 1 /* OBUType.SEQUENCE_HEADER */;
    });
    if (header) {
        const params = parseSequenceHeader(header);
        bitWriter.writeU(3, params.profile);
        bitWriter.writeU(5, params.level);
        bitWriter.writeU(1, params.tier);
        bitWriter.writeU(1, params.bitDepth > 8 ? 1 : 0);
        bitWriter.writeU(1, params.bitDepth === 12 ? 1 : 0);
        bitWriter.writeU(1, params.monoChrome);
        bitWriter.writeU(1, params.subsamplingX);
        bitWriter.writeU(1, params.subsamplingY);
        bitWriter.writeU(1, params.chromaSamplePosition);
    }
    else {
        const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_4__.getAVPixelFormatDescriptor)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 28));
        bitWriter.writeU(3, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 48));
        bitWriter.writeU(5, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 52));
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, desc.comp[0].depth > 8 ? 1 : 0);
        bitWriter.writeU(1, desc.comp[0].depth === 12 ? 1 : 0);
        bitWriter.writeU(1, 0);
        bitWriter.writeU(1, 1);
        bitWriter.writeU(1, 1);
        bitWriter.writeU(1, 0);
    }
    // padding
    bitWriter.writeU(8, 0);
    bitWriter.padding();
    return bitWriter.getBuffer();
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

/***/ "./src/avutil/codecs/mp3.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/mp3.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MP3Profile2Name: () => (/* binding */ MP3Profile2Name),
/* harmony export */   getBitRateByVersionLayerIndex: () => (/* binding */ getBitRateByVersionLayerIndex),
/* harmony export */   getFrameSizeByVersionLayer: () => (/* binding */ getFrameSizeByVersionLayer),
/* harmony export */   getProfileByLayer: () => (/* binding */ getProfileByLayer),
/* harmony export */   getSampleRateByVersionIndex: () => (/* binding */ getSampleRateByVersionIndex),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters)
/* harmony export */ });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
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
    return _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
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
    return _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
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
    return _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
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
    return _constant__WEBPACK_IMPORTED_MODULE_0__.NOPTS_VALUE;
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


/***/ }),

/***/ "./src/avutil/codecs/vp8.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/vp8.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony export isIDR */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");


function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 byte profile
 * - 1 byte level
 * - 4 bit bitdepth
 * - 3 bit chroma_subsampling
 * - 1 bit full_range_flag
 * - 1 byte color_primaries
 * - 1 byte color_trc
 * - 1 byte color_space
 *
 * @param extradata
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_1__["default"](extradata.length);
    bitReader.appendBuffer(extradata.subarray(4));
    const profile = bitReader.readU(8);
    const level = bitReader.readU(8);
    let bitDepth = bitReader.readU(4);
    const chromaSubsampling = bitReader.readU(3);
    const fullRangeFlag = bitReader.readU1();
    const colorPrimaries = bitReader.readU(8);
    const colorTrc = bitReader.readU(8);
    const colorSpace = bitReader.readU(8);
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRangeFlag,
        colorPrimaries,
        colorTrc,
        colorSpace
    };
}
function isIDR(avpacket) {
    const first = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[2](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24));
    return !(first >>> 7);
}


/***/ }),

/***/ "./src/avutil/codecs/vp9.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/vp9.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VP9Profile2Name: () => (/* binding */ VP9Profile2Name),
/* harmony export */   generateExtradata: () => (/* binding */ generateExtradata),
/* harmony export */   getLevelByResolution: () => (/* binding */ getLevelByResolution),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, isIDR */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _struct_rational__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./..\struct\rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");
/* harmony import */ var _util_rational__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");








const VP9Profile2Name = {
    [0 /* VP9Profile.Profile0 */]: 'Profile0',
    [1 /* VP9Profile.Profile1 */]: 'Profile1',
    [2 /* VP9Profile.Profile2 */]: 'Profile2',
    [3 /* VP9Profile.Profile3 */]: 'Profile3'
};
const LevelCapabilities = [
    { level: 10, maxResolution: 196608, maxFrameRate: 30 },
    { level: 11, maxResolution: 196608, maxFrameRate: 60 },
    { level: 20, maxResolution: 518400, maxFrameRate: 30 },
    { level: 21, maxResolution: 518400, maxFrameRate: 60 },
    { level: 30, maxResolution: 2073600, maxFrameRate: 30 },
    { level: 31, maxResolution: 2073600, maxFrameRate: 60 },
    { level: 40, maxResolution: 3686400, maxFrameRate: 30 },
    { level: 41, maxResolution: 3686400, maxFrameRate: 60 },
    { level: 50, maxResolution: 8294400, maxFrameRate: 30 },
    { level: 51, maxResolution: 8294400, maxFrameRate: 60 },
    { level: 60, maxResolution: 8847360, maxFrameRate: 30 },
    { level: 61, maxResolution: 8847360, maxFrameRate: 60 },
    { level: 70, maxResolution: 35389440, maxFrameRate: 30 },
    { level: 71, maxResolution: 35389440, maxFrameRate: 60 }
];
function getLevelByResolution(width, height, fps) {
    const resolution = width * height;
    for (const level of LevelCapabilities) {
        if (resolution <= level.maxResolution && fps <= level.maxFrameRate) {
            return level.level;
        }
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    if (extradata && extradata.length >= 6) {
        const params = parseExtraData(extradata);
        stream.codecpar.profile = params.profile;
        stream.codecpar.level = params.level;
    }
}
/**
 * - 1 byte profile
 * - 1 byte level
 * - 4 bit bitdepth
 * - 3 bit chroma_subsampling
 * - 1 bit full_range_flag
 * - 1 byte color_primaries
 * - 1 byte color_trc
 * - 1 byte color_space
 *
 * @param extradata
 */
function parseExtraData(extradata) {
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_3__["default"](extradata.length);
    bitReader.appendBuffer(extradata);
    const profile = bitReader.readU(8);
    const level = bitReader.readU(8);
    let bitDepth = bitReader.readU(4);
    const chromaSubsampling = bitReader.readU(3);
    const fullRangeFlag = bitReader.readU1();
    const colorPrimaries = bitReader.readU(8);
    const colorTrc = bitReader.readU(8);
    const colorSpace = bitReader.readU(8);
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRangeFlag,
        colorPrimaries,
        colorTrc,
        colorSpace
    };
}
function getVpccFeature(codecpar) {
    let profile = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 48);
    let level = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 52);
    if (level === _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE) {
        level = getLevelByResolution(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 56), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 60), (0,_util_rational__WEBPACK_IMPORTED_MODULE_6__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_2__["default"])(codecpar + 72, _struct_rational__WEBPACK_IMPORTED_MODULE_1__.Rational)));
    }
    const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_5__.getAVPixelFormatDescriptor)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 28));
    let bitDepth = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 40);
    let chromaSubsampling = 1 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_COLLOCATED_WITH_LUMA */;
    if (desc) {
        bitDepth = desc.comp[0].depth;
        if (desc.log2ChromaW === 1 && desc.log2ChromaH === 1) {
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 100) === 1 /* AVChromaLocation.AVCHROMA_LOC_LEFT */) {
                chromaSubsampling = 0 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_VERTICAL */;
            }
        }
        else if (desc.log2ChromaW === 1 && desc.log2ChromaH === 0) {
            chromaSubsampling = 2 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_422 */;
        }
        else if (desc.log2ChromaW === 0 && desc.log2ChromaH === 0) {
            chromaSubsampling = 3 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_444 */;
        }
    }
    const fullRange = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 84) === 2 /* AVColorRange.AVCOL_RANGE_JPEG */ ? 1 : 0;
    if (profile === _constant__WEBPACK_IMPORTED_MODULE_4__.NOPTS_VALUE && bitDepth) {
        if (chromaSubsampling == 0 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_VERTICAL */
            || chromaSubsampling == 1 /* VPX_CHROMA_SUBSAMPLING.VPX_SUBSAMPLING_420_COLLOCATED_WITH_LUMA */) {
            profile = (bitDepth == 8) ? 0 /* VP9Profile.Profile0 */ : 2 /* VP9Profile.Profile2 */;
        }
        else {
            profile = (bitDepth == 8) ? 1 /* VP9Profile.Profile1 */ : 3 /* VP9Profile.Profile3 */;
        }
    }
    return {
        profile,
        level,
        bitDepth,
        chromaSubsampling,
        fullRange
    };
}
function generateExtradata(codecpar) {
    const ioWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_7__["default"](new Uint8Array(8));
    const vpcc = getVpccFeature(codecpar);
    ioWriter.writeUint8(vpcc.profile);
    ioWriter.writeUint8(vpcc.level);
    ioWriter.writeUint8((vpcc.bitDepth << 4) | (vpcc.chromaSubsampling << 1) | vpcc.fullRange);
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 88));
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 92));
    ioWriter.writeUint8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](codecpar + 96));
    ioWriter.writeUint16(0);
    return ioWriter.getWroteBuffer();
}
function isIDR(avpacket) {
    const first = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[2](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24));
    const version = (first >>> 5) & 0x01;
    const high = (first >>> 4) & 0x01;
    const profile = (high << 1) + version;
    const showExistingFrame = (first >>> (profile === 3 /* VP9Profile.Profile3 */ ? 2 : 3)) & 0x01;
    if (showExistingFrame) {
        return false;
    }
    return !((first >>> (profile === 3 /* VP9Profile.Profile3 */ ? 1 : 2)) & 0x01);
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


/***/ }),

/***/ "./src/avutil/util/av1syntax.ts":
/*!**************************************!*\
  !*** ./src/avutil/util/av1syntax.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ f),
/* harmony export */   leb128: () => (/* binding */ leb128),
/* harmony export */   uvlc: () => (/* binding */ uvlc)
/* harmony export */ });
/* unused harmony exports le, su, ns, L, NS */
/*
 * libmedia av1 syntax util
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
function f(bitReader, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        x = 2 * x + bitReader.readU1();
    }
    return x;
}
function uvlc(bitReader) {
    let leadingZeros = 0;
    while (true) {
        let done = f(bitReader, 1);
        if (done) {
            break;
        }
        leadingZeros++;
    }
    if (leadingZeros >= 32) {
        return (1) - 1;
    }
    const value = f(bitReader, leadingZeros);
    return value + (1 << leadingZeros) - 1;
}
function le(bitReader, n) {
    let t = 0;
    for (let i = 0; i < n; i++) {
        let byte = f(bitReader, 8);
        t += (byte << (i * 8));
    }
    return t;
}
function leb128(bitReader) {
    let value = 0;
    for (let i = 0; i < 8; i++) {
        let next = f(bitReader, 8);
        value |= ((next & 0x7f) << (i * 7));
        if (!(next & 0x80)) {
            break;
        }
    }
    return value;
}
function su(bitReader, n) {
    let value = f(bitReader, n);
    let signMask = 1 << (n - 1);
    if (value & signMask) {
        value = value - 2 * signMask;
    }
    return value;
}
function ns(bitReader, n) {
    let w = Math.floor(Math.log2(n)) + 1;
    let m = (1 << w) - n;
    let v = f(bitReader, w - 1);
    if (v < m) {
        return v;
    }
    let extraBit = f(bitReader, 1);
    return (v << 1) - m + extraBit;
}
function L(bitReader, n) {
    let x = 0;
    for (let i = 0; i < n; i++) {
        x = 2 * x + bitReader.readU1();
    }
    return x;
}
function NS(bitReader, n) {
    let w = Math.floor(Math.log2(n)) + 1;
    let m = (1 << w) - n;
    let v = L(bitReader, w - 1);
    if (v < m) {
        return v;
    }
    let extraBit = L(bitReader, 1);
    return (v << 1) - m + extraBit;
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IFlvFormat_ts.avtranscoder.js.map