"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IAviFormat_ts"],{

/***/ "./src/avformat/formats/IAviFormat.ts":
/*!********************************************!*\
  !*** ./src/avformat/formats/IAviFormat.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IAviFormat)
/* harmony export */ });
/* harmony import */ var cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cheap/ctypeEnumRead */ "./src/cheap/ctypeEnumRead.ts");
/* harmony import */ var cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cheap/ctypeEnumWrite */ "./src/cheap/ctypeEnumWrite.ts");
/* harmony import */ var common_util_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! common/util/logger */ "./src/common/util/logger.ts");
/* harmony import */ var avutil_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! avutil/error */ "./src/avutil/error.ts");
/* harmony import */ var _IFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IFormat */ "./src/avformat/formats/IFormat.ts");
/* harmony import */ var cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cheap/std/memory */ "./src/cheap/std/memory.ts");
/* harmony import */ var avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! avutil/util/mem */ "./src/avutil/util/mem.ts");
/* harmony import */ var avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! avutil/util/avpacket */ "./src/avutil/util/avpacket.ts");
/* harmony import */ var _riff_iriff__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./riff/iriff */ "./src/avformat/formats/riff/iriff.ts");
/* harmony import */ var avutil_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! avutil/constant */ "./src/avutil/constant.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
/* harmony import */ var avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! avformat/function/mktagle */ "./src/avformat/function/mktagle.ts");
/* harmony import */ var avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! avutil/util/rational */ "./src/avutil/util/rational.ts");
/* harmony import */ var avutil_util_intread__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! avutil/util/intread */ "./src/avutil/util/intread.ts");
/* harmony import */ var _riff_riff__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./riff/riff */ "./src/avformat/formats/riff/riff.ts");
/* harmony import */ var avutil_util_nalu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! avutil/util/nalu */ "./src/avutil/util/nalu.ts");
/* harmony import */ var common_util_bigint__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! common/util/bigint */ "./src/common/util/bigint.ts");
/* harmony import */ var common_util_array__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! common/util/array */ "./src/common/util/array.ts");
/* harmony import */ var common_util_object__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! common/util/object */ "./src/common/util/object.ts");
/* harmony import */ var avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! avutil/codecs/h264 */ "./src/avutil/codecs/h264.ts");
/* harmony import */ var avutil_codecs_aac__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! avutil/codecs/aac */ "./src/avutil/codecs/aac.ts");
/* harmony import */ var avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! avutil/codecs/hevc */ "./src/avutil/codecs/hevc.ts");
/* harmony import */ var avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! avutil/codecs/vvc */ "./src/avutil/codecs/vvc.ts");
/* harmony import */ var avutil_codecs_av1__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! avutil/codecs/av1 */ "./src/avutil/codecs/av1.ts");
/* harmony import */ var avutil_codecs_vp9__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! avutil/codecs/vp9 */ "./src/avutil/codecs/vp9.ts");
/* harmony import */ var avutil_codecs_vp8__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! avutil/codecs/vp8 */ "./src/avutil/codecs/vp8.ts");
/* harmony import */ var avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! avutil/codecs/flac */ "./src/avutil/codecs/flac.ts");
/* harmony import */ var avutil_codecs_opus__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! avutil/codecs/opus */ "./src/avutil/codecs/opus.ts");
/* harmony import */ var avutil_pixfmt__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! avutil/pixfmt */ "./src/avutil/pixfmt.ts");
const cheap__fileName__0 = "src\\avformat\\formats\\IAviFormat.ts";






























const AVI_HEADER = [
    ['R', 'I', 'F', 'F', 'A', 'V', 'I', ' '],
    ['R', 'I', 'F', 'F', 'A', 'V', 'I', 'X'],
    ['R', 'I', 'F', 'F', 'A', 'V', 'I', 0x19],
    ['O', 'N', '2', ' ', 'O', 'N', '2', 'f'],
    ['R', 'I', 'F', 'F', 'A', 'M', 'V', ' ']
];
const DefaultIAviFormatOptions = {
    useOdml: true
};
class IAviFormat extends _IFormat__WEBPACK_IMPORTED_MODULE_4__["default"] {
    type = 10 /* AVFormat.AVI */;
    context;
    options;
    constructor(options = {}) {
        super();
        this.options = common_util_object__WEBPACK_IMPORTED_MODULE_19__.extend(DefaultIAviFormatOptions, options);
    }
    init(formatContext) {
        formatContext.ioReader.setEndian(false);
        this.context = {
            riffEndPos: avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT,
            fileSize: avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT,
            moviList: avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT,
            moviEnd: avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT,
            isOdml: false,
            header: {},
            dvDemux: false,
            lastPktPos: BigInt(0),
            ioFileSize: BigInt(0),
            currentIndex: -1,
            packetSize: 0,
            remaining: 0,
            odmlRead: BigInt(0),
            odmlMaxPos: BigInt(0),
            nonInterleaved: false,
            hasVideoKey: false,
            indexLoaded: false
        };
        formatContext.privateData = this.context;
    }
    getStreamIndex(s) {
        if (s[0] >= '0' && s[0] <= '9'
            && s[1] >= '0' && s[0] <= '9') {
            return +s[0] * 10 + (+s[1]);
        }
        return 100;
    }
    getDuration(context, len) {
        if (context.dwSampleSize) {
            return BigInt(len >> 0);
        }
        else if (context.dshowBlockAlign) {
            return BigInt(Math.floor((len + context.dshowBlockAlign - 1) / context.dshowBlockAlign) >> 0);
        }
        return BigInt(1);
    }
    async readHeader(formatContext) {
        let header = await formatContext.ioReader.readBuffer(4);
        this.context.riffEndPos = BigInt((await formatContext.ioReader.readUint32()));
        this.context.riffEndPos += formatContext.ioReader.getPos();
        header = (0,common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_10__["default"])(Uint8Array, [header, await formatContext.ioReader.readBuffer(4)]);
        let signature;
        for (let i = 0; i < AVI_HEADER.length; i++) {
            const s = AVI_HEADER[i];
            let j = 0;
            for (; j < s.length; j++) {
                let code = s[j];
                if (common_util_is__WEBPACK_IMPORTED_MODULE_11__.string(code)) {
                    code = code.charCodeAt(0);
                }
                if (code !== header[j]) {
                    break;
                }
            }
            if (j === s.length) {
                signature = s;
                break;
            }
        }
        if (!signature) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('the file format is not avi', cheap__fileName__0, 187);
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        if (signature[7] === 0x19) {
            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('This file has been generated by a totally broken muxer.', cheap__fileName__0, 191);
        }
        this.context.ioFileSize = this.context.fileSize = await formatContext.ioReader.fileSize();
        if (this.context.fileSize <= 0 || this.context.fileSize < this.context.riffEndPos) {
            this.context.fileSize = this.context.riffEndPos === BigInt(8) ? avutil_constant__WEBPACK_IMPORTED_MODULE_9__.INT64_MAX : this.context.riffEndPos;
        }
        let moviGot = false;
        let listEnd = BigInt(0);
        let subTag = '';
        let amvFileFormat = false;
        try {
            while (formatContext.ioReader.getPos() < this.context.fileSize && !moviGot) {
                const tag = await formatContext.ioReader.readString(4);
                let size = await formatContext.ioReader.readUint32();
                switch (tag) {
                    case 'LIST': {
                        listEnd = formatContext.ioReader.getPos() + BigInt(size);
                        subTag = await formatContext.ioReader.readString(4);
                        if (subTag === 'movi') {
                            this.context.moviList = formatContext.ioReader.getPos() - BigInt(4);
                            if (size) {
                                this.context.moviEnd = this.context.moviList + BigInt(size) + (BigInt(size) & BigInt(1));
                            }
                            else {
                                this.context.moviEnd = this.context.fileSize;
                            }
                            moviGot = true;
                        }
                        else if (subTag === 'INFO') {
                            await (0,_riff_iriff__WEBPACK_IMPORTED_MODULE_8__.readInfo)(formatContext.ioReader, BigInt(size), formatContext.metadata);
                        }
                        else if (subTag === 'ncdt') {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('ignore tag ncdt', cheap__fileName__0, 227);
                        }
                        break;
                    }
                    case 'IDIT': {
                        size += size & 1;
                        const len = Math.min(size, 63);
                        formatContext.metadata['creation_time'] = await formatContext.ioReader.readString(len);
                        if (len < size) {
                            await formatContext.ioReader.skip(size - len);
                        }
                        break;
                    }
                    case 'dmlh': {
                        this.context.isOdml = true;
                        await formatContext.ioReader.skip(size + (size & 1));
                        break;
                    }
                    case 'amvh':
                        amvFileFormat = true;
                    case 'avih': {
                        this.context.header.dwMicroSecPerFrame = await formatContext.ioReader.readUint32();
                        this.context.header.dwMaxBytesPerSec = await formatContext.ioReader.readUint32();
                        this.context.header.dwPaddingGranularity = await formatContext.ioReader.readUint32();
                        this.context.header.dwFlages = await formatContext.ioReader.readUint32();
                        this.context.header.dwTotalFrame = await formatContext.ioReader.readUint32();
                        this.context.header.dwInitialFrames = await formatContext.ioReader.readUint32();
                        this.context.header.dwStreams = await formatContext.ioReader.readUint32();
                        this.context.header.dwSuggestedBufferSize = await formatContext.ioReader.readUint32();
                        this.context.header.dwWidth = await formatContext.ioReader.readUint32();
                        this.context.header.dwHeight = await formatContext.ioReader.readUint32();
                        if (this.context.header.dwFlages & 32 /* AVIFlags.AVIF_MUSTUSEINDEX */) {
                            this.context.nonInterleaved = true;
                        }
                        await formatContext.ioReader.skip(size - 40);
                        break;
                    }
                    case 'strh': {
                        const streamContext = {
                            sampleEnd: false,
                            currentSample: 0
                        };
                        streamContext.fccType = await formatContext.ioReader.readString(4);
                        streamContext.fccHandler = await formatContext.ioReader.readString(4);
                        if (streamContext.fccType === 'pads') {
                            await formatContext.ioReader.skip(size - 8);
                            break;
                        }
                        const stream = formatContext.createStream();
                        stream.privData = streamContext;
                        if (amvFileFormat) {
                            streamContext.fccType = stream.index ? 'auds' : 'vids';
                        }
                        if (streamContext.fccType === 'iavs' || streamContext.fccType === 'ivas') {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error('dv format in avi not support now', cheap__fileName__0, 286);
                            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.FORMAT_NOT_SUPPORT;
                        }
                        streamContext.dwFlags = await formatContext.ioReader.readUint32();
                        streamContext.wPriority = await formatContext.ioReader.readUint16();
                        streamContext.wLanguage = await formatContext.ioReader.readUint16();
                        streamContext.dwInitalFrames = await formatContext.ioReader.readUint32();
                        streamContext.dwScale = await formatContext.ioReader.readUint32();
                        streamContext.dwRate = await formatContext.ioReader.readUint32();
                        if (!(streamContext.dwScale && streamContext.dwRate)) {
                            if (this.context.header.dwMicroSecPerFrame) {
                                streamContext.dwRate = 1000000;
                                streamContext.dwScale = this.context.header.dwMicroSecPerFrame;
                            }
                            else {
                                streamContext.dwRate = 25;
                                streamContext.dwScale = 1;
                            }
                        }
                        stream.timeBase = {
                            num: streamContext.dwScale,
                            den: streamContext.dwRate
                        };
                        (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avReduce)(stream.timeBase);
                        streamContext.dwStart = await formatContext.ioReader.readUint32();
                        streamContext.dwLength = await formatContext.ioReader.readUint32();
                        streamContext.dwSuggestedBufferSize = await formatContext.ioReader.readUint32();
                        streamContext.dwQuality = await formatContext.ioReader.readUint32();
                        streamContext.dwSampleSize = await formatContext.ioReader.readUint32();
                        stream.startTime = BigInt(0);
                        stream.duration = BigInt(streamContext.dwLength);
                        if (streamContext.dwStart > 3600 * streamContext.dwRate / streamContext.dwScale) {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn('crazy start time, iam scared, giving up', cheap__fileName__0, 323);
                            streamContext.dwStart = 0;
                        }
                        if (streamContext.dwSampleSize < 0) {
                            common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`Invalid sample_size ${streamContext.dwSampleSize} at stream ${stream.index} setting it to 0`, cheap__fileName__0, 327);
                            streamContext.dwSampleSize = 0;
                        }
                        streamContext.dwStart *= Math.max(1, streamContext.dwSampleSize);
                        switch (streamContext.fccType) {
                            case 'vids': {
                                stream.codecpar.codecType = 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */;
                                streamContext.dwSampleSize = 0;
                                break;
                            }
                            case 'auds': {
                                stream.codecpar.codecType = 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */;
                                break;
                            }
                            case 'txts': {
                                stream.codecpar.codecType = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
                                break;
                            }
                            case 'dats': {
                                stream.codecpar.codecType = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
                                break;
                            }
                            default:
                                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`unknown stream type ${streamContext.fccType}`, cheap__fileName__0, 351);
                                break;
                        }
                        streamContext.currentDts = BigInt(streamContext.dwStart >> 0);
                        await formatContext.ioReader.skip(size - 48);
                        break;
                    }
                    case 'strf': {
                        const stream = formatContext.streams[formatContext.streams.length - 1];
                        if (!stream || this.context.dvDemux) {
                            await formatContext.ioReader.skip(size);
                            break;
                        }
                        const streamContext = stream.privData;
                        if (!size && (stream.codecpar.codecType === 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */
                            || stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */)) {
                            break;
                        }
                        if (formatContext.ioReader.getPos() < listEnd) {
                            size = Math.min(size, Number(BigInt.asIntN(32, listEnd - formatContext.ioReader.getPos())));
                        }
                        switch (stream.codecpar.codecType) {
                            case 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */: {
                                if (amvFileFormat) {
                                    stream.codecpar.width = this.context.header.dwWidth || 0;
                                    stream.codecpar.height = this.context.header.dwHeight || 0;
                                    stream.codecpar.codecId = 107 /* AVCodecID.AV_CODEC_ID_AMV */;
                                    await formatContext.ioReader.skip(size);
                                    break;
                                }
                                const esize = await (0,_riff_iriff__WEBPACK_IMPORTED_MODULE_8__.readBmpHeader)(formatContext.ioReader, stream);
                                if (stream.codecpar.codecTag === (0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_12__["default"])('DXSB')
                                    || stream.codecpar.codecTag === (0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_12__["default"])('DXSA')) {
                                    stream.codecpar.codecType = 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */;
                                    stream.codecpar.codecId = 94211 /* AVCodecID.AV_CODEC_ID_XSUB */;
                                    break;
                                }
                                if (size > 40 && size < (1073741824) && size < this.context.fileSize) {
                                    if (esize === size - 1 && (esize & 1)) {
                                        stream.codecpar.extradataSize = esize - 40;
                                    }
                                    else {
                                        stream.codecpar.extradataSize = size - 40;
                                    }
                                    stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(stream.codecpar.extradataSize);
                                    await formatContext.ioReader.readBuffer(stream.codecpar.extradataSize, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapSafeUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize));
                                }
                                if (stream.codecpar.extradataSize & 1) {
                                    await formatContext.ioReader.skip(1);
                                }
                                if (stream.codecpar.extradataSize && stream.codecpar.bitsPerCodedSample <= 8) {
                                    let palSize = (1 << stream.codecpar.bitsPerCodedSample) << 2;
                                    let palSrc;
                                    palSize = Math.min(palSize, stream.codecpar.extradataSize);
                                    palSrc = stream.codecpar.extradata + (stream.codecpar.extradataSize - palSize);
                                    if ((palSrc - stream.codecpar.extradata) >= 9
                                        && (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.readCString)(stream.codecpar.extradata + (stream.codecpar.extradataSize - 9), 8) === 'BottomUp') {
                                        palSrc = palSrc - 9;
                                    }
                                    streamContext.pal = new Uint32Array(256);
                                    for (let i = 0; i < palSize / 4; i++) {
                                        streamContext.pal[i] = -16777216 | avutil_util_intread__WEBPACK_IMPORTED_MODULE_14__.rl32(palSrc + 4 * i);
                                    }
                                    streamContext.hasPal = true;
                                }
                                stream.codecpar.codecId = _riff_riff__WEBPACK_IMPORTED_MODULE_15__.codecBmpTags[stream.codecpar.codecTag];
                                break;
                            }
                            case 1 /* AVMediaType.AVMEDIA_TYPE_AUDIO */: {
                                let ret = await (0,_riff_iriff__WEBPACK_IMPORTED_MODULE_8__.readWavHeader)(formatContext.ioReader, stream, size);
                                if (ret < 0) {
                                    return ret;
                                }
                                streamContext.dshowBlockAlign = stream.codecpar.blockAlign;
                                if (streamContext.dwSampleSize && stream.codecpar.blockAlign && streamContext.dwSampleSize !== stream.codecpar.blockAlign) {
                                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.warn(`sample size (${streamContext.dwSampleSize}) != block align (${stream.codecpar.blockAlign})`, cheap__fileName__0, 437);
                                    streamContext.dwSampleSize = stream.codecpar.blockAlign;
                                }
                                if (size & 1) {
                                    await formatContext.ioReader.skip(1);
                                }
                                if (streamContext.fccHandler === 'Axan') {
                                    stream.codecpar.codecId = 81922 /* AVCodecID.AV_CODEC_ID_XAN_DPCM */;
                                    stream.codecpar.codecTag = 0;
                                    streamContext.dshowBlockAlign = 0;
                                }
                                if (amvFileFormat) {
                                    stream.codecpar.codecId = 69651 /* AVCodecID.AV_CODEC_ID_ADPCM_IMA_AMV */;
                                    streamContext.dshowBlockAlign = 0;
                                }
                                if ((stream.codecpar.codecId == 86018 /* AVCodecID.AV_CODEC_ID_AAC */
                                    || stream.codecpar.codecId == 86116 /* AVCodecID.AV_CODEC_ID_FTR */
                                    || stream.codecpar.codecId == 86028 /* AVCodecID.AV_CODEC_ID_FLAC */
                                    || stream.codecpar.codecId == 86016 /* AVCodecID.AV_CODEC_ID_MP2 */)
                                    && streamContext.dshowBlockAlign <= 4 && streamContext.dshowBlockAlign) {
                                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug(`overriding invalid dshow_block_align of ${streamContext.dshowBlockAlign}`, cheap__fileName__0, 458);
                                    streamContext.dshowBlockAlign = 0;
                                }
                                if (stream.codecpar.codecId == 86018 /* AVCodecID.AV_CODEC_ID_AAC */ && streamContext.dshowBlockAlign == 1024 && streamContext.dwSampleSize == 1024
                                    || stream.codecpar.codecId == 86018 /* AVCodecID.AV_CODEC_ID_AAC */ && streamContext.dshowBlockAlign == 4096 && streamContext.dwSampleSize == 4096
                                    || stream.codecpar.codecId == 86017 /* AVCodecID.AV_CODEC_ID_MP3 */ && streamContext.dshowBlockAlign == 1152 && streamContext.dwSampleSize == 1152) {
                                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.debug('overriding sample_size', cheap__fileName__0, 465);
                                    streamContext.dwSampleSize = 0;
                                }
                                break;
                            }
                            case 3 /* AVMediaType.AVMEDIA_TYPE_SUBTITLE */: {
                                await formatContext.ioReader.skip(size);
                                break;
                            }
                            default: {
                                stream.codecpar.codecType = 2 /* AVMediaType.AVMEDIA_TYPE_DATA */;
                                stream.codecpar.codecId = 0 /* AVCodecID.AV_CODEC_ID_NONE */;
                                stream.codecpar.codecTag = 0;
                                await formatContext.ioReader.skip(size);
                                break;
                            }
                        }
                        break;
                    }
                    case 'strd': {
                        const stream = formatContext.streams[formatContext.streams.length - 1];
                        if (!stream || stream.codecpar.extradataSize || stream.codecpar.codecTag === (0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_12__["default"])('H264')) {
                            await formatContext.ioReader.skip(size);
                            break;
                        }
                        if (formatContext.ioReader.getPos() < listEnd) {
                            size = Math.min(size, Number(listEnd - formatContext.ioReader.getPos()));
                        }
                        if (stream.codecpar.extradata) {
                            (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avFree)(stream.codecpar.extradata);
                        }
                        stream.codecpar.extradataSize = size;
                        stream.codecpar.extradata = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(size);
                        await formatContext.ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapSafeUint8Array)(stream.codecpar.extradata, size));
                        if (stream.codecpar.extradataSize & 1) {
                            await formatContext.ioReader.skip(1);
                        }
                        break;
                    }
                    case 'indx': {
                        const pos = formatContext.ioReader.getPos();
                        if (formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */ && this.options.useOdml) {
                            const currentDts = {};
                            formatContext.streams.forEach((stream) => {
                                const streamContext = stream.privData;
                                currentDts[stream.index] = streamContext.currentDts;
                            });
                            const ret = await this.readOdmlIndex(formatContext);
                            if (ret < 0) {
                                return ret;
                            }
                            formatContext.streams.forEach((stream) => {
                                const streamContext = stream.privData;
                                streamContext.currentDts = currentDts[stream.index];
                            });
                        }
                        await formatContext.ioReader.seek(pos + BigInt(size));
                        break;
                    }
                    default: {
                        if (size > 1000000) {
                            this.context.moviList = formatContext.ioReader.getPos() - BigInt(4);
                            this.context.moviEnd = this.context.fileSize;
                            moviGot = true;
                            break;
                        }
                    }
                    case 'idx1': {
                        size += (size & 1);
                        await formatContext.ioReader.seek(formatContext.ioReader.getPos() + BigInt(size));
                        break;
                    }
                }
            }
            formatContext.streams.forEach((stream) => {
                if (stream.codecpar.extradataSize) {
                    stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */] = (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapUint8Array)(stream.codecpar.extradata, stream.codecpar.extradataSize).slice();
                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */) {
                        avutil_codecs_h264__WEBPACK_IMPORTED_MODULE_20__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */) {
                        avutil_codecs_hevc__WEBPACK_IMPORTED_MODULE_22__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                        avutil_codecs_vvc__WEBPACK_IMPORTED_MODULE_23__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 225 /* AVCodecID.AV_CODEC_ID_AV1 */) {
                        avutil_codecs_av1__WEBPACK_IMPORTED_MODULE_24__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 167 /* AVCodecID.AV_CODEC_ID_VP9 */) {
                        avutil_codecs_vp9__WEBPACK_IMPORTED_MODULE_25__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 139 /* AVCodecID.AV_CODEC_ID_VP8 */) {
                        avutil_codecs_vp8__WEBPACK_IMPORTED_MODULE_26__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                        avutil_codecs_aac__WEBPACK_IMPORTED_MODULE_21__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 86028 /* AVCodecID.AV_CODEC_ID_FLAC */) {
                        avutil_codecs_flac__WEBPACK_IMPORTED_MODULE_27__.parseAVCodecParameters(stream);
                    }
                    else if (stream.codecpar.codecId === 86076 /* AVCodecID.AV_CODEC_ID_OPUS */) {
                        avutil_codecs_opus__WEBPACK_IMPORTED_MODULE_28__.parseAVCodecParameters(stream);
                    }
                    if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                        || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                        || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */) {
                        if (avutil_util_nalu__WEBPACK_IMPORTED_MODULE_16__.isAnnexb(stream.sideData[1 /* AVPacketSideDataType.AV_PKT_DATA_NEW_EXTRADATA */])) {
                            stream.codecpar.flags |= 1 /* AVCodecParameterFlags.AV_CODECPAR_FLAG_H26X_ANNEXB */;
                        }
                    }
                }
                else if (stream.codecpar.codecId === 86018 /* AVCodecID.AV_CODEC_ID_AAC */) {
                    const extradata = avutil_codecs_aac__WEBPACK_IMPORTED_MODULE_21__.avCodecParameters2Extradata(stream.codecpar);
                    const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(extradata.length);
                    (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(data, extradata.length, extradata);
                    stream.codecpar.extradata = data;
                    stream.codecpar.extradataSize = extradata.length;
                    if (stream.codecpar.profile === avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE) {
                        stream.codecpar.profile = 2 /* MPEG4AudioObjectTypes.AAC_LC */;
                    }
                }
                if (stream.codecpar.codecId === 27 /* AVCodecID.AV_CODEC_ID_H264 */
                    || stream.codecpar.codecId === 173 /* AVCodecID.AV_CODEC_ID_HEVC */
                    || stream.codecpar.codecId === 196 /* AVCodecID.AV_CODEC_ID_VVC */
                    || stream.codecpar.codecId === 2 /* AVCodecID.AV_CODEC_ID_MPEG2VIDEO */
                    || stream.codecpar.codecId === 12 /* AVCodecID.AV_CODEC_ID_MPEG4 */) {
                    stream.codecpar.flags |= 2 /* AVCodecParameterFlags.AV_CODECPAR_FLAG_NO_PTS */;
                }
            });
            await formatContext.ioReader.seek(this.context.moviList);
            if (!this.context.indexLoaded) {
                await this.loadIndex(formatContext);
            }
            if (this.context.dvDemux) {
                this.context.nonInterleaved = false;
            }
            else if (!formatContext.streams.some((stream) => {
                const context = stream.privData;
                return !!context.samples;
            })) {
                this.context.nonInterleaved = false;
            }
        }
        catch (error) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        return 0;
    }
    async readOdmlIndex(formatContext) {
        const longsPerEntry = await formatContext.ioReader.readUint16();
        const indexSubType = await formatContext.ioReader.readUint8();
        const indexType = await formatContext.ioReader.readUint8();
        const entriesInUse = await formatContext.ioReader.readInt32();
        const chunkId = await formatContext.ioReader.readString(4);
        let base = await formatContext.ioReader.readUint64();
        const index = this.getStreamIndex(chunkId);
        if (index >= formatContext.streams.length) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        let lastPos = -BigInt(1);
        let fileSize = this.context.fileSize;
        const stream = formatContext.streams[index];
        const streamContext = stream.privData;
        if (!streamContext.samples) {
            streamContext.samples = [];
        }
        if (indexSubType || entriesInUse < 0) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        await formatContext.ioReader.skip(4);
        if (indexType && longsPerEntry !== 2) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        if (indexType > 1) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        if (fileSize > 0 && base >= fileSize) {
            if (base >> BigInt(32) == (base & BigInt(0xffffffff))
                && (base & BigInt(0xffffffff)) < fileSize
                && fileSize <= 0xFFFFFFFF) {
                base &= BigInt(0xffffffff);
            }
            else {
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
        }
        for (let i = 0; i < entriesInUse; i++) {
            this.context.odmlMaxPos = common_util_bigint__WEBPACK_IMPORTED_MODULE_17__.max(this.context.odmlMaxPos, formatContext.ioReader.getPos());
            // If we read more than there are bytes then we must have been reading something twice
            if (this.context.odmlRead > this.context.odmlMaxPos) {
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            if (indexType) {
                const pos = BigInt((await formatContext.ioReader.readUint32())) + base - BigInt(8);
                let len = await formatContext.ioReader.readInt32();
                const key = len >= 0;
                len &= 0x7FFFFFFF;
                this.context.odmlRead += BigInt(8);
                if (lastPos == pos || pos == base - BigInt(8)) {
                    this.context.nonInterleaved = true;
                }
                if (lastPos != pos && len) {
                    streamContext.samples.push({
                        pos,
                        size: len,
                        key,
                        dts: streamContext.currentDts
                    });
                }
                streamContext.currentDts += this.getDuration(streamContext, len);
                lastPos = pos;
            }
            else {
                this.context.odmlRead += BigInt(16);
                let offset = await formatContext.ioReader.readUint64();
                await formatContext.ioReader.skip(8);
                let pos = formatContext.ioReader.getPos();
                await formatContext.ioReader.seek(offset + BigInt(8));
                let ret = await this.readOdmlIndex(formatContext);
                if (ret < 0) {
                    return ret;
                }
                await formatContext.ioReader.seek(pos);
            }
        }
        this.context.indexLoaded = true;
        return 0;
    }
    async readIdx1(formatContext, size) {
        let firstPacket = true;
        let lastPos = -BigInt(1);
        let lastIdx = -BigInt(1);
        let firstPacketPos = BigInt(0);
        let dataOffset = BigInt(0);
        let anyKey = false;
        let nbIndexEntries = size / 16;
        if (nbIndexEntries <= 0) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        let idx1Pos = formatContext.ioReader.getPos();
        await formatContext.ioReader.seek(this.context.moviList + BigInt(4));
        if ((await this.syncChunk(formatContext)) === 0) {
            firstPacketPos = formatContext.ioReader.getPos() - BigInt(8);
        }
        this.context.currentIndex = -1;
        await formatContext.ioReader.seek(idx1Pos);
        if (formatContext.streams.length === 1
            && formatContext.streams[0].codecpar.codecTag === (0,avformat_function_mktagle__WEBPACK_IMPORTED_MODULE_12__["default"])('MMES')) {
            firstPacketPos = BigInt(0);
            dataOffset = this.context.moviList;
        }
        for (let i = 0; i < nbIndexEntries; i++) {
            const tag = await formatContext.ioReader.readString(4);
            const flags = await formatContext.ioReader.readUint32();
            let pos = BigInt(Math.floor(await formatContext.ioReader.readUint32()));
            const len = await formatContext.ioReader.readUint32();
            const index = this.getStreamIndex(tag);
            if (index >= formatContext.streams.length) {
                continue;
            }
            const stream = formatContext.streams[index];
            const streamContext = stream.privData;
            if (!streamContext.samples) {
                streamContext.samples = [];
            }
            if (tag[2] === 'p' && tag[3] === 'c') {
                continue;
            }
            if (firstPacket && firstPacketPos) {
                if (this.context.moviList + BigInt(4) !== pos || pos + BigInt(500) > firstPacketPos) {
                    dataOffset = firstPacketPos - pos;
                }
                firstPacket = false;
            }
            pos += dataOffset;
            if (lastPos === pos) {
                this.context.nonInterleaved = true;
            }
            if (lastIdx !== pos && len) {
                streamContext.samples.push({
                    pos,
                    size: len,
                    key: (flags & 16 /* AVFIndexFlags.AVIIF_INDEX */) > 0,
                    dts: streamContext.currentDts
                });
                lastIdx = pos;
            }
            streamContext.currentDts += this.getDuration(streamContext, len);
            lastPos = pos;
            if (flags & 16 /* AVFIndexFlags.AVIIF_INDEX */) {
                anyKey = true;
            }
        }
        if (!anyKey) {
            formatContext.streams.forEach((stream) => {
                const streamContext = stream.privData;
                if (streamContext.samples?.length) {
                    streamContext.samples[0].key = true;
                }
            });
        }
        return 0;
    }
    async loadIndex(formatContext) {
        let pos = formatContext.ioReader.getPos();
        const currentDts = {};
        formatContext.streams.forEach((stream) => {
            const streamContext = stream.privData;
            currentDts[stream.index] = streamContext.currentDts;
        });
        if (this.context.moviEnd >= this.context.fileSize) {
            return;
        }
        await formatContext.ioReader.seek(this.context.moviEnd);
        while (true) {
            const tag = await formatContext.ioReader.readString(4);
            const size = await formatContext.ioReader.readUint32();
            let next = formatContext.ioReader.getPos();
            if (next < 0 || next > avutil_constant__WEBPACK_IMPORTED_MODULE_9__.INT64_MAX - BigInt(Math.floor(size + (size & 1)))) {
                break;
            }
            next += BigInt(Math.floor(size + (size & 1)));
            if (tag === 'idx1') {
                await this.readIdx1(formatContext, size);
                break;
            }
            await formatContext.ioReader.seek(next);
        }
        await formatContext.ioReader.seek(pos);
        this.context.indexLoaded = true;
        formatContext.streams.forEach((stream) => {
            const streamContext = stream.privData;
            streamContext.currentDts = currentDts[stream.index];
        });
    }
    getNextSample(formatContext) {
        let sample;
        let stream;
        let bestDts = BigInt(0);
        let posSample;
        let posStream;
        let dtsSample;
        let dtsStream;
        formatContext.streams.forEach((s) => {
            const context = s.privData;
            if (!context.samples || !context.samples.length) {
                context.sampleEnd = true;
                return true;
            }
            if (!context.sampleEnd
                && (!posSample
                    || (context.samples[context.currentSample].pos < posSample.pos))) {
                posSample = context.samples[context.currentSample];
                posStream = s;
            }
            if (!context.sampleEnd
                && (!dtsSample
                    || (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(context.samples[context.currentSample].dts, s.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q)
                        < bestDts)) {
                dtsSample = context.samples[context.currentSample];
                bestDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(dtsSample.dts, s.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q);
                dtsStream = s;
            }
        });
        if (posSample && dtsSample) {
            const posDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(posSample.dts, posStream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q);
            const dtsDts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(dtsSample.dts, dtsStream.timeBase, avutil_constant__WEBPACK_IMPORTED_MODULE_9__.AV_TIME_BASE_Q);
            const diff = Math.abs(Number(posDts - dtsDts));
            if (!(formatContext.ioReader.flags & 1 /* IOFlags.SEEKABLE */)) {
                sample = posSample;
                stream = posStream;
            }
            else {
                // 两者时间差值在 5s 内优先 pos，避免来回 seek
                if (diff < 5000000) {
                    const posDiff = Math.abs(Number(posSample.pos - formatContext.ioReader.getPos()));
                    const dtsDiff = Math.abs(Number(dtsSample.pos - formatContext.ioReader.getPos()));
                    if (posDiff > dtsDiff) {
                        sample = dtsSample;
                        stream = dtsStream;
                    }
                    else {
                        sample = posSample;
                        stream = posStream;
                    }
                }
                else {
                    sample = dtsSample;
                    stream = dtsStream;
                }
            }
        }
        else if (posSample) {
            sample = posSample;
            stream = posStream;
        }
        else if (dtsSample) {
            sample = dtsSample;
            stream = dtsStream;
        }
        if (stream) {
            const streamContext = stream.privData;
            streamContext.currentSample++;
            if (streamContext.currentSample
                >= streamContext.samples.length) {
                streamContext.sampleEnd = true;
            }
        }
        return {
            sample,
            stream
        };
    }
    async readAVPacket_(formatContext, avpacket) {
        if (this.context.currentIndex < 0) {
            if (this.context.nonInterleaved && formatContext.streams.length > 1) {
                const { sample, stream } = this.getNextSample(formatContext);
                if (sample) {
                    await formatContext.ioReader.seek(sample.pos);
                    const streamContext = stream.privData;
                    streamContext.currentDts = sample.dts;
                }
                else {
                    return -1048576 /* IOError.END */;
                }
            }
            while (true) {
                let ret = await this.syncChunk(formatContext);
                if (ret < 0) {
                    return ret;
                }
                // 可能存在一些空帧
                if (this.context.remaining) {
                    break;
                }
                const stream = formatContext.streams[this.context.currentIndex];
                if (!stream) {
                    return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
                }
                const streamContext = stream.privData;
                streamContext.currentDts += this.getDuration(streamContext, 0);
            }
        }
        const stream = formatContext.streams[this.context.currentIndex];
        if (!stream) {
            return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
        }
        const streamContext = stream.privData;
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 76, stream.timeBase.den);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 72, stream.timeBase.num);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 32, stream.index);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, streamContext.currentDts);
        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, formatContext.ioReader.getPos() - BigInt(8));
        if (stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            if (streamContext.samples?.length) {
                let index = common_util_array__WEBPACK_IMPORTED_MODULE_18__.binarySearch(streamContext.samples, (sample) => {
                    if (sample.dts > streamContext.currentDts) {
                        return -1;
                    }
                    else if (sample.dts === streamContext.currentDts) {
                        return 0;
                    }
                    return 1;
                });
                if (index > -1) {
                    if (streamContext.samples[index].key) {
                        cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                    }
                }
            }
            else {
                if (!this.context.hasVideoKey) {
                    cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
                    this.context.hasVideoKey = true;
                }
            }
        }
        else {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[15](avpacket + 36, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[15](avpacket + 36) | 1 /* AVPacketFlags.AV_PKT_FLAG_KEY */);
        }
        this.context.lastPktPos = formatContext.ioReader.getPos();
        let size;
        if (streamContext.dwSampleSize <= 1) {
            size = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.INT32_MAX;
        }
        else if (streamContext.dwSampleSize < 32) {
            size = 1024 * streamContext.dwSampleSize;
        }
        else {
            size = streamContext.dwSampleSize;
        }
        if (size > this.context.remaining) {
            size = this.context.remaining;
        }
        const data = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(size);
        await formatContext.ioReader.readBuffer(size, (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.mapSafeUint8Array)(data, size));
        (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketData)(avpacket, data, size);
        if (streamContext.hasPal && size < avutil_constant__WEBPACK_IMPORTED_MODULE_9__.INT32_MAX / 2 && !this.context.dvDemux) {
            const pal = (0,avutil_util_mem__WEBPACK_IMPORTED_MODULE_6__.avMalloc)(avutil_pixfmt__WEBPACK_IMPORTED_MODULE_29__.AVPALETTE_SIZE);
            (0,cheap_std_memory__WEBPACK_IMPORTED_MODULE_5__.memcpyFromUint8Array)(pal, avutil_pixfmt__WEBPACK_IMPORTED_MODULE_29__.AVPALETTE_SIZE, new Uint8Array(streamContext.pal.buffer));
            (0,avutil_util_avpacket__WEBPACK_IMPORTED_MODULE_7__.addAVPacketSideData)(avpacket, 0 /* AVPacketSideDataType.AV_PKT_DATA_PALETTE */, pal, avutil_pixfmt__WEBPACK_IMPORTED_MODULE_29__.AVPALETTE_SIZE);
            streamContext.hasPal = false;
        }
        if (streamContext.dwSampleSize) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 16, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) / BigInt(streamContext.dwSampleSize >> 0));
        }
        if (!(stream.codecpar.flags & 2 /* AVCodecParameterFlags.AV_CODECPAR_FLAG_NO_PTS */)) {
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 8, cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16));
        }
        streamContext.currentDts += this.getDuration(streamContext, size);
        this.context.remaining -= size;
        if (!this.context.remaining) {
            this.context.currentIndex = -1;
            this.context.packetSize = 0;
        }
        return 0;
    }
    async readAVPacket(formatContext, avpacket) {
        try {
            return await this.readAVPacket_(formatContext, avpacket);
        }
        catch (error) {
            if (formatContext.ioReader.error !== -1048576 /* IOError.END */
                && formatContext.ioReader.error !== -1048572 /* IOError.ABORT */) {
                common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read packet error, ${error}`, cheap__fileName__0, 1063);
                return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
            }
            return formatContext.ioReader.error;
        }
    }
    async syncChunk(formatContext) {
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
        while (true) {
            try {
                if (formatContext.ioReader.flags & 8 /* IOFlags.ABORT */) {
                    break;
                }
                const now = formatContext.ioReader.getPos();
                const type = await formatContext.ioReader.readString(4);
                const size = await formatContext.ioReader.readUint32();
                if ((this.context.ioFileSize ? now : BigInt(0)) + BigInt(size) > this.context.fileSize
                    || type.charCodeAt(0) > 127) {
                    await formatContext.ioReader.seek(now + BigInt(1));
                    continue;
                }
                if (type[0] === 'i' && type[1] === 'x' && this.getStreamIndex(type.slice(2)) < formatContext.streams.length
                    || type === 'JUNK'
                    || type === 'idx1'
                    || type === 'indx') {
                    await formatContext.ioReader.skip(size);
                    continue;
                }
                if (type === 'LIST') {
                    await formatContext.ioReader.skip(4);
                    continue;
                }
                const index = this.getStreamIndex(type);
                if (!((now - this.context.lastPktPos) & BigInt(1)) && this.getStreamIndex(type.slice(1)) < formatContext.streams.length) {
                    continue;
                }
                if (type[2] == 'i' && type[3] == 'x' && index < formatContext.streams.length) {
                    await formatContext.ioReader.skip(size);
                    continue;
                }
                if (type[2] == 'w' && type[3] == 'c' && index < formatContext.streams.length) {
                    await formatContext.ioReader.skip(56);
                    continue;
                }
                if (this.context.dvDemux && index !== 0) {
                    continue;
                }
                if (index < formatContext.streams.length) {
                    const stream = formatContext.streams[index];
                    const streamContext = stream.privData;
                    if (type[2] == 'p' && type[3] == 'c' && size <= 1028) {
                        let k = await formatContext.ioReader.readUint8();
                        const last = (k + (await formatContext.ioReader.readUint8()) - 1) & 0xFF;
                        await formatContext.ioReader.skip(2);
                        for (; k <= last; k++) {
                            streamContext.pal[k] = -16777216 | (await formatContext.ioReader.readUint32()) >> 8;
                        }
                        streamContext.hasPal = true;
                        continue;
                    }
                    else {
                        this.context.currentIndex = index;
                        this.context.remaining = size;
                        this.context.packetSize = size + 8;
                        // streamContext.currentDts += this.getDuration(streamContext, size)
                        pos = formatContext.ioReader.getPos();
                        break;
                    }
                }
                await formatContext.ioReader.seek(now + BigInt(1));
            }
            catch (error) {
                if (formatContext.ioReader.error !== -1048576 /* IOError.END */
                    && formatContext.ioReader.error !== -1048572 /* IOError.ABORT */) {
                    common_util_logger__WEBPACK_IMPORTED_MODULE_2__.error(`read packet error, ${error}`, cheap__fileName__0, 1153);
                    return avutil_error__WEBPACK_IMPORTED_MODULE_3__.DATA_INVALID;
                }
                return formatContext.ioReader.error;
            }
        }
        if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
            await formatContext.ioReader.seek(pos);
        }
        return 0;
    }
    async seek(formatContext, stream, timestamp, flags) {
        const now = formatContext.ioReader.getPos();
        if (flags & 2 /* AVSeekFlags.BYTE */) {
            await formatContext.ioReader.seek(timestamp);
            if (!(flags & 4 /* AVSeekFlags.ANY */)) {
                await this.syncChunk(formatContext);
            }
            return now;
        }
        if (!this.context.indexLoaded) {
            BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.OPERATE_NOT_SUPPORT);
        }
        const streamContext = stream.privData;
        let pos = avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT;
        let index = common_util_array__WEBPACK_IMPORTED_MODULE_18__.binarySearch(streamContext.samples, (item) => {
            if (item.dts > timestamp) {
                return -1;
            }
            else if (item.dts === timestamp) {
                return 0;
            }
            return 1;
        });
        if (index > -1 && stream.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
            let i = index;
            for (; i >= 0; i--) {
                if (streamContext.samples[i].key) {
                    index = i;
                    break;
                }
            }
            if (i < 0) {
                index = -1;
            }
        }
        if (index > -1) {
            streamContext.currentDts = streamContext.samples[index].dts;
            streamContext.sampleEnd = false;
            streamContext.currentSample = index;
            pos = streamContext.samples[index].pos;
            common_util_array__WEBPACK_IMPORTED_MODULE_18__.each(formatContext.streams, (st) => {
                if (st !== stream) {
                    const stContext = st.privData;
                    let timestamp = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_13__.avRescaleQ)(streamContext.currentDts, stream.timeBase, st.timeBase);
                    let index = common_util_array__WEBPACK_IMPORTED_MODULE_18__.binarySearch(stContext.samples, (sample) => {
                        if (sample.dts > timestamp) {
                            return -1;
                        }
                        else if (sample.dts === timestamp) {
                            return 0;
                        }
                        return 1;
                    });
                    if (index > -1 && st.codecpar.codecType === 0 /* AVMediaType.AVMEDIA_TYPE_VIDEO */) {
                        let i = index;
                        for (; i >= 0; i--) {
                            if (stContext.samples[i].key) {
                                index = i;
                                break;
                            }
                        }
                        if (i < 0) {
                            index = -1;
                        }
                    }
                    if (index >= 0) {
                        pos = common_util_bigint__WEBPACK_IMPORTED_MODULE_17__.min(pos, stContext.samples[index].pos);
                        stContext.currentDts = stContext.samples[index].dts;
                        stContext.currentSample = index;
                        stContext.sampleEnd = false;
                    }
                }
            });
            if (pos !== avutil_constant__WEBPACK_IMPORTED_MODULE_9__.NOPTS_VALUE_BIGINT) {
                await formatContext.ioReader.seek(pos);
                this.context.currentIndex = -1;
            }
            return now;
        }
        return BigInt(avutil_error__WEBPACK_IMPORTED_MODULE_3__.OPERATE_NOT_SUPPORT);
    }
    getAnalyzeStreamsCount() {
        return this.context.header.dwStreams;
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

/***/ "./src/avutil/codecs/aac.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/aac.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AACProfile2Name: () => (/* binding */ AACProfile2Name),
/* harmony export */   avCodecParameters2Extradata: () => (/* binding */ avCodecParameters2Extradata),
/* harmony export */   parseADTSHeader: () => (/* binding */ parseADTSHeader),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseLATMHeader: () => (/* binding */ parseLATMHeader)
/* harmony export */ });
/* unused harmony exports MPEG4SamplingFrequencyIndex, MPEG4SamplingFrequencies, MPEG4Channels, getAVCodecParameters */
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

/***/ "./src/avutil/codecs/av1.ts":
/*!**********************************!*\
  !*** ./src/avutil/codecs/av1.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AV1Profile2Name: () => (/* binding */ AV1Profile2Name),
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, AV1LevelIdx, getLevelByResolution, parseSequenceHeader, splitOBU, generateExtradata */
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
/* harmony export */   parseAVCodecParameters: () => (/* binding */ parseAVCodecParameters),
/* harmony export */   parseExtraData: () => (/* binding */ parseExtraData)
/* harmony export */ });
/* unused harmony exports LevelCapabilities, getLevelByResolution, generateExtradata, isIDR */
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

/***/ "./src/avutil/pixfmt.ts":
/*!******************************!*\
  !*** ./src/avutil/pixfmt.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AVPALETTE_SIZE: () => (/* binding */ AVPALETTE_SIZE)
/* harmony export */ });
/* unused harmony exports AVPALETTE_COUNT, AV_VIDEO_MAX_PLANES */
/*
 * libmedia AVPixelFormat
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
const AVPALETTE_SIZE = 1024;
const AVPALETTE_COUNT = 256;
const AV_VIDEO_MAX_PLANES = 4;


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
//# sourceMappingURL=src_avformat_formats_IAviFormat_ts.avplayer.js.map