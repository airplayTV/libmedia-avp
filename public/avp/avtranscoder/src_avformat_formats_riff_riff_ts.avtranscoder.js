"use strict";
(self["webpackChunkAVTranscoder"] = self["webpackChunkAVTranscoder"] || []).push([["src_avformat_formats_riff_riff_ts"],{

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


/***/ })

}]);
//# sourceMappingURL=src_avformat_formats_riff_riff_ts.avtranscoder.js.map