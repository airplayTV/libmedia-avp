"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[94],{64436:(e,t,a)=>{a.d(t,{A:()=>o});var r=a(134),i=a(63939),s=a(37837),n=a(71766);class o{constructor(){(0,r.A)(this,"inCodecpar",void 0),(0,r.A)(this,"inTimeBase",void 0),(0,r.A)(this,"outCodecpar",void 0)}init(e,t){return this.inCodecpar=(0,s.Gy)(168),(0,n.Yi)(this.inCodecpar,e),this.inTimeBase={den:i.f[15](t+4),num:i.f[15](t)},0}destroy(){this.inCodecpar&&((0,n.dn)(this.inCodecpar),this.inCodecpar=0)}}},36488:(e,t,a)=>{a.d(t,{A:()=>B});var r=a(134),i=a(63939),s=a(50932),n=a(77162),o=a(29170),c=a(64436),d=a(14686),f=a(4624),h=a(9705),l=a(77231),p=a(58469),u=a(44328),m=a(37837),g=a(71517),R=a(37246),y=a(67672);class B extends c.A{constructor(...e){super(...e),(0,r.A)(this,"bitReader",void 0),(0,r.A)(this,"streamMuxConfig",void 0),(0,r.A)(this,"caches",void 0),(0,r.A)(this,"refSampleDuration",void 0)}init(e,t){return super.init(e,t),this.caches=[],this.refSampleDuration=BigInt(0),this.bitReader=new R.A,this.streamMuxConfig={profile:l.N_,sampleRate:l.N_,channels:l.N_},0}sendAVPacket(e){const t=(0,d.s3)(i.f[20](e+24),i.f[15](e+28));this.bitReader.appendBuffer(t);let a=i.f[17](e+16)||i.f[17](e+8);for(;this.bitReader.remainingLength()>=20;){const e=this.bitReader.getPointer(),t=p.f7(null,this.bitReader);if(y.ai(t))return f.z3("AACLATMParser parse failed","src\\avformat\\bsf\\aac\\LATM2RawFilter.ts",94),this.bitReader.reset(),h.LR;if(t.framePayloadLength>=this.bitReader.remainingLength()){this.bitReader.skipPadding(),this.bitReader.setPointer(e);break}t.useSameStreamMux||(this.streamMuxConfig.profile=t.profile,this.streamMuxConfig.sampleRate=t.sampleRate,this.streamMuxConfig.channels=t.channels);const r=t.framePayloadLength,c=new Uint8Array(r);for(let e=0;e<r;e++)c[e]=this.bitReader.readU(8);const g={dts:a,buffer:c,extradata:null};if(i.f[15](this.inCodecpar+48)!==this.streamMuxConfig.profile||i.f[15](this.inCodecpar+136)!==this.streamMuxConfig.sampleRate||i.f[15](this.inCodecpar+116)!==this.streamMuxConfig.channels){this.refSampleDuration=(0,u.k)(BigInt(Math.floor(1024/this.streamMuxConfig.sampleRate*l.SF)),l.KR,this.inTimeBase),s.M[15](this.inCodecpar+48,this.streamMuxConfig.profile),s.M[15](this.inCodecpar+136,this.streamMuxConfig.sampleRate),s.M[15](this.inCodecpar+116,this.streamMuxConfig.channels);const e=(0,p.Ij)((0,o.A)(this.inCodecpar,n.A));i.f[20](this.inCodecpar+12)&&(0,m.Eb)(i.f[20](this.inCodecpar+12)),s.M[20](this.inCodecpar+12,(0,m.sY)(e.length)),(0,d.lW)(i.f[20](this.inCodecpar+12),e.length,e),s.M[15](this.inCodecpar+16,e.length),g.extradata=e}this.caches.push(g),a+=this.refSampleDuration,this.bitReader.skipPadding()}return 0}receiveAVPacket(e){if(this.caches.length){(0,g.Up)(e);const t=this.caches.shift(),a=(0,m.sY)(t.buffer.length);if((0,d.lW)(a,t.buffer.length,t.buffer),(0,g.NX)(e,a,t.buffer.length),s.M[17](e+16,t.dts),s.M[17](e+8,t.dts),s.M[15](e+36,1|i.f[15](e+36)),s.M[17](e+48,this.refSampleDuration),t.extradata){const a=(0,m.sY)(t.extradata.length);(0,d.lW)(a,t.extradata.length,t.extradata),(0,g.Ow)(e,1,a,t.extradata.length)}return 0}return h.LT}reset(){return this.bitReader.reset(),0}}},58469:(e,t,a)=>{a.d(t,{Bq:()=>l,Hm:()=>n,Ij:()=>h,XC:()=>f,_5:()=>d,f7:()=>p,uF:()=>s});var r=a(77231),i=a(37246);const s={1:"Main",2:"LC",3:"LC",4:"LC",5:"HE",6:"HE"},n={96e3:0,88200:1,64e3:2,48e3:3,44100:4,32e3:5,24e3:6,22050:7,16e3:8,12e3:9,11025:10,8e3:11,7350:12},o=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350,r.N_,r.N_,r.N_],c=[r.N_,1,2,3,4,5,6,7];function d(e){let t=r.N_,a=r.N_,i=r.N_;var s,n;return e.length>=2&&(t=e[0]>>3&31,a=null!==(s=o[(7&e[0])<<1|e[1]>>7])&&void 0!==s?s:48e3,i=null!==(n=c[e[1]>>3&15])&&void 0!==n?n:2),{profile:t,sampleRate:a,channels:i}}function f(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t){const{profile:a,sampleRate:r,channels:i}=d(t);e.codecpar.profile=a,e.codecpar.sampleRate=r,e.codecpar.chLayout.nbChannels=i}}function h(e){const t=n[e.sampleRate],a=e.chLayout.nbChannels,r=new Uint8Array(2);return r[0]=(31&e.profile)<<3|(14&t)>>1,r[1]=(1&t)<<7|(15&a)<<3,r}function l(e){if(e.length<7)return-1;const t=e[0]<<4|e[1]>>4;if(4095!==t)return-1;const a=1&e[1],r=(192&e[2])>>>6,i=(60&e[2])>>>2,s=(1&e[2])<<2|(192&e[3])>>>6,n=(3&e[3])<<11|e[4]<<3|(224&e[5])>>>5,d=3&e[6];let f=1===a?7:9,h=n-f;return{syncWord:t,profile:r+1,sampleRate:o[i],channels:c[s],aacFrameLength:n,numberOfRawDataBlocksInFrame:d,headerLength:f,framePayloadLength:h}}function p(e,t){function a(){const e=t.readU(2);let a=0;for(let r=0;r<=e;r++)a<<=8,a|=t.readU(8);return a}t||(t=new i.A).appendBuffer(e);const r=t.getPointer(),s={syncWord:0,profile:0,sampleRate:0,channels:0,useSameStreamMux:!1,headerLength:0,framePayloadLength:0,muxLengthBytes:0},n=t.readU(11);if(695!==n)return-1;s.syncWord=n,s.muxLengthBytes=t.readU(13);const d=1===t.readU1();if(s.useSameStreamMux=d,!d){const e=1===t.readU1();if(e&&1===t.readU1())return-1;if(e&&a(),1!==t.readU1())return-1;if(0!==t.readU(6))return-1;if(0!==t.readU(4))return-1;if(0!==t.readU(3))return-1;let r=e?a():0;const i=t.readU(5);r-=5;const n=t.readU(4);r-=4;const d=t.readU(4);if(r-=4,t.readU(3),r-=3,r>0&&t.readU(r),0!==t.readU(3))return-1;if(t.readU(8),1===t.readU1())if(e)a();else{let e=0;for(;;){e<<=8;const a=1===t.readU1();if(e+=t.readU(8),!a)break}}1===t.readU1()&&t.readU(8),s.profile=i+1,s.sampleRate=o[n],s.channels=c[d]}let f=0;for(;;){const e=t.readU(8);if(f+=e,255!==e)break}return s.framePayloadLength=f,s.headerLength=t.getPointer()-r+(8===t.getBitLeft()?0:1),s}},47094:(e,t,a)=>{a.r(t),a.d(t,{default:()=>M});var r=a(134),i=a(61499),s=a(63939),n=a(50932),o=a(4624),c=a(9705),d=a(85947),f=a(14686),h=a(37837),l=a(71517),p=a(44328),u=a(77231),m=a(72739),g=a(58469),R=a(67672),y=a(36488),B="src\\avformat\\formats\\IAacFormat.ts";const k=1024;class M extends d.A{constructor(){super(),(0,r.A)(this,"type",15),(0,r.A)(this,"frameType",void 0),(0,r.A)(this,"fileSize",void 0),(0,r.A)(this,"currentPts",void 0),(0,r.A)(this,"latmFilter",void 0)}init(e){this.currentPts=BigInt(0)}async destroy(e){this.latmFilter&&(this.latmFilter.destroy(),this.latmFilter=null)}async estimateTotalBlock(e){let t=0;const a=e.ioReader.getPos();for(;;)try{const a=await e.ioReader.peekBuffer(7),r=(3&a[3])<<11|a[4]<<3|(224&a[5])>>>5;t+=1+(3&a[6]),await e.ioReader.skip(r)}catch(e){break}return await e.ioReader.seek(a),t}async readHeader(e){const t=await e.ioReader.peekBuffer(4);if(this.fileSize=await e.ioReader.fileSize(),65===t[0]&&68===t[1]&&73===t[2]&&70===t[3]){const t=e.createStream();t.codecpar.codecId=86018,t.codecpar.codecType=1,this.frameType=0,t.duration=this.fileSize,t.timeBase.den=16384,t.timeBase.num=1}else if(255!==t[0]||240&~t[1]){if(86!==t[0]||224&~t[1])return c.LR;{this.frameType=2;const t=e.createStream();t.codecpar.codecId=86018,t.codecpar.codecType=1;const a=(0,g.f7)(await e.ioReader.peekBuffer(20));if(R.ai(a))return c.LR;t.codecpar.profile=a.profile,t.codecpar.sampleRate=a.sampleRate,t.codecpar.chLayout.nbChannels=a.channels;const r=(0,g.Ij)(t.codecpar);t.codecpar.extradata=(0,h.sY)(r.length),(0,f.lW)(t.codecpar.extradata,r.length,r),t.codecpar.extradataSize=r.length,t.duration=this.fileSize,t.timeBase.den=16384,t.timeBase.num=1,this.latmFilter=new y.A,this.latmFilter.init(t.codecpar[i.o9],t.timeBase[i.o9])}}else{this.frameType=1;const t=e.createStream();t.codecpar.codecId=86018,t.codecpar.codecType=1;const a=(0,g.Bq)(await e.ioReader.peekBuffer(20));if(R.ai(a))return c.LR;t.codecpar.profile=a.profile,t.codecpar.sampleRate=a.sampleRate,t.codecpar.chLayout.nbChannels=a.channels;const r=(0,g.Ij)(t.codecpar);t.codecpar.extradata=(0,h.sY)(r.length),(0,f.lW)(t.codecpar.extradata,r.length,r),t.codecpar.extradataSize=r.length,t.timeBase.den=t.codecpar.sampleRate,t.timeBase.num=1,t.duration=(0,p.k)(BigInt(Math.floor(1024*await this.estimateTotalBlock(e)/t.codecpar.sampleRate*u.SF)),u.KR,t.timeBase)}return 0}async readAVPacket(e,t){const a=e.streams.find((e=>e.codecpar.codecType=1));try{const r=e.ioReader.getPos();let i;if(0===this.frameType){i=await e.ioReader.readBuffer(Math.min(k,Number(BigInt.asIntN(32,this.fileSize-r))));const a=(0,h.sY)(i.length);(0,f.lW)(a,i.length,i),(0,l.NX)(t,a,i.length),n.M[17](t+48,BigInt(k)),n.M[17](t+56,r)}else if(1===this.frameType){const s=await e.ioReader.readBuffer(7),o=1&s[1],c=(3&s[3])<<11|s[4]<<3|(224&s[5])>>>5,d=3&s[6];let m=1===o?7:9,g=c-m;9===m&&await e.ioReader.skip(2);const R=(0,p.k)(BigInt(Math.floor(1024*(d+1)/a.codecpar.sampleRate*u.SF)),u.KR,a.timeBase);n.M[17](t+48,R),i=await e.ioReader.readBuffer(g);const y=(0,h.sY)(i.length);(0,f.lW)(y,i.length,i),(0,l.NX)(t,y,i.length),n.M[17](t+56,r)}else if(2===this.frameType){if(r===this.fileSize)return-1048576;for(;;){let a=this.latmFilter.receiveAVPacket(t);if(a!==c.LT){if(a<0)return a;n.M[17](t+48,BigInt(0|s.f[15](t+28))),n.M[17](t+56,this.currentPts);break}{if(e.ioReader.getPos()===this.fileSize)return-1048576;i=await e.ioReader.readBuffer(Math.min(k,Number(BigInt.asIntN(32,this.fileSize-r))));const a=(0,h.sY)(i.length);(0,f.lW)(a,i.length,i),(0,l.NX)(t,a,i.length),this.latmFilter.sendAVPacket(t)}}}return n.M[15](t+32,a.index),n.M[15](t+76,a.timeBase.den),n.M[15](t+72,a.timeBase.num),n.M[17](t+16,this.currentPts),n.M[17](t+8,this.currentPts),this.currentPts+=s.f[17](t+48),0}catch(t){return-1048576!==e.ioReader.error?(o.z3(`read packet error, ${t}`,B,271),c.LR):e.ioReader.error}}async syncFrame(e){if(0===this.frameType)return;let t=u.Dh;const a=1===this.frameType?4095:695,r=1===this.frameType?4:5;for(;;)try{let i=0;for(t=e.ioReader.getPos();3!==i&&await e.ioReader.peekUint16()>>>r===a;){const t=1===this.frameType?(0,g.Bq)(await e.ioReader.peekBuffer(9)):(0,g.f7)(await e.ioReader.peekBuffer(20));if(R.ai(t))break;i++,await e.ioReader.skip(t.headerLength+t.framePayloadLength)}if(3===i)break;await e.ioReader.skip(1)}catch(e){break}t!==u.Dh&&await e.ioReader.seek(t)}async seek(e,t,a,r){if(1===this.frameType){const i=e.ioReader.getPos();if(2&r){const s=await e.ioReader.fileSize();return s<=BigInt(0)?BigInt(c.E$):(a<BigInt(0)?a=BigInt(0):a>s&&(a=s),await e.ioReader.seek(a),4&r||(await this.syncFrame(e),t.duration&&this.fileSize&&(this.currentPts=a/this.fileSize*t.duration)),i)}if(t&&t.sampleIndexes.length){let r=m.El(t.sampleIndexes,(e=>e.pts>a?-1:1));if(r>0&&(0,p.k)(a-t.sampleIndexes[r-1].pts,t.timeBase,u.i0)<BigInt(5e3))return o.Yz(`seek in sampleIndexes, found index: ${r}, pts: ${t.sampleIndexes[r-1].pts}, pos: ${t.sampleIndexes[r-1].pos}`,B,370),await e.ioReader.seek(t.sampleIndexes[r-1].pos),this.currentPts=a,i}if(o.Yz("not found any keyframe index, try to seek in bytes",B,377),!t.duration)return BigInt(c.E$);{await e.ioReader.seek(BigInt(0));let r=BigInt(0);for(;;)try{if(r>=a)return this.currentPts=r,i;const s=await e.ioReader.peekBuffer(7),n=(3&s[3])<<11|s[4]<<3|(224&s[5])>>>5,o=3&s[6];r+=(0,p.k)(BigInt(Math.floor(1024*(o+1)/t.codecpar.sampleRate*u.SF)),u.KR,t.timeBase),await e.ioReader.skip(n)}catch(e){return BigInt(c.E$)}}}else if(0===this.frameType||2===this.frameType){this.latmFilter&&this.latmFilter.reset();const t=e.ioReader.getPos();return a<BigInt(0)?a=BigInt(0):a>this.fileSize&&(a=this.fileSize),await e.ioReader.seek(a),this.currentPts=a,2!==this.frameType||4&r||await this.syncFrame(e),t}return BigInt(c.E$)}getAnalyzeStreamsCount(){return 1}}},85947:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(134);class i{constructor(){(0,r.A)(this,"type",-1),(0,r.A)(this,"onStreamAdd",void 0)}async destroy(e){}}}}]);