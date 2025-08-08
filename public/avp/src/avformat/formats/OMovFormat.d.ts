import OFormat from './OFormat';
import AVPacket from 'avutil/struct/avpacket';
import { AVOFormatContext } from '../AVFormatContext';
import { MovFragmentMode, MovMode } from './mov/mov';
import { AVStreamMetadataEncryption } from 'avutil/AVStream';
import { AVFormat } from 'avutil/avformat';
export { MovFragmentMode, MovMode };
export interface OMovFormatOptions {
    /**
     * fragment 按 gop 分段还是按帧分段
     */
    fragmentMode?: MovFragmentMode;
    /**
     * mp4 还是 mov
     */
    movMode?: MovMode;
    /**
     * fragment 模式
     */
    fragment?: boolean;
    /**
     * moov 放到文件开头
     */
    fastOpen?: boolean;
    /**
     * data offset 基于 moof box(mse 使用）
     */
    defaultBaseIsMoof?: boolean;
    /**
     * 忽略 editlist box 的约束
     */
    ignoreEditlist?: boolean;
    /**
     * drm 加密信息
     */
    encryption?: AVStreamMetadataEncryption;
    /**
     * 保留 avcc 码流中的 sps，用于封装 sps 中途更改的流
     */
    reverseSpsInAvcc?: boolean;
    /**
     * 忽略 drm 数据写入
     */
    ignoreEncryption?: boolean;
    /**
     * fragment 最短时长（只有音频时使用，默认 5 秒）
     */
    minFragmentLength?: number;
    /**
     * fragment index 最短时长（只有音频时使用，默认 5 秒）
     */
    minFragmentIndexLength?: number;
    /**
     * fragment 结束时是否追加 tfra 用于 seek
     */
    hasTfra?: boolean;
}
export default class OMovFormat extends OFormat {
    type: AVFormat;
    private context;
    options: OMovFormatOptions;
    private annexb2AvccFilter;
    private avpacket;
    constructor(options?: OMovFormatOptions);
    init(formatContext: AVOFormatContext): number;
    destroy(formatContext: AVOFormatContext): Promise<void>;
    private enableStreams;
    writeHeader(formatContext: AVOFormatContext): number;
    private updateCurrentChunk;
    private updateCurrentFragment;
    private handleEAC3;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(formatContext: AVOFormatContext): number;
}
