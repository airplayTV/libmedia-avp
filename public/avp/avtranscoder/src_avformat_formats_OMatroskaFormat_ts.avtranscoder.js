"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_OMatroskaFormat_ts"],{

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

/***/ "./src/avformat/formats/OMatroskaFormat.ts":
/*!*************************************************!*\
  !*** ./src/avformat/formats/OMatroskaFormat.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OMatroskaFormat)
/* harmony export */ });
/* harmony import */ var cheap_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/symbol */ "./src/cheap/symbol.ts");
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var _avutil_struct_rational__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./..\..\avutil\struct\rational */ "./src/avutil/struct/rational.ts");
/* harmony import */ var cheap_std_structAccess__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cheap/std/structAccess */ "./src/cheap/std/structAccess.ts");
/* harmony import */ var _OFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OFormat */ "./src/avformat/formats/OFormat.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! common/io/IOWriterSync */ "./src/common/io/IOWriterSync.ts");
/* harmony import */ var _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./matroska/omatroska */ "./src/avformat/formats/matroska/omatroska.ts");
/* harmony import */ var _matroska_matroska__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./matroska/matroska */ "./src/avformat/formats/matroska/matroska.ts");
/* harmony import */ var avutil_util_crypto__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avutil/util/crypto */ "./src/avutil/util/crypto.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_pixel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/util/pixel */ "./src/avutil/util/pixel.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_util_string__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! common/util/string */ "./src/common/util/string.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../bsf/h2645/Annexb2AvccFilter */ "./src/avformat/bsf/h2645/Annexb2AvccFilter.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/codecs/h264 */ "./src/avutil/codecs/h264.ts");
/* harmony import */ var avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! avutil/codecs/hevc */ "./src/avutil/codecs/hevc.ts");
/* harmony import */ var avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! avutil/codecs/vvc */ "./src/avutil/codecs/vvc.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\OMatroskaFormat.ts";

























const defaultOMatroskaFormatOptions = {
    isLive: false,
    docType: 'matroska'
};
function formatTimestamp(milliseconds) {
    const hours = milliseconds / BigInt(3600000);
    const remainingMilliseconds = milliseconds % BigInt(3600000);
    const minutes = remainingMilliseconds / BigInt(60000);
    const remainingMillisecondsAfterMinutes = remainingMilliseconds % BigInt(60000);
    const seconds = remainingMillisecondsAfterMinutes / BigInt(1000);
    const ms = remainingMillisecondsAfterMinutes % BigInt(1000);
    return common_util_string__WEBPACK_IMPORTED_MODULE_16__.format('%02d:%02d:%02d.%03d000000\x00\x00', Number(BigInt.asIntN(32, hours)), Number(BigInt.asIntN(32, minutes)), Number(BigInt.asIntN(32, seconds)), Number(BigInt.asIntN(32, ms)));
}
class OMatroskaFormat extends _OFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 8 /* AVFormat.MATROSKA */;
    options;
    context;
    random;
    randomView;
    avpacket;
    annexb2AvccFilter;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_8__.extend({}, defaultOMatroskaFormatOptions, options);
        this.random = new Uint8Array(8);
        this.randomView = new DataView(this.random.buffer);
    }
    init(formatContext) {
        formatContext.ioWriter.setEndian(false);
        this.avpacket = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.createAVPacket)();
        const context = {
            isLive: this.options.isLive,
            segmentStart: -BigInt(1),
            seekHeadEnd: -BigInt(1),
            header: {
                version: 1,
                readVersion: 1,
                maxIdLength: 4,
                maxSizeLength: 8,
                docType: this.options.docType,
                docTypeVersion: 4,
                docTypeReadVersion: 2
            },
            seekHead: {
                entry: []
            },
            info: {
                muxingApp: "v0.9.0-29-gc2ccb944",
                writingApp: "v0.9.0-29-gc2ccb944",
                timestampScale: 1000000,
                duration: 0,
                segmentUUID: -BigInt(1)
            },
            tracks: {
                entry: []
            },
            attachments: {
                entry: []
            },
            chapters: {
                entry: []
            },
            cues: {
                entry: []
            },
            tags: {
                entry: [
                    {
                        tag: {
                            name: 'ENCODER',
                            string: "v0.9.0-29-gc2ccb944"
                        }
                    }
                ]
            },
            elePositionInfos: [],
            eleCaches: [],
            eleWriter: new common_io_IOWriterSync__WEBPACK_IMPORTED_MODULE_9__["default"](),
            currentCluster: {
                timeCode: -BigInt(1),
                pos: -BigInt(1)
            },
            hasVideo: false
        };
        if (context.header.docType === 'webm') {
            context.header.docTypeVersion = 2;
            context.header.docTypeReadVersion = 2;
        }
        context.eleWriter.onFlush = (data) => {
            context.eleCaches.push(data.slice());
            return 0;
        };
        avutil_util_crypto__WEBPACK_IMPORTED_MODULE_12__.random(this.random);
        context.info.segmentUUID = this.randomView.getBigUint64(0);
        formatContext.privateData = this.context = context;
        const tag2CodecId = this.context.header.docType === 'webm' ? _matroska_matroska__WEBPACK_IMPORTED_MODULE_11__.WebmTag2CodecId : _matroska_matroska__WEBPACK_IMPORTED_MODULE_11__.MkvTag2CodecId;
        function codecId2Tag(codecpar) {
            let tag = '';
            common_util_object__WEBPACK_IMPORTED_MODULE_8__.each(tag2CodecId, (id, t) => {
                if (id === codecpar.codecId) {
                    tag = t;
                }
            });
            if (codecpar.codecId === 65559 /* AVCodecID.AV_CODEC_ID_PCM_F64LE */
                || codecpar.codecId === 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */) {
                tag = 'A_PCM/FLOAT/IEEE';
            }
            if (codecpar.codecId === 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */
                || codecpar.codecId === 65549 /* AVCodecID.AV_CODEC_ID_PCM_S24BE */
                || codecpar.codecId === 65545 /* AVCodecID.AV_CODEC_ID_PCM_S32BE */) {
                tag = 'A_PCM/INT/BIG';
            }
            if (codecpar.codecId === 65541 /* AVCodecID.AV_CODEC_ID_PCM_U8 */
                || codecpar.codecId === 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */
                || codecpar.codecId === 65548 /* AVCodecID.AV_CODEC_ID_PCM_S24LE */
                || codecpar.codecId === 65544 /* AVCodecID.AV_CODEC_ID_PCM_S32LE */) {
                tag = 'A_PCM/INT/LIT';
            }
            return tag;
        }
        let notSupport = false;
        formatContext.streams.forEach((stream) => {
            if (stream.codecpar.codecType === 4 /* AVMediaType.AVMEDIA_TYPE_ATTACHMENT */) {
                avutil_util_crypto__WEBPACK_IMPORTED_MODULE_12__.random(this.random);
                context.attachments.entry.push({
                    uid: this.randomView.getBigUint64(0),
                    name: stream.metadata["title" /* AVStreamMetadataKey.TITLE */] || 'unknown',
                    mime: stream.metadata["mime" /* AVStreamMetadataKey.MIME */] || 'unknown',
                    data: {
                        data: (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_13__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize),
                        size: BigInt(stream.codecpar.extradataSize >> 0),
                        pos: -BigInt(1)
                    },
                    description: stream.metadata["description" /* AVStreamMetadataKey.DESCRIPTION */] || 'unknown'
                });
            }
            else {
                const track = {};
                avutil_util_crypto__WEBPACK_IMPORTED_MODULE_12__.random(this.random);
                track.uid = this.randomView.getBigUint64(0);
                track.codecId = codecId2Tag(stream.codecpar);
                if (!track.codecId) {
                    notSupport = true;
                    common_util_logger__WEBPACK_IMPORTED_MODULE_5__.error(`codecId ${stream.codecpar.codecId} not support in ${this.options.docType}`, cheap__fileName__0, 244);
                    return;
                }
                track.number = stream.index + 1;
                if (stream.codecpar.extradata) {
                    track.codecPrivate = {
                        data: (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_13__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize).slice(),
                        pos: -BigInt(1),
                        size: BigInt(stream.codecpar.extradataSize >> 0)
                    };
                }
                if (stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */]) {
                    track.language = stream.metadata["language" /* AVStreamMetadataKey.LANGUAGE */];
                }
                if (stream.metadata["title" /* AVStreamMetadataKey.TITLE */]) {
                    track.name = stream.metadata["title" /* AVStreamMetadataKey.TITLE */];
                }
                switch (stream.codecpar.codecType) {
                    case 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */: {
                        track.type = 2 /* MATROSKATrackType.AUDIO */;
                        track.audio = {
                            channels: stream.codecpar.chLayout.nbChannels,
                            sampleRate: stream.codecpar.sampleRate,
                            bitDepth: stream.codecpar.bitsPerRawSample
                        };
                        break;
                    }
                    case 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */: {
                        context.hasVideo = true;
                        track.type = 1 /* MATROSKATrackType.VIDEO */;
                        track.video = {
                            pixelWidth: stream.codecpar.width,
                            pixelHeight: stream.codecpar.height,
                            color: {
                                matrixCoefficients: stream.codecpar.colorSpace,
                                primaries: stream.codecpar.colorPrimaries,
                                transferCharacteristics: stream.codecpar.colorTrc,
                                range: stream.codecpar.colorRange
                            }
                        };
                        const result = (0,avutil_util_pixel__WEBPACK_IMPORTED_MODULE_14__.chromaLocation2Pos)(stream.codecpar.chromaLocation);
                        if (result) {
                            track.video.color.chromaSitingVert = (result.x >>> 7) + 1;
                            track.video.color.chromaSitingHorz = (result.y >>> 7) + 1;
                        }
                        if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                            || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                            || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                            if (track.codecPrivate) {
                                if (avutil_util_nalu__WEBPACK_IMPORTED_MODULE_19__.isAnnexb(track.codecPrivate.data)) {
                                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                                        track.codecPrivate.data = avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_20__.annexbExtradata2AvccExtradata(track.codecPrivate.data);
                                    }
                                    else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                                        track.codecPrivate.data = avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_21__.annexbExtradata2AvccExtradata(track.codecPrivate.data);
                                    }
                                    else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                                        track.codecPrivate.data = avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_22__.annexbExtradata2AvccExtradata(track.codecPrivate.data);
                                    }
                                    track.codecPrivate.size = BigInt(Math.floor(track.codecPrivate.data.length));
                                }
                            }
                            this.annexb2AvccFilter = new _bsf_h2645_Annexb2AvccFilter__WEBPACK_IMPORTED_MODULE_18__["default"]();
                            this.annexb2AvccFilter.init(stream.codecpar[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress], stream.timeBase[cheap_symbol__WEBPACK_IMPORTED_MODULE_0__.symbolStructAddress]);
                        }
                        break;
                    }
                    case 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */: {
                        track.type = 17 /* MATROSKATrackType.SUBTITLE */;
                        break;
                    }
                }
                track.lastPts = BigInt(0);
                stream.privData = track;
                context.tracks.entry.push(track);
            }
        });
        if (notSupport) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_24__.CODEC_NOT_SUPPORT;
        }
        return 0;
    }
    async destroy(formatContext) {
        if (this.annexb2AvccFilter) {
            this.annexb2AvccFilter.destroy();
            this.annexb2AvccFilter = null;
        }
        if (this.avpacket) {
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.destroyAVPacket)(this.avpacket);
            this.avpacket = 0;
        }
    }
    writeHeader(formatContext) {
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeHeader(formatContext.ioWriter, this.context, this.context.header);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlId(formatContext.ioWriter, 408125543 /* EBMLId.SEGMENT */);
        const now = formatContext.ioWriter.getPos();
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlLengthUnknown(formatContext.ioWriter, 8);
        this.context.elePositionInfos.push({
            pos: now,
            length: 0,
            bytes: 8
        });
        this.context.segmentStart = formatContext.ioWriter.getPos();
        // SeekHead 占位
        formatContext.ioWriter.skip(96);
        this.context.seekHeadEnd = formatContext.ioWriter.getPos();
        return 0;
    }
    writeBlock(stream, avpacket, id = 163 /* EBMLId.SIMPLE_BLOCK */) {
        const track = stream.privData;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlId(this.context.eleWriter, id);
        if ((stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
            || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
            || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) && (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 64 /* AVPacketFlags.AV_PKT_FLAG_H26X_ANNEXB */)) {
            this.annexb2AvccFilter.sendAVPacket(avpacket);
            this.annexb2AvccFilter.receiveAVPacket(this.avpacket);
            avpacket = this.avpacket;
        }
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlLength(this.context.eleWriter, _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.ebmlLengthSize(track.number) + 2 + 1 + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28));
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlNum(this.context.eleWriter, track.number, _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.ebmlLengthSize(track.number));
        const pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
        this.context.eleWriter.writeInt16(Number(BigInt.asIntN(32, pts - this.context.currentCluster.timeCode)));
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */ || stream.codecpar.codecType !== 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            this.context.eleWriter.writeUint8(0x80);
        }
        else {
            this.context.eleWriter.writeUint8(0x00);
        }
        if (!track.codecPrivate) {
            let element = (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.getAVPacketSideData)(avpacket, 1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */);
            if (element) {
                track.codecPrivate = {
                    data: (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_13__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](element), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[25](element + 4)).slice(),
                    pos: -BigInt(1),
                    size: BigInt(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[25](element + 4))
                };
            }
        }
        this.context.eleWriter.writeBuffer((0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.getAVPacketData)(avpacket));
    }
    writeBlockGroup(stream, avpacket) {
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEleData(this.context.eleWriter, this.context, 160 /* EBMLId.BLOCK_GROUP */, (eleWriter) => {
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48) > 0) {
                _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlUint(eleWriter, 155 /* EBMLId.BLOCK_DURATION */, (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q));
            }
            const additions = [];
            for (let i = 0; i < cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 44); i++) {
                if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 8) === 15 /* AVPacketSideDataType.AV_PKT_DATA_MATROSKA_BLOCKADDITIONAL */) {
                    additions.push({
                        additionalId: avutil_util_intread__WEBPACK_IMPORTED_MODULE_23__.rb64(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12)),
                        buffer: (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_13__.mapUint8Array)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12) + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[25](cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[20](avpacket + 40) + i * 12 + 4) - 8)
                    });
                }
            }
            if (additions.length) {
                _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEleData(this.context.eleWriter, this.context, 30113 /* EBMLId.BLOCK_ADDITIONS */, (eleWriter) => {
                    _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEleData(eleWriter, this.context, 166 /* EBMLId.BLOCK_MORE */, (eleWriter) => {
                        additions.forEach((addition) => {
                            _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlUint(eleWriter, 238 /* EBMLId.BLOCK_ADD_ID */, addition.additionalId);
                            _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlBuffer(eleWriter, 30113 /* EBMLId.BLOCK_ADDITIONS */, addition.buffer);
                        });
                    });
                });
            }
            if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                && !(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)) {
                const track = stream.privData;
                _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlSint(eleWriter, 251 /* EBMLId.BLOCK_REFERENCE */, track.lastPts - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8));
            }
            this.writeBlock(stream, avpacket, 161 /* EBMLId.BLOCK */);
        });
    }
    writeCluster(formatContext) {
        if (this.context.currentCluster.pos === -BigInt(1)) {
            return;
        }
        formatContext.ioWriter.flush();
        this.context.eleWriter.flush();
        let block = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_17__["default"])(Uint8Array, this.context.eleCaches);
        if (!block.length) {
            return;
        }
        this.context.eleCaches.length = 0;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlUint(this.context.eleWriter, 231 /* EBMLId.CLUSTER_TIME_CODE */, this.context.currentCluster.timeCode);
        this.context.eleWriter.flush();
        block = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_17__["default"])(Uint8Array, [...this.context.eleCaches, block]);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlId(formatContext.ioWriter, 524531317 /* EBMLId.CLUSTER */);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlLength(formatContext.ioWriter, block.length);
        formatContext.ioWriter.writeBuffer(block);
        formatContext.ioWriter.flush();
        this.context.eleCaches.length = 0;
    }
    writeAVPacket(formatContext, avpacket) {
        if (!cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 28)) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_5__.warn(`packet\'s size is 0: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 469);
            return 0;
        }
        const stream = formatContext.getStreamByIndex(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32));
        if (!stream) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_5__.warn(`can not found the stream width the avpacket\'s streamIndex: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 32)}, ignore it`, cheap__fileName__0, 476);
            return;
        }
        const track = stream.privData;
        const pts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8) : cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 16), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
        if (!track.maxPts || track.maxPts < pts) {
            track.maxPts = pts;
            track.duration = pts;
            if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48) !== avutil_constant__WEBPACK_IMPORTED_MODULE_15__.NOPTS_VALUE_BIGINT) {
                track.duration += (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_6__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_15__.AV_MILLI_TIME_BASE_Q);
            }
        }
        if (this.options.isLive
            || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[15](avpacket + 36) & 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */)
                && (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */
                    || !this.context.hasVideo
                        && (pts - this.context.currentCluster.timeCode > BigInt(5000)))) {
            this.writeCluster(formatContext);
            this.context.currentCluster.timeCode = pts;
            this.context.currentCluster.pos = formatContext.ioWriter.getPos() - this.context.segmentStart;
            this.context.cues.entry.push({
                time: this.context.currentCluster.timeCode,
                pos: [{
                        pos: this.context.currentCluster.pos,
                        track: track.number
                    }]
            });
        }
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 48) > 0
            || (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.hasAVPacketSideData)(avpacket, 15 /* AVPacketSideDataType.AV_PKT_DATA_MATROSKA_BLOCKADDITIONAL */)) {
            this.writeBlockGroup(stream, avpacket);
        }
        else {
            this.writeBlock(stream, avpacket);
        }
        track.lastPts = cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumRead[17](avpacket + 8);
        return 0;
    }
    writeTrailer(formatContext) {
        this.writeCluster(formatContext);
        formatContext.streams.forEach((stream) => {
            const track = stream.privData;
            if (!this.options.isLive && track?.duration) {
                const duration = track.duration;
                this.context.info.duration = Number(BigInt.asIntN(32, duration));
                this.context.tags.entry.push({
                    tag: {
                        name: 'DURATION',
                        string: formatTimestamp(duration)
                    },
                    target: {
                        trackUid: track.uid
                    }
                });
            }
        });
        formatContext.ioWriter.flush();
        this.context.eleWriter.flush();
        this.context.eleCaches.length = 0;
        this.context.eleWriter.reset();
        const now = formatContext.ioWriter.getPos();
        let segmentLength = now - this.context.segmentStart;
        this.context.seekHead.entry.push({
            id: 357149030 /* EBMLId.INFO */,
            pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
        });
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeInfo(this.context.eleWriter, this.context, this.context.info);
        this.context.seekHead.entry.push({
            id: 374648427 /* EBMLId.TRACKS */,
            pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
        });
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeTracks(this.context.eleWriter, this.context, this.context.tracks);
        this.context.seekHead.entry.push({
            id: 307544935 /* EBMLId.TAGS */,
            pos: this.context.eleWriter.getPos() + this.context.seekHeadEnd - this.context.segmentStart
        });
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeTags(this.context.eleWriter, this.context, this.context.tags);
        this.context.eleWriter.flush();
        const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_17__["default"])(Uint8Array, this.context.eleCaches);
        formatContext.ioWriter.onFlush(buffer, this.context.seekHeadEnd);
        segmentLength += BigInt(Math.floor(buffer.length));
        this.context.cues.entry.forEach((cue) => {
            cue.pos.forEach((item) => {
                item.pos += BigInt(Math.floor(buffer.length));
            });
        });
        if (this.context.cues.entry.length) {
            this.context.seekHead.entry.push({
                id: 475249515 /* EBMLId.CUES */,
                pos: formatContext.ioWriter.getPos() - this.context.segmentStart + BigInt(Math.floor(buffer.length))
            });
            _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeCues(formatContext.ioWriter, this.context, this.context.cues);
        }
        if (this.context.attachments.entry.length) {
            this.context.seekHead.entry.push({
                id: 423732329 /* EBMLId.ATTACHMENTS */,
                pos: formatContext.ioWriter.getPos() - this.context.segmentStart + BigInt(Math.floor(buffer.length))
            });
            _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeAttachments(formatContext.ioWriter, this.context, this.context.attachments);
        }
        formatContext.ioWriter.flush();
        segmentLength += formatContext.ioWriter.getPos() - now;
        formatContext.ioWriter.seek(this.context.segmentStart);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeSeekHeader(formatContext.ioWriter, this.context, this.context.seekHead);
        const seekHeadLen = formatContext.ioWriter.getPos() - this.context.segmentStart;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlId(formatContext.ioWriter, 236 /* EBMLId.VOID */);
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.writeEbmlLength(formatContext.ioWriter, this.context.seekHeadEnd - this.context.segmentStart - seekHeadLen - BigInt(2), 1);
        formatContext.ioWriter.flush();
        this.context.elePositionInfos[0].length = segmentLength;
        _matroska_omatroska__WEBPACK_IMPORTED_MODULE_10__.updatePositionSize(formatContext.ioWriter, this.context);
        this.context.eleCaches.length = 0;
        return 0;
    }
    flush(formatContext) {
        formatContext.ioWriter.flush();
        this.context.currentCluster.timeCode = -BigInt(1);
        this.context.currentCluster.pos = -BigInt(1);
        return 0;
    }
}


/***/ }),

/***/ "./src/avformat/formats/matroska/matroska.ts":
/*!***************************************************!*\
  !*** ./src/avformat/formats/matroska/matroska.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MkvTag2CodecId: () => (/* binding */ MkvTag2CodecId),
/* harmony export */   WebmTag2CodecId: () => (/* binding */ WebmTag2CodecId)
/* harmony export */ });
/*
 * libmedia matroska defined
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
const MkvTag2CodecId = {
    'A_AAC': 86018 /* AVCodecID.AV_CODEC_ID_AAC */,
    'A_AC3': 86019 /* AVCodecID.AV_CODEC_ID_AC3 */,
    'A_ALAC': 86032 /* AVCodecID.AV_CODEC_ID_ALAC */,
    'A_DTS': 86020 /* AVCodecID.AV_CODEC_ID_DTS */,
    'A_EAC3': 86056 /* AVCodecID.AV_CODEC_ID_EAC3 */,
    'A_FLAC': 86028 /* AVCodecID.AV_CODEC_ID_FLAC */,
    'A_MLP': 86045 /* AVCodecID.AV_CODEC_ID_MLP */,
    'A_MPEG/L2': 86016 /* AVCodecID.AV_CODEC_ID_MP2 */,
    'A_MPEG/L1': 86058 /* AVCodecID.AV_CODEC_ID_MP1 */,
    'A_MPEG/L3': 86017 /* AVCodecID.AV_CODEC_ID_MP3 */,
    'A_OPUS': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'A_OPUS/EXPERIMENTAL': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'A_PCM/FLOAT/IEEE': 65557 /* AVCodecID.AV_CODEC_ID_PCM_F32LE */,
    'A_PCM/INT/BIG': 65537 /* AVCodecID.AV_CODEC_ID_PCM_S16BE */,
    'A_PCM/INT/LIT': 65536 /* AVCodecID.AV_CODEC_ID_PCM_S16LE */,
    'A_QUICKTIME/QDMC': 86066 /* AVCodecID.AV_CODEC_ID_QDMC */,
    'A_QUICKTIME/QDM2': 86035 /* AVCodecID.AV_CODEC_ID_QDM2 */,
    'A_REAL/14_4': 77824 /* AVCodecID.AV_CODEC_ID_RA_144 */,
    'A_REAL/28_8': 77825 /* AVCodecID.AV_CODEC_ID_RA_288 */,
    'A_REAL/ATRC': 86047 /* AVCodecID.AV_CODEC_ID_ATRAC3 */,
    'A_REAL/COOK': 86036 /* AVCodecID.AV_CODEC_ID_COOK */,
    'A_REAL/SIPR': 86057 /* AVCodecID.AV_CODEC_ID_SIPR */,
    'A_TRUEHD': 86060 /* AVCodecID.AV_CODEC_ID_TRUEHD */,
    'A_TTA1': 86038 /* AVCodecID.AV_CODEC_ID_TTA */,
    'A_VORBIS': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'A_WAVPACK4': 86041 /* AVCodecID.AV_CODEC_ID_WAVPACK */,
    'D_WEBVTT/SUBTITLES': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/CAPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/DESCRIPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/METADATA': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'S_TEXT/UTF8': 94225 /* AVCodecID.AV_CODEC_ID_SUBRIP */,
    'S_TEXT/ASCII': 94210 /* AVCodecID.AV_CODEC_ID_TEXT */,
    'S_TEXT/ASS': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_TEXT/SSA': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_ASS': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_SSA': 94230 /* AVCodecID.AV_CODEC_ID_ASS */,
    'S_VOBSUB': 94208 /* AVCodecID.AV_CODEC_ID_DVD_SUBTITLE */,
    'S_DVBSUB': 94209 /* AVCodecID.AV_CODEC_ID_DVB_SUBTITLE */,
    'S_HDMV/PGS': 94214 /* AVCodecID.AV_CODEC_ID_HDMV_PGS_SUBTITLE */,
    'S_HDMV/TEXTST': 94231 /* AVCodecID.AV_CODEC_ID_HDMV_TEXT_SUBTITLE */,
    'V_AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'V_DIRAC': 116 /* AVCodecID.AV_CODEC_ID_DIRAC */,
    'V_FFV1': 33 /* AVCodecID.AV_CODEC_ID_FFV1 */,
    'V_MJPEG': 7 /* AVCodecID.AV_CODEC_ID_MJPEG */,
    'V_MPEG1': 1 /* AVCodecID.AV_CODEC_ID_MPEG1VIDEO */,
    'V_MPEG2': 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */,
    'V_MPEG4/ISO/ASP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/AP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/SP': 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */,
    'V_MPEG4/ISO/AVC': 27 /* AVCodecID.AV_CODEC_ID_H264 */,
    'V_MPEGH/ISO/HEVC': 173 /* AVCodecID.AV_CODEC_ID_HEVC */,
    'V_MPEGH/ISO/VVC': 196 /* AVCodecID.AV_CODEC_ID_VVC */,
    'V_MPEG4/MS/V3': 16 /* AVCodecID.AV_CODEC_ID_MSMPEG4V3 */,
    'V_PRORES': 147 /* AVCodecID.AV_CODEC_ID_PRORES */,
    'V_REAL/RV10': 5 /* AVCodecID.AV_CODEC_ID_RV10 */,
    'V_REAL/RV20': 6 /* AVCodecID.AV_CODEC_ID_RV20 */,
    'V_REAL/RV30': 68 /* AVCodecID.AV_CODEC_ID_RV30 */,
    'V_REAL/RV40': 69 /* AVCodecID.AV_CODEC_ID_RV40 */,
    'V_SNOW': 208 /* AVCodecID.AV_CODEC_ID_SNOW */,
    'V_THEORA': 30 /* AVCodecID.AV_CODEC_ID_THEORA */,
    'V_UNCOMPRESSED': 13 /* AVCodecID.AV_CODEC_ID_RAWVIDEO */,
    'V_VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'V_VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */
};
const WebmTag2CodecId = {
    'V_VP8': 139 /* AVCodecID.AV_CODEC_ID_VP8 */,
    'V_VP9': 167 /* AVCodecID.AV_CODEC_ID_VP9 */,
    'V_AV1': 225 /* AVCodecID.AV_CODEC_ID_AV1 */,
    'A_VORBIS': 86021 /* AVCodecID.AV_CODEC_ID_VORBIS */,
    'A_OPUS': 86076 /* AVCodecID.AV_CODEC_ID_OPUS */,
    'D_WEBVTT/SUBTITLES': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/CAPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/DESCRIPTIONS': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
    'D_WEBVTT/METADATA': 94226 /* AVCodecID.AV_CODEC_ID_WEBVTT */,
};


/***/ }),

/***/ "./src/avformat/formats/matroska/omatroska.ts":
/*!****************************************************!*\
  !*** ./src/avformat/formats/matroska/omatroska.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ebmlLengthSize: () => (/* binding */ ebmlLengthSize),
/* harmony export */   updatePositionSize: () => (/* binding */ updatePositionSize),
/* harmony export */   writeAttachments: () => (/* binding */ writeAttachments),
/* harmony export */   writeCues: () => (/* binding */ writeCues),
/* harmony export */   writeEbmlBuffer: () => (/* binding */ writeEbmlBuffer),
/* harmony export */   writeEbmlId: () => (/* binding */ writeEbmlId),
/* harmony export */   writeEbmlLength: () => (/* binding */ writeEbmlLength),
/* harmony export */   writeEbmlLengthUnknown: () => (/* binding */ writeEbmlLengthUnknown),
/* harmony export */   writeEbmlNum: () => (/* binding */ writeEbmlNum),
/* harmony export */   writeEbmlSint: () => (/* binding */ writeEbmlSint),
/* harmony export */   writeEbmlUint: () => (/* binding */ writeEbmlUint),
/* harmony export */   writeEleData: () => (/* binding */ writeEleData),
/* harmony export */   writeHeader: () => (/* binding */ writeHeader),
/* harmony export */   writeInfo: () => (/* binding */ writeInfo),
/* harmony export */   writeSeekHeader: () => (/* binding */ writeSeekHeader),
/* harmony export */   writeTags: () => (/* binding */ writeTags),
/* harmony export */   writeTracks: () => (/* binding */ writeTracks)
/* harmony export */ });
/* unused harmony exports ebmlIdSize, ebmlNumSize, writeEbmlUid, writeEbmlFloat, writeEbmlDouble, writeEbmlString, writeEbmlVoid, writeSeekHeaderEntry, writeVideoColor, writeVideoTrack, writeAudioTrack, writeTrack, writeTagTag, writeTagTarget, writeTag, writeCuePosition, writeCue, writeChapterAtomDisplay, writeChapterAtom, writeChapter, writeChapters, writeAttachment */
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var common_util_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common/util/text */ "./src/common/util/text.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/*
 * libmedia matroska encoder util
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





function ebmlIdSize(id) {
    return Math.floor((Math.log2(id) + 7) / 8);
}
function ebmlNumSize(value) {
    let bytes = 0;
    do {
        bytes++;
        // @ts-ignore
    } while (value >>= (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value) ? BigInt(7) : 7));
    return bytes;
}
function ebmlLengthSize(value) {
    return common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value) ? ebmlNumSize(value + BigInt(1)) : ebmlNumSize(value + 1);
}
function writeEbmlNum(writer, value, bytes) {
    if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value)) {
        value |= (BigInt(1) << BigInt(bytes * 7));
        for (let i = bytes - 1; i >= 0; i--) {
            writer.writeUint8(Number((value >> BigInt(i * 8)) & BigInt(0xff)));
        }
    }
    else {
        value |= (1 << bytes * 7);
        for (let i = bytes - 1; i >= 0; i--) {
            writer.writeUint8((value >> (i * 8)) & 0xff);
        }
    }
}
function writeEbmlId(writer, id) {
    let len = ebmlIdSize(id);
    while (len--) {
        writer.writeUint8(id >> (len * 8));
    }
}
function writeEbmlLength(writer, length, bytes = 0) {
    let need = ebmlLengthSize(length);
    if (bytes === 0) {
        bytes = need;
    }
    writeEbmlNum(writer, length, bytes);
}
function writeEbmlLengthUnknown(writer, bytes) {
    writer.writeUint8(0x1ff >> bytes);
    for (let i = 0; i < bytes - 1; i++) {
        writer.writeUint8(0xff);
    }
}
function writeEbmlUid(writer, id, uid) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, 8);
    writer.writeUint64(uid);
}
function writeEbmlUint(writer, id, value) {
    let bytes = 1;
    let tmp = value;
    if (common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(tmp)) {
        while (tmp >>= BigInt(8)) {
            bytes++;
        }
    }
    else {
        while (tmp >>= 8) {
            bytes++;
        }
    }
    writeEbmlId(writer, id);
    writeEbmlLength(writer, bytes);
    for (let i = bytes - 1; i >= 0; i--) {
        writer.writeUint8(common_util_is__WEBPACK_IMPORTED_MODULE_0__.bigint(value) ? Number(value >> BigInt(i * 8)) : (value >> i * 8));
    }
}
function writeEbmlSint(writer, id, value) {
    let bytes = 0;
    if (value) {
        let bitLength = value < 0 ? (~value).toString(2).length : value.toString(2).length;
        bytes = Math.ceil((bitLength + 1) / 8);
    }
    writeEbmlId(writer, id);
    writeEbmlLength(writer, bytes);
    switch (bytes) {
        case 0:
            return;
        case 1:
            writer.writeInt8(Number(value));
            return;
        case 2:
            writer.writeInt16(Number(value));
            return;
        case 3:
            writer.writeInt24(Number(value));
            return;
        case 4:
            writer.writeInt32(Number(value));
            return;
    }
    value = BigInt.asUintN(bytes * 8, BigInt(value));
    for (let i = bytes - 1; i >= 0; i--) {
        writer.writeUint8(Number(value >> BigInt(i * 8)));
    }
}
function writeEbmlFloat(writer, id, value) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, 4);
    writer.writeFloat(value);
}
function writeEbmlDouble(writer, id, value) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, 8);
    writer.writeDouble(value);
}
function writeEbmlBuffer(writer, id, value) {
    writeEbmlId(writer, id);
    writeEbmlLength(writer, value.length);
    writer.writeBuffer(value);
}
function writeEbmlString(writer, id, value) {
    const buffer = common_util_text__WEBPACK_IMPORTED_MODULE_1__.encode(value);
    writeEbmlBuffer(writer, id, buffer);
}
function writeEbmlVoid(writer, size) {
    writeEbmlId(writer, 236 /* EBMLId.VOID */);
    if (size < 10) {
        size -= 2;
        writeEbmlLength(writer, size);
    }
    else {
        size -= 9;
        writeEbmlLength(writer, size, 8);
    }
    writer.writeBuffer(new Uint8Array(size).fill(0));
}
function updatePositionSize(ioWriter, context) {
    const pos = ioWriter.getPos();
    const pointer = ioWriter.getPointer();
    const minPos = pos - BigInt(Math.floor(pointer));
    const seeks = [];
    common_util_array__WEBPACK_IMPORTED_MODULE_3__.each(context.elePositionInfos, (item) => {
        if (item.pos < pos && item.pos >= minPos) {
            ioWriter.seekInline(pointer + Number(item.pos - pos));
            writeEbmlLength(ioWriter, item.length, item.bytes);
        }
        else {
            seeks.push(item);
        }
    });
    common_util_array__WEBPACK_IMPORTED_MODULE_3__.each(seeks, (item) => {
        ioWriter.seek(item.pos);
        writeEbmlLength(ioWriter, item.length, item.bytes);
    });
    if (seeks.length) {
        ioWriter.seek(pos);
    }
    else {
        ioWriter.seekInline(pointer);
    }
    ioWriter.flush();
    context.elePositionInfos = [];
}
function writeEleData(writer, context, id, data) {
    context.eleWriter.flush();
    const oldCache = context.eleCaches;
    context.eleCaches = [];
    data(context.eleWriter);
    context.eleWriter.flush();
    const buffer = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_2__["default"])(Uint8Array, context.eleCaches);
    context.eleCaches = oldCache;
    writeEbmlBuffer(writer, id, buffer);
}
function writeHeader(writer, context, header) {
    writeEleData(writer, context, 440786851 /* EBMLId.HEADER */, (eleWriter) => {
        writeEbmlUint(eleWriter, 17030 /* EBMLId.EBML_VERSION */, header.version);
        writeEbmlUint(eleWriter, 17143 /* EBMLId.EBML_READ_VERSION */, header.readVersion);
        writeEbmlUint(eleWriter, 17138 /* EBMLId.EBML_MAX_ID_LENGTH */, header.maxIdLength);
        writeEbmlUint(eleWriter, 17139 /* EBMLId.EBML_MAX_SIZE_LENGTH */, header.maxSizeLength);
        writeEbmlString(eleWriter, 17026 /* EBMLId.DOCTYPE */, header.docType);
        writeEbmlUint(eleWriter, 17031 /* EBMLId.DOC_TYPE_VERSION */, header.docTypeVersion);
        writeEbmlUint(eleWriter, 17029 /* EBMLId.DOC_TYPE_READ_VERSION */, header.docTypeReadVersion);
    });
}
function writeSeekHeaderEntry(writer, context, entry) {
    writeEleData(writer, context, 19899 /* EBMLId.SEEK_ENTRY */, (eleWriter) => {
        writeEbmlUint(eleWriter, 21419 /* EBMLId.SEEK_ID */, entry.id);
        writeEbmlUint(eleWriter, 21420 /* EBMLId.SEEK_POSITION */, entry.pos);
    });
}
function writeSeekHeader(writer, context, header) {
    writeEleData(writer, context, 290298740 /* EBMLId.SEEK_HEAD */, (eleWriter) => {
        header.entry.forEach((entry) => {
            writeSeekHeaderEntry(eleWriter, context, entry);
        });
    });
}
function writeInfo(writer, context, info) {
    writeEleData(writer, context, 357149030 /* EBMLId.INFO */, (eleWriter) => {
        writeEbmlUid(eleWriter, 29604 /* EBMLId.SEGMENT_UID */, info.segmentUUID);
        writeEbmlUint(eleWriter, 2807729 /* EBMLId.TIME_CODE_SCALE */, info.timestampScale);
        writeEbmlDouble(eleWriter, 17545 /* EBMLId.DURATION */, info.duration);
        writeEbmlString(eleWriter, 19840 /* EBMLId.MUXING_APP */, info.muxingApp);
        writeEbmlString(eleWriter, 22337 /* EBMLId.WRITING_APP */, info.writingApp);
    });
}
function writeVideoColor(writer, context, color) {
    writeEleData(writer, context, 21936 /* EBMLId.VIDEO_COLOR */, (eleWriter) => {
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'matrixCoefficients')) {
            writeEbmlUint(eleWriter, 21937 /* EBMLId.VIDEO_COLOR_MATRIX_COEFF */, color.matrixCoefficients);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'primaries')) {
            writeEbmlUint(eleWriter, 21947 /* EBMLId.VIDEO_COLOR_PRIMARIES */, color.primaries);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'transferCharacteristics')) {
            writeEbmlUint(eleWriter, 21946 /* EBMLId.VIDEO_COLOR_TRANSFER_CHARACTERISTICS */, color.transferCharacteristics);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'range')) {
            writeEbmlUint(eleWriter, 21945 /* EBMLId.VIDEO_COLOR_RANGE */, color.range);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'chromaSitingVert')) {
            writeEbmlUint(eleWriter, 21944 /* EBMLId.VIDEO_COLOR_CHROMA_SITING_VERT */, color.chromaSitingVert);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(color, 'chromaSitingHorz')) {
            writeEbmlUint(eleWriter, 21943 /* EBMLId.VIDEO_COLOR_CHROMA_SITING_HORZ */, color.chromaSitingHorz);
        }
    });
}
function writeVideoTrack(writer, context, video) {
    writeEleData(writer, context, 224 /* EBMLId.TRACK_VIDEO */, (eleWriter) => {
        writeEbmlUint(eleWriter, 176 /* EBMLId.VIDEO_PIXEL_WIDTH */, video.pixelWidth);
        writeEbmlUint(eleWriter, 186 /* EBMLId.VIDEO_PIXEL_HEIGHT */, video.pixelHeight);
        if (video.color) {
            writeVideoColor(eleWriter, context, video.color);
        }
    });
}
function writeAudioTrack(writer, context, audio) {
    writeEleData(writer, context, 225 /* EBMLId.TRACK_AUDIO */, (eleWriter) => {
        writeEbmlDouble(eleWriter, 181 /* EBMLId.AUDIO_SAMPLING_FREQ */, audio.sampleRate);
        if (audio.outSampleRate) {
            writeEbmlDouble(eleWriter, 181 /* EBMLId.AUDIO_SAMPLING_FREQ */, audio.outSampleRate);
        }
        writeEbmlUint(eleWriter, 25188 /* EBMLId.AUDIO_BITDEPTH */, audio.bitDepth);
        writeEbmlUint(eleWriter, 159 /* EBMLId.AUDIO_CHANNELS */, audio.channels);
    });
}
function writeTrack(writer, context, track) {
    writeEleData(writer, context, 174 /* EBMLId.TRACK_ENTRY */, (eleWriter) => {
        writeEbmlUint(eleWriter, 215 /* EBMLId.TRACK_NUMBER */, track.number);
        writeEbmlUid(eleWriter, 29637 /* EBMLId.TRACK_UID */, track.uid);
        writeEbmlUint(eleWriter, 131 /* EBMLId.TRACK_TYPE */, track.type);
        if (track.language) {
            writeEbmlString(eleWriter, 21358 /* EBMLId.TRACK_NAME */, track.language);
        }
        if (track.name) {
            writeEbmlString(eleWriter, 21358 /* EBMLId.TRACK_NAME */, track.name);
        }
        writeEbmlString(eleWriter, 134 /* EBMLId.CODEC_ID */, track.codecId);
        if (track.codecPrivate) {
            writeEbmlBuffer(eleWriter, 25506 /* EBMLId.CODEC_PRIVATE */, track.codecPrivate.data);
        }
        if (track.audio) {
            writeAudioTrack(eleWriter, context, track.audio);
        }
        else if (track.video) {
            writeVideoTrack(eleWriter, context, track.video);
        }
    });
}
function writeTracks(writer, context, tracks) {
    writeEleData(writer, context, 374648427 /* EBMLId.TRACKS */, (eleWriter) => {
        tracks.entry.forEach((track) => {
            writeTrack(eleWriter, context, track);
        });
    });
}
function writeTagTag(writer, context, tag) {
    writeEleData(writer, context, 26568 /* EBMLId.TAG_SIMPLE */, (eleWriter) => {
        if (tag.name) {
            writeEbmlString(eleWriter, 17827 /* EBMLId.TAG_NAME */, tag.name);
        }
        if (tag.string) {
            writeEbmlString(eleWriter, 17543 /* EBMLId.TAG_STRING */, tag.string);
        }
        if (tag.language) {
            writeEbmlString(eleWriter, 17530 /* EBMLId.TAG_LANG */, tag.language);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(tag, 'default')) {
            writeEbmlUint(eleWriter, 17540 /* EBMLId.TAG_DEFAULT */, tag.default);
        }
        if (tag.sub) {
            writeTagTag(eleWriter, context, tag.sub);
        }
    });
}
function writeTagTarget(writer, context, target) {
    writeEleData(writer, context, 25536 /* EBMLId.TAG_TARGETS */, (eleWriter) => {
        if (target.type) {
            writeEbmlString(eleWriter, 25546 /* EBMLId.TAG_TARGETS_TYPE */, target.type);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'typeValue')) {
            writeEbmlUint(eleWriter, 26826 /* EBMLId.TAG_TARGETS_TYPE_VALUE */, target.typeValue);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'trackUid')) {
            writeEbmlUid(eleWriter, 25541 /* EBMLId.TAG_TARGETS_TRACK_UID */, target.trackUid);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'chapterUid')) {
            writeEbmlUid(eleWriter, 25540 /* EBMLId.TAG_TARGETS_CHAPTER_UID */, target.chapterUid);
        }
        if (common_util_object__WEBPACK_IMPORTED_MODULE_4__.has(target, 'attachUid')) {
            writeEbmlUid(eleWriter, 25540 /* EBMLId.TAG_TARGETS_CHAPTER_UID */, target.attachUid);
        }
    });
}
function writeTag(writer, context, tag) {
    writeEleData(writer, context, 29555 /* EBMLId.TAG */, (eleWriter) => {
        if (tag.tag) {
            writeTagTag(eleWriter, context, tag.tag);
        }
        if (tag.target) {
            writeTagTarget(eleWriter, context, tag.target);
        }
    });
}
function writeTags(writer, context, tags) {
    writeEleData(writer, context, 307544935 /* EBMLId.TAGS */, (eleWriter) => {
        tags.entry.forEach((tag) => {
            writeTag(eleWriter, context, tag);
        });
    });
}
function writeCuePosition(writer, context, pos) {
    writeEleData(writer, context, 183 /* EBMLId.CUE_TRACK_POSITION */, (eleWriter) => {
        writeEbmlUint(eleWriter, 247 /* EBMLId.CUE_TRACK */, pos.track);
        writeEbmlUint(eleWriter, 241 /* EBMLId.CUE_CLUSTER_POSITION */, pos.pos);
    });
}
function writeCue(writer, context, cue) {
    writeEleData(writer, context, 187 /* EBMLId.POINT_ENTRY */, (eleWriter) => {
        writeEbmlUint(eleWriter, 179 /* EBMLId.CUE_TIME */, cue.time);
        cue.pos.forEach((p) => {
            writeCuePosition(eleWriter, context, p);
        });
    });
}
function writeCues(writer, context, cues) {
    writeEleData(writer, context, 475249515 /* EBMLId.CUES */, (eleWriter) => {
        cues.entry.forEach((cue) => {
            writeCue(eleWriter, context, cue);
        });
    });
}
function writeChapterAtomDisplay(writer, context, display) {
    writeEleData(writer, context, 128 /* EBMLId.CHAPTER_DISPLAY */, (eleWriter) => {
        writeEbmlString(eleWriter, 133 /* EBMLId.CHAP_STRING */, display.title);
        writeEbmlString(eleWriter, 17276 /* EBMLId.CHAP_LANG */, display.language);
    });
}
function writeChapterAtom(writer, context, atom) {
    writeEleData(writer, context, 182 /* EBMLId.CHAPTER_ATOM */, (eleWriter) => {
        writeEbmlUint(eleWriter, 145 /* EBMLId.CHAPTER_TIME_START */, atom.start);
        writeEbmlUint(eleWriter, 146 /* EBMLId.CHAPTER_TIME_END */, atom.end);
        writeEbmlUid(eleWriter, 29636 /* EBMLId.CHAPTER_UID */, atom.uid);
        if (atom.display) {
            writeChapterAtomDisplay(eleWriter, context, atom.display);
        }
    });
}
function writeChapter(writer, context, chapter) {
    writeEleData(writer, context, 17849 /* EBMLId.EDITION_ENTRY */, (eleWriter) => {
        common_util_array__WEBPACK_IMPORTED_MODULE_3__.each(chapter.atom, (item) => {
            writeChapterAtom(eleWriter, context, item);
        });
    });
}
function writeChapters(writer, context, chapters) {
    writeEleData(writer, context, 272869232 /* EBMLId.CHAPTERS */, (eleWriter) => {
        chapters.entry.forEach((chapter) => {
            writeChapter(eleWriter, context, chapter);
        });
    });
}
function writeAttachment(writer, context, attachment) {
    writeEbmlId(writer, 24999 /* EBMLId.ATTACHED_FILE */);
    const info = {
        pos: writer.getPos(),
        length: 0,
        bytes: 8
    };
    writeEbmlLength(writer, 0, 8);
    const now = writer.getPos();
    writeEbmlUid(writer, 18094 /* EBMLId.FILE_UID */, attachment.uid);
    writeEbmlString(writer, 18030 /* EBMLId.FILE_NAME */, attachment.name);
    writeEbmlString(writer, 18016 /* EBMLId.FILE_MIMETYPE */, attachment.mime);
    if (attachment.description) {
        writeEbmlString(writer, 18046 /* EBMLId.FILE_DESC */, attachment.description);
    }
    if (attachment.data) {
        writeEbmlBuffer(writer, 18012 /* EBMLId.FILE_DATA */, attachment.data.data);
    }
    info.length = writer.getPos() - now;
    context.elePositionInfos.push(info);
}
function writeAttachments(writer, context, attachments) {
    const old = context.elePositionInfos;
    context.elePositionInfos = [];
    writeEbmlId(writer, 423732329 /* EBMLId.ATTACHMENTS */);
    const info = {
        pos: writer.getPos(),
        length: 0,
        bytes: 8
    };
    writeEbmlLength(writer, 0, 8);
    const now = writer.getPos();
    attachments.entry.forEach((attachment) => {
        writeAttachment(writer, context, attachment);
    });
    info.length = writer.getPos() - now;
    context.elePositionInfos.push(info);
    updatePositionSize(writer, context);
    context.elePositionInfos = old;
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

/***/ "./src/avutil/util/pixel.ts":
/*!**********************************!*\
  !*** ./src/avutil/util/pixel.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chromaLocation2Pos: () => (/* binding */ chromaLocation2Pos),
/* harmony export */   pixelFillLinesizes: () => (/* binding */ pixelFillLinesizes),
/* harmony export */   pixelFillPlaneSizes: () => (/* binding */ pixelFillPlaneSizes),
/* harmony export */   pixelFillPointer: () => (/* binding */ pixelFillPointer)
/* harmony export */ });
/* unused harmony exports pixelGetLinesize, pixelAlloc, pixelGetSize */
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var _pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pixelFormatDescriptor */ "./src/avutil/pixelFormatDescriptor.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../error */ "./src/avutil/error.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constant */ "./src/avutil/constant.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var cheap_stack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! cheap/stack */ "./src/cheap/stack.ts");
/* harmony import */ var _mem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var common_math_align__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! common/math/align */ "./src/common/math/align.ts");


/*
 * libmedia video pixel util
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







function chromaLocation2Pos(pos) {
    if (pos <= 0 /* AVChromaLocation.AVCHROMA_LOC_UNSPECIFIED */ || pos >= 7 /* AVChromaLocation.AVCHROMA_LOC_NB */) {
        return;
    }
    return {
        x: (pos & 1) * 128,
        y: ((pos >>> 1) ^ (pos < 4 ? 1 : 0)) * 128
    };
}
function getMaxPixSteps(desc) {
    const maxPixSteps = [0, 0, 0, 0];
    const maxPixStepsComps = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        if (desc.comp[i] && desc.comp[i].step > maxPixSteps[desc.comp[i].plane]) {
            maxPixSteps[desc.comp[i].plane] = desc.comp[i].step;
            maxPixStepsComps[desc.comp[i].plane] = i;
        }
    }
    return {
        maxPixSteps,
        maxPixStepsComps
    };
}
function setSystematicPal(pal, pixfmt) {
    for (let i = 0; i < 256; i++) {
        let r, g, b;
        switch (pixfmt) {
            case 20 /* AVPixelFormat.AV_PIX_FMT_RGB8 */:
                r = (i >> 5) * 36;
                g = ((i >> 2) & 7) * 36;
                b = (i & 3) * 85;
                break;
            case 17 /* AVPixelFormat.AV_PIX_FMT_BGR8 */:
                b = (i >> 6) * 85;
                g = ((i >> 3) & 7) * 36;
                r = (i & 7) * 36;
                break;
            case 22 /* AVPixelFormat.AV_PIX_FMT_RGB4_BYTE */:
                r = (i >> 3) * 255;
                g = ((i >> 1) & 3) * 85;
                b = (i & 1) * 255;
                break;
            case 19 /* AVPixelFormat.AV_PIX_FMT_BGR4_BYTE */:
                b = (i >> 3) * 255;
                g = ((i >> 1) & 3) * 85;
                r = (i & 1) * 255;
                break;
            case 8 /* AVPixelFormat.AV_PIX_FMT_GRAY8 */:
                r = b = g = i;
                break;
            default:
                return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[8](pal + (i * 4), b + (g << 8) + (r << 16) + (-16777216));
    }
    return 0;
}
function pixelGetLinesize_(width, plane, maxStep, maxStepComp, desc) {
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    if (width < 0) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const s = (maxStepComp === 1 || maxStepComp === 2) ? desc.log2ChromaW : 0;
    const shiftedW = ((width + (1 << s) - 1)) >>> s;
    if (shiftedW && maxStep > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX / shiftedW) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    let linesize = maxStep * shiftedW;
    if (desc.flags & 4 /* AVPixelFormatFlags.BIT_STREAM */) {
        linesize = (linesize + 7) >>> 3;
    }
    return linesize;
}
function pixelGetLinesize(pixfmt, width, plane) {
    const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.getAVPixelFormatDescriptor)(pixfmt);
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const { maxPixSteps, maxPixStepsComps } = getMaxPixSteps(desc);
    return pixelGetLinesize_(width, plane, maxPixSteps[plane], maxPixStepsComps[plane], desc);
}
function pixelFillLinesizes(linesizes, pixfmt, width) {
    const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.getAVPixelFormatDescriptor)(pixfmt);
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const { maxPixSteps, maxPixStepsComps } = getMaxPixSteps(desc);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(linesizes, 0, 16);
    let ret = 0;
    for (let i = 0; i < 4; i++) {
        if ((ret = pixelGetLinesize_(width, i, maxPixSteps[i], maxPixStepsComps[i], desc)) < 0) {
            return ret;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes + (i * 4), ret);
    }
}
function pixelFillPlaneSizes(sizes, pixfmt, height, linesizes) {
    const hasPlane = [0, 0, 0, 0];
    const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.getAVPixelFormatDescriptor)(pixfmt);
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(sizes, 0, 16);
    if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX / height) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[25](sizes, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * height);
    if (desc.flags & 2 /* AVPixelFormatFlags.PALETTE */) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[25](sizes + 4, 1024);
        return 0;
    }
    for (let i = 0; i < 4; i++) {
        if (desc.comp[i]) {
            hasPlane[desc.comp[i].plane] = 1;
        }
    }
    for (let i = 0; i < 4 && hasPlane[i]; i++) {
        let s = (i === 1 || i === 2) ? desc.log2ChromaH : 0;
        let h = (height + (1 << s) - 1) >> s;
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)) > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX / h) {
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[25](sizes + (i * 4), h * cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)));
    }
    return 0;
}
function pixelFillPointer(data, pixfmt, height, ptr, linesizes) {
    const linesizes1 = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const sizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(data, 0, 16);
    for (let i = 0; i < 4; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes1 + (i * 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)));
    }
    let ret = pixelFillPlaneSizes(sizes, pixfmt, height, linesizes1);
    if (ret < 0) {
        defer();
        return ret;
    }
    ret = 0;
    for (let i = 0; i < 4; i++) {
        if (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4)) > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX - ret) {
            defer();
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        ret += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4));
    }
    if (!ptr) {
        defer();
        return ret;
    }
    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[20](data, ptr);
    for (let i = 1; i < 4 && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4)); i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[20](data + (i * 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](data + ((i - 1) * 4)) + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + ((i - 1) * 4)));
    }
    defer();
    return ret;
    function defer() {
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
    }
}
function pixelAlloc(pointers, linesizes, w, h, pixfmt, align = 1) {
    const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.getAVPixelFormatDescriptor)(pixfmt);
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const linesizes1 = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const sizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    let ret = 0;
    if ((ret = pixelFillLinesizes(linesizes, pixfmt, align > 7 ? (0,common_math_align__WEBPACK_IMPORTED_MODULE_8__["default"])(w, 8) : w)) < 0) {
        defer();
        return ret;
    }
    for (let i = 0; i < 4; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes + (i * 4), (0,common_math_align__WEBPACK_IMPORTED_MODULE_8__["default"])(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)), align));
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](linesizes1 + (i * 4), cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)));
    }
    if ((ret = pixelFillPlaneSizes(sizes, pixfmt, h, linesizes1)) < 0) {
        defer();
        return ret;
    }
    let totalSize = (align >>> 0);
    for (let i = 0; i < 4; i++) {
        if (totalSize > (_constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX >>> 0) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4))) {
            defer();
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        totalSize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4));
    }
    const buf = (0,_mem__WEBPACK_IMPORTED_MODULE_7__.avMalloc)(totalSize);
    if (!buf) {
        defer();
        return _error__WEBPACK_IMPORTED_MODULE_3__.NO_MEMORY;
    }
    if ((ret = pixelFillPointer(pointers, pixfmt, h, buf, linesizes)) < 0) {
        defer();
        return ret;
    }
    if (desc.flags & 2 /* AVPixelFormatFlags.PALETTE */) {
        if (align < 4) {
            (0,_mem__WEBPACK_IMPORTED_MODULE_7__.avFree)(buf);
            defer();
            return ret;
        }
        setSystematicPal(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4), pixfmt);
    }
    if ((desc.flags & 2 /* AVPixelFormatFlags.PALETTE */)
        && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4)
        && cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers) > cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * h) {
        /* zero-initialize the padding before the palette */
        (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memset)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers) + cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * h, 0, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers + 4) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[20](pointers) - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes) * h);
    }
    defer();
    return ret;
    function defer() {
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
    }
}
function pixelGetSize(pixfmt, width, height, align) {
    const desc = (0,_pixelFormatDescriptor__WEBPACK_IMPORTED_MODULE_2__.getAVPixelFormatDescriptor)(pixfmt);
    if (!desc) {
        return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
    }
    const linesizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const alignedLinesizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    const sizes = cheap_stack__WEBPACK_IMPORTED_MODULE_6__.malloc(16);
    let ret = 0;
    if ((ret = pixelFillLinesizes(linesizes, pixfmt, width)) < 0) {
        defer();
        return ret;
    }
    for (let i = 0; i < 4; i++) {
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](alignedLinesizes + (i * 4), (0,common_math_align__WEBPACK_IMPORTED_MODULE_8__["default"])(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](linesizes + (i * 4)), align));
    }
    if ((ret = pixelFillPlaneSizes(sizes, pixfmt, height, alignedLinesizes)) < 0) {
        defer();
        return ret;
    }
    let totalSize = 0;
    for (let i = 0; i < 4; i++) {
        if (totalSize > _constant__WEBPACK_IMPORTED_MODULE_4__.INT32_MAX - cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4))) {
            defer();
            return _error__WEBPACK_IMPORTED_MODULE_3__.INVALID_ARGUMENT;
        }
        totalSize += cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[25](sizes + (i * 4));
    }
    defer();
    return totalSize;
    function defer() {
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
        cheap_stack__WEBPACK_IMPORTED_MODULE_6__.free(16);
    }
}


/***/ }),

/***/ "./src/common/math/align.ts":
/*!**********************************!*\
  !*** ./src/common/math/align.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ align)
/* harmony export */ });
function align(value, alignment) {
    return (value + (alignment - 1)) & ~(alignment - 1);
}


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_OMatroskaFormat_ts.avtranscoder.js.map