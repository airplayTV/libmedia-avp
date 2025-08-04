"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_bsf_ac3_Ac32RawFilter_ts-src_avformat_bsf_mp3_Mp32RawFilter_ts"],{

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
/* harmony import */ var avutil_codecs_ac3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! avutil/codecs/ac3 */ "./src/avutil/codecs/ac3.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
/* harmony import */ var common_util_is__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/util/is */ "./src/common/util/is.ts");
const cheap__fileName__5 = "src\\avformat\\bsf\\ac3\\Ac32RawFilter.ts";













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
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) !== avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) : cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
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
            const info = avutil_codecs_ac3__WEBPACK_IMPORTED_MODULE_10__.parseHeader(buffer.subarray(i));
            if (common_util_is__WEBPACK_IMPORTED_MODULE_12__.number(info)) {
                let j = i + 1;
                for (; j < buffer.length - 1; j++) {
                    const syncWord = (buffer[j] << 8) | buffer[j + 1];
                    if (syncWord === 0x0B77) {
                        i = j;
                        break;
                    }
                }
                if (j < buffer.length - 1) {
                    continue;
                }
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error('parse ac3 header failed', cheap__fileName__5, 97);
                return avutil_error__WEBPACK_IMPORTED_MODULE_5__.DATA_INVALID;
            }
            const item = {
                dts: lastDts,
                buffer: null,
                duration: avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE,
                pos: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 56)
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
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, item.pos);
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
        this.caches.length = 0;
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
/* harmony import */ var avutil_codecs_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! avutil/codecs/mp3 */ "./src/avutil/codecs/mp3.ts");
/* harmony import */ var common_function_concatTypeArray__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! common/function/concatTypeArray */ "./src/common/function/concatTypeArray.ts");
const cheap__fileName__5 = "src\\avformat\\bsf\\mp3\\Mp32RawFilter.ts";













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
        let lastDts = this.lastDts || (cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) !== avutil_constant__WEBPACK_IMPORTED_MODULE_6__.NOPTS_VALUE_BIGINT ? cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 16) : cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8));
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
                let j = i + 1;
                for (; j < buffer.length - 1; j++) {
                    const syncWord = (buffer[j] << 4) | ((buffer[j + 1] >> 4) & 0x0e);
                    if (syncWord === 0xFFE) {
                        i = j;
                        break;
                    }
                }
                if (j < buffer.length - 1) {
                    continue;
                }
                common_util_logger__WEBPACK_IMPORTED_MODULE_4__.error(`found syncWord not 0xFFE, got: 0x${syncWord.toString(16)}`, cheap__fileName__5, 94);
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
                pos: cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 56)
            };
            const sampleRate = avutil_codecs_mp3__WEBPACK_IMPORTED_MODULE_11__.getSampleRateByVersionIndex(ver, samplingFreqIndex);
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
            cheap_ctypeEnumWrite__WEBPACK_IMPORTED_MODULE_1__.CTypeEnumWrite[17](avpacket + 56, item.pos);
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
        this.caches.length = 0;
        return 0;
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
/* harmony import */ var avutil_codecs_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! avutil/codecs/mp3 */ "./src/avutil/codecs/mp3.ts");
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
    let frameSize = avutil_codecs_mp3__WEBPACK_IMPORTED_MODULE_0__.getBitRateByVersionLayerIndex(header.version, header.layer, header.bitrateIndex);
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_bsf_ac3_Ac32RawFilter_ts-src_avformat_bsf_mp3_Mp32RawFilter_ts.avtranscoder.js.map