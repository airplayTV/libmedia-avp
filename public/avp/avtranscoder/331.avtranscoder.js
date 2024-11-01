"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[331],{64436:(e,t,a)=>{a.d(t,{A:()=>o});var r=a(134),i=a(63939),n=a(37837),s=a(71766);class o{constructor(){(0,r.A)(this,"inCodecpar",void 0),(0,r.A)(this,"inTimeBase",void 0),(0,r.A)(this,"outCodecpar",void 0)}init(e,t){return this.inCodecpar=(0,n.Gy)(168),(0,s.Yi)(this.inCodecpar,e),this.inTimeBase={den:i.f[15](t+4),num:i.f[15](t)},0}destroy(){this.inCodecpar&&((0,s.dn)(this.inCodecpar),this.inCodecpar=0)}}},50848:(e,t,a)=>{a.d(t,{A:()=>x});var r=a(134),i=a(63939),n=a(50932),s=a(77162),o=a(29170),c=a(64436),d=a(14686),l=a(4624),p=a(9705),h=a(77231),f=a(58469),u=a(44328),m=a(37837),g=a(71517),A=a(67672);class x extends c.A{constructor(...e){super(...e),(0,r.A)(this,"streamMuxConfig",void 0),(0,r.A)(this,"caches",void 0)}init(e,t){return super.init(e,t),this.caches=[],this.streamMuxConfig={profile:h.N_,sampleRate:h.N_,channels:h.N_},0}sendAVPacket(e){let t=0,a=i.f[17](e+16)||i.f[17](e+8);const r=(0,d.s3)(i.f[20](e+24),i.f[15](e+28)).slice();for(;t<r.length;){const e=f.Bq(r.subarray(t));if(A.ai(e))return l.z3("AACADTSParser parse failed","src\\avformat\\bsf\\aac\\ADTS2RawFilter.ts",81),p.LR;const c={dts:a,buffer:null,extradata:null,duration:h.N_};c.buffer=r.subarray(t+e.headerLength,t+e.headerLength+e.framePayloadLength),this.streamMuxConfig.profile=e.profile,this.streamMuxConfig.sampleRate=e.sampleRate,this.streamMuxConfig.channels=e.channels;const g=i.f[15](this.inCodecpar+48)!==this.streamMuxConfig.profile||i.f[15](this.inCodecpar+136)!==this.streamMuxConfig.sampleRate||i.f[15](this.inCodecpar+116)!==this.streamMuxConfig.channels,x=(0,u.k)(BigInt(Math.floor(1024*(e.numberOfRawDataBlocksInFrame+1)/this.streamMuxConfig.sampleRate*h.SF)),h.KR,this.inTimeBase);if(c.duration=Number(x),g){n.M[15](this.inCodecpar+48,this.streamMuxConfig.profile),n.M[15](this.inCodecpar+136,this.streamMuxConfig.sampleRate),n.M[15](this.inCodecpar+116,this.streamMuxConfig.channels);const e=(0,f.Ij)((0,o.A)(this.inCodecpar,s.A));i.f[20](this.inCodecpar+12)&&(0,m.Eb)(i.f[20](this.inCodecpar+12)),n.M[20](this.inCodecpar+12,(0,m.sY)(e.length)),(0,d.lW)(i.f[20](this.inCodecpar+12),e.length,e),n.M[15](this.inCodecpar+16,e.length),c.extradata=e}this.caches.push(c),t+=e.aacFrameLength,a+=x}return 0}receiveAVPacket(e){if(this.caches.length){(0,g.Up)(e);const t=this.caches.shift(),a=(0,m.sY)(t.buffer.length);if((0,d.lW)(a,t.buffer.length,t.buffer),(0,g.NX)(e,a,t.buffer.length),n.M[17](e+16,t.dts),n.M[17](e+8,t.dts),n.M[17](e+48,BigInt(Math.floor(t.duration))),n.M[15](e+36,1|i.f[15](e+36)),t.extradata){const a=(0,m.sY)(t.extradata.length);(0,d.lW)(a,t.extradata.length,t.extradata),(0,g.Ow)(e,1,a,t.extradata.length)}return 0}return p.LT}reset(){return 0}}},36488:(e,t,a)=>{a.d(t,{A:()=>y});var r=a(134),i=a(63939),n=a(50932),s=a(77162),o=a(29170),c=a(64436),d=a(14686),l=a(4624),p=a(9705),h=a(77231),f=a(58469),u=a(44328),m=a(37837),g=a(71517),A=a(37246),x=a(67672);class y extends c.A{constructor(...e){super(...e),(0,r.A)(this,"bitReader",void 0),(0,r.A)(this,"streamMuxConfig",void 0),(0,r.A)(this,"caches",void 0),(0,r.A)(this,"refSampleDuration",void 0)}init(e,t){return super.init(e,t),this.caches=[],this.refSampleDuration=BigInt(0),this.bitReader=new A.A,this.streamMuxConfig={profile:h.N_,sampleRate:h.N_,channels:h.N_},0}sendAVPacket(e){const t=(0,d.s3)(i.f[20](e+24),i.f[15](e+28));this.bitReader.appendBuffer(t);let a=i.f[17](e+16)||i.f[17](e+8);for(;this.bitReader.remainingLength()>=20;){const e=this.bitReader.getPointer(),t=f.f7(null,this.bitReader);if(x.ai(t))return l.z3("AACLATMParser parse failed","src\\avformat\\bsf\\aac\\LATM2RawFilter.ts",94),this.bitReader.reset(),p.LR;if(t.framePayloadLength>=this.bitReader.remainingLength()){this.bitReader.skipPadding(),this.bitReader.setPointer(e);break}t.useSameStreamMux||(this.streamMuxConfig.profile=t.profile,this.streamMuxConfig.sampleRate=t.sampleRate,this.streamMuxConfig.channels=t.channels);const r=t.framePayloadLength,c=new Uint8Array(r);for(let e=0;e<r;e++)c[e]=this.bitReader.readU(8);const g={dts:a,buffer:c,extradata:null};if(i.f[15](this.inCodecpar+48)!==this.streamMuxConfig.profile||i.f[15](this.inCodecpar+136)!==this.streamMuxConfig.sampleRate||i.f[15](this.inCodecpar+116)!==this.streamMuxConfig.channels){this.refSampleDuration=(0,u.k)(BigInt(Math.floor(1024/this.streamMuxConfig.sampleRate*h.SF)),h.KR,this.inTimeBase),n.M[15](this.inCodecpar+48,this.streamMuxConfig.profile),n.M[15](this.inCodecpar+136,this.streamMuxConfig.sampleRate),n.M[15](this.inCodecpar+116,this.streamMuxConfig.channels);const e=(0,f.Ij)((0,o.A)(this.inCodecpar,s.A));i.f[20](this.inCodecpar+12)&&(0,m.Eb)(i.f[20](this.inCodecpar+12)),n.M[20](this.inCodecpar+12,(0,m.sY)(e.length)),(0,d.lW)(i.f[20](this.inCodecpar+12),e.length,e),n.M[15](this.inCodecpar+16,e.length),g.extradata=e}this.caches.push(g),a+=this.refSampleDuration,this.bitReader.skipPadding()}return 0}receiveAVPacket(e){if(this.caches.length){(0,g.Up)(e);const t=this.caches.shift(),a=(0,m.sY)(t.buffer.length);if((0,d.lW)(a,t.buffer.length,t.buffer),(0,g.NX)(e,a,t.buffer.length),n.M[17](e+16,t.dts),n.M[17](e+8,t.dts),n.M[15](e+36,1|i.f[15](e+36)),n.M[17](e+48,this.refSampleDuration),t.extradata){const a=(0,m.sY)(t.extradata.length);(0,d.lW)(a,t.extradata.length,t.extradata),(0,g.Ow)(e,1,a,t.extradata.length)}return 0}return p.LT}reset(){return this.bitReader.reset(),0}}},61702:(e,t,a)=>{a.d(t,{A:()=>m});var r=a(134),i=a(63939),n=a(50932),s=a(64436),o=a(77231),c=a(44328),d=a(65451),l=a(4624),p=a(9705),h=a(71517),f=a(37837),u=a(14686);class m extends s.A{constructor(...e){super(...e),(0,r.A)(this,"caches",void 0)}init(e,t){return super.init(e,t),this.caches=[],0}sendAVPacket(e){let t=0,a=i.f[17](e+16)||i.f[17](e+8);const r=(0,h.iI)(e);for(;t<r.length;){const e=r[t]<<3|r[t+1]>>5;if(1023!==e)return l.z3(`MpegtsOpusParser found syncWord not 0x3ff, got: 0x${e.toString(16)}`,"src\\avformat\\bsf\\opus\\Mpegts2RawFilter.ts",67),p.LR;const n=!!(16&r[t+1]),s=!!(8&r[t+1]);let h=t+2,f=0;for(;255===r[h];)f+=255,h++;f+=r[h],h++,h+=n?2:0,h+=s?2:0;let u=r.subarray(h,h+f);const m=i.f[15](this.inCodecpar+136)>0?i.f[15](this.inCodecpar+136):48e3,g=(0,c.k)(BigInt(Math.floor(d.kt(u)/m*o.SF)),o.KR,this.inTimeBase);this.caches.push({dts:a,buffer:u.slice(),duration:Number(g)}),a+=g,t=h+f}}receiveAVPacket(e){if(this.caches.length){(0,h.Up)(e);const t=this.caches.shift(),a=(0,f.sY)(t.buffer.length);return(0,u.lW)(a,t.buffer.length,t.buffer),(0,h.NX)(e,a,t.buffer.length),n.M[17](e+16,t.dts),n.M[17](e+8,t.dts),n.M[15](e+36,1|i.f[15](e+36)),n.M[17](e+48,BigInt(Math.floor(t.duration))),0}return p.LR}reset(){return 0}}},58469:(e,t,a)=>{a.d(t,{Bq:()=>h,Hm:()=>s,Ij:()=>p,XC:()=>l,_5:()=>d,f7:()=>f,uF:()=>n});var r=a(77231),i=a(37246);const n={1:"Main",2:"LC",3:"LC",4:"LC",5:"HE",6:"HE"},s={96e3:0,88200:1,64e3:2,48e3:3,44100:4,32e3:5,24e3:6,22050:7,16e3:8,12e3:9,11025:10,8e3:11,7350:12},o=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350,r.N_,r.N_,r.N_],c=[r.N_,1,2,3,4,5,6,7];function d(e){let t=r.N_,a=r.N_,i=r.N_;var n,s;return e.length>=2&&(t=e[0]>>3&31,a=null!==(n=o[(7&e[0])<<1|e[1]>>7])&&void 0!==n?n:48e3,i=null!==(s=c[e[1]>>3&15])&&void 0!==s?s:2),{profile:t,sampleRate:a,channels:i}}function l(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t){const{profile:a,sampleRate:r,channels:i}=d(t);e.codecpar.profile=a,e.codecpar.sampleRate=r,e.codecpar.chLayout.nbChannels=i}}function p(e){const t=s[e.sampleRate],a=e.chLayout.nbChannels,r=new Uint8Array(2);return r[0]=(31&e.profile)<<3|(14&t)>>1,r[1]=(1&t)<<7|(15&a)<<3,r}function h(e){if(e.length<7)return-1;const t=e[0]<<4|e[1]>>4;if(4095!==t)return-1;const a=1&e[1],r=(192&e[2])>>>6,i=(60&e[2])>>>2,n=(1&e[2])<<2|(192&e[3])>>>6,s=(3&e[3])<<11|e[4]<<3|(224&e[5])>>>5,d=3&e[6];let l=1===a?7:9,p=s-l;return{syncWord:t,profile:r+1,sampleRate:o[i],channels:c[n],aacFrameLength:s,numberOfRawDataBlocksInFrame:d,headerLength:l,framePayloadLength:p}}function f(e,t){function a(){const e=t.readU(2);let a=0;for(let r=0;r<=e;r++)a<<=8,a|=t.readU(8);return a}t||(t=new i.A).appendBuffer(e);const r=t.getPointer(),n={syncWord:0,profile:0,sampleRate:0,channels:0,useSameStreamMux:!1,headerLength:0,framePayloadLength:0,muxLengthBytes:0},s=t.readU(11);if(695!==s)return-1;n.syncWord=s,n.muxLengthBytes=t.readU(13);const d=1===t.readU1();if(n.useSameStreamMux=d,!d){const e=1===t.readU1();if(e&&1===t.readU1())return-1;if(e&&a(),1!==t.readU1())return-1;if(0!==t.readU(6))return-1;if(0!==t.readU(4))return-1;if(0!==t.readU(3))return-1;let r=e?a():0;const i=t.readU(5);r-=5;const s=t.readU(4);r-=4;const d=t.readU(4);if(r-=4,t.readU(3),r-=3,r>0&&t.readU(r),0!==t.readU(3))return-1;if(t.readU(8),1===t.readU1())if(e)a();else{let e=0;for(;;){e<<=8;const a=1===t.readU1();if(e+=t.readU(8),!a)break}}1===t.readU1()&&t.readU(8),n.profile=i+1,n.sampleRate=o[s],n.channels=c[d]}let l=0;for(;;){const e=t.readU(8);if(l+=e,255!==e)break}return n.framePayloadLength=l,n.headerLength=t.getPointer()-r+(8===t.getBitLeft()?0:1),n}},87771:(e,t,a)=>{a.d(t,{R:()=>f,j:()=>i});var r=a(37246);const i=[3,4,3,7,259,263,1539,1543],n=[[64,69,96],[64,70,96],[80,87,120],[80,88,120],[96,104,144],[96,105,144],[112,121,168],[112,122,168],[128,139,192],[128,140,192],[160,174,240],[160,175,240],[192,208,288],[192,209,288],[224,243,336],[224,244,336],[256,278,384],[256,279,384],[320,348,480],[320,349,480],[384,417,576],[384,418,576],[448,487,672],[448,488,672],[512,557,768],[512,558,768],[640,696,960],[640,697,960],[768,835,1152],[768,836,1152],[896,975,1344],[896,976,1344],[1024,1114,1536],[1024,1115,1536],[1152,1253,1728],[1152,1254,1728],[1280,1393,1920],[1280,1394,1920]],s=[4,5,6,5],o=[4,6,7,6],c=[48e3,44100,32e3,0],d=[32,40,48,56,64,80,96,112,128,160,192,224,256,320,384,448,512,576,640],l=[2,1,2,3,3,4,4,5],p=[1,2,3,6],h=7;function f(e){const t=new r.A(e.length);t.appendBuffer(e);const a={syncWord:0,crc1:0,srCode:0,bitstreamId:0,bitstreamMode:0,channelMode:0,lfeOn:0,frameType:0,substreamId:0,centerMixLevel:0,surroundMixLevel:0,channelMap:0,numBlocks:0,dolbySurroundMode:0,srShift:0,sampleRate:0,bitrate:0,channels:0,frameSize:0,channelLayout:BigInt(0),ac3BitrateCode:0};if(a.syncWord=t.readU(16),2935!==a.syncWord)return-1;if(a.bitstreamId=31&t.peekU(29),a.bitstreamId>16)return-2;if(a.numBlocks=6,a.ac3BitrateCode=-1,a.centerMixLevel=5,a.surroundMixLevel=6,a.dolbySurroundMode=0,a.bitstreamId<=10){if(a.crc1=t.readU(16),a.srCode=t.readU(2),3===a.srCode)return-3;const e=t.readU(6);if(e>37)return-4;a.ac3BitrateCode=e>>1,t.readU(5),a.bitstreamMode=t.readU(3),a.channelMode=t.readU(3),2==a.channelMode?a.dolbySurroundMode=t.readU(2):(1&a.channelMode&&1!=a.channelMode&&(a.centerMixLevel=s[t.readU(2)]),4&a.channelMode&&(a.surroundMixLevel=o[t.readU(2)])),a.lfeOn=t.readU(1),a.srShift=Math.max(a.bitstreamId,8)-8,a.sampleRate=c[a.srCode]>>a.srShift,a.bitrate=1e3*d[a.ac3BitrateCode]>>a.srShift,a.channels=l[a.channelMode]+a.lfeOn,a.frameSize=2*n[e][a.srCode],a.frameType=2,a.substreamId=0}else{if(a.crc1=0,a.frameType=t.readU(2),3==a.frameType)return-5;if(a.substreamId=t.readU(3),a.frameSize=t.readU(11)+1<<1,a.frameSize<h)return-6;if(a.srCode=t.readU(2),3==a.srCode){const e=t.readU(2);if(3==e)return-7;a.sampleRate=c[e]/2,a.srShift=1}else a.numBlocks=p[t.readU(2)],a.sampleRate=c[a.srCode],a.srShift=0;a.channelMode=t.readU(3),a.lfeOn=t.readU(1),a.bitrate=8*a.frameSize*a.sampleRate/(256*a.numBlocks),a.channels=l[a.channelMode]+a.lfeOn}return a.channelLayout=BigInt(i[a.channelMode]),a.lfeOn&&(a.channelLayout|=BigInt(8)),a}},29347:(e,t,a)=>{a.d(t,{R:()=>d,u:()=>c});var r=a(37246),i=a(95073);const n=[1,2,2,2,2,3,3,4,4,5,6,6,6,7,8,8],s=[0,8e3,16e3,32e3,0,0,11025,22050,44100,0,0,12e3,24e3,48e3,96e3,192e3],o=[32e3,56e3,64e3,96e3,112e3,128e3,192e3,224e3,256e3,32e4,384e3,448e3,512e3,576e3,64e4,768e3,96e4,1024e3,1152e3,128e4,1344e3,1408e3,1411200,1472e3,1536e3,192e4,2048e3,3072e3,384e4,0,0,0],c=32;function d(e){const t=new r.A(e.length);t.appendBuffer(e);const a={syncWord:0,frameType:0,deficitSamples:0,crcFlag:0,sampleBlock:0,frameSize:0,channelIndex:0,sampleRateIndex:0,bitrateIndex:0,channels:0,sampleRate:0,bitrate:0};return a.syncWord=t.readU(32),2147385345!==a.syncWord&&4269736320!==a.syncWord?-1:(a.frameType=t.readU1(),a.deficitSamples=t.readU(5)+1,a.crcFlag=t.readU1(),a.sampleBlock=t.readU(7)+1,a.frameSize=(0,i.A)(t.readU(14)+1,4),a.channelIndex=t.readU(6),a.sampleRateIndex=t.readU(4),a.bitrateIndex=t.readU(5),a.channels=n[a.channelIndex],a.sampleRate=s[a.sampleRateIndex],a.bitrate=o[a.bitrateIndex],a)}},89088:(e,t,a)=>{a.d(t,{Au:()=>x,He:()=>y,XC:()=>I,Y2:()=>m,hG:()=>g,oz:()=>A});var r=a(77231);const i=[44100,48e3,32e3,0],n=[22050,24e3,16e3,0],s=[11025,12e3,8e3,0],o=[0,1152,1152,384],c=[0,576,1152,384],d=[0,576,1152,384],l=[0,32,64,96,128,160,192,224,256,288,320,352,384,416,448,-1],p=[0,32,48,56,64,80,96,112,128,160,192,224,256,320,384,-1],h=[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,-1],f=[0,32,48,56,64,80,96,112,128,144,160,176,192,224,256,-1],u=[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160,-1];function m(e,t){switch(e){case 0:return s[t];case 2:return n[t];case 3:return i[t]}return r.N_}function g(e,t){switch(e){case 0:return d[t];case 2:return c[t];case 3:return o[t]}return r.N_}function A(e,t,a){switch(t){case 1:switch(e){case 0:case 2:return u[a];case 3:return h[a]}break;case 2:switch(e){case 0:case 2:return u[a];case 3:return p[a]}case 3:switch(e){case 0:case 2:return f[a];case 3:return l[a]}}return r.N_}function x(e){switch(e){case 1:return 34;case 2:return 33;case 3:return 32}return r.N_}const y={32:"Layer1",33:"Layer2",34:"Layer3"};function I(e,t){if(t&&t.length>=4){const a=t[1]>>>3&3,r=(6&t[1])>>1,i=(12&t[2])>>>2,n=3&~(t[3]>>>6)?2:1,s=x(r),o=m(a,i);e.codecpar.profile=s,e.codecpar.sampleRate=o,e.codecpar.chLayout.nbChannels=n}}},65451:(e,t,a)=>{a.d(t,{Ij:()=>d,XC:()=>c,kt:()=>o});var r=a(31865),i=a(729),n=a(44328);const s=[480,960,1920,2880,480,960,1920,2880,480,960,1920,2880,480,960,480,960,120,240,480,960,120,240,480,960,120,240,480,960,120,240,480,960];function o(e){let t=0,a=0,r=0;if(e.length<1)return 0;switch(t=e[0],a=s[t>>3],3&t){case 0:r=1;break;case 1:case 2:r=2;break;case 3:if(e.length<2)return 0;r=63&e[1]}return r*a}function c(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t&&t.length>=19){const a=new r.A(t,!1);a.skip(9),e.codecpar.chLayout.nbChannels=a.readUint8(),e.codecpar.initialPadding=a.readUint16(),e.codecpar.sampleRate=a.readUint32(),e.codecpar.seekPreroll=Number((0,n.k)(BigInt(80),{den:1e3,num:1},{den:48e3,num:1}))}}function d(e){const t=new Uint8Array(19),a=new i.A(t,!1);return a.writeString("OpusHead"),a.writeUint8(1),a.writeUint8(e.chLayout.nbChannels),a.writeUint16(e.initialPadding),a.writeUint32(e.sampleRate),t}},85947:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(134);class i{constructor(){(0,r.A)(this,"type",-1),(0,r.A)(this,"onStreamAdd",void 0)}async destroy(e){}}},59331:(e,t,a)=>{a.r(t),a.d(t,{default:()=>z});var r=a(134),i=a(63939),n=a(50932),s=a(4624),o=a(19770),c=a(53783),d=a(27274),l=a(39e3),p=a(9705),h=a(51660),f=a(39144),u=a(52088),m=a(6403),g=a(85947),A=a(86191),x=a(71517),y=a(77231),I=a(52071),b=a(44328),P=a(72739),k=a(89088),M=a(20620),C=a(53e3),S=a(55611),R=a(58469),U=a(65451),v=a(87771),w=a(29347),B=a(37837),L=a(14686),T=a(67672),F="src\\avformat\\formats\\IMpegtsFormat.ts";class z extends g.A{constructor(){super(),(0,r.A)(this,"type",2),(0,r.A)(this,"context",void 0),(0,r.A)(this,"firstTSPacketPos",void 0),(0,r.A)(this,"cacheAVPacket",void 0),this.context=(0,o.A)()}init(e){e.ioReader&&e.ioReader.setEndian(!0),this.cacheAVPacket=0}async destroy(e){this.cacheAVPacket&&((0,x.Qe)(this.cacheAVPacket),this.cacheAVPacket=0),P.__(e.streams,(e=>{const t=e.privData;t.filter&&(t.filter.destroy(),t.filter=null)}))}async readHeader(e){try{let t=0,a=await c.q(e.ioReader);for(a||(a=d.ZT),this.context.tsPacketSize=a,this.context.tsPacketSize!==d.VG&&71!==await e.ioReader.peekUint8()&&await this.syncTSPacket(e,!1);!this.context.hasPAT||!this.context.hasPMT;){const t=await c.n(e.ioReader,this.context);t.payload&&(0!==t.pid&&t.pid!==this.context.currentPmtPid&&134!==this.context.pmt.pid2StreamType.get(t.pid)||(0,l.A)(t,this.context))}return this.context.hasPAT&&this.context.hasPMT?(this.firstTSPacketPos=e.ioReader.getPos(),t):p.LR}catch(t){return s.z3(t.message,F,147),e.ioReader.error}}checkExtradata(e,t){if(!t.codecpar.extradata){let a=(0,x.rU)(e,1);if(!a)return;t.codecpar.extradata=(0,B.sY)(i.f[15](a+4)),(0,L.Mr)(t.codecpar.extradata,i.f[20](a),i.f[15](a+4)),t.codecpar.extradataSize=i.f[15](a+4),(0,x.Is)(e,1),27===t.codecpar.codecId?M.XC(t,(0,L.JW)(t.codecpar.extradata,t.codecpar.extradataSize)):173===t.codecpar.codecId?C.XC(t,(0,L.JW)(t.codecpar.extradata,t.codecpar.extradataSize)):196===t.codecpar.codecId?S.XC(t,(0,L.JW)(t.codecpar.extradata,t.codecpar.extradataSize)):86018===t.codecpar.codecId?R.XC(t,(0,L.JW)(t.codecpar.extradata,t.codecpar.extradataSize)):86076===t.codecpar.codecId&&U.XC(t,(0,L.JW)(t.codecpar.extradata,t.codecpar.extradataSize))}}parsePESSlice(e,t,a,r){const o=(0,f.A)(a);(0,h.A)(o),(o.randomAccessIndicator||1===r.codecpar.codecType)&&n.M[15](t+36,1|i.f[15](t+36));const c=r.codecpar.codecId;27!==c&&173!==c&&196!==c||n.M[15](t+80,2),n.M[15](t+32,r.index),n.M[17](t+16,o.dts),n.M[17](t+8,o.pts),n.M[17](t+56,o.pos),n.M[15](t+76,9e4),n.M[15](t+72,1),r.startTime===y.Dh&&(r.startTime=i.f[17](t+8)||i.f[17](t+16));const d=(0,B.sY)(o.payload.length);(0,L.lW)(d,o.payload.length,o.payload),(0,x.NX)(t,d,o.payload.length),(0,u.A)(a);const l=r.privData;if(l.filter){let a=0;if(a=l.filter.sendAVPacket(t),a<0)return s.z3("send avpacket to bsf failed",F,223),p.LR;if(a=l.filter.receiveAVPacket(t),a<0)return s.z3("receive avpacket from bsf failed",F,230),p.LR;for(n.M[15](t+76,9e4),n.M[15](t+72,1),n.M[15](t+32,r.index),this.checkExtradata(t,r);;){const t=this.cacheAVPacket||(0,x._5)();if(a=l.filter.receiveAVPacket(t),0!==a){this.cacheAVPacket=t;break}n.M[15](t+76,9e4),n.M[15](t+72,1),n.M[15](t+32,r.index),this.checkExtradata(t,r),e.interval.packetBuffer.push(t),this.cacheAVPacket=0}}else{const e=this.context.pmt.pid2StreamType.get(l.pid);if(3===e||4===e){n.M[15](t+36,1|i.f[15](t+36));const e=(0,x.iI)(t),a=e[1]>>>3&3,s=(6&e[1])>>1,o=(12&e[2])>>>2,c=3&~(e[3]>>>6)?2:1,d=k.Au(s),l=k.Y2(a,o);(r.codecpar.profile!==d||r.codecpar.sampleRate!==l||r.codecpar.chLayout.nbChannels!==c)&&(r.codecpar.profile=d,r.codecpar.sampleRate=l,r.codecpar.chLayout.nbChannels=c)}else if(27===r.codecpar.codecId)r.codecpar.extradata||(M.ci(t,!0),this.checkExtradata(t,r),r.codecpar.bitFormat=2);else if(173===r.codecpar.codecId)r.codecpar.extradata||(C.ci(t,!0),this.checkExtradata(t,r),r.codecpar.bitFormat=2);else if(196===r.codecpar.codecId)r.codecpar.extradata||(S.ci(t,!0),this.checkExtradata(t,r),r.codecpar.bitFormat=2);else if(86019===r.codecpar.codecId||86056===r.codecpar.codecId){if(r.codecpar.sampleRate===y.N_){const e=v.R((0,x.iI)(t));T.ai(e)||(r.codecpar.sampleRate=e.sampleRate,r.codecpar.chLayout.nbChannels=e.channels)}}else if(86020===r.codecpar.codecId&&r.codecpar.sampleRate===y.N_){const e=w.R((0,x.iI)(t));T.ai(e)||(r.codecpar.sampleRate=e.sampleRate,r.codecpar.chLayout.nbChannels=e.channels)}}return 0}async readAVPacket_(e,t){if(this.context.ioEnd){if(!this.context.tsSliceQueueMap.size)return-1048576;const a=this.context.tsSliceQueueMap.values();let r;for(;;){const e=a.next();if(e.value&&e.value.slices.length){r=e.value;break}if(e.done)break}if(!r)return-1048576;const i=e.streams.find((e=>e.privData.pid===r.pid));return i?this.parsePESSlice(e,t,r,i):((0,u.A)(r),this.readAVPacket_(e,t))}try{for(;;){if(this.context.tsPacketSize!==d.VG&&71!==await e.ioReader.peekUint8()){try{await e.ioReader.flush()}catch(e){}await this.syncTSPacket(e,!1)}const i=await c.n(e.ioReader,this.context);if(!i.payload)continue;if(0===i.pid||i.pid===this.context.currentPmtPid||134===this.context.pmt.pid2StreamType.get(i.pid)){(0,l.A)(i,this.context);continue}const n=this.context.pmt.pid2StreamType.get(i.pid);if(!n)continue;let s=e.streams.find((e=>e.privData.pid===i.pid));s||(s=e.createStream(),(0,A.A)(i.pid,s,this.context));let o=i.payload[4]<<8|i.payload[5],p=this.context.tsSliceQueueMap.get(i.pid),h=!1;if(p){if(p.totalLength>0&&i.payloadUnitStartIndicator){const a=this.parsePESSlice(e,t,p,s);if(a<0)return a;h=!0}}else{if(!i.payloadUnitStartIndicator)continue;p=new m.pi,this.context.tsSliceQueueMap.set(i.pid,p)}var a,r;if(i.payloadUnitStartIndicator&&(p.randomAccessIndicator=null!==(a=null===(r=i.adaptationFieldInfo)||void 0===r?void 0:r.randomAccessIndicator)&&void 0!==a?a:0,p.pos=i.pos,p.pid=i.pid,p.streamType=n,p.expectedLength=0===o?0:o+6),p.slices.push(i.payload),p.totalLength+=i.payload.length,p.expectedLength>0&&p.expectedLength===p.totalLength){const a=this.parsePESSlice(e,t,p,s);if(a<0)return a;h=!0}if(h)return 0}}catch(a){return-1048576!==e.ioReader.error||this.context.ioEnd?-1048576===e.ioReader.error?-1048576:(s.z3(`read packet error, ${a}`,F,474),p.LR):(this.context.ioEnd=!0,this.readAVPacket_(e,t))}}async readAVPacket(e,t){try{return this.readAVPacket_(e,t)}catch(t){return-1048576!==e.ioReader.error&&s.z3(t.message,F,487),e.ioReader.error}}async syncTSPacket(e,t=!0){let a=y.Dh;for(;;)try{if(71===await e.ioReader.readUint8()){a=this.context.tsPacketSize===d.VG?e.ioReader.getPos()-BigInt(5):e.ioReader.getPos()-BigInt(1);let t=0,r=e.ioReader.getPos();for(;t<=10&&(await e.ioReader.skip(this.context.tsPacketSize-1),71===await e.ioReader.readUint8());)t++;if(t<10){a=y.Dh,await e.ioReader.seek(r);continue}break}}catch(e){a=y.Dh;break}if(a!==y.Dh&&(await e.ioReader.seek(a),t))for(;;){if((await c.n(e.ioReader,this.context)).payloadUnitStartIndicator){await e.ioReader.seek(a),e.streams.forEach((e=>{let t=this.context.tsSliceQueueMap.get(e.privData.pid);t&&(0,u.A)(t)}));break}a=e.ioReader.getPos()}}async seek(e,t,a,r){let i=e.ioReader.getPos();if(this.context.tsSliceQueueMap.forEach((e=>{e.slices.length&&e.pos<i&&(i=e.pos),(0,u.A)(e)})),this.context.pmt.pid2StreamType.forEach(((e,t)=>{this.context.tsSliceQueueMap.delete(t)})),16&r){const r=(0,b.k)(a,t.timeBase,y.i0);return await e.ioReader.seek(r,!0),this.context.ioEnd=!1,BigInt(0)}if(2&r){const t=await e.ioReader.fileSize();return t<=BigInt(0)?BigInt(p.E$):(a<BigInt(0)?a=BigInt(0):a>t&&(a=t),await e.ioReader.seek(a),4&r||await this.syncTSPacket(e),this.context.ioEnd=!1,i)}{if(t&&t.sampleIndexes.length){let r=P.El(t.sampleIndexes,(e=>e.pts>a?-1:1));if(r>0&&(0,b.k)(a-t.sampleIndexes[r-1].pts,t.timeBase,y.i0)<BigInt(1e4))return s.Yz(`seek in sampleIndexes, found index: ${r}, pts: ${t.sampleIndexes[r-1].pts}, pos: ${t.sampleIndexes[r-1].pos}`,F,625),await e.ioReader.seek(t.sampleIndexes[r-1].pos),this.context.ioEnd=!1,i}s.Yz("not found any keyframe index, try to seek in bytes",F,632);let r=await(0,I.A)(e,t,a,this.firstTSPacketPos,this.readAVPacket.bind(this),this.syncTSPacket.bind(this));return r>=0&&(this.context.ioEnd=!1),r}}getAnalyzeStreamsCount(){var e,t;return null!==(e=null===(t=this.context.pmt)||void 0===t?void 0:t.pid2StreamType.size)&&void 0!==e?e:0}}},89564:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(27274);function i(e,t,a){const i=new Uint8Array(r.GV);let n=0,s=0;for(let r=0;r<e.length-3;r++)if(71===e[r]){const o=8191&(e[r+1]<<8|e[r+2]);let c=48&e[r+3];if(!a||8191===o||c){const e=r%t;i[e]++,n++,i[e]>s&&(s=i[e])}}return s-Math.max(n-10*s,0)/10}},52088:(e,t,a)=>{function r(e){e.slices=[],e.totalLength=0,e.expectedLength=-1}a.d(t,{A:()=>r})},19770:(e,t,a)=>{a.d(t,{A:()=>o});var r=a(80662),i=a.n(r),n=a(77231),s=a(6403);function o(){return{currentProgram:n.N_,currentPmtPid:n.N_,tsPacketSize:n.N_,hasPAT:!1,hasPMT:!1,tsSliceQueueMap:new(i()),pat:new s.Cd,pmt:new s.I4,program2Pmt:new(i()),ioEnd:!1,startPid:256,delay:BigInt(0)}}},76538:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(77231);function i(){return{pid:r.N_,filter:null,tsPacket:null,pes:null,continuityCounter:0,pesSlices:{total:0,buffers:[]},latm:!1}}},39e3:(e,t,a)=>{a.d(t,{A:()=>s});var r=a(6403),i=a(52088),n=a(63599);function s(e,t){const a=t.tsSliceQueueMap.get(e.pid);if(e.payloadUnitStartIndicator){const c=e.payload[0];if(a&&a.totalLength>0){const r=e.payload.slice(1,Math.min(1+c,e.payload.length));a.slices.push(r),a.totalLength+=r.length,a.totalLength===a.expectedLength?((0,n.A)(e.pid,a,t),(0,i.A)(a)):((0,i.A)(a),t.tsSliceQueueMap.delete(e.pid))}for(let a=1+c;a<e.payload.length;){var s,o;if(255===e.payload[a])break;const c=(15&e.payload[a+1])<<8|e.payload[a+2],d=new r.pi;d.pid=e.pid,d.expectedLength=c+3,d.randomAccessIndicator=null!==(s=null===(o=e.adaptationFieldInfo)||void 0===o?void 0:o.randomAccessIndicator)&&void 0!==s?s:0;const l=e.payload.slice(a,Math.min(a+d.expectedLength-d.totalLength,e.payload.length));d.slices.push(l),d.totalLength+=l.length,t.tsSliceQueueMap.set(e.pid,d),d.totalLength===d.expectedLength?((0,n.A)(e.pid,d,t),(0,i.A)(d)):((0,i.A)(d),t.tsSliceQueueMap.delete(e.pid)),a+=l.length}}else if(a&&0!==a.totalLength){const r=e.payload.slice(0,Math.min(a.expectedLength-a.totalLength,e.payload.length));a.slices.push(r),a.totalLength+=r.length,a.totalLength===a.expectedLength?((0,n.A)(e.pid,a,t),(0,i.A)(a)):((0,i.A)(a),t.tsSliceQueueMap.delete(e.pid))}}},86191:(e,t,a)=>{a.d(t,{A:()=>h});var r=a(61499),i=a(76538),n=a(27274),s=a(50848),o=a(36488),c=a(61702),d=a(65451),l=a(37837),p=a(14686);function h(e,t,a){t.timeBase.den=9e4,t.timeBase.num=1;const h=(0,i.A)();h.pid=e,t.privData=h;const f=a.pmt.pid2StreamType.get(e);if(6===f){const r=a.pmt.pid2ESDescriptor.get(e);if(t.codecpar.codecType=2,r){var u;const e=r.find((e=>5===e.tag));if(e&&(null===(u=e.buffer)||void 0===u?void 0:u.length)>=4)if("O"===String.fromCharCode(e.buffer[0])||"p"===String.fromCharCode(e.buffer[1])||"u"===String.fromCharCode(e.buffer[2])||"s"===String.fromCharCode(e.buffer[3])){t.codecpar.codecType=1,t.codecpar.codecId=86076,t.codecpar.sampleRate=48e3;const e=r.find((e=>127===e.tag));if(e&&128===e.buffer[0]){t.codecpar.chLayout.nbChannels=15&e.buffer[1]?15&e.buffer[1]:2;const a=d.Ij(t.codecpar);a&&(t.codecpar.extradata=(0,l.sY)(a.length),(0,p.lW)(t.codecpar.extradata,a.length,a),t.codecpar.extradataSize=a.length)}}else if("A"===String.fromCharCode(e.buffer[0])||"V"===String.fromCharCode(e.buffer[1])||"0"===String.fromCharCode(e.buffer[2])||"1"===String.fromCharCode(e.buffer[3])){t.codecpar.codecType=0,t.codecpar.codecId=225;const e=r.find((e=>128===e.tag));e&&(t.codecpar.extradata=(0,l.sY)(e.buffer.length),(0,p.lW)(t.codecpar.extradata,e.buffer.length,e.buffer),t.codecpar.extradataSize=e.buffer.length)}}}else{const e=n.$x[f];e?(t.codecpar.codecType=e[0],t.codecpar.codecId=e[1]):t.codecpar.codecType=2}let m;switch(f){case 15:m=new s.A;break;case 17:m=new o.A;break;case 27:case 36:break;case 6:86076===t.codecpar.codecId&&(m=new c.A)}return m&&(t.privData.filter=m,m.init(t.codecpar[r.o9],t.timeBase[r.o9])),t}},31239:(e,t,a)=>{function r(e,t){let a=0,r=e[a++];if(t.adaptationFieldInfo.discontinuityIndicator=r>>7&1,t.adaptationFieldInfo.randomAccessIndicator=r>>6&1,t.adaptationFieldInfo.elementaryStreamPriorityIndicator=r>>5&1,t.adaptationFieldInfo.pcrFlag=r>>4&1,t.adaptationFieldInfo.opcrFlag=r>>3&1,t.adaptationFieldInfo.splicingPointFlag=r>>2&1,t.adaptationFieldInfo.transportPrivateDataFlag=r>>1&1,t.adaptationFieldInfo.adaptationFieldExtensionFlag=1&r,t.adaptationFieldInfo.pcrFlag){const r=BigInt(Math.floor(e[a++]<<25|e[a++]<<17|e[a++]<<9|e[a++]<<1|e[a]>>7)),i=BigInt(Math.floor((1&e[a++])<<8|e[a++]));t.adaptationFieldInfo.pcr=r*BigInt(300)+i}if(t.adaptationFieldInfo.opcrFlag){const r=BigInt(Math.floor(e[a++]<<25|e[a++]<<17|e[a++]<<9|e[a++]<<1|e[a]>>7)),i=BigInt(Math.floor((1&e[a++])<<8|e[a++]));t.adaptationFieldInfo.pcr=r*BigInt(300)+i}if(t.adaptationFieldInfo.splicingPointFlag&&(t.adaptationFieldInfo.spliceCountDown=e[a++]),t.adaptationFieldInfo.transportPrivateDataFlag){const r=e[a++];t.adaptationFieldInfo.transportPrivateData=e.subarray(a,a+r),a+=r}if(t.adaptationFieldInfo.adaptationFieldExtensionFlag){const r=e[a++];t.adaptationFieldInfo.extension=e.subarray(a,a+r),a+=r}}a.d(t,{A:()=>r})},20549:(e,t,a)=>{a.d(t,{A:()=>c});var r=a(31865),i=a(6403),n=a(92647),s=a(4624),o="src\\avformat\\formats\\mpegts\\function\\parsePAT.ts";function c(e,t){let a=0;const c=new r.A((0,n.A)(Uint8Array,e.slices),!0),d=c.readUint8();0!==d&&s.z3(`parsePAT: table_id ${d} is not corresponded to PAT!`,o,40);const l=4095&c.readUint16();c.readUint16(),a=c.readUint8();const p=a>>1&31,h=1&a,f=c.readUint8();let u;if(c.readUint8(),1===h&&0===f)u=new i.Cd,u.versionNumber=p;else if(u=t.pat,!u)return void s.z3("can not found PAT in mpegts context",o,64);const m=l-5-4,g=Number(BigInt.asIntN(32,c.getPos()))+m;let A=-1,x=-1;for(;c.getPos()<g;){const e=c.readUint16(),t=8191&c.readUint16();0===e?u.networkPid=t:(u.program2PmtPid.set(e,t),-1===A&&(A=e),-1===x&&(x=t))}1===h&&0===f&&(t.pat||s.pq("parsed first PAT",o,100),t.pat=u,t.currentProgram=A,t.currentPmtPid=x,t.hasPAT=!0)}},51660:(e,t,a)=>{a.d(t,{A:()=>o});var r=a(77231),i=a(4624),n=a(9705),s="src\\avformat\\formats\\mpegts\\function\\parsePES.ts";function o(e){const t=e.data,a=t[3],o=t[4]<<8|t[5];let c=0,d=0,l=0;if(188!==a&&190!==a&&191!==a&&240!==a&&241!==a&&255!==a&&242!==a&&248!==a){let a=r.Dh,p=r.Dh;for(;;){if(6+d>=t.length)return;if(l=t[6+d],255!==l)break;d++}if(64==(192&l)&&(d+=2,l=t[6+d]),32==(224&l))c+=5,a=a=BigInt(Math.floor(536870912*(14&t[6+d])+4194304*(255&t[7+d])+16384*(254&t[8+d])+128*(255&t[9+d])+(254&t[10+d])/2)),16&l?(p=BigInt(Math.floor(536870912*(14&t[11+d])+4194304*(255&t[12+d])+16384*(254&t[13+d])+128*(255&t[14+d])+(254&t[15+d])/2)),c+=5):p=a;else if(128==(192&l)){const e=(192&t[7+d])>>>6;c=3+t[8+d],2!==e&&3!==e||(a=BigInt(Math.floor(536870912*(14&t[9+d])+4194304*(255&t[10+d])+16384*(254&t[11+d])+128*(255&t[12+d])+(254&t[13+d])/2)),p=3===e?BigInt(Math.floor(536870912*(14&t[14+d])+4194304*(255&t[15+d])+16384*(254&t[16+d])+128*(255&t[17+d])+(254&t[18+d])/2)):a)}else{if(15!==l)return i.z3("invalid data",s,121),n.LR;c=1}e.dts=p,e.pts=a;const h=6+d+c;let f=0;if(0!==o){if(o<d+c)return void i.z3("Malformed PES: PES_packet_length < 3 + PES_header_data_length",s,133);f=o-(d+c)}else f=t.byteLength-h;e.payload=t.subarray(h,h+f)}else if((188===a||191===a||240===a||241===a||255===a||242===a||248===a)&&6===e.streamId){const a=6;let r=0;r=0!==o?o:t.byteLength-a,e.payload=t.subarray(a,a+r)}return 0}},39144:(e,t,a)=>{a.d(t,{A:()=>i});var r=a(6403);function i(e){let t=new Uint8Array(e.totalLength);for(let a=0,r=0;a<e.slices.length;a++){let i=e.slices[a];t.set(i,r),r+=i.byteLength}const a=t[3],i=new r.xf;return i.data=t,i.pid=e.pid,i.streamId=a,i.streamType=e.streamType,i.pos=e.pos,i.randomAccessIndicator=e.randomAccessIndicator,i}},65945:(e,t,a)=>{a.d(t,{A:()=>c});var r=a(31865),i=a(6403),n=a(92647),s=a(4624),o="src\\avformat\\formats\\mpegts\\function\\parsePMT.ts";function c(e,t){let a=0;const c=new r.A((0,n.A)(Uint8Array,e.slices),!0),d=c.readUint8();2!==d&&s.z3(`parse PMT: table_id ${d} is not corresponded to PAT!`,o,40);const l=4095&c.readUint16(),p=c.readUint16();a=c.readUint8();const h=a>>1&31,f=1&a,u=c.readUint8();let m;if(c.readUint8(),1===f&&0===u)m=new i.I4,m.programNumber=p,m.versionNumber=h,t.program2Pmt.set(p,m),t.hasPMT=!0;else if(m=t.program2Pmt.get(p),!m)return void s.z3("can not found PMT in mpegts context",o,68);m.pcrPid=8191&c.readUint16();const g=4095&c.readUint16();c.skip(g);let A=Number(BigInt.asIntN(32,c.getPos()))+(l-9-g-4);for(;c.getPos()<A;){const e=c.readUint8(),t=8191&c.readUint16(),a=4095&c.readUint16();if(m.pid2StreamType.set(t,e),a>0){const e=[],r=Number(BigInt.asIntN(32,c.getPos()))+a;for(;c.getPos()<r;){const t=new i.kJ;t.tag=c.readUint8();const a=c.readUint8();a>0&&(t.buffer=c.readBuffer(a)),e.push(t)}m.pid2ESDescriptor.set(t,e)}}p===t.currentProgram&&(t.pmt||s.pq("parsed first PMT",o,111),t.pmt=m)}},43383:(e,t,a)=>{function r(e,t){}a.d(t,{A:()=>r})},63599:(e,t,a)=>{a.d(t,{A:()=>s});var r=a(20549),i=a(65945),n=a(43383);function s(e,t,a){0===e?(0,r.A)(t,a):e===a.currentPmtPid?(0,i.A)(t,a):a.pmt&&134===a.pmt.pid2StreamType.get(e)&&(0,n.A)(t,a)}},53783:(e,t,a)=>{a.d(t,{n:()=>p,q:()=>l});var r=a(27274),i=a(89564),n=a(4624),s=a(6403),o=a(31239),c=a(20576),d="src\\avformat\\formats\\mpegts\\impegts.ts";async function l(e){let t;try{t=await e.peekBuffer(r.pm)}catch(a){-1048576!==e.error&&(t=await e.peekBuffer(e.remainingLength()))}if(t&&t.length>=r.ZT){const e=(0,i.A)(t,r.ZT,!1),a=(0,i.A)(t,r.VG,!1),s=(0,i.A)(t,r.eR,!1);let o=(0,c.A)([e,s,a]);t.length<r.pm&&(o+=r.hY);let l=r.ZT;return e>o?l=r.ZT:a>o?l=r.VG:s>o&&(l=r.eR),n.Yz(`got ts packet size: ${l}`,d,72),l}return 0}async function p(e,t){const a=e.getPos();let i=0;t.tsPacketSize===r.VG&&await e.skip(4);const c=await e.readUint8();71!==c&&n.h2(`found syncByte not 0x47, value: ${c.toString(16)}`,d,94);const l=new s.am;l.pos=a,i=await e.readUint16(),l.payloadUnitStartIndicator=i>>14&1,l.transportPriority=i>>13&1,l.pid=8191&i,i=await e.readUint8(),l.adaptationFieldControl=i>>4&3,l.continuityCounter=15&i;let p=4;if(2===l.adaptationFieldControl||3===l.adaptationFieldControl){const a=await e.readUint8();if(5+a===r.ZT)return(0,o.A)(await e.readBuffer(a),l),t.tsPacketSize===r.eR&&await e.skip(16),l;a>0&&(0,o.A)(await e.readBuffer(a),l),p=5+a}return 1!==l.adaptationFieldControl&&3!==l.adaptationFieldControl||(l.payload=await e.readBuffer(r.ZT-p)),t.tsPacketSize===r.eR&&await e.skip(16),l}},27274:(e,t,a)=>{a.d(t,{$x:()=>p,GV:()=>s,OS:()=>d,VG:()=>i,ZT:()=>n,eR:()=>r,hY:()=>c,pm:()=>o,qJ:()=>l});const r=204,i=192,n=188,s=204,o=8192,c=5,d=5,l=10,p={15:[1,86018],17:[1,86018],3:[1,86017],4:[1,86017],1:[0,2],2:[0,2],27:[0,27],16:[0,12],36:[0,173],51:[0,196],129:[1,86019],135:[1,86056],130:[1,86020]}},6403:(e,t,a)=>{a.d(t,{Cd:()=>l,I4:()=>f,am:()=>c,kJ:()=>h,pi:()=>d,xf:()=>u,yU:()=>p});var r=a(134),i=a(80662),n=a.n(i),s=a(77231);class o{constructor(){(0,r.A)(this,"discontinuityIndicator",0),(0,r.A)(this,"randomAccessIndicator",0),(0,r.A)(this,"elementaryStreamPriorityIndicator",0),(0,r.A)(this,"pcrFlag",0),(0,r.A)(this,"opcrFlag",0),(0,r.A)(this,"splicingPointFlag",0),(0,r.A)(this,"transportPrivateDataFlag",0),(0,r.A)(this,"adaptationFieldExtensionFlag",0),(0,r.A)(this,"pcr",BigInt(0)),(0,r.A)(this,"opcr",BigInt(0)),(0,r.A)(this,"spliceCountDown",0),(0,r.A)(this,"transportPrivateData",null),(0,r.A)(this,"extension",null)}}class c{constructor(){(0,r.A)(this,"pos",s.Dh),(0,r.A)(this,"payloadUnitStartIndicator",0),(0,r.A)(this,"transportPriority",0),(0,r.A)(this,"pid",s.N_),(0,r.A)(this,"adaptationFieldControl",0),(0,r.A)(this,"continuityCounter",0),(0,r.A)(this,"transportScramblingControl",0),(0,r.A)(this,"adaptationFieldInfo",new o),(0,r.A)(this,"payload",null)}}class d{constructor(){(0,r.A)(this,"slices",[]),(0,r.A)(this,"totalLength",0),(0,r.A)(this,"expectedLength",s.N_),(0,r.A)(this,"randomAccessIndicator",0),(0,r.A)(this,"pid",s.N_),(0,r.A)(this,"streamType",0),(0,r.A)(this,"pos",s.Dh)}}class l{constructor(){(0,r.A)(this,"versionNumber",0),(0,r.A)(this,"networkPid",s.N_),(0,r.A)(this,"program2PmtPid",new(n()))}}class p extends c{}class h{constructor(){(0,r.A)(this,"tag",void 0),(0,r.A)(this,"buffer",void 0)}}class f{constructor(){(0,r.A)(this,"versionNumber",0),(0,r.A)(this,"programNumber",0),(0,r.A)(this,"pcrPid",0),(0,r.A)(this,"pid2StreamType",new(n())),(0,r.A)(this,"pid2ESDescriptor",new(n()))}}class u{constructor(){(0,r.A)(this,"pid",s.N_),(0,r.A)(this,"streamType",0),(0,r.A)(this,"streamId",s.N_),(0,r.A)(this,"dts",s.Dh),(0,r.A)(this,"pts",s.Dh),(0,r.A)(this,"pos",s.Dh),(0,r.A)(this,"payload",null),(0,r.A)(this,"data",null),(0,r.A)(this,"randomAccessIndicator",0)}}},2187:(e,t,a)=>{a.d(t,{d:()=>s});var r=a(72739),i=a(44328),n=a(77231);function s(e,t,a){let s=BigInt(0);return r.__(e,(e=>{s+=e.codecpar.bitrate*(0,i.k)(t,a,n.i0)/BigInt(8e3)})),s}},52071:(e,t,a)=>{a.d(t,{A:()=>f});var r=a(63939),i=a(9599),n=a(29170),s=a(77231),o=a(44328),c=a(2187),d=a(71517),l=a(9705),p=a(4624),h="src\\avformat\\function\\seekInBytes.ts";async function f(e,t,a,f,u,m){const g=e.ioReader.getPos(),A=await e.ioReader.fileSize();let x=s.Dh,y=a;t.startTime!==s.Dh?y-=t.startTime:y-=t.firstDTS;const I=(0,o.k)(a,t.timeBase,s.i0);if(I<BigInt(1e4))return p.Yz(`seek pts is earlier then 10s, seek to first packet pos(${f}) directly`,h,63),await e.ioReader.seek(f),g;let b=(0,c.d)(e.streams,y,t.timeBase);const P=A-(0,c.d)(e.streams,BigInt(1e4),s.i0),k=(0,c.d)(e.streams,BigInt(1e4),s.i0);if(b>P&&(b=P),b<f)return await e.ioReader.seek(f),g;const M=(0,d._5)();let C=A,S=BigInt(0);for(;;){if(C-S<k){x=S;break}await e.ioReader.seek(b),await m(e);const t=e.ioReader.getPos();if(!(await u(e,M)>=0)){x=s.Dh;break}{const e=(0,o.k)(r.f[17](M+8),(0,n.A)(M+72,i.P),s.i0),a=e-I;if(p.Yz(`try to seek to pos: ${b}, got packet pts: ${r.f[17](M+8)}(${e}ms), diff: ${a}ms`,h,98),a<=BigInt(0)&&-a<BigInt(1e4)){x=t;break}a>BigInt(0)?(C=b,b=S+C>>BigInt(1)):(S=b,b=S+C>>BigInt(1))}}return(0,d.Qe)(M),x!==s.Dh?(p.Yz(`finally seek to pos ${x}`,h,126),await e.ioReader.seek(x),await m(e),g):(await e.ioReader.seek(g),BigInt(l.E$))}},20576:(e,t,a)=>{function r(e){if(0===e.length)return 0;const t=e.slice().sort(((e,t)=>e-t)),a=Math.floor(t.length/2);return t.length%2==1?t[a]:(t[a-1]+t[a])/2}a.d(t,{A:()=>r})}}]);