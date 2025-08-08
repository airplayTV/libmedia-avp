import { AVOFormatContext } from '../AVFormatContext';
import AVPacket from 'avutil/struct/avpacket';
import OFormat from './OFormat';
import { AVFormat } from 'avutil/avformat';
export interface OWavFormatOptions {
    forceRF64?: boolean;
}
export default class OWavFormat extends OFormat {
    type: AVFormat;
    private options;
    private minPts;
    private maxPts;
    private lastDuration;
    private sampleCount;
    private dataPos;
    private dsPos;
    constructor(options?: OWavFormatOptions);
    init(formatContext: AVOFormatContext): number;
    writeHeader(formatContext: AVOFormatContext): number;
    writeAVPacket(formatContext: AVOFormatContext, avpacket: pointer<AVPacket>): number;
    writeTrailer(formatContext: AVOFormatContext): number;
    flush(formatContext: AVOFormatContext): number;
}
