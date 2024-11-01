"use strict";(self.webpackChunkAVTranscoder=self.webpackChunkAVTranscoder||[]).push([[70],{85947:(t,e,i)=>{i.d(e,{A:()=>s});var n=i(134);class s{constructor(){(0,n.A)(this,"type",-1),(0,n.A)(this,"onStreamAdd",void 0)}async destroy(t){}}},78070:(t,e,i)=>{i.r(e),i.d(e,{default:()=>l});var n=i(134),s=i(50932),r=i(4624),u=i(9705),a=i(85947),h=i(14686),c=i(37837),o=i(71517),d=i(72739),f=i(50011),g=i(54825);class l extends a.A{constructor(){super(),(0,n.A)(this,"type",19),(0,n.A)(this,"queue",void 0),(0,n.A)(this,"index",void 0)}init(t){this.queue=[]}async readChunk(t){let e="";const i=t.ioReader.getPos();for(;;){const i=await t.ioReader.readLine();if(""===i)break;e+=i+"\n"}return{chunk:e.trim(),pos:i}}async readHeader(t){const e=t.createStream();e.codecpar.codecId=94225,e.codecpar.codecType=3,e.timeBase.den=1e3,e.timeBase.num=1,this.index=0;let i=BigInt(0);try{for(;;){const{chunk:n,pos:s}=await this.readChunk(t);if(""===n)continue;const r=n.split("\n");let u=r.shift().trim(),a=r.shift().split(/--?>/);const h=(0,g.t)(a[0]),c=(0,g.t)(a[1]);if(c<=h)continue;const o=r.join("\n").trim();if(!o)continue;e.nbFrames++,e.duration=c;const f={identifier:u,context:o,startTs:h,endTs:c,pos:s};h>=i?(this.queue.push(f),i=h):d._(this.queue,f,(t=>t.startTs<f.startTs?1:-1))}}catch(t){return 0}}async readAVPacket(t,e){if(!this.queue.length)return u.LR;if(this.index>=this.queue.length)return-1048576;const i=t.streams.find((t=>3===t.codecpar.codecType)),n=this.queue[this.index++];if(s.M[15](e+32,i.index),s.M[15](e+76,i.timeBase.den),s.M[15](e+72,i.timeBase.num),s.M[17](e+16,n.startTs),s.M[17](e+8,n.startTs),s.M[17](e+48,n.endTs-n.startTs),n.identifier){const t=f.encode(n.identifier),i=(0,c.sY)(t.length);(0,h.lW)(i,t.length,t),(0,o.Ow)(e,16,i,t.length)}const r=f.encode(n.context),a=(0,c.sY)(r.length);return(0,h.lW)(a,r.length,r),(0,o.NX)(e,a,r.length),0}async seek(t,e,i,n){if(2&n)return BigInt(u.E$);if(i<=BigInt(0))return this.index=0,BigInt(0);const s=d.El(this.queue,(t=>t.startTs>i?-1:1));if(s>=0){for(r.Yz(`seek in cues, found index: ${s}, pts: ${this.queue[s].startTs}, pos: ${this.queue[s].pos}`,"src\\avformat\\formats\\ISubRipFormat.ts",201),this.index=Math.max(s-1,0);this.index>0&&(this.queue[this.index-1].startTs===this.queue[this.index].startTs||this.queue[this.index-1].endTs>i);)this.index--;return BigInt(0)}return BigInt(u.LR)}getAnalyzeStreamsCount(){return 1}}},54825:(t,e,i)=>{function n(t){if(!(t=t.trim()))return-BigInt(1);let e=t.split(":"),i=BigInt(0);return 3===e.length&&(i+=BigInt(+e.shift().trim())*BigInt(36e5)),i+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split("."),i+=BigInt(+e.shift().trim())*BigInt(1e3),i+=BigInt(+e.shift().trim()),i}function s(t){if(!(t=t.trim()))return-BigInt(1);let e=t.split(":"),i=BigInt(0);return 3===e.length&&(i+=BigInt(+e.shift().trim())*BigInt(36e5)),i+=BigInt(+e.shift().trim())*BigInt(6e4),e=e.shift().trim().split(","),i+=BigInt(+e.shift().trim())*BigInt(1e3),i+=BigInt(+e.shift().trim()),i}i.d(e,{j:()=>n,t:()=>s})}}]);