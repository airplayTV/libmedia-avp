import { AVOFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import OFormat from './OFormat';
import { AVFormat } from 'avutil/avformat';
export interface OMatroskaFormatOptions {
    /**
     * 是否是直播
     */
    isLive?: boolean;
    /**
     * mkv 还是 webm
     */
    docType?: string;
}
export default class OMatroskaFormat extends OFormat {
    type: AVFormat;
    private options;
    private context;
    private random;
    private randomView;
    private avpacket;
    private annexb2AvccFilter;
    constructor(options?: OMatroskaFormatOptions);
    init(formatContext: AVOFormatContext): number;
    destroy(formatContext: AVOFormatContext): Promise<void>;
    writeHeader(formatContext: AVOFormatContext): number;
    private writeBlock;
    private writeBlockGroup;
    private writeCluster;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(formatContext: AVOFormatContext): number;
}
