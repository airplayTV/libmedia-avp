"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[773],{58469:(e,t,i)=>{i.d(t,{Bq:()=>f,Hm:()=>o,Ij:()=>l,XC:()=>h,_5:()=>c,f7:()=>p,uF:()=>s});var a=i(77231),r=i(37246);const s={1:"Main",2:"LC",3:"LC",4:"LC",5:"HE",6:"HE"},o={96e3:0,88200:1,64e3:2,48e3:3,44100:4,32e3:5,24e3:6,22050:7,16e3:8,12e3:9,11025:10,8e3:11,7350:12},n=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350,a.N_,a.N_,a.N_],d=[a.N_,1,2,3,4,5,6,7];function c(e){let t=a.N_,i=a.N_,r=a.N_;var s,o;return e.length>=2&&(t=e[0]>>3&31,i=null!==(s=n[(7&e[0])<<1|e[1]>>7])&&void 0!==s?s:48e3,r=null!==(o=d[e[1]>>3&15])&&void 0!==o?o:2),{profile:t,sampleRate:i,channels:r}}function h(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t){const{profile:i,sampleRate:a,channels:r}=c(t);e.codecpar.profile=i,e.codecpar.sampleRate=a,e.codecpar.chLayout.nbChannels=r}}function l(e){const t=o[e.sampleRate],i=e.chLayout.nbChannels,a=new Uint8Array(2);return a[0]=(31&e.profile)<<3|(14&t)>>1,a[1]=(1&t)<<7|(15&i)<<3,a}function f(e){if(e.length<7)return-1;const t=e[0]<<4|e[1]>>4;if(4095!==t)return-1;const i=1&e[1],a=(192&e[2])>>>6,r=(60&e[2])>>>2,s=(1&e[2])<<2|(192&e[3])>>>6,o=(3&e[3])<<11|e[4]<<3|(224&e[5])>>>5,c=3&e[6];let h=1===i?7:9,l=o-h;return{syncWord:t,profile:a+1,sampleRate:n[r],channels:d[s],aacFrameLength:o,numberOfRawDataBlocksInFrame:c,headerLength:h,framePayloadLength:l}}function p(e,t){function i(){const e=t.readU(2);let i=0;for(let a=0;a<=e;a++)i<<=8,i|=t.readU(8);return i}t||(t=new r.A).appendBuffer(e);const a=t.getPointer(),s={syncWord:0,profile:0,sampleRate:0,channels:0,useSameStreamMux:!1,headerLength:0,framePayloadLength:0,muxLengthBytes:0},o=t.readU(11);if(695!==o)return-1;s.syncWord=o,s.muxLengthBytes=t.readU(13);const c=1===t.readU1();if(s.useSameStreamMux=c,!c){const e=1===t.readU1();if(e&&1===t.readU1())return-1;if(e&&i(),1!==t.readU1())return-1;if(0!==t.readU(6))return-1;if(0!==t.readU(4))return-1;if(0!==t.readU(3))return-1;let a=e?i():0;const r=t.readU(5);a-=5;const o=t.readU(4);a-=4;const c=t.readU(4);if(a-=4,t.readU(3),a-=3,a>0&&t.readU(a),0!==t.readU(3))return-1;if(t.readU(8),1===t.readU1())if(e)i();else{let e=0;for(;;){e<<=8;const i=1===t.readU1();if(e+=t.readU(8),!i)break}}1===t.readU1()&&t.readU(8),s.profile=r+1,s.sampleRate=n[o],s.channels=d[c]}let h=0;for(;;){const e=t.readU(8);if(h+=e,255!==e)break}return s.framePayloadLength=h,s.headerLength=t.getPointer()-a+(8===t.getBitLeft()?0:1),s}},90412:(e,t,i)=>{i.d(t,{Ui:()=>p,XC:()=>f,Yj:()=>u,k9:()=>l,zk:()=>d});var a=i(63939),r=i(37246),s=i(11573),o=i(83314),n=i(97317);const d={0:"Main",1:"High",2:"Professional"},c=[{level:20,maxResolution:2359296},{level:21,maxResolution:4460544},{level:30,maxResolution:10653696},{level:31,maxResolution:17040384},{level:40,maxResolution:21233664},{level:41,maxResolution:21233664},{level:50,maxResolution:35651584},{level:51,maxResolution:35651584},{level:52,maxResolution:35651584},{level:53,maxResolution:35651584},{level:60,maxResolution:142606336},{level:61,maxResolution:142606336},{level:62,maxResolution:142606336},{level:63,maxResolution:142606336}],h=[20,21,22,23,30,31,32,33,40,41,42,43,50,51,52,53,60,61,62,63,70,71,72,73];function l(e,t,i){const a=e*t;for(const e of c)if(a<=e.maxResolution)return e.level}function f(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t&&t.length>=4){const i=p(t);e.codecpar.profile=i.profile,e.codecpar.level=i.level}}function p(e){const t=new r.A(e.length);t.appendBuffer(e),t.readU1(),t.readU(7);const i=t.readU(3),a=t.readU(5),s=t.readU1();let o=t.readU1()?10:8;return t.readU1()&&(o=12),{profile:i,level:a,tier:s,bitDepth:o,monochrome:t.readU1(),chromaSubsamplingX:t.readU1(),chromaSubsamplingY:t.readU1(),chromaSamplePosition:t.readU(2)}}function u(e,t){const i=new o.A(4);i.writeU1(1),i.writeU(7,1);const d=function(e){const t=new r.A;t.appendBuffer(e);const i=[];for(;t.remainingLength();){const a=t.getPointer();t.readU1(),t.readU(4);const r=t.readU1(),o=t.readU1();t.readU1(),r&&t.readU(8);const n=o?s.v(t):e.length-1-r,d=t.getPointer()-a;i.push(e.subarray(a,a+d+n)),t.skip(8*n)}return i}(t).find((e=>1==(e[0]>>>3&15)));if(d){const e=function(e){const t=new r.A(e.length);t.appendBuffer(e),t.readU1(),t.readU(4);const i=t.readU1(),a=t.readU1();t.readU1(),i&&t.readU(8),a&&s.v(t);const o=s.f(t,3),n=(s.f(t,1),s.f(t,1));let d=0,c=0,l=[0],f=[0],p=[0],u=[0],w=[0],g=[0],m=0,U=[0],R=[0],k=[0];if(n)f[0]=s.f(t,5);else{d=s.f(t,1),d?(s.f(t,32),s.f(t,32),s.f(t,1)&&s.d(t),s.f(t,1)&&(m=s.f(t,5),s.f(t,32),s.f(t,5),s.f(t,5))):c=0;let e=s.f(t,1),i=s.f(t,5);for(let a=0;a<=i;a++){if(l[a]=s.f(t,12),f[a]=s.f(t,5),f[a]>7?p[a]=s.f(t,1):p[a]=0,c){if(u[a]=s.f(t,1),u[a]){let e=m+1;U[a]=s.f(t,e),R[a]=s.f(t,e),k[a]=s.f(t,1)}}else u[a]=0;e&&(w[a]=s.f(t,1),w[a]&&(g[a]=s.f(t,4)))}}let I=s.f(t,4),v=s.f(t,4),b=I+1,A=s.f(t,b);b=v+1;let B=s.f(t,b),y=0,x=0,M=0;y=n?0:s.f(t,1),y&&(s.f(t,4),s.f(t,3)),s.f(t,1),s.f(t,1),s.f(t,1);let D=0,P=0,S=0,V=0,C=0,F=0,L=2,z=2,T=0;n||(s.f(t,1),s.f(t,1),s.f(t,1),s.f(t,1),V=s.f(t,1),V?(C=s.f(t,1),F=s.f(t,1)):(C=0,F=0),L=s.f(t,1)?2:s.f(t,1),L>0?s.f(t,1)?2:s.f(t,1):2,V&&s.f(t,3)),s.f(t,1),s.f(t,1),s.f(t,1);let E=s.f(t,1),_=0,O=0,$=0;2==o&&E?(_=s.f(t,1),O=_?12:10):o<=2&&(O=E?10:8),$=1==o?0:s.f(t,1);let W=0,Y=0,N=0;s.f(t,1)?(W=s.f(t,8),Y=s.f(t,8),N=s.f(t,8)):(W=2,Y=2,N=2);let X=0,J=0,H=0,j=0,q=0;return $?(X=s.f(t,1),J=1,H=1,j=0,q=0):1==W&&13==Y&&0==N?(X=1,J=0,H=0,q=s.f(t,1)):(X=s.f(t,1),0==o?(J=1,H=1):1==o?(J=0,H=0):12==O?(J=s.f(t,1),H=J?s.f(t,1):0):(J=1,H=0),J&&H&&(j=s.f(t,2)),q=s.f(t,1)),s.f(t,1),{width:A+1,height:B+1,profile:o,level:h[f[0]],tier:p[0],bitDepth:O,monoChrome:$,colorRange:X,colorPrimaries:W,transferCharacteristics:Y,matrixCoefficients:N,subsamplingX:J,subsamplingY:H,chromaSamplePosition:j}}(d);i.writeU(3,e.profile),i.writeU(5,e.level),i.writeU(1,e.tier),i.writeU(1,e.bitDepth>8?1:0),i.writeU(1,12===e.bitDepth?1:0),i.writeU(1,e.monoChrome),i.writeU(1,e.subsamplingX),i.writeU(1,e.subsamplingY),i.writeU(1,e.chromaSamplePosition)}else{const t=n.g[a.f[15](e+28)];i.writeU(3,a.f[15](e+48)),i.writeU(5,a.f[15](e+52)),i.writeU(1,0),i.writeU(1,t.comp[0].depth>8?1:0),i.writeU(1,12===t.comp[0].depth?1:0),i.writeU(1,0),i.writeU(1,1),i.writeU(1,1),i.writeU(1,0)}return i.writeU(8,0),i.getBuffer()}},58919:(e,t,i)=>{i.d(t,{Ui:()=>w,XC:()=>u,Yj:()=>g,k9:()=>p,wN:()=>l});var a=i(63939),r=i(9599),s=i(29170),o=i(37246),n=i(77231),d=i(97317),c=i(44328),h=i(729);const l={0:"Profile0",1:"Profile1",2:"Profile2",3:"Profile3"},f=[{level:10,maxResolution:196608,maxFrameRate:30},{level:11,maxResolution:196608,maxFrameRate:60},{level:20,maxResolution:518400,maxFrameRate:30},{level:21,maxResolution:518400,maxFrameRate:60},{level:30,maxResolution:2073600,maxFrameRate:30},{level:31,maxResolution:2073600,maxFrameRate:60},{level:40,maxResolution:3686400,maxFrameRate:30},{level:41,maxResolution:3686400,maxFrameRate:60},{level:50,maxResolution:8294400,maxFrameRate:30},{level:51,maxResolution:8294400,maxFrameRate:60},{level:60,maxResolution:8847360,maxFrameRate:30},{level:61,maxResolution:8847360,maxFrameRate:60},{level:70,maxResolution:35389440,maxFrameRate:30},{level:71,maxResolution:35389440,maxFrameRate:60}];function p(e,t,i){const a=e*t;for(const e of f)if(a<=e.maxResolution&&i<=e.maxFrameRate)return e.level}function u(e,t){if(!t&&e.sideData[1]&&(t=e.sideData[1]),t&&t.length>=6){const i=w(t);e.codecpar.profile=i.profile,e.codecpar.level=i.level}}function w(e){const t=new o.A(e.length);return t.appendBuffer(e),{profile:t.readU(8),level:t.readU(8),bitDepth:t.readU(4),chromaSubsampling:t.readU(3),fullRangeFlag:t.readU1(),colorPrimaries:t.readU(8),colorTrc:t.readU(8),colorSpace:t.readU(8)}}function g(e){const t=new h.A(new Uint8Array(8)),i=function(e){let t=a.f[15](e+48),i=a.f[15](e+52);i===n.N_&&(i=p(a.f[15](e+56),a.f[15](e+60),(0,c.lb)((0,s.A)(e+72,r.P))));const o=d.g[a.f[15](e+28)];let h=a.f[15](e+40),l=1;o&&(h=o.comp[0].depth,1===o.log2ChromaW&&1===o.log2ChromaH?1===a.f[15](e+100)&&(l=0):1===o.log2ChromaW&&0===o.log2ChromaH?l=2:0===o.log2ChromaW&&0===o.log2ChromaH&&(l=3));const f=2===a.f[15](e+84)?1:0;return t===n.N_&&h&&(t=0==l||1==l?8==h?0:2:8==h?1:3),{profile:t,level:i,bitDepth:h,chromaSubsampling:l,fullRange:f}}(e);return t.writeUint8(i.profile),t.writeUint8(i.level),t.writeUint8(i.bitDepth<<4|i.chromaSubsampling<<1|i.fullRange),t.writeUint8(a.f[15](e+88)),t.writeUint8(a.f[15](e+92)),t.writeUint8(a.f[15](e+96)),t.writeUint16(0),t.getWroteBuffer()}},28773:(e,t,i)=>{i.r(t),i.d(t,{default:()=>x});var a=i(134),r=i(63939),s=i(50932),o=i(58121),n=i(68243),d=i(4624),c=i(35028),h=i(20620),l=i(58469),f=i(53e3),p=i(55611),u=i(90412),w=i(58919),g=i(9705),m=i(85947),U=i(14686),R=i(37837),k=i(71517),I=i(65977),v=i(44328),b=i(77231),A=i(72739),B=i(52071),y="src\\avformat\\formats\\IFlvFormat.ts";class x extends m.A{constructor(e={}){super(),(0,a.A)(this,"type",0),(0,a.A)(this,"header",void 0),(0,a.A)(this,"script",void 0),(0,a.A)(this,"options",void 0),(0,a.A)(this,"firstTagPos",void 0),this.header=new o.A,this.script=new n.A,this.options=e}init(e){e.ioReader&&e.ioReader.setEndian(!0)}async readHeader(e){try{if("FLV"!==await e.ioReader.peekString(3))return d.z3("the file format is not flv",y,101),g.LR;await this.header.read(e.ioReader),0!==await e.ioReader.readUint32()&&d.R8("the previousTagSize0 is not 0",y,108);let t=0;if(18===await e.ioReader.peekUint8()){await e.ioReader.skip(1);const i=await e.ioReader.readUint24();await e.ioReader.skip(7),t=await this.script.read(e.ioReader,i)}return t>=0&&(this.firstTagPos=e.ioReader.getPos()),t}catch(t){return d.z3(t.message,y,126),e.ioReader.error}}async readCodecConfigurationRecord(e,t,i){const a=(0,R.sY)(i);t.codecpar.extradata=a,t.codecpar.extradataSize=i,await e.ioReader.readBuffer(i,(0,U.JW)(a,i)),t.sideData[1]=(0,U.s3)(a,i).slice(),27===t.codecpar.codecId?h.XC(t):173===t.codecpar.codecId?f.XC(t):196===t.codecpar.codecId?p.XC(t):225===t.codecpar.codecId?u.XC(t):167===t.codecpar.codecId&&w.XC(t)}async readAVPacketData(e,t,i,a){const r=(0,R.sY)(a);(0,k.NX)(i,r,a),await e.ioReader.readBuffer(a,(0,U.JW)(r,a)),27===t.codecpar.codecId?(h.Jk(i,t),s.M[15](i+80,1)):173===t.codecpar.codecId?(f.Jk(i,t),s.M[15](i+80,1)):196===t.codecpar.codecId&&(p.Jk(i,t),s.M[15](i+80,1))}async readAVPacket_(e,t){const i=e.ioReader.getPos();s.M[17](t+56,i);const a=31&await e.ioReader.readUint8(),o=await e.ioReader.readUint24();let n=await e.ioReader.readUint24();const h=await e.ioReader.readUint8();if(h&&(n|=h<<24),s.M[17](t+16,BigInt(Math.floor(n))),s.M[17](t+8,BigInt(Math.floor(n))),await e.ioReader.skip(3),8===a){let i=e.getStreamByMediaType(1);i&&s.M[15](t+32,i.index),s.M[15](t+36,1|r.f[15](t+36));const a=await e.ioReader.readUint8();if(i)if(86018===i.codecpar.codecId)if(0===await e.ioReader.readUint8()){const i=o-2,a=(0,R.sY)(i);(0,k.Ow)(t,1,a,i),await e.ioReader.readBuffer(i,(0,U.JW)(a,i))}else await this.readAVPacketData(e,i,t,o-2);else await this.readAVPacketData(e,i,t,o-1);else{i=e.createStream(),s.M[15](t+32,i.index),i.codecpar.codecType=1,i.timeBase.den=1e3,i.timeBase.num=1,i.startTime=r.f[17](t+8)||r.f[17](t+16),this.script.onMetaData.duration&&(i.duration=BigInt(Math.floor(1e3*this.script.onMetaData.duration))),i.codecpar.chLayout.nbChannels=1&~a?1:2,i.codecpar.sampleRate=44100<<((12&a)>>>2)>>3,i.codecpar.bitsPerCodedSample=2&a?16:8;const n=(240&a)>>4;if(i.codecpar.codecId=0===n||3===n?8===i.codecpar.bitsPerCodedSample?65541:65536:c.FJ[n],86018===i.codecpar.codecId)if(0===await e.ioReader.readUint8()){const t=o-2,a=(0,R.sY)(t);i.codecpar.extradata=a,i.codecpar.extradataSize=t,await e.ioReader.readBuffer(t,(0,U.JW)(a,t)),i.sideData[1]=(0,U.s3)(a,t).slice(),l.XC(i)}else await this.readAVPacketData(e,i,t,o-2);else 86051===i.codecpar.codecId?(i.codecpar.sampleRate=16e3,i.codecpar.chLayout.nbChannels=1):65543!==i.codecpar.codecId&&65542!==i.codecpar.codecId||(i.codecpar.sampleRate=8e3),await this.readAVPacketData(e,i,t,o-1);this.onStreamAdd&&this.onStreamAdd(i)}}else{if(9!==a){if(18===a){let i=await this.script.read(e.ioReader,o);return i<0?i:await this.readAVPacket_(e,t)}return d.R8(`invalid tag type: ${a}, try to sync to next tag`,y,466),await this.syncTag(e),this.readAVPacket_(e,t)}{let i=e.getStreamByMediaType(0);i&&s.M[15](t+32,i.index);const a=await e.ioReader.readUint8();if(i)if((112&a)>>4==1&&s.M[15](t+36,1|r.f[15](t+36)),128&a){await e.ioReader.skip(4);const n=15&a;if(173!==i.codecpar.codecId&&196!==i.codecpar.codecId||s.M[15](t+80,1),0===n){const i=o-5,a=(0,R.sY)(i);(0,k.Ow)(t,1,a,i),await e.ioReader.readBuffer(i,(0,U.JW)(a,i))}else if(2===n)s.M[15](t+36,32|r.f[15](t+36));else if(1===n||3===n)if(1!==n||173!==i.codecpar.codecId&&196!==i.codecpar.codecId)await this.readAVPacketData(e,i,t,o-5);else{const a=await e.ioReader.readInt24();s.M[17](t+8,r.f[17](t+16)+BigInt(0|a)),await this.readAVPacketData(e,i,t,o-8)}}else if(27===i.codecpar.codecId||173===i.codecpar.codecId||12===i.codecpar.codecId){s.M[15](t+80,1);const a=await e.ioReader.readUint8(),n=await e.ioReader.readInt24();if(s.M[17](t+8,r.f[17](t+16)+BigInt(0|n)),0===a){const i=o-5,a=(0,R.sY)(i);(0,k.Ow)(t,1,a,i),await e.ioReader.readBuffer(i,(0,U.JW)(a,i))}else 2===a?s.M[15](t+36,32|r.f[15](t+36)):await this.readAVPacketData(e,i,t,o-5)}else await this.readAVPacketData(e,i,t,o-1);else{if(i=e.createStream(),s.M[15](t+32,i.index),i.codecpar.codecType=0,i.timeBase.den=1e3,i.timeBase.num=1,i.startTime=r.f[17](t+8)||r.f[17](t+16),this.script.onMetaData.duration&&(i.duration=BigInt(Math.floor(1e3*this.script.onMetaData.duration))),this.script.onMetaData.width>0&&(i.codecpar.width=this.script.onMetaData.width),this.script.onMetaData.height>0&&(i.codecpar.height=this.script.onMetaData.height),(112&a)>>4==1&&s.M[15](t+36,1|r.f[15](t+36)),128&a){const n=await e.ioReader.readUint32();n===(0,I.A)("hvc1")?(i.codecpar.codecId=173,s.M[15](t+80,1)):n===(0,I.A)("vvc1")?(i.codecpar.codecId=196,s.M[15](t+80,1)):n===(0,I.A)("av01")?i.codecpar.codecId=225:n===(0,I.A)("vp09")&&(i.codecpar.codecId=167);const d=15&a;if(0===d)await this.readCodecConfigurationRecord(e,i,o-5);else if(2===d)s.M[15](t+36,32|r.f[15](t+36));else if(1===d||3===d)if(1!==d||173!==i.codecpar.codecId&&196!==i.codecpar.codecId)await this.readAVPacketData(e,i,t,o-5);else{const a=await e.ioReader.readInt24();s.M[17](t+8,r.f[17](t+16)+BigInt(0|a)),await this.readAVPacketData(e,i,t,o-8)}}else if(i.codecpar.codecId=c.U5[15&a],27===i.codecpar.codecId||173===i.codecpar.codecId||196===i.codecpar.codecId||12===i.codecpar.codecId){s.M[15](t+80,1);const a=await e.ioReader.readUint8(),n=await e.ioReader.readInt24();s.M[17](t+8,r.f[17](t+16)+BigInt(0|n)),0===a?await this.readCodecConfigurationRecord(e,i,o-5):2===a?s.M[15](t+36,32|r.f[15](t+36)):await this.readAVPacketData(e,i,t,o-5)}else await this.readAVPacketData(e,i,t,o-1);this.onStreamAdd&&this.onStreamAdd(i)}}}const f=e.ioReader.getPos()-i,p=BigInt(Math.floor(await e.ioReader.readUint32()));return f!==p?(d.R8(`tag ${a} size not match, size: ${f}, previousTagSize: ${p}`,y,475),g.LR):0}async readAVPacket(e,t){try{return s.M[15](t+76,1e3),s.M[15](t+72,1),await this.readAVPacket_(e,t)}catch(t){return-1048576!==e.ioReader.error?(d.z3(`read packet error, ${t}`,y,491),g.LR):e.ioReader.error}}async syncTag(e){let t=b.Dh;for(;;)try{const i=await e.ioReader.readUint8();if(8===i||9===i){t=e.ioReader.getPos()-BigInt(1);const i=await e.ioReader.readUint24();if(i>10485760){await e.ioReader.seek(t+BigInt(1));continue}await e.ioReader.skip(7+i);if(e.ioReader.getPos()-t!==BigInt(Math.floor(await e.ioReader.readUint32()))){await e.ioReader.seek(t+BigInt(1)),t=b.Dh;continue}{let i=0;for(;i<=3;){const t=e.ioReader.getPos(),a=await e.ioReader.readUint8();if(8!==a&&9!==a&&18!==a)break;{const a=await e.ioReader.readUint24();await e.ioReader.skip(7+a);if(e.ioReader.getPos()-t!==BigInt(Math.floor(await e.ioReader.readUint32())))break;i++}}if(!(i<3))break;await e.ioReader.seek(t+BigInt(1)),t=b.Dh}}}catch(e){break}t!==b.Dh&&await e.ioReader.seek(t)}async seek(e,t,i,a){const r=e.ioReader.getPos();if(2&a)return await e.ioReader.seek(i),4&a||await this.syncTag(e),r;if(t&&t.sampleIndexes.length){let a=A.El(t.sampleIndexes,(e=>e.pts>i?-1:1));if(a>0&&(0,v.k)(i-t.sampleIndexes[a-1].pts,t.timeBase,b.i0)<BigInt(1e4))return d.Yz(`seek in sampleIndexes, found index: ${a}, pts: ${t.sampleIndexes[a-1].pts}, pos: ${t.sampleIndexes[a-1].pos}`,y,590),await e.ioReader.seek(t.sampleIndexes[a-1].pos),r}if(this.script.canSeek()){const{pos:a,dts:s}=this.script.dts2Position(Number((0,v.k)(i,t.timeBase,b.i0)/BigInt(1e3)));if(a>0){d.Yz(`seek in filepositions, found pts: ${s}, pos: ${a}`,y,599),await e.ioReader.seek(BigInt(Math.floor(a)));const t=await e.ioReader.peekUint8();return 8!==t&&9!==t&&18!==t&&await this.syncTag(e),r}}return d.Yz("not found any keyframe index, try to seek in bytes",y,609),(0,B.A)(e,t,i,this.firstTagPos,this.readAVPacket.bind(this),this.syncTag.bind(this))}getAnalyzeStreamsCount(){let e=0;return this.header.hasAudio&&e++,this.header.hasVideo&&e++,e}}},85947:(e,t,i)=>{i.d(t,{A:()=>r});var a=i(134);class r{constructor(){(0,a.A)(this,"type",-1),(0,a.A)(this,"onStreamAdd",void 0)}async destroy(e){}}},58121:(e,t,i)=>{i.d(t,{A:()=>r});var a=i(134);class r{constructor(){(0,a.A)(this,"signature",void 0),(0,a.A)(this,"version",void 0),(0,a.A)(this,"flags",void 0),(0,a.A)(this,"dataOffset",void 0),(0,a.A)(this,"hasVideo",void 0),(0,a.A)(this,"hasAudio",void 0),this.signature="FLV",this.version=1,this.flags=0,this.dataOffset=9,this.hasAudio=!1,this.hasVideo=!1}async read(e){this.signature=await e.readString(3),this.version=await e.readUint8(),this.flags=await e.readUint8(),this.dataOffset=await e.readUint32(),this.hasAudio=!!(4&this.flags),this.hasVideo=!!(1&this.flags)}write(e){this.flags=0,this.hasAudio&&(this.flags|=4),this.hasVideo&&(this.flags|=1),e.writeString(this.signature),e.writeUint8(this.version),e.writeUint8(this.flags),e.writeUint32(this.dataOffset)}}},68243:(e,t,i)=>{i.d(t,{A:()=>f});var a=i(134),r=i(35336),s=i(67672),o=i(72739),n=i(95335),d=i(92647),c=i(4624),h=i(94889),l=i(9705);class f{constructor(){(0,a.A)(this,"onMetaData",void 0),this.onMetaData={audiocodecid:10,canSeekToEnd:!1,width:0,height:0,stereo:!0,videocodecid:7}}async parseObject(e,t){return{key:await e.readString(await e.readUint16()),value:await this.parseValue(e,t)}}async parseValue(e,t){let i;switch(await e.readUint8()){case 0:i=await e.readDouble();break;case 1:i=!!await e.readUint8();break;case 2:i=await e.readString(await e.readUint16());break;case 3:for(i={};e.getPos()<t;){const{key:a,value:r}=await this.parseObject(e,t);if(i[a]=r,9==(16777215&await e.peekUint24())){await e.skip(3);break}}break;case 8:for(i={},await e.skip(4);e.getPos()<t;){const{key:a,value:r}=await this.parseObject(e,t);if(i[a]=r,9==(16777215&await e.peekUint24())){await e.skip(3);break}}break;case 9:i=null;break;case 10:i=[];const a=await e.readUint32();for(let r=0;r<a;r++)i.push(await this.parseValue(e,t));break;case 11:const r=await e.readDouble(),s=await e.readInt16();i=new Date(r+60*s*1e3);break;case 12:i=await e.readString(await e.readUint32())}return i}async read(e,t){const i=e.getPos(),a=i+BigInt(Math.floor(t)),r=await this.parseValue(e,a),s=await this.parseValue(e,a);this[r]=s;const o=Number(e.getPos()-i),n=await e.readUint32();return o+11!==n?(c.R8(`script size not match, size: ${o+11}, previousTagSize: ${n}`,"src\\avformat\\formats\\flv\\FlvScriptTag.ts",150),l.LR):0}writeValue(e,t){s.ai(t)?(e.writeUint8(0),e.writeDouble(t)):s.o(t)?(e.writeUint8(0),e.writeDouble(Number(t))):s.zM(t)?(e.writeUint8(1),e.writeUint8(t?1:0)):s.Yj(t)?t.length>=65536?(e.writeUint8(12),e.writeUint32(t.length),e.writeString(t)):(e.writeUint8(2),e.writeUint16(t.length),e.writeString(t)):s.YO(t)?(e.writeUint8(10),e.writeUint32(t.length),o.__(t,(t=>{this.writeValue(e,t)}))):s.Ik(t)?(e.writeUint8(3),n.__(t,((t,i)=>{e.writeUint16(i.length),e.writeString(i),this.writeValue(e,t)})),e.writeUint24(9)):t instanceof Date&&(e.writeUint8(11),e.writeDouble(t.getTime()),e.writeInt16(0))}computeSize(){const e=[],t=new r.A;return t.onFlush=t=>(e.push(t.slice()),0),this.writeValue(t,"onMetaData"),this.writeValue(t,this.onMetaData),t.flush(),(0,d.A)(Uint8Array,e).length}write(e){if(this.onMetaData){const t=[],i=new r.A;i.onFlush=e=>(t.push(e.slice()),0),this.writeValue(i,"onMetaData"),this.writeValue(i,this.onMetaData),i.flush();const a=(0,d.A)(Uint8Array,t),s=e.getPos();h.xk(e,18,a.length,BigInt(0)),e.writeBuffer(a),e.writeUint32(Number(e.getPos()-s))}}dts2Position(e){if(this.canSeek()){let t=-1;const i=this.onMetaData.keyframes.times,a=this.onMetaData.keyframes.filepositions;let r;for(r=0;r<i.length;r++){if(i[r]===e){t=r;break}if(i[r]>e){t=Math.max(r-1,0);break}}return r&&r===i.length&&(t=i.length-1),{pos:a[t],dts:i[t]}}return{pos:-1,dts:-1}}position2DTS(e){if(this.canSeek()){let i=-1;const a=this.onMetaData.keyframes.times,r=this.onMetaData.keyframes.filepositions;let s=0;for(s=0;s<r.length;s++)if(r[s]>e){i=s;break}var t;return s===r.length?null!==(t=this.onMetaData.duration)&&void 0!==t?t:a[a.length-1]:a[i]}return-1}canSeek(){return!!(this.onMetaData.keyframes&&this.onMetaData.keyframes.filepositions&&this.onMetaData.keyframes.filepositions.length)}}},35028:(e,t,i)=>{i.d(t,{FJ:()=>r,FV:()=>a,IO:()=>o,U5:()=>s});const a={86018:10,86017:2,86051:11,69645:1,86049:6,65543:7,65542:8,27:7,173:12,196:13,12:9,4:2,86:3,92:4,106:5,131:6},r={10:86018,2:86017,11:86051,1:69645,4:86049,5:86049,6:86049,7:65543,8:65542},s={7:27,12:173,13:196,9:12,2:4,3:86,4:92,5:106,6:131},o={86018:1,86017:0,86051:0,65543:0,65542:0,69645:0,86049:0,27:4,12:4,173:4,196:4,167:4,225:4,4:0,86:0,92:0,106:0,131:0}},94889:(e,t,i)=>{i.d(t,{BV:()=>s,VU:()=>n,ii:()=>o,xk:()=>r});var a=i(35028);function r(e,t,i,a){e.writeUint8(t),e.writeUint24(i),e.writeUint24(Number(a&BigInt(16777215))),e.writeUint8(Number(a>>BigInt(24)&BigInt(255))),e.writeUint24(0)}function s(e,t){let i=2;(86018===t.codecpar.codecId||t.codecpar.chLayout.nbChannels>1)&&(i|=1),86018===t.codecpar.codecId||t.codecpar.sampleRate>=44e3?i|=12:t.codecpar.sampleRate>=22e3?i|=8:t.codecpar.sampleRate>=11e3&&(i|=4),i|=a.FV[t.codecpar.codecId]<<4,e.writeUint8(i)}function o(e,t,i){let r=15&a.FV[t.codecpar.codecId];27!==t.codecpar.codecId&&12!==t.codecpar.codecId&&173!==t.codecpar.codecId&&196!==t.codecpar.codecId||(r|=1&i?16:32),e.writeUint8(r)}function n(e,t,i,a){let r=15&i|128;27!==t.codecpar.codecId&&173!==t.codecpar.codecId&&196!==t.codecpar.codecId&&167!==t.codecpar.codecId&&225!==t.codecpar.codecId||(r|=1&a?16:32),e.writeUint8(r)}},2187:(e,t,i)=>{i.d(t,{d:()=>o});var a=i(72739),r=i(44328),s=i(77231);function o(e,t,i){let o=BigInt(0);return a.__(e,(e=>{o+=e.codecpar.bitrate*(0,r.k)(t,i,s.i0)/BigInt(8e3)})),o}},65977:(e,t,i)=>{i.d(t,{A:()=>s});var a=i(4624),r="src\\avformat\\function\\mktag.ts";function s(e){4!==e.length&&a.R8(`tag length is not 4, tag: ${e}`,r,30);let t=0;for(let i=0;i<4;i++)t=t<<8|e.charCodeAt(i);return t}},52071:(e,t,i)=>{i.d(t,{A:()=>p});var a=i(63939),r=i(9599),s=i(29170),o=i(77231),n=i(44328),d=i(2187),c=i(71517),h=i(9705),l=i(4624),f="src\\avformat\\function\\seekInBytes.ts";async function p(e,t,i,p,u,w){const g=e.ioReader.getPos(),m=await e.ioReader.fileSize();let U=o.Dh,R=i;t.startTime!==o.Dh?R-=t.startTime:R-=t.firstDTS;const k=(0,n.k)(i,t.timeBase,o.i0);if(k<BigInt(1e4))return l.Yz(`seek pts is earlier then 10s, seek to first packet pos(${p}) directly`,f,63),await e.ioReader.seek(p),g;let I=(0,d.d)(e.streams,R,t.timeBase);const v=m-(0,d.d)(e.streams,BigInt(1e4),o.i0),b=(0,d.d)(e.streams,BigInt(1e4),o.i0);if(I>v&&(I=v),I<p)return await e.ioReader.seek(p),g;const A=(0,c._5)();let B=m,y=BigInt(0);for(;;){if(B-y<b){U=y;break}await e.ioReader.seek(I),await w(e);const t=e.ioReader.getPos();if(!(await u(e,A)>=0)){U=o.Dh;break}{const e=(0,n.k)(a.f[17](A+8),(0,s.A)(A+72,r.P),o.i0),i=e-k;if(l.Yz(`try to seek to pos: ${I}, got packet pts: ${a.f[17](A+8)}(${e}ms), diff: ${i}ms`,f,98),i<=BigInt(0)&&-i<BigInt(1e4)){U=t;break}i>BigInt(0)?(B=I,I=y+B>>BigInt(1)):(y=I,I=y+B>>BigInt(1))}}return(0,c.Qe)(A),U!==o.Dh?(l.Yz(`finally seek to pos ${U}`,f,126),await e.ioReader.seek(U),await w(e),g):(await e.ioReader.seek(g),BigInt(h.E$))}},11573:(e,t,i)=>{function a(e,t){let i=0;for(let a=0;a<t;a++)i=2*i+e.readU1();return i}function r(e){let t=0;for(;!a(e,1);)t++;return t>=32?0:a(e,t)+(1<<t)-1}function s(e){let t=0;for(let i=0;i<8;i++){let r=a(e,8);if(t|=(127&r)<<7*i,!(128&r))break}return t}i.d(t,{d:()=>r,f:()=>a,v:()=>s})},35336:(e,t,i)=>{i.d(t,{A:()=>s});var a=i(134),r=i(50011);class s{constructor(e=1048576,t=!0,i){if((0,a.A)(this,"data",void 0),(0,a.A)(this,"buffer",void 0),(0,a.A)(this,"pointer",void 0),(0,a.A)(this,"pos",void 0),(0,a.A)(this,"size",void 0),(0,a.A)(this,"littleEndian",void 0),(0,a.A)(this,"error",void 0),(0,a.A)(this,"onFlush",void 0),(0,a.A)(this,"onSeek",void 0),this.pointer=0,this.pos=BigInt(0),this.size=e,this.littleEndian=!t,this.error=0,i&&i.view)this.size=i.length,this.buffer=i,this.data=i.view;else if(i&&!i.byteOffset)this.size=i.length,this.buffer=i,this.data=new DataView(this.buffer.buffer);else{if(i)throw new Error("not support subarray of ArrayBuffer");this.buffer=new Uint8Array(this.size),this.data=new DataView(this.buffer.buffer)}}writeUint8(e){this.remainingLength()<1&&this.flush(),this.data.setUint8(this.pointer,e),this.pointer++,this.pos++}writeUint16(e){this.remainingLength()<2&&this.flush(),this.data.setUint16(this.pointer,e,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}writeUint24(e){this.remainingLength()<3&&this.flush();const t=(16711680&e)>>16,i=(65280&e)>>8,a=255&e;this.littleEndian?(this.writeUint8(a),this.writeUint8(i),this.writeUint8(t)):(this.writeUint8(t),this.writeUint8(i),this.writeUint8(a))}writeUint32(e){this.remainingLength()<4&&this.flush(),this.data.setUint32(this.pointer,e,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}writeUint64(e){this.remainingLength()<8&&this.flush(),this.data.setBigUint64(this.pointer,e,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}writeInt8(e){this.remainingLength()<1&&this.flush(),this.data.setInt8(this.pointer,e),this.pointer++,this.pos++}writeInt16(e){this.remainingLength()<2&&this.flush(),this.data.setInt16(this.pointer,e,this.littleEndian),this.pointer+=2,this.pos+=BigInt(2)}writeInt24(e){this.writeUint24(e<0?e+16777216:e)}writeInt32(e){this.remainingLength()<4&&this.flush(),this.data.setInt32(this.pointer,e,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}writeInt64(e){this.remainingLength()<8&&this.flush(),this.data.setBigInt64(this.pointer,e,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}writeFloat(e){this.remainingLength()<4&&this.flush(),this.data.setFloat32(this.pointer,e,this.littleEndian),this.pointer+=4,this.pos+=BigInt(4)}writeDouble(e){this.remainingLength()<8&&this.flush(),this.data.setFloat64(this.pointer,e,this.littleEndian),this.pointer+=8,this.pos+=BigInt(8)}getPointer(){return this.pointer}getPos(){return this.pos}remainingLength(){return this.size-this.pointer}writeBuffer(e){if(!e.length)return;let t=e.length;if(this.remainingLength()<t){let i=0;for(;t>0;){this.flush();const a=Math.min(this.size,t);this.buffer.set(e.subarray(i,i+a),this.pointer),this.pointer+=a,this.pos+=BigInt(a),i+=a,t-=a}}else this.buffer.set(e,this.pointer),this.pointer+=t,this.pos+=BigInt(t)}writeString(e){const t=r.encode(e);return this.writeBuffer(t),t.length}flush(){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){const e=this.onFlush(this.buffer.subarray(0,this.pointer));if(0!==e)throw this.error=e,Error("IOWriter error, flush failed")}this.pointer=0}flushToPos(e){if(!this.onFlush)throw this.error=-1048574,Error("IOWriter error, flush failed because of no flush callback");if(this.pointer){const t=this.onFlush(this.buffer.subarray(0,this.pointer),e);if(0!==t)throw this.error=t,Error("IOWriter error, flush failed")}this.pointer=0}seek(e){if(!this.onSeek)throw this.error=-1048574,Error("IOWriter error, seek failed because of no seek callback");this.flush();const t=this.onSeek(e);if(0!==t)throw this.error=t,Error("IOWriter error, seek failed");this.pos=e}seekInline(e){const t=this.pointer;this.pointer=Math.max(0,Math.min(this.size,e)),this.pos+=BigInt(this.pointer-t)}skip(e){const t=this.pointer;this.pointer=Math.min(this.size,this.pointer+e),this.pos+=BigInt(this.pointer-t)}back(e){const t=this.pointer;this.pointer=Math.max(0,this.pointer-e),this.pos+=BigInt(this.pointer-t)}getBuffer(){return this.buffer.subarray(0,this.pointer)}setEndian(e){this.littleEndian=!e}reset(){this.pointer=0,this.pos=BigInt(0),this.error=0}getBufferSize(){return this.size}}}}]);