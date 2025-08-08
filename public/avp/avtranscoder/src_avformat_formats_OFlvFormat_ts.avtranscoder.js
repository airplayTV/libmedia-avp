"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OFlvFormat_ts"],{

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

/***/ "./src/avformat/bsf/h2645/Annexb2AvccFilter.ts":
/*!*****************************************************!*\
  !*** ./src/avformat/bsf/h2645/Annexb2AvccFilter.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Annexb2AvccFilter)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AVBSFilter */ "./src/avformat/bsf/AVBSFilter.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! avutil/codecs/h264 */ "./src/avutil/codecs/h264.ts");
/* harmony import */ var avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! avutil/codecs/hevc */ "./src/avutil/codecs/hevc.ts");
/* harmony import */ var avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/codecs/vvc */ "./src/avutil/codecs/vvc.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
const cheap__fileName__6 = "src\\avformat\\bsf\\h2645\\Annexb2AvccFilter.ts";











class Annexb2AvccFilter extends _AVBSFilter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    cache;
    cached;
    reverseSps;
    constructor(reverseSps = false) {
        super();
        this.reverseSps = reverseSps;
    }
    init(codecpar, timeBase) {
        super.init(codecpar, timeBase);
        this.cache = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.createAVPacket)();
        this.cached = false;
        return 0;
    }
    destroy() {
        super.destroy();
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.destroyAVPacket)(this.cache);
        this.cache = 0;
    }
    sendAVPacket(avpacket) {
        if (!(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 64 /* AVPacketFlags.AV_PKT_FLAG_H26X_ANNEXB */)) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(this.cache, avpacket);
        }
        else {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.copyAVPacketProps)(this.cache, avpacket);
            let convert;
            const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.mapSafeUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28));
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                convert = avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_4__.annexb2Avcc(buffer, this.reverseSps);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                convert = avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_5__.annexb2Avcc(buffer, this.reverseSps);
            }
            else if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4) === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                convert = avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_6__.annexb2Avcc(buffer, this.reverseSps);
            }
            else {
                common_util_logger__WEBPACK_IMPORTED_MODULE_10__.fatal(`not support for codecId: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.inCodecpar + 4)}`, cheap__fileName__6, 96);
            }
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.cache + 36) & ~64 /* AVPacketFlags.AV_PKT_FLAG_H26X_ANNEXB */);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketData)(this.cache, convert.bufferPointer, convert.length);
            if (convert.key) {
                cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](this.cache + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](this.cache + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
            }
            if (convert.extradata) {
                const extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_9__.avMalloc)(convert.extradata.length);
                (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_7__.memcpyFromUint8Array)(extradata, convert.extradata.length, convert.extradata);
                (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.addAVPacketSideData)(this.cache, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */, extradata, convert.extradata.length);
            }
        }
        this.cached = true;
        return 0;
    }
    receiveAVPacket(avpacket) {
        if (this.cached) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.unrefAVPacket)(avpacket);
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_3__.refAVPacket)(avpacket, this.cache);
            this.cached = false;
            return 0;
        }
        else {
            return avutil_error__WEBPACK_IMPORTED_MODULE_8__.DATA_INVALID;
        }
    }
    reset() {
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/OFlvFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/OFlvFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OFlvFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./..\..\avutil\struct\rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./flv/FlvHeader */ "./src/avformat/formats/flv/FlvHeader.ts");
/* harmony import */ var _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./flv/FlvScriptTag */ "./src/avformat/formats/flv/FlvScriptTag.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var _flv_flv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./flv/flv */ "./src/avformat/formats/flv/flv.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../bsf/h2645/Annexb2AvccFilter */ "./src/avformat/bsf/h2645/Annexb2AvccFilter.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var _function_mktag__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../function/mktag */ "./src/avformat/function/mktag.ts");
/* harmony import */ var avutil_util_amf__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! avutil/util/amf */ "./src/avutil/util/amf.ts");
/* harmony import */ var _flv_oflv__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./flv/oflv */ "./src/avformat/formats/flv/oflv.ts");
/* harmony import */ var avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/codecs/h264 */ "./src/avutil/codecs/h264.ts");
/* harmony import */ var avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/codecs/hevc */ "./src/avutil/codecs/hevc.ts");
/* harmony import */ var avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! avutil/codecs/vvc */ "./src/avutil/codecs/vvc.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\OFlvFormat.ts";




/*
 * libmedia flv encoder
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




















class OFlvFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 0 /* AVFormat.FLV */;
    context;
    header;
    script;
    options;
    annexb2AvccFilter;
    avpacket;
    headerWriter;
    headerBuffers;
    constructor(options = {}) {
        super();
        this.header = new _flv_FlvHeader__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.script = new _flv_FlvScriptTag__WEBPACK_IMPORTED_MODULE_6__["default"]();
        this.headerWriter = new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_23__["default"](100000);
        this.headerBuffers = [];
        this.headerWriter.onFlush = ((buffer) => {
            this.headerBuffers.push(buffer.slice());
            return 0;
        });
        this.options = options;
        this.context = {
            keyframeFilePositions: [],
            keyFrameTimes: [],
            lastkeyframelocation: 0,
            lastkeyframetimestamp: BigInt(0),
            lasttimestamp: BigInt(0),
            framerate: 0,
            filesize: 0,
            audioSize: 0,
            videosize: 0,
            datasize: 0,
            duration: 0,
            scriptWrote: false,
            frameCount: 0,
            firstKeyframePositionWrote: false,
            videoMetadataWrote: false,
            enableNanoTimestamp: options.enableNanoTimestamp,
            multiAudioTracks: false,
            multiVideoTracks: false,
            useLegacyHevc: options.useLegacyHevc
        };
    }
    getDefaultStream(formatContext, mediaType) {
        let streams = formatContext.streams.filter((stream) => {
            return stream.codecpar.codecType === mediaType;
        });
        if (streams.length < 2) {
            return streams[0];
        }
        const legacy = streams.filter((stream) => {
            return !this.isEnhancedStream(stream);
        });
        return legacy.find((stream) => !!(stream.disposition & 1 /* AVDisposition.DEFAULT */)) || legacy[0] || streams[0];
    }
    isEnhancedStream(stream) {
        if (this.context.enableNanoTimestamp) {
            return true;
        }
        const streamContext = stream.privData;
        if (this.context.useLegacyHevc
            && stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
            && !streamContext.trackId
            && !this.context.multiVideoTracks) {
            return false;
        }
        return _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.isEnhancedCodecId(stream.codecpar.codecId) || streamContext?.trackId > 0;
    }
    init(formatContext) {
        if (formatContext.ioWriter) {
            formatContext.ioWriter.setEndian(true);
        }
        const audioDefaultStream = this.getDefaultStream(formatContext, 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */);
        const videoDefaultStream = this.getDefaultStream(formatContext, 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */);
        let audioNextTrack = 1;
        let videoNextTrack = 1;
        formatContext.streams.forEach((stream) => {
            if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                this.header.hasAudio = true;
                this.script.onMetaData.hasAudio = true;
                if (stream.codecpar.codecId === 86051 /* AVCodecID.AV_CODEC_ID_SPEEX */) {
                    if (stream.codecpar.sampleRate !== 16000) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_11__.fatal('flv speex only support 16000 sample rate', cheap__fileName__0, 163);
                    }
                    if (stream.codecpar.chLayout.nbChannels !== 1) {
                        common_util_logger__WEBPACK_IMPORTED_MODULE_11__.fatal('flv speex only support 1 channel', cheap__fileName__0, 166);
                    }
                }
                let trackId = 0;
                if (stream === audioDefaultStream) {
                    this.script.onMetaData.audiocodecid = _flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecType[stream.codecpar.codecId] ?? (0,_function_mktag__WEBPACK_IMPORTED_MODULE_16__["default"])(_flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecTag[stream.codecpar.codecId]);
                    this.script.onMetaData.stereo = stream.codecpar.chLayout.nbChannels > 1 ? true : false;
                    this.script.onMetaData.audiosamplerate = stream.codecpar.sampleRate || 0;
                    this.script.onMetaData.audiosamplesize = stream.codecpar.frameSize || 0;
                }
                else {
                    trackId = audioNextTrack++;
                    if (!this.script.onMetaData.audioTrackIdInfoMap) {
                        this.script.onMetaData.audioTrackIdInfoMap = {};
                    }
                    this.script.onMetaData.audioTrackIdInfoMap[trackId] = {
                        audiocodecid: _flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecTag[stream.codecpar.codecId] ? (0,_function_mktag__WEBPACK_IMPORTED_MODULE_16__["default"])(_flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecTag[stream.codecpar.codecId]) : _flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecType[stream.codecpar.codecId],
                        stereo: stream.codecpar.chLayout.nbChannels > 1 ? true : false,
                        audiosamplerate: stream.codecpar.sampleRate || 0,
                        audiosamplesize: stream.codecpar.frameSize || 0
                    };
                    if (stream.metadata["title" /* AVStreamMetadataKey.TITLE */]) {
                        this.script.onMetaData.audioTrackIdInfoMap[trackId].title = stream.metadata["title" /* AVStreamMetadataKey.TITLE */];
                    }
                    if (stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */]) {
                        this.script.onMetaData.audioTrackIdInfoMap[trackId].lang = stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */];
                    }
                }
                stream.privData = {
                    trackId
                };
            }
            else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                this.header.hasVideo = true;
                this.script.onMetaData.hasVideo = true;
                if ((videoDefaultStream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    || videoDefaultStream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || videoDefaultStream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */)
                    && !this.annexb2AvccFilter) {
                    this.annexb2AvccFilter = new _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_14__["default"]();
                    this.annexb2AvccFilter.init(videoDefaultStream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], videoDefaultStream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
                }
                let trackId = 0;
                if (stream === videoDefaultStream) {
                    this.script.onMetaData.videocodecid = _flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecType[stream.codecpar.codecId] ?? (0,_function_mktag__WEBPACK_IMPORTED_MODULE_16__["default"])(_flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecTag[stream.codecpar.codecId]);
                    this.script.onMetaData.width = stream.codecpar.width || 0;
                    this.script.onMetaData.height = stream.codecpar.height || 0;
                    this.script.onMetaData.framerate = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)(stream.codecpar.framerate);
                }
                else {
                    trackId = videoNextTrack++;
                    if (!this.script.onMetaData.videoTrackIdInfoMap) {
                        this.script.onMetaData.videoTrackIdInfoMap = {};
                    }
                    this.script.onMetaData.videoTrackIdInfoMap[trackId] = {
                        videocodecid: _flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecTag[stream.codecpar.codecId] ? (0,_function_mktag__WEBPACK_IMPORTED_MODULE_16__["default"])(_flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecTag[stream.codecpar.codecId]) : _flv_flv__WEBPACK_IMPORTED_MODULE_8__.AVCodecID2FlvCodecType[stream.codecpar.codecId],
                        width: stream.codecpar.width || 0,
                        height: stream.codecpar.height || 0,
                        framerate: (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)(stream.codecpar.framerate)
                    };
                    if (stream.metadata["title" /* AVStreamMetadataKey.TITLE */]) {
                        this.script.onMetaData.videoTrackIdInfoMap[trackId].title = stream.metadata["title" /* AVStreamMetadataKey.TITLE */];
                    }
                    if (stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */]) {
                        this.script.onMetaData.videoTrackIdInfoMap[trackId].lang = stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */];
                    }
                }
                stream.privData = {
                    trackId
                };
            }
        });
        if (audioNextTrack > 1) {
            this.context.multiAudioTracks = true;
        }
        if (videoNextTrack > 1) {
            this.context.multiVideoTracks = true;
        }
        this.avpacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.createAVPacket)();
        return 0;
    }
    async destroy(formatContext) {
        if (this.annexb2AvccFilter) {
            this.annexb2AvccFilter.destroy();
            this.annexb2AvccFilter = null;
        }
        if (this.avpacket) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.destroyAVPacket)(this.avpacket);
            this.avpacket = 0;
        }
    }
    writeMetadata(formatContext, stream) {
        if ((stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
            || stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */
            || stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */)
            && this.isEnhancedStream(stream)) {
            const lightLevel = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.getSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 24, 22 /* AVPacketSideDataType.AV_PKT_DATA_CONTENT_LIGHT_LEVEL */);
            const display = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.getSideData)(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 20, stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress] + 24, 20 /* AVPacketSideDataType.AV_PKT_DATA_MASTERING_DISPLAY_METADATA */);
            const colorInfo = {
                colorConfig: {}
            };
            if (stream.codecpar.colorTrc !== 2 /* AVColorTransferCharacteristic.AVCOL_TRC_UNSPECIFIED */) {
                colorInfo.colorConfig.transferCharacteristics = stream.codecpar.colorTrc;
            }
            if (stream.codecpar.colorSpace !== 2 /* AVColorSpace.AVCOL_SPC_UNSPECIFIED */) {
                colorInfo.colorConfig.matrixCoefficients = stream.codecpar.colorSpace;
            }
            if (stream.codecpar.colorPrimaries !== 2 /* AVColorPrimaries.AVCOL_PRI_UNSPECIFIED */) {
                colorInfo.colorConfig.colorPrimaries = stream.codecpar.colorPrimaries;
            }
            if (lightLevel) {
                const lightLevelData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](lightLevel);
                colorInfo.hdrCll = {
                    maxCLL: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[8](lightLevelData),
                    maxFall: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[8](lightLevelData + 4)
                };
            }
            if (display) {
                const displayData = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](display);
                colorInfo.hdrMdcv = {};
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](displayData + 80)) {
                    colorInfo.hdrMdcv.redX = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.redY = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 8, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.greenX = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 16, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.greenY = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 16 + 8, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.blueX = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 32, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.blueY = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 32 + 8, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.whitePointX = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 48, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.whitePointY = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 48 + 8, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                }
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](displayData + 84)) {
                    colorInfo.hdrMdcv.maxLuminance = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 72, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                    colorInfo.hdrMdcv.minLuminance = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)((0,cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__["default"])(displayData + 64, _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__.Rational));
                }
            }
            _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, BigInt(0), (ioWriter) => {
                _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeVideoHeader(ioWriter, stream, this.context, true, 4 /* VideoPacketType.Metadata */, 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */, BigInt(0), 0);
            }, (ioWriter) => {
                avutil_util_amf__WEBPACK_IMPORTED_MODULE_17__.writeValue(ioWriter, 'colorInfo'),
                    avutil_util_amf__WEBPACK_IMPORTED_MODULE_17__.writeValue(ioWriter, colorInfo);
            });
        }
    }
    writeMultichannelConfig(formatContext, stream) {
        if (this.isEnhancedStream(stream) && stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 8 /* FlvTag.AUDIO */, BigInt(0), (ioWriter) => {
                _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeAudioHeader(ioWriter, stream, this.context, true, 4 /* AudioPacketType.MultichannelConfig */, BigInt(0), 0);
            }, (ioWriter) => {
                switch (stream.codecpar.chLayout.order) {
                    case 1 /* AVChannelOrder.AV_CHANNEL_ORDER_NATIVE */:
                        ioWriter.writeUint8(1 /* AudioChannelOrder.Native */);
                        break;
                    case 2 /* AVChannelOrder.AV_CHANNEL_ORDER_CUSTOM */:
                        ioWriter.writeUint8(2 /* AudioChannelOrder.Custom */);
                        break;
                    default:
                        ioWriter.writeUint8(0 /* AudioChannelOrder.Unspecified */);
                        break;
                }
                ioWriter.writeUint8(stream.codecpar.chLayout.nbChannels);
                if (stream.codecpar.chLayout.order === 1 /* AVChannelOrder.AV_CHANNEL_ORDER_NATIVE */) {
                    let mask = stream.codecpar.chLayout.u.mask & BigInt(0x03ffff);
                    mask |= (stream.codecpar.chLayout.u.mask >> (BigInt(35 /* AVChannel.AV_CHANNEL_LOW_FREQUENCY_2 */) - BigInt(18))) & BigInt(0xfc0000);
                    ioWriter.writeUint32(Number(BigInt.asUintN(32, mask)));
                }
                else if (stream.codecpar.chLayout.order === 2 /* AVChannelOrder.AV_CHANNEL_ORDER_CUSTOM */) {
                    for (let i = 0; i < stream.codecpar.chLayout.nbChannels; i++) {
                        const id = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](stream.codecpar.chLayout.u.map + i * 24);
                        if (id >= 0 /* AVChannel.AV_CHANNEL_FRONT_LEFT */ && id <= 17 /* AVChannel.AV_CHANNEL_TOP_BACK_RIGHT */) {
                            ioWriter.writeUint8(id - 0 /* AVChannel.AV_CHANNEL_FRONT_LEFT */);
                        }
                        else if (id >= 35 /* AVChannel.AV_CHANNEL_LOW_FREQUENCY_2 */ && id <= 40 /* AVChannel.AV_CHANNEL_BOTTOM_FRONT_RIGHT */) {
                            ioWriter.writeUint8(id - 35 /* AVChannel.AV_CHANNEL_LOW_FREQUENCY_2 */ + 18);
                        }
                        else if (id === 512 /* AVChannel.AV_CHANNEL_UNUSED */) {
                            ioWriter.writeUint8(0xfe);
                        }
                        else {
                            ioWriter.writeUint8(0xff);
                        }
                    }
                }
            });
        }
    }
    writeHeader(formatContext) {
        this.header.write(formatContext.ioWriter);
        // previousTagSize0 总是 0
        formatContext.ioWriter.writeUint32(0);
        if (this.options.live) {
            this.script.write(formatContext.ioWriter);
            this.context.scriptWrote = true;
        }
        formatContext.streams.forEach((stream) => {
            const streamContext = stream.privData;
            if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
                if (stream.codecpar.extradata && (this.isEnhancedStream(stream) || stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */)) {
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 8 /* FlvTag.AUDIO */, BigInt(0), (ioWriter) => {
                        _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeAudioHeader(ioWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream) ? 0 /* AudioPacketType.SequenceStart */ : 0 /* AACPacketType.AAC_SEQUENCE_HEADER */, BigInt(0), 0);
                    }, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize), (previousTagSize) => {
                        this.context.filesize += previousTagSize + 4;
                        if (!streamContext.trackId) {
                            this.context.audioSize += stream.codecpar.extradataSize;
                            this.script.onMetaData.hasMetadata = true;
                        }
                        this.context.datasize += stream.codecpar.extradataSize;
                    });
                }
                this.writeMultichannelConfig(formatContext, stream);
            }
            else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                if (stream.codecpar.extradata
                    && (this.isEnhancedStream(stream)
                        || stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */)) {
                    let extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
                    if ((stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */)
                        && avutil_util_nalu__WEBPACK_IMPORTED_MODULE_22__.isAnnexb(extradata)) {
                        if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                            extradata = avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_19__.annexbExtradata2AvccExtradata(extradata);
                        }
                        else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                            extradata = avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_20__.annexbExtradata2AvccExtradata(extradata);
                        }
                        else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                            extradata = avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_21__.annexbExtradata2AvccExtradata(extradata);
                        }
                    }
                    const now = formatContext.ioWriter.getPos();
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, BigInt(0), (ioWriter) => {
                        _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeVideoHeader(ioWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream) ? 0 /* VideoPacketType.SequenceStart */ : 0 /* AVCPacketType.AVC_SEQUENCE_HEADER */, 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */, BigInt(0), 0);
                    }, extradata, (previousTagSize) => {
                        this.context.filesize += previousTagSize + 4;
                        if (!streamContext.trackId) {
                            this.context.videosize += stream.codecpar.extradataSize;
                            this.script.onMetaData.hasMetadata = true;
                        }
                        this.context.datasize += stream.codecpar.extradataSize;
                        this.context.keyFrameTimes.push(0);
                        this.context.keyframeFilePositions.push(Number(now));
                        this.context.videoMetadataWrote = true;
                    });
                }
            }
            this.writeMetadata(formatContext, stream);
        });
        return 0;
    }
    isNewExtradata(extradata, stream) {
        if (extradata.length === stream.codecpar.extradataSize) {
            const old = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize);
            for (let i = 0; i < extradata.length; i++) {
                if (extradata[i] !== old[i]) {
                    return true;
                }
            }
        }
        return false;
    }
    writeAVPacket(formatContext, avpacket) {
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_11__.warn(`can not found the stream width the packet\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 512);
            return;
        }
        const streamContext = stream.privData;
        if (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */) {
            // 如果有 extradata，先写 extradata 为一个 tag
            const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (element && (this.isEnhancedStream(stream) || stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */)) {
                const extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[25](element + 4));
                if (this.isNewExtradata(extradata, stream)) {
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 8 /* FlvTag.AUDIO */, (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q), (ioWriter) => {
                        _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeAudioHeader(ioWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream) ? 0 /* AudioPacketType.SequenceStart */ : 0 /* AACPacketType.AAC_SEQUENCE_HEADER */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72);
                    }, extradata, (previousTagSize) => {
                        this.context.filesize += previousTagSize + 4;
                    });
                    if (!streamContext.trackId) {
                        this.context.audioSize += extradata.length;
                    }
                    this.context.datasize += extradata.length;
                }
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
                // 不使用 oflv.writeTag，这个方法太慢，引擎无法内联优化，只适合一两次调用那种
                // 这里直接写
                this.headerWriter.reset();
                this.headerBuffers.length = 0;
                _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeAudioHeader(this.headerWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream) ? 1 /* AudioPacketType.CodedFrames */ : 1 /* AACPacketType.AAC_RAW */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72);
                this.headerWriter.flush();
                const header = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_9__["default"])(Uint8Array, this.headerBuffers);
                const now = formatContext.ioWriter.getPos();
                // tagType
                formatContext.ioWriter.writeUint8(8 /* FlvTag.AUDIO */);
                // size
                formatContext.ioWriter.writeUint24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) + header.length);
                // timestamp
                const timestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
                formatContext.ioWriter.writeUint24(Number(timestamp & BigInt(0xffffff)));
                formatContext.ioWriter.writeUint8(Number((timestamp >> BigInt(24)) & BigInt(0xff)));
                // streamId always 0
                formatContext.ioWriter.writeUint24(0);
                formatContext.ioWriter.writeBuffer(header);
                formatContext.ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)));
                const previousTagSize = Number(formatContext.ioWriter.getPos() - now);
                formatContext.ioWriter.writeUint32(previousTagSize);
                this.context.filesize += previousTagSize + 4;
            }
            if (!streamContext.trackId) {
                this.context.audioSize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28);
                this.context.lasttimestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
            }
            this.context.datasize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28);
        }
        else if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            if ((stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) && (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 64 /* AVPacketFlags.AV_PKT_FLAG_H26X_ANNEXB */)) {
                this.annexb2AvccFilter.sendAVPacket(avpacket);
                this.annexb2AvccFilter.receiveAVPacket(this.avpacket);
                avpacket = this.avpacket;
            }
            const keyframePos = formatContext.ioWriter.getPos();
            // 如果有 extradata，先写 extradata 为一个 tag
            const element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_12__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (element) {
                const extradata = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[25](element + 4));
                if (this.isNewExtradata(extradata, stream)
                    && (this.isEnhancedStream(stream)
                        || stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */)) {
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q), (ioWriter) => {
                        _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeVideoHeader(ioWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream) ? 0 /* VideoPacketType.SequenceStart */ : 0 /* AVCPacketType.AVC_SEQUENCE_HEADER */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72);
                    }, extradata, (previousTagSize) => {
                        this.context.filesize += previousTagSize + 4;
                    });
                    if (!streamContext.trackId) {
                        this.context.videosize += extradata.length;
                    }
                    this.context.datasize += extradata.length;
                }
            }
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
                let ct = 0;
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                    ct = Number(BigInt.asIntN(32, (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q)));
                }
                const packetType = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16) !== cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8)
                    && (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                        || stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */)
                    ? 1 /* VideoPacketType.CodedFrames */
                    : 3 /* VideoPacketType.CodedFramesX */;
                // 不使用 oflv.writeTag，这个方法太慢，引擎无法内联优化，只适合一两次调用那种
                // 这里直接写
                this.headerWriter.reset();
                this.headerBuffers.length = 0;
                _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeVideoHeader(this.headerWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream) ? packetType : 1 /* AVCPacketType.AVC_NALU */, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, ct);
                this.headerWriter.flush();
                const header = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_9__["default"])(Uint8Array, this.headerBuffers);
                const now = formatContext.ioWriter.getPos();
                // tagType
                formatContext.ioWriter.writeUint8(9 /* FlvTag.VIDEO */);
                // size
                formatContext.ioWriter.writeUint24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28) + header.length);
                // timestamp
                const timestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
                formatContext.ioWriter.writeUint24(Number(timestamp & BigInt(0xffffff)));
                formatContext.ioWriter.writeUint8(Number((timestamp >> BigInt(24)) & BigInt(0xff)));
                // streamId always 0
                formatContext.ioWriter.writeUint24(0);
                formatContext.ioWriter.writeBuffer(header);
                formatContext.ioWriter.writeBuffer((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_10__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)));
                const previousTagSize = Number(formatContext.ioWriter.getPos() - now);
                formatContext.ioWriter.writeUint32(previousTagSize);
                this.context.filesize += previousTagSize + 4;
                if (!streamContext.trackId) {
                    this.context.frameCount++;
                    this.context.videosize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28);
                    this.context.lasttimestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
                }
                this.context.datasize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28);
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */) {
                    if (this.context.firstKeyframePositionWrote || !this.context.videoMetadataWrote) {
                        this.context.lastkeyframetimestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
                        this.context.lastkeyframelocation = Number(keyframePos);
                        this.context.keyFrameTimes.push(Number((Number(this.context.lastkeyframetimestamp) * (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avQ2D)(avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q)).toFixed(2)));
                        this.context.keyframeFilePositions.push(this.context.lastkeyframelocation);
                    }
                    else {
                        this.context.firstKeyframePositionWrote = true;
                    }
                }
            }
        }
        return 0;
    }
    writeTrailer(formatContext) {
        formatContext.streams.forEach((stream) => {
            const streamContext = stream.privData;
            if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */
                || this.isEnhancedStream(stream)) {
                _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeTag(formatContext.ioWriter, 9 /* FlvTag.VIDEO */, this.context.lasttimestamp, (ioWriter) => {
                    _flv_oflv__WEBPACK_IMPORTED_MODULE_18__.writeVideoHeader(ioWriter, stream, this.context, this.isEnhancedStream(stream), this.isEnhancedStream(stream)
                        ? (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
                            ? 2 /* AudioPacketType.SequenceEnd */
                            : 2 /* VideoPacketType.SequenceEnd */)
                        : 2 /* AVCPacketType.AVC_END_OF_ENQUENCE */, 32 /* AVPacketFlags.AV_PKT_FLAG_END */, this.context.lasttimestamp, 0);
                }, undefined, (previousTagSize) => {
                    this.context.filesize += previousTagSize + 4;
                });
                if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */ && !streamContext.trackId) {
                    this.script.onMetaData.canSeekToEnd = true;
                }
            }
        });
        if (!this.context.scriptWrote) {
            formatContext.ioWriter.flush();
            this.script.onMetaData.filesize = this.context.filesize;
            this.script.onMetaData.audiosize = this.context.audioSize;
            this.script.onMetaData.videosize = this.context.videosize;
            this.script.onMetaData.datasize = this.context.datasize;
            this.script.onMetaData.lasttimestamp = this.context.lasttimestamp;
            if (this.options.addKeyframePositions) {
                this.script.onMetaData.lastkeyframetimestamp = this.context.lastkeyframetimestamp;
                this.script.onMetaData.lastkeyframelocation = this.context.lastkeyframelocation;
                if (this.context.keyFrameTimes.length > 1) {
                    this.script.onMetaData.hasKeyframes = true;
                    this.script.onMetaData.keyframes = {
                        filepositions: this.context.keyframeFilePositions,
                        times: this.context.keyFrameTimes
                    };
                }
                else {
                    this.script.onMetaData.hasKeyframes = false;
                }
            }
            else {
                this.script.onMetaData.hasKeyframes = false;
            }
            this.script.onMetaData.duration = Number(this.context.lasttimestamp) / 1000;
            this.script.onMetaData.audiodatarate = this.context.audioSize / this.script.onMetaData.duration / 1000 * 8;
            this.script.onMetaData.videodatarate = this.context.videosize / this.script.onMetaData.duration / 1000 * 8;
            this.script.onMetaData.framerate = this.context.frameCount / this.script.onMetaData.duration;
            const size = this.script.computeSize();
            common_util_array__WEBPACK_IMPORTED_MODULE_7__.each(this.context.keyframeFilePositions, (item, index) => {
                this.context.keyframeFilePositions[index] = item + 11 + size + 4;
            });
            if (this.script.onMetaData.keyframes) {
                this.script.onMetaData.keyframes.filepositions = this.context.keyframeFilePositions;
            }
            this.context.filesize += 11 + size + 4;
            this.script.onMetaData.filesize = this.context.filesize;
            const buffers = [];
            const oldFlush = formatContext.ioWriter.onFlush;
            formatContext.ioWriter.onFlush = (buffer) => {
                buffers.push(buffer.slice());
                return 0;
            };
            this.script.write(formatContext.ioWriter);
            formatContext.ioWriter.flush();
            formatContext.ioWriter.onFlush = oldFlush;
            const data = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_9__["default"])(Uint8Array, buffers);
            if (oldFlush) {
                oldFlush(data, BigInt(13));
            }
        }
        else {
            formatContext.ioWriter.flush();
        }
        return 0;
    }
    flush(context) {
        context.ioWriter.flush();
        return 0;
    }
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

/***/ "./src/avutil/codecs/vvc.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/vvc.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   annexb2Avcc: () => (/* binding */ annexb2Avcc),
/* harmony export */   annexbAddExtradata: () => (/* binding */ annexbAddExtradata),
/* harmony export */   annexbExtradata2AvccExtradata: () => (/* binding */ annexbExtradata2AvccExtradata),
/* harmony export */   avcc2Annexb: () => (/* binding */ avcc2Annexb),
/* harmony export */   extradata2VpsSpsPps: () => (/* binding */ extradata2VpsSpsPps),
/* harmony export */   generateAnnexbExtradata: () => (/* binding */ generateAnnexbExtradata),
/* harmony export */   isIDR: () => (/* binding */ isIDR),
/* harmony export */   nalus2Annexb: () => (/* binding */ nalus2Annexb),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData),
/* harmony export */   parseSPS: () => (/* binding */ parseSPS)
/* harmony export */ });
/* unused harmony exports vpsSpsPps2Extradata, parseAVCodecParametersBySps */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/io/BufferWriter */ "./src/common/io/BufferWriter.ts");
/* harmony import */ var common_io_BufferReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/io/BufferReader */ "./src/common/io/BufferReader.ts");
/* harmony import */ var common_io_BitReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/io/BitReader */ "./src/common/io/BitReader.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var _util_nalu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var _util_mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../util/expgolomb */ "./src/avutil/util/expgolomb.ts");
/* harmony import */ var common_io_BitWriter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/BitWriter */ "./src/common/io/BitWriter.ts");
/* harmony import */ var _util_intread__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../util/intread */ "./src/avutil/util/intread.ts");
/* harmony import */ var _util_intwrite__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../util/intwrite */ "./src/avutil/util/intwrite.ts");

/*
 * libmedia vvc util
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











const NALULengthSizeMinusOne = 3;
/* eslint-disable camelcase */
function parsePTL(bitReader) {
    const olsIdx = bitReader.readU(9);
    const numSublayers = bitReader.readU(3);
    const constantFrameRate = bitReader.readU(2);
    const chromaFormatIdc = bitReader.readU(2);
    const bitDepthMinus8 = bitReader.readU(3);
    bitReader.readU(5);
    // VvcPTLRecord
    bitReader.readU(2);
    const num_bytes_constraint_info = bitReader.readU(6);
    const generalProfileIdc = bitReader.readU(7);
    const generalTierFlag = bitReader.readU(1);
    const generalLevelIdc = bitReader.readU(8);
    const ptlFrameOnlyConstraintFlag = bitReader.readU(1);
    const ptlMultilayerEnabledFlag = bitReader.readU(1);
    const generalConstraintInfo = [];
    const sublayerLevelIdc = [];
    if (num_bytes_constraint_info) {
        for (let i = 0; i < num_bytes_constraint_info - 1; i++) {
            generalConstraintInfo[i] = bitReader.readU(8);
        }
        generalConstraintInfo[num_bytes_constraint_info - 1] = bitReader.readU(6);
    }
    else {
        bitReader.readU(6);
    }
    if (numSublayers > 1) {
        let ptl_sublayer_present_mask = 0;
        for (let j = numSublayers - 2; j >= 0; --j) {
            const val = bitReader.readU(1);
            ptl_sublayer_present_mask |= val << j;
        }
        for (let j = numSublayers; j <= 8 && numSublayers > 1; ++j) {
            bitReader.readU(1);
        }
        for (let j = numSublayers - 2; j >= 0; --j) {
            if (ptl_sublayer_present_mask & (1 << j)) {
                sublayerLevelIdc[j] = bitReader.readU(8);
            }
        }
    }
    const ptl_num_sub_profiles = bitReader.readU(8);
    const generalSubProfileIdc = [];
    if (ptl_num_sub_profiles) {
        for (let i = 0; i < ptl_num_sub_profiles; i++) {
            generalSubProfileIdc.push(bitReader.readU(8));
        }
    }
    const maxPictureWidth = bitReader.readU(16);
    const maxPictureHeight = bitReader.readU(16);
    const avgFramerate = bitReader.readU(16);
    return {
        olsIdx,
        numSublayers,
        bitDepthMinus8,
        chromaFormatIdc,
        constantFrameRate,
        generalProfileIdc,
        generalTierFlag,
        generalLevelIdc,
        ptlFrameOnlyConstraintFlag,
        ptlMultilayerEnabledFlag,
        generalConstraintInfo,
        sublayerLevelIdc,
        generalSubProfileIdc,
        maxPictureWidth,
        maxPictureHeight,
        avgFramerate
    };
}
/* eslint-enable camelcase */
/**
 *
 * vvcc 格式的 extradata 转 annexb vps sps pps
 *
 * bits
 * - 5   reserved (11111)
 * - 2   lengthSizeMinusOne
 * - 1   ptl_present_flag
 * if ptl_present_flag
 *   - 9   ols_idx
 *   - 3  num_sublayers
 *   - 2  constant_frame_rate
 *   - 2  chroma_format_idc
 *   - 3  bit_depth_minus8
 *   - 5  reserved (11111)
 *   VvcPTLRecord
 *   - 2 reserved (11)
 *   - 6 num_bytes_constraint_info
 *   - 7 general_profile_idc
 *   - 1 general_tier_flag
 *   - 8 general_level_idc
 *   - 1 general_level_idc
 *   - 1 ptl_multilayer_enabled_flag
 *   if num_bytes_constraint_info > 0
 *      for (i = 0; i < num_bytes_constraint_info - 1; i++)
 *        - 8 general_constraint_info[i]
 *      - 6 general_constraint_info[num_bytes_constraint_info - 1]
 *   else
 *      - 6 reserved
 *   if num_sublayers > 1
 *      - num_sublayers - 2 ptl_sublayer_level_present_flag
 *      - 8 - num_sublayers + 1 ptl_reserved_zero_bit
 *      for (i = num_sublayers -2; i >= 0; i--)
 *        if ptl_sublayer_present_mask & (1 << i)
 *          - 8 sublayer_level_idc[i]
 *    - 8 ptl_num_sub_profiles
 *    if ptl_num_sub_profiles
 *      for (i = 0; i < ptl_num_sub_profiles; i++)
 *        - 32 general_sub_profile_idc[i]
 *    - 16 max_picture_width
 *    - 16 max_picture_height
 *    - 16 avg_frame_rate
 * - 8   numOfArrays
 * - repeated of array (vps/sps/pps)
 * - 1   array_completeness
 * - 2   reserved (0)
 * - 5   NAL_unit_type
 * if nalu_type != VVC_NALU_DEC_PARAM && nalu_type != VVC_NALU_OPI
 *    - 16  numNalus
 * else
 *   numNalus = 1
 * - repeated once per NAL
 * - 16  nalUnitLength
 * - N   NALU data
 *
 */
function extradata2VpsSpsPps(extradata) {
    const bufferReader = new common_io_BufferReader__WEBPACK_IMPORTED_MODULE_3__["default"](extradata, true);
    const ptlPresentFlag = bufferReader.readUint8() & 0x01;
    if (ptlPresentFlag) {
        const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_4__["default"]();
        bitReader.appendBuffer(extradata.subarray(1));
        parsePTL(bitReader);
        bufferReader.skip(bitReader.getPointer());
    }
    let vpss = [];
    let spss = [];
    let ppss = [];
    const arrayLen = bufferReader.readUint8();
    for (let i = 0; i < arrayLen; i++) {
        const naluType = bufferReader.readUint8() & 0x1f;
        let count = 1;
        if (naluType !== 13 /* VVCNaluType.kDCI_NUT */ && naluType !== 12 /* VVCNaluType.kOPI_NUT */) {
            count = bufferReader.readUint16();
        }
        const list = [];
        for (let j = 0; j < count; j++) {
            const len = bufferReader.readUint16();
            list.push(bufferReader.readBuffer(len));
        }
        if (naluType === 14 /* VVCNaluType.kVPS_NUT */) {
            vpss = list;
        }
        else if (naluType === 15 /* VVCNaluType.kSPS_NUT */) {
            spss = list;
        }
        else if (naluType === 16 /* VVCNaluType.kPPS_NUT */) {
            ppss = list;
        }
    }
    return {
        vpss,
        spss,
        ppss
    };
}
/**
 * annexb vps sps pps 转 avcc 格式的 extradata
 *
 * @param vpss
 * @param spss
 * @param ppss
 * @returns
 */
function vpsSpsPps2Extradata(vpss, spss, ppss) {
    const sps = spss[0];
    let ptl;
    if (sps) {
        const spsParams = parseSPS(sps);
        let generalConstraintInfo = spsParams.generalConstraintInfo;
        if (!generalConstraintInfo.length) {
            generalConstraintInfo = new Array(12).fill(0);
        }
        const biWriter = new common_io_BitWriter__WEBPACK_IMPORTED_MODULE_9__["default"]();
        biWriter.writeU(9, 0);
        biWriter.writeU(3, spsParams.spsMaxSublayersMinus1 + 1);
        biWriter.writeU(2, 1);
        biWriter.writeU(2, spsParams.chromaFormatIdc);
        biWriter.writeU(3, spsParams.bitDepthMinus8);
        biWriter.writeU(5, 0b11111);
        biWriter.writeU(2, 0);
        biWriter.writeU(6, generalConstraintInfo.length);
        biWriter.writeU(7, spsParams.profile);
        biWriter.writeU1(spsParams.tierFlag);
        biWriter.writeU(8, spsParams.level);
        biWriter.writeU1(spsParams.ptlFrameOnlyConstraintFlag);
        biWriter.writeU1(spsParams.ptlMultilayerEnabledFlag);
        if (generalConstraintInfo.length) {
            for (let i = 0; i < generalConstraintInfo.length - 1; i++) {
                biWriter.writeU(8, generalConstraintInfo[i]);
            }
            biWriter.writeU(6, generalConstraintInfo[generalConstraintInfo.length - 1]);
        }
        else {
            biWriter.writeU(6, 0b111111);
        }
        if (spsParams.spsMaxSublayersMinus1 + 1 > 1) {
            let ptlSubLayerLevelPresentFlags = 0;
            for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
                ptlSubLayerLevelPresentFlags = (ptlSubLayerLevelPresentFlags << 1 | spsParams.ptlSublayerLevelPresentFlag[i]);
            }
            biWriter.writeU(spsParams.spsMaxSublayersMinus1, ptlSubLayerLevelPresentFlags);
            for (let j = spsParams.spsMaxSublayersMinus1 + 1; j <= 8 && spsParams.spsMaxSublayersMinus1 > 0; ++j) {
                biWriter.writeU1(0);
            }
            for (let i = spsParams.spsMaxSublayersMinus1 - 1; i >= 0; i--) {
                if (spsParams.ptlSublayerLevelPresentFlag[i]) {
                    biWriter.writeU(8, spsParams.sublayerLevelIdc[i]);
                }
            }
        }
        biWriter.writeU(8, spsParams.generalSubProfileIdc.length);
        for (let i = 0; i < spsParams.generalSubProfileIdc.length; i++) {
            biWriter.writeU(8, spsParams.sublayerLevelIdc[i]);
        }
        biWriter.writeU(16, spsParams.width);
        biWriter.writeU(16, spsParams.height);
        biWriter.writeU(16, 0);
        biWriter.padding();
        ptl = biWriter.getBuffer().subarray(0, biWriter.getPointer());
    }
    let length = 2 + (ptl ? ptl.length : 0);
    if (vpss.length) {
        // type + count
        length += 3;
        length = vpss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (spss.length) {
        // type + count
        length += 3;
        length = spss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    if (ppss.length) {
        // type + count
        length += 3;
        length = ppss.reduce((prev, value) => {
            // length + data
            return prev + 2 + value.length;
        }, length);
    }
    const buffer = new Uint8Array(length);
    const bufferWriter = new common_io_BufferWriter__WEBPACK_IMPORTED_MODULE_2__["default"](buffer, true);
    bufferWriter.writeUint8(NALULengthSizeMinusOne << 1 | (ptl ? 1 : 0) | 0xf8);
    if (ptl) {
        bufferWriter.writeBuffer(ptl);
    }
    // numOfArrays
    let numOfArrays = 0;
    if (vpss.length) {
        numOfArrays++;
    }
    if (spss.length) {
        numOfArrays++;
    }
    if (ppss.length) {
        numOfArrays++;
    }
    bufferWriter.writeUint8(numOfArrays);
    // vps
    if (vpss.length) {
        bufferWriter.writeUint8((128) | 14 /* VVCNaluType.kVPS_NUT */);
        bufferWriter.writeUint16(vpss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_1__.each(vpss, (vps) => {
            bufferWriter.writeUint16(vps.length);
            bufferWriter.writeBuffer(vps);
        });
    }
    // sps
    if (spss.length) {
        bufferWriter.writeUint8((128) | 15 /* VVCNaluType.kSPS_NUT */);
        bufferWriter.writeUint16(spss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_1__.each(spss, (sps) => {
            bufferWriter.writeUint16(sps.length);
            bufferWriter.writeBuffer(sps);
        });
    }
    // pps
    if (ppss.length) {
        bufferWriter.writeUint8((128) | 16 /* VVCNaluType.kPPS_NUT */);
        bufferWriter.writeUint16(ppss.length);
        common_util_array__WEBPACK_IMPORTED_MODULE_1__.each(ppss, (pps) => {
            bufferWriter.writeUint16(pps.length);
            bufferWriter.writeBuffer(pps);
        });
    }
    return buffer;
}
/**
 * annexb extradata 转 avcc extradata
 *
 * @param data
 * @returns
 */
function annexbExtradata2AvccExtradata(data) {
    let nalus = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode(data);
    if (nalus.length >= 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            return vpsSpsPps2Extradata(vpss, spss, ppss);
        }
    }
}
/**
 * 从 annexb 码流里面生成 annexb extradata
 *
 * 提取出 vps、 sps 和 pps
 *
 * @param data
 * @returns
 */
function generateAnnexbExtradata(data) {
    let nalus = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode(data);
    if (nalus.length >= 2) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
        });
        if (spss.length && ppss.length) {
            const nalus = [spss[0], ppss[0]];
            if (vpss.length) {
                nalus.unshift(vpss[0]);
            }
            return _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(nalus, 0);
        }
    }
}
/**
 *
 * annexb 格式的 NALU 转 avcc NALU
 *
 * 需要保证 data 是 safe 的
 *
 */
function annexb2Avcc(data, reverseSps = false) {
    let extradata;
    let key = false;
    let nalus = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode(data);
    if (nalus.length) {
        const vpss = [];
        const spss = [];
        const ppss = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
            if (type === 8 /* VVCNaluType.kIDR_N_LP */
                || type === 7 /* VVCNaluType.kIDR_W_RADL */
                || type === 9 /* VVCNaluType.kCRA_NUT */
                || type === 10 /* VVCNaluType.kGDR_NUT */) {
                key = true;
            }
        });
        if (spss.length && ppss.length) {
            extradata = vpsSpsPps2Extradata(vpss, spss, ppss);
            nalus = nalus.filter((nalu) => {
                const type = (nalu[1] >>> 3) & 0x1f;
                return reverseSps
                    ? type !== 20 /* VVCNaluType.kAUD_NUT */
                    : (type !== 14 /* VVCNaluType.kVPS_NUT */
                        && type !== 15 /* VVCNaluType.kSPS_NUT */
                        && type !== 16 /* VVCNaluType.kPPS_NUT */
                        && type !== 20 /* VVCNaluType.kAUD_NUT */);
            });
        }
        else {
            nalus = nalus.filter((nalu) => {
                const type = (nalu[1] >>> 3) & 0x1f;
                return type !== 20 /* VVCNaluType.kAUD_NUT */;
            });
        }
    }
    const length = nalus.reduce((prev, nalu) => {
        return prev + NALULengthSizeMinusOne + 1 + nalu.length;
    }, 0);
    const bufferPointer = (0,_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(length);
    const buffer = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(bufferPointer, length);
    _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByLength(nalus, NALULengthSizeMinusOne, buffer);
    return {
        bufferPointer,
        length,
        extradata,
        key
    };
}
/**
 *
 * 需要保证 data 是 safe 的
 *
 * @param vpss
 * @param spss
 * @param ppss
 * @param nalus
 * @returns
 */
function nalus2Annexb(vpss, spss, ppss, nalus, key) {
    const lengths = [
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCodeLength(vpss, 0),
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCodeLength(spss, 0),
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCodeLength(ppss, 0),
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCodeLength(nalus, 2)
    ];
    let length = lengths.reduce((prev, length) => {
        return prev + length;
    }, 0);
    const bufferPointer = (0,_util_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(length + 7);
    let offset = bufferPointer;
    // AUD
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), 0);
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), 0);
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), 0);
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), 1);
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), 0);
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), (20 /* VVCNaluType.kAUD_NUT */ << 3) | 1);
    _util_intwrite__WEBPACK_IMPORTED_MODULE_11__.w8((offset = offset + 1, offset - 1), (key ? 1 : 0) << 7 | 0x28);
    if (vpss.length) {
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(vpss, 0, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(offset, lengths[0]));
        offset = offset + lengths[0];
    }
    if (spss.length) {
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(spss, 0, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(offset, lengths[1]));
        offset = offset + lengths[1];
    }
    if (ppss.length) {
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(ppss, 0, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(offset, lengths[2]));
        offset = offset + lengths[2];
    }
    if (nalus.length) {
        _util_nalu__WEBPACK_IMPORTED_MODULE_6__.joinNaluByStartCode(nalus, 2, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(offset, lengths[3]));
    }
    return {
        bufferPointer,
        length: length + 7
    };
}
/**
 * annexb 添加 sps pps
 *
 * @param data
 * @param extradata
 */
function annexbAddExtradata(data, extradata) {
    let nalus = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode(data).concat(_util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode(extradata));
    if (nalus.length) {
        let vpss = [];
        let spss = [];
        let ppss = [];
        let others = [];
        nalus.forEach((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 14 /* VVCNaluType.kVPS_NUT */) {
                vpss.push(nalu);
            }
            else if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                spss.push(nalu);
            }
            else if (type === 16 /* VVCNaluType.kPPS_NUT */) {
                ppss.push(nalu);
            }
            else if (type !== 20 /* VVCNaluType.kAUD_NUT */) {
                others.push(nalu);
            }
        });
        return nalus2Annexb(vpss, spss, ppss, others, true);
    }
}
/**
 * avcc 格式的 NALU 转 annexb NALU
 *
 * 需要保证 data 是 safe 的
 *
 */
function avcc2Annexb(data, extradata) {
    const naluLengthSizeMinusOne = extradata ? ((extradata[0] >>> 1) & 0x03) : NALULengthSizeMinusOne;
    let vpss = [];
    let spss = [];
    let ppss = [];
    let key = false;
    if (extradata) {
        const result = extradata2VpsSpsPps(extradata);
        vpss = result.vpss;
        spss = result.spss;
        ppss = result.ppss;
        key = true;
    }
    const nalus = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByLength(data, naluLengthSizeMinusOne).filter((nalu) => {
        const type = (nalu[1] >>> 3) & 0x1f;
        return type !== 20 /* VVCNaluType.kAUD_NUT */;
    });
    return {
        ...nalus2Annexb(vpss, spss, ppss, nalus, key),
        key
    };
}
function parseAVCodecParametersBySps(stream, sps) {
    const { profile, level, width, height, videoDelay, chromaFormatIdc, bitDepthMinus8 } = parseSPS(sps);
    stream.codecpar.profile = profile;
    stream.codecpar.level = level;
    stream.codecpar.width = width;
    stream.codecpar.height = height;
    stream.codecpar.videoDelay = videoDelay;
    switch (bitDepthMinus8) {
        case 0:
            if (chromaFormatIdc === 3) {
                stream.codecpar.format = 5 /* AVPixelFormat.AV_PIX_FMT_YUV444P */;
            }
            else if (chromaFormatIdc === 2) {
                stream.codecpar.format = 4 /* AVPixelFormat.AV_PIX_FMT_YUV422P */;
            }
            else {
                stream.codecpar.format = 0 /* AVPixelFormat.AV_PIX_FMT_YUV420P */;
            }
            break;
        case 2:
            if (chromaFormatIdc === 3) {
                stream.codecpar.format = 68 /* AVPixelFormat.AV_PIX_FMT_YUV444P10LE */;
            }
            else if (chromaFormatIdc === 2) {
                stream.codecpar.format = 64 /* AVPixelFormat.AV_PIX_FMT_YUV422P10LE */;
            }
            else {
                stream.codecpar.format = 62 /* AVPixelFormat.AV_PIX_FMT_YUV420P10LE */;
            }
            break;
    }
}
function parseAVCodecParameters(stream, extradata) {
    if (!extradata && stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */]) {
        extradata = stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */];
    }
    let sps;
    if (extradata && _util_nalu__WEBPACK_IMPORTED_MODULE_6__.isAnnexb(extradata)) {
        common_util_array__WEBPACK_IMPORTED_MODULE_1__.each(_util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode(extradata), (nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            if (type === 15 /* VVCNaluType.kSPS_NUT */) {
                sps = nalu;
                return false;
            }
        });
    }
    else if (extradata && extradata.length >= 6) {
        stream.metadata.naluLengthSizeMinusOne = (extradata[0] >>> 1) & 0x03;
        const { spss } = extradata2VpsSpsPps(extradata);
        if (spss.length) {
            sps = spss[0];
        }
    }
    if (sps) {
        parseAVCodecParametersBySps(stream, sps);
    }
}
function isIDR(avpacket, naluLengthSize = 4) {
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) & 64 /* AVPacketFlags.AV_PKT_FLAG_H26X_ANNEXB */) {
        let nalus = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.splitNaluByStartCode((0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28)));
        return nalus.some((nalu) => {
            const type = (nalu[1] >>> 3) & 0x1f;
            return type === 8 /* VVCNaluType.kIDR_N_LP */ || type === 7 /* VVCNaluType.kIDR_W_RADL */;
        });
    }
    else {
        const size = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 28);
        let i = 0;
        while (i < (size - naluLengthSize)) {
            const type = (_util_intread__WEBPACK_IMPORTED_MODULE_10__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + (i + naluLengthSize + 1)) >>> 3) & 0x1f;
            if (type === 8 /* VVCNaluType.kIDR_N_LP */ || type === 7 /* VVCNaluType.kIDR_W_RADL */) {
                return true;
            }
            if (naluLengthSize === 4) {
                i += _util_intread__WEBPACK_IMPORTED_MODULE_10__.rb32(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 3) {
                i += _util_intread__WEBPACK_IMPORTED_MODULE_10__.rb24(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else if (naluLengthSize === 2) {
                i += _util_intread__WEBPACK_IMPORTED_MODULE_10__.rb16(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            else {
                i += _util_intread__WEBPACK_IMPORTED_MODULE_10__.r8(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](avpacket + 24) + i);
            }
            i += naluLengthSize;
        }
        return false;
    }
}
function parseSPS(sps) {
    if (!sps || sps.length < 3) {
        return;
    }
    let offset = 0;
    if (sps[0] === 0x00
        && sps[1] === 0x00
        && sps[2] === 0x00
        && sps[3] === 0x01) {
        offset = 4;
    }
    let profile = 0;
    let level = 0;
    let width = 0;
    let height = 0;
    let bitDepthMinus8 = 0;
    let chromaFormatIdc = 1;
    let generalProfileSpace = 0;
    let tierFlag = 0;
    let ptlFrameOnlyConstraintFlag = 0;
    let ptlMultilayerEnabledFlag = 0;
    const generalConstraintInfo = [];
    const ptlSublayerLevelPresentFlag = [];
    const sublayerLevelIdc = [];
    const generalSubProfileIdc = [];
    const buffer = _util_nalu__WEBPACK_IMPORTED_MODULE_6__.naluUnescape(sps.subarray(offset));
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_4__["default"](buffer.length);
    bitReader.appendBuffer(buffer);
    // forbidden_zero_bit
    bitReader.readU1();
    // nuh_reserved_zero_bit
    bitReader.readU1();
    // layerId
    bitReader.readU(6);
    // nalu type
    bitReader.readU(5);
    // tid
    bitReader.readU(3);
    // sps_seq_parameter_set_id && sps_video_parameter_set_id
    bitReader.readU(8);
    const spsMaxSublayersMinus1 = bitReader.readU(3);
    chromaFormatIdc = bitReader.readU(2);
    const sps_log2_ctu_size_minus5 = bitReader.readU(2);
    const sps_ptl_dpb_hrd_params_present_flag = bitReader.readU(1);
    if (sps_ptl_dpb_hrd_params_present_flag) {
        profile = bitReader.readU(7);
        tierFlag = bitReader.readU(1);
        level = bitReader.readU(8);
        ptlFrameOnlyConstraintFlag = bitReader.readU(1);
        ptlMultilayerEnabledFlag = bitReader.readU(1);
        const gci_present_flag = bitReader.readU(1);
        if (gci_present_flag) {
            for (let j = 0; j < 8; j++) {
                generalConstraintInfo[j] = bitReader.readU(8);
            }
            generalConstraintInfo[8] = bitReader.readU(7);
            const gci_num_reserved_bits = bitReader.readU(8);
            bitReader.readU(gci_num_reserved_bits);
        }
        bitReader.skipPadding();
        for (let i = spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            ptlSublayerLevelPresentFlag[i] = bitReader.readU(1);
        }
        bitReader.skipPadding();
        for (let i = spsMaxSublayersMinus1 - 1; i >= 0; i--) {
            if (ptlSublayerLevelPresentFlag[i]) {
                sublayerLevelIdc[i] = bitReader.readU(8);
            }
        }
        const ptl_num_sub_profiles = bitReader.readU(8);
        if (ptl_num_sub_profiles) {
            for (let i = 0; i < ptl_num_sub_profiles; i++) {
                generalSubProfileIdc[i] = bitReader.readU(32);
            }
        }
    }
    // sps_gdr_enabled_flag
    bitReader.readU1();
    const sps_ref_pic_resampling_enabled_flag = bitReader.readU1();
    if (sps_ref_pic_resampling_enabled_flag) {
        // sps_res_change_in_clvs_allowed_flag
        bitReader.readU1();
    }
    const sps_pic_width_max_in_luma_samples = width = _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
    const sps_pic_height_max_in_luma_samples = height = _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
    if (bitReader.readU1()) {
        // sps_conf_win_left_offset
        _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
        // sps_conf_win_right_offset
        _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
        // sps_conf_win_top_offset
        _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
        // sps_conf_win_bottom_offset
        _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
    }
    if (bitReader.readU1()) {
        const sps_num_subpics_minus1 = _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
        const ctb_log2_size_y = sps_log2_ctu_size_minus5 + 5;
        const ctb_size_y = 1 << ctb_log2_size_y;
        const tmp_width_val = sps_pic_width_max_in_luma_samples / (1 << ctb_log2_size_y);
        const tmp_height_val = sps_pic_height_max_in_luma_samples / (1 << ctb_log2_size_y);
        const wlen = Math.ceil(Math.log2(tmp_width_val));
        const hlen = Math.ceil(Math.log2(tmp_height_val));
        let sps_subpic_id_len = 0;
        let sps_subpic_same_size_flag = 0;
        let sps_independent_subpics_flag = 0;
        // sps_num_subpics_minus1
        if (sps_num_subpics_minus1 > 0) {
            sps_independent_subpics_flag = bitReader.readU1();
            sps_subpic_same_size_flag = bitReader.readU1();
        }
        for (let i = 0; sps_num_subpics_minus1 > 0 && i <= sps_num_subpics_minus1; i++) {
            if (!sps_subpic_same_size_flag || i == 0) {
                if (i > 0 && sps_pic_width_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(wlen);
                }
                if (i > 0 && sps_pic_height_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(hlen);
                }
                if (i < sps_num_subpics_minus1 && sps_pic_width_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(wlen);
                }
                if (i < sps_num_subpics_minus1 && sps_pic_height_max_in_luma_samples > ctb_size_y) {
                    bitReader.readU(hlen);
                }
            }
            if (!sps_independent_subpics_flag) {
                // sps_subpic_treated_as_pic_flag && sps_loop_filter_across_subpic_enabled_flag
                bitReader.readU(2);
            }
        }
        sps_subpic_id_len = _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader) + 1;
        // sps_subpic_id_mapping_explicitly_signalled_flag
        if (bitReader.readU(1)) {
            // sps_subpic_id_mapping_present_flag
            if (bitReader.readU(1)) {
                for (let i = 0; i <= sps_num_subpics_minus1; i++) {
                    // sps_subpic_id[i]
                    bitReader.readU(sps_subpic_id_len);
                }
            }
        }
    }
    bitDepthMinus8 = _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
    // sps_entropy_coding_sync_enabled_flag
    bitReader.readU(1);
    // sps_entry_point_offsets_present_flag
    bitReader.readU(1);
    const sps_log2_max_pic_order_cnt_lsb_minus4 = bitReader.readU(4);
    const sps_poc_msb_cycle_flag = bitReader.readU(1);
    let sps_poc_msb_cycle_len_minus1 = 0;
    if (sps_poc_msb_cycle_flag) {
        sps_poc_msb_cycle_len_minus1 = _util_expgolomb__WEBPACK_IMPORTED_MODULE_8__.readUE(bitReader);
    }
    const sps_extra_ph_bit_present_flag = [];
    const sps_num_extra_ph_bytes = bitReader.readU(2);
    for (let i = 0; i < (sps_num_extra_ph_bytes * 8); i++) {
        sps_extra_ph_bit_present_flag[i] = bitReader.readU(1);
    }
    const videoDelay = (spsMaxSublayersMinus1 + 1) > 2 ? 2 : spsMaxSublayersMinus1;
    return {
        profile,
        level,
        width,
        height,
        videoDelay,
        chromaFormatIdc,
        bitDepthMinus8,
        generalProfileSpace,
        tierFlag,
        generalConstraintInfo,
        generalSubProfileIdc,
        ptlFrameOnlyConstraintFlag,
        ptlMultilayerEnabledFlag,
        spsMaxSublayersMinus1,
        ptlSublayerLevelPresentFlag,
        sublayerLevelIdc,
        sps_log2_max_pic_order_cnt_lsb_minus4,
        sps_poc_msb_cycle_flag,
        sps_poc_msb_cycle_len_minus1,
        sps_num_extra_ph_bytes,
        sps_extra_ph_bit_present_flag
    };
}
function parseExtraData(extradata) {
    if (_util_nalu__WEBPACK_IMPORTED_MODULE_6__.isAnnexb(extradata)) {
        extradata = annexbExtradata2AvccExtradata(extradata);
    }
    const bitReader = new common_io_BitReader__WEBPACK_IMPORTED_MODULE_4__["default"]();
    bitReader.appendBuffer(extradata);
    const ptlPresentFlag = bitReader.readU(8) & 0x01;
    if (ptlPresentFlag) {
        return parsePTL(bitReader);
    }
    return {};
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
//# sourceMappingURL=src_avformat_formats_OFlvFormat_ts.avtranscoder.js.map