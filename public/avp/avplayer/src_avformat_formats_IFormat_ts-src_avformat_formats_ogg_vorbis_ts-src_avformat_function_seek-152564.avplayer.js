"use strict";
(self["webpackChunkAVPlayer"] = self["webpackChunkAVPlayer"] || []).push([["src_avformat_formats_IFormat_ts-src_avformat_formats_ogg_vorbis_ts-src_avformat_function_seek-152564"],{

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
        this.vendorString = "v0.9.0-15-gdd5cd674";
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
/* harmony export */   parseVorbisComment: () => (/* binding */ parseVorbisComment)
/* harmony export */ });
/* unused harmony export addVorbisComment */
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
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`seek pts is earlier then 10s, seek to first packet pos(${firstPacketPos}) directly`, cheap__fileName__0, 62);
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
    while (true) {
        if (seekMax - seekMin < length) {
            pos = seekMin;
            break;
        }
        await context.ioReader.seek(bytes);
        await syncAVPacket(context);
        if (context.ioReader.flags & 8 /* IOFlags.ABORT */) {
            break;
        }
        const now = context.ioReader.getPos();
        let ret = await readAVPacket(context, avpacket);
        if (ret >= 0) {
            const currentPts = (0,avutil_util_rational__WEBPACK_IMPORTED_MODULE_4__.avRescaleQ2)(cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8), avpacket + 72, avutil_constant__WEBPACK_IMPORTED_MODULE_3__.AV_MILLI_TIME_BASE_Q);
            const diff = currentPts - pointPts;
            common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`try to seek to pos: ${bytes}, got packet pts: ${cheap_ctypeEnumRead__WEBPACK_IMPORTED_MODULE_0__.CTypeEnumRead[17](avpacket + 8)}(${currentPts}ms), diff: ${diff}ms`, cheap__fileName__0, 100);
            // seek 时间戳的前面 10 秒内
            if (diff <= BigInt(0) && -diff < BigInt(10000)) {
                pos = now;
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
        common_util_logger__WEBPACK_IMPORTED_MODULE_8__.debug(`finally seek to pos ${pos}`, cheap__fileName__0, 131);
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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_IFormat_ts-src_avformat_formats_ogg_vorbis_ts-src_avformat_function_seek-152564.avplayer.js.map