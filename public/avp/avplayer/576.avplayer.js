"use strict";(self.webpackChunkAVPlayer=self.webpackChunkAVPlayer||[]).push([[576],{41576:(e,t,i)=>{i.r(t),i.d(t,{default:()=>L});var s=i(134),a=i(80662),n=i.n(a),d=i(54001),o=i.n(d),r=i(13724),l=i(82800),m=i(95335),u=i(4624),h=i(78417),c=i(77580),g=i(86932),f=i(9705),p="src\\avnetwork\\ioLoader\\DashIOLoader.ts";class L extends l.A{constructor(...e){super(...e),(0,s.A)(this,"info",void 0),(0,s.A)(this,"range",void 0),(0,s.A)(this,"mediaPlayList",void 0),(0,s.A)(this,"fetchMediaPlayListPromise",void 0),(0,s.A)(this,"minBuffer",void 0),(0,s.A)(this,"audioResource",void 0),(0,s.A)(this,"videoResource",void 0),(0,s.A)(this,"subtitleResource",void 0)}createResource(e){return{type:e,fetchedMap:new(n()),fetchedHistoryList:[],loader:null,segmentIndex:0,currentUri:"",selectedIndex:0,segments:[],initSegmentPadding:"",initedSegment:""}}async fetchMediaPlayList(e){var t,i,s;if(!e){if(this.fetchMediaPlayListPromise)return;this.fetchMediaPlayListPromise=new(o())((t=>{e=t}))}const a={method:"GET",headers:{},mode:"cors",cache:"default",referrerPolicy:"no-referrer-when-downgrade"};null!==(t=this.info.httpOptions)&&void 0!==t&&t.headers&&m.__(this.info.httpOptions.headers,((e,t)=>{a.headers[t]=e})),null!==(i=this.info.httpOptions)&&void 0!==i&&i.credentials&&(a.credentials=this.info.httpOptions.credentials),null!==(s=this.info.httpOptions)&&void 0!==s&&s.referrerPolicy&&(a.referrerPolicy=this.info.httpOptions.referrerPolicy);try{const t=await fetch(this.info.url,a),i=await t.text();if(this.mediaPlayList=(0,h.A)(i,this.info.url),this.minBuffer=this.mediaPlayList.minBufferTime,this.options.isLive){var n,d;const t=this.mediaPlayList.minBufferTime/this.mediaPlayList.maxSegmentDuration,i=Math.max(this.mediaPlayList.mediaList.audio&&(null===(n=this.mediaPlayList.mediaList.audio[0])||void 0===n?void 0:n.mediaSegments.length)||0,this.mediaPlayList.mediaList.video&&(null===(d=this.mediaPlayList.mediaList.video[0])||void 0===d?void 0:d.mediaSegments.length)||0);if(i<t)return await new r.A((t-i)*this.mediaPlayList.maxSegmentDuration),u.R8(`wait for min buffer time, buffer: ${i*this.mediaPlayList.maxSegmentDuration}, need: ${t*this.mediaPlayList.maxSegmentDuration}`,p,136),this.fetchMediaPlayList(e)}if("vod"===this.mediaPlayList.type?this.options.isLive=!1:this.options.isLive=!0,this.mediaPlayList.mediaList.audio.length){const e=this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];e.file?this.audioResource.segments=[e.file]:this.options.isLive&&this.audioResource.initedSegment===e.initSegment?this.audioResource.segments=e.mediaSegments.map((e=>e.url)):(this.audioResource.segments=[e.initSegment].concat(e.mediaSegments.map((e=>e.url))),this.audioResource.initedSegment=e.initSegment)}if(this.mediaPlayList.mediaList.video.length){const e=this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];e.file?this.videoResource.segments=[e.file]:this.options.isLive&&this.videoResource.initedSegment===e.initSegment?this.videoResource.segments=e.mediaSegments.map((e=>e.url)):(this.videoResource.segments=[e.initSegment].concat(e.mediaSegments.map((e=>e.url))),this.videoResource.initedSegment=e.initSegment)}if(this.mediaPlayList.mediaList.subtitle.length){const e=this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];e.file?this.subtitleResource.segments=[e.file]:this.options.isLive&&this.subtitleResource.initedSegment===e.initSegment?this.subtitleResource.segments=e.mediaSegments.map((e=>e.url)):(this.subtitleResource.segments=[e.initSegment].concat(e.mediaSegments.map((e=>e.url))),this.subtitleResource.initedSegment=e.initSegment)}return e(),this.fetchMediaPlayListPromise=null,this.status=2,this.retryCount=0,this.mediaPlayList}catch(t){if(this.retryCount<this.options.retryCount)return this.retryCount++,u.z3(`failed fetch mpd file, retry(${this.retryCount}/3)`,p,208),await new r.A(2===this.status?this.options.retryInterval:5),this.fetchMediaPlayList(e);this.status=3,e(),u.h2(`DashLoader: exception, fetch slice error, error: ${t.message}`,p,216)}}async open(e,t){return 0!==this.status?f.lh:(this.info=e,this.range=t,this.range.to||(this.range.to=-1),this.range.from=Math.max(this.range.from,0),this.videoResource=this.createResource("video"),this.audioResource=this.createResource("audio"),this.subtitleResource=this.createResource("subtitle"),this.status=1,this.retryCount=0,await this.fetchMediaPlayList(),0)}async readResource(e,t){let i=0;if(t.loader){if(i=await t.loader.read(e),-1048576!==i)return i;if(this.options.isLive)t.fetchedMap.set(t.currentUri,!0),10===t.fetchedHistoryList.length&&t.fetchedMap.delete(t.fetchedHistoryList.shift()),t.fetchedHistoryList.push(t.currentUri);else if(t.segmentIndex++,t.segmentIndex>=t.segments.length)return-1048576;t.loader=null}if(this.options.isLive){const i=t.segments.filter((e=>!t.fetchedMap.get(e)));if(!i.length){if(this.mediaPlayList.isEnd)return-1048576;const i=(this.mediaPlayList.duration||this.mediaPlayList.minimumUpdatePeriod)-((0,g.A)()-this.mediaPlayList.timestamp)/1e3;if(i>0&&await new r.A(Math.max(i,2)),this.fetchMediaPlayListPromise){if(await this.fetchMediaPlayListPromise,3===this.status)return-1048576}else await this.fetchMediaPlayList();return this.readResource(e,t)}return t.currentUri=i[0],t.loader=new c.A(m.X$({},this.options,{disableSegment:!0,loop:!1})),await t.loader.open(m.X$({},this.info,{url:t.currentUri}),{from:0,to:-1}),t.loader.read(e)}return t.loader=new c.A(m.X$({},this.options,{disableSegment:!0,loop:!1})),t.initSegmentPadding?(await t.loader.open(m.X$({},this.info,{url:t.initSegmentPadding}),{from:0,to:-1}),t.initSegmentPadding=null,t.segmentIndex--):await t.loader.open(m.X$({},this.info,{url:t.segments[t.segmentIndex]}),{from:0,to:-1}),t.loader.read(e)}async read(e,t){return"audio"===t.mediaType?this.readResource(e,this.audioResource):"video"===t.mediaType?this.readResource(e,this.videoResource):"subtitle"===t.mediaType?this.readResource(e,this.subtitleResource):f.UY}async seekResource(e,t){t.loader&&(await t.loader.abort(),t.loader=null);let i=Number(BigInt.asIntN(32,e));if(t.segments){let e=0;const s="audio"===t.type?this.mediaPlayList.mediaList.audio:"video"===t.type?this.mediaPlayList.mediaList.video:this.mediaPlayList.mediaList.subtitle,a=s[t.selectedIndex].mediaSegments;if(null!=a&&a.length)for(let t=0;t<a.length;t++)if(i>=1e3*a[t].start&&i<1e3*a[t].end){e=t;break}t.segmentIndex=e+(s[t.selectedIndex].initSegment?1:0)}}async seek(e,t){return"audio"===t.mediaType&&this.audioResource.loader&&await this.seekResource(e,this.audioResource),"video"===t.mediaType&&this.videoResource.loader&&await this.seekResource(e,this.videoResource),"subtitle"===t.mediaType&&this.subtitleResource.loader&&await this.seekResource(e,this.subtitleResource),4===this.status&&(this.status=2),0}async size(){return BigInt(0)}async abort(){this.videoResource.loader&&(await this.videoResource.loader.abort(),this.videoResource.loader=null),this.audioResource.loader&&(await this.audioResource.loader.abort(),this.audioResource.loader=null),this.subtitleResource.loader&&(await this.subtitleResource.loader.abort(),this.subtitleResource.loader=null)}async stop(){await this.abort(),this.status=0}getDuration(){return this.mediaPlayList.duration}hasVideo(){var e;return(null===(e=this.mediaPlayList)||void 0===e?void 0:e.mediaList.video.length)>0}hasAudio(){var e;return(null===(e=this.mediaPlayList)||void 0===e?void 0:e.mediaList.audio.length)>0}hasSubtitle(){var e;return(null===(e=this.mediaPlayList)||void 0===e?void 0:e.mediaList.subtitle.length)>0}getVideoList(){return this.hasVideo()?{list:this.mediaPlayList.mediaList.video.map((e=>({width:e.width,height:e.height,frameRate:e.frameRate,codecs:e.codecs}))),selectedIndex:this.videoResource.selectedIndex}:{list:[],selectedIndex:0}}getAudioList(){return this.hasAudio()?{list:this.mediaPlayList.mediaList.audio.map((e=>({lang:e.lang,codecs:e.codecs}))),selectedIndex:this.audioResource.selectedIndex}:{list:[],selectedIndex:0}}getSubtitleList(){return this.hasSubtitle()?{list:this.mediaPlayList.mediaList.subtitle.map((e=>({lang:e.lang,codecs:e.codecs}))),selectedIndex:this.subtitleResource.selectedIndex}:{list:[],selectedIndex:0}}selectVideo(e){if(e!==this.videoResource.selectedIndex&&this.hasVideo()&&e>=0&&e<this.mediaPlayList.mediaList.video.length){this.videoResource.selectedIndex=e;const t=this.mediaPlayList.mediaList.video[this.videoResource.selectedIndex];t.file?this.videoResource.segments=[t.file]:(this.videoResource.segments=[t.initSegment].concat(t.mediaSegments.map((e=>e.url))),this.videoResource.initSegmentPadding=t.initSegment)}}selectAudio(e){if(e!==this.audioResource.selectedIndex&&this.hasAudio()&&e>=0&&e<this.mediaPlayList.mediaList.audio.length){this.audioResource.selectedIndex=e;const t=this.mediaPlayList.mediaList.audio[this.audioResource.selectedIndex];t.file?this.audioResource.segments=[t.file]:(this.audioResource.segments=[t.initSegment].concat(t.mediaSegments.map((e=>e.url))),this.audioResource.initSegmentPadding=t.initSegment)}}selectSubtitle(e){if(e!==this.subtitleResource.selectedIndex&&this.hasSubtitle()&&e>=0&&e<this.mediaPlayList.mediaList.subtitle.length){this.subtitleResource.selectedIndex=e;const t=this.mediaPlayList.mediaList.subtitle[this.subtitleResource.selectedIndex];t.file?this.subtitleResource.segments=[t.file]:(this.subtitleResource.segments=[t.initSegment].concat(t.mediaSegments.map((e=>e.url))),this.subtitleResource.initSegmentPadding=t.initSegment)}}getMinBuffer(){return this.minBuffer}}},78417:(e,t,i)=>{i.d(t,{A:()=>g});var s=i(88032),a=i.n(s),n=i(29967),d=i.n(n),o=i(79331),r=i(67672),l=i(62100),m=i(86932);function u(e){let t=0,i=0,s=0;return(e=e.slice(e.indexOf("PT")+2)).indexOf("H")>-1&&e.indexOf("M")>-1&&e.indexOf("S")>-1?(t=a()(e.slice(0,e.indexOf("H"))),i=a()(e.slice(e.indexOf("H")+1,e.indexOf("M"))),s=a()(e.slice(e.indexOf("M")+1,e.indexOf("S")))):e.indexOf("H")<0&&e.indexOf("M")>0&&e.indexOf("S")>-1?(i=a()(e.slice(0,e.indexOf("M"))),s=a()(e.slice(e.indexOf("M")+1,e.indexOf("S")))):e.indexOf("H")<0&&e.indexOf("M")<0&&e.indexOf("S")>-1&&(s=a()(e.slice(0,e.indexOf("S")))),3600*t+60*i+s}function h(e,t){return(Array(t).join("0")+e).slice(-t)}function c(e){if(!e)return 0;if(e.indexOf("/")>-1){const t=e.split("/");return a()(t[0])/a()(t[1])}return a()(e)}function g(e,t){const i={source:e,mediaList:{audio:[],video:[],subtitle:[]},type:"live",isEnd:!1,duration:0,minBufferTime:0,maxSegmentDuration:0,minimumUpdatePeriod:0,timestamp:(0,m.A)()},s=[],n=(g=e,g?(0,o.A)(g):null).MPD;var g;"static"===n.type&&(i.type="vod",i.isEnd=!0),n.minBufferTime&&(i.minBufferTime=u(n.minBufferTime)),n.maxSegmentDuration&&(i.maxSegmentDuration=u(n.maxSegmentDuration)),n.minimumUpdatePeriod&&(i.minimumUpdatePeriod=u(n.minimumUpdatePeriod)),n.mediaPresentationDuration&&(i.duration=u(n.mediaPresentationDuration));let f="";n.BaseURL&&(f=n.BaseURL);const p=r.YO(n.Period)?n.Period[0]:n.Period;return!i.duration&&p&&p.duration&&(i.duration=u(p.duration)),(r.YO(p.AdaptationSet)?p.AdaptationSet:[p.AdaptationSet]).forEach(((e,n)=>{let o="video/mp4",m="avc1.64001E",u=640,g=360,p=640,L=360,S=25,y="1:1",R="1",P=588633,b=f,v="und";e.BaseURL&&(b+=e.BaseURL),e.lang&&(v=e.lang),e.mimeType?(o=e.mimeType,"video/mp4"===o?(m=e.codecs,u=a()(e.width),g=a()(e.height),e.maxWidth&&(p=a()(e.maxWidth)),e.maxHeight&&(L=a()(e.maxHeight)),e.frameRate&&(S=c(e.frameRate)),y=e.sar,R=e.startWithSAP,P=a()(e.bandwidth)):"audio/mp4"===o&&(m=e.codecs,R=e.startWithSAP,P=a()(e.bandwidth))):(e.maxWidth&&(p=a()(e.maxWidth)),e.maxHeight&&(L=a()(e.maxHeight)),e.frameRate&&(S=c(e.frameRate))),(r.YO(e.Representation)?e.Representation:[e.Representation]).forEach(((n,c)=>{s.indexOf(n.id)>-1&&(n.id=(d()(s[s.length-1])+1).toString()),s.push(n.id);let f="";const x=[];let w=0,A=0,I=t.slice(0,t.lastIndexOf("/")+1)+b;n.mimeType&&(o=n.mimeType),"video/mp4"===o?(n.codecs&&(m=n.codecs),n.width&&(u=a()(n.width)),n.height&&(g=a()(n.height)),n.maxWidth&&(p=a()(n.maxWidth)),n.maxHeight&&(L=a()(n.maxHeight)),n.frameRate&&(S=a()(n.frameRate)),n.sar&&(y=n.sar),n.startWithSAP&&(R=n.startWithSAP),n.bandwidth&&(P=a()(n.bandwidth))):(n.codecs&&(m=n.codecs),n.startWithSAP&&(R=n.startWithSAP),n.bandwidth&&(P=a()(n.bandwidth))),n.BaseURL&&(I+=n.BaseURL);let T=!1;if((e.ContentProtection||n.ContentProtection)&&(T=!0),n.SegmentBase)"video/mp4"===o?i.mediaList.video.push({id:n.id,file:I,mimeType:o,codecs:m,width:u,height:g,maxWidth:p,maxHeight:L,frameRate:S,sar:y,startWithSAP:"1"===R,bandwidth:P,timescale:w,duration:A,encrypted:T}):"audio/mp4"===o?i.mediaList.audio.push({id:n.id,file:I,mimeType:o,codecs:m,startWithSAP:"1"===R,bandwidth:P,timescale:w,duration:A,encrypted:T,lang:v}):"application/mp4"===o&&i.mediaList.subtitle.push({id:n.id,file:I,mimeType:o,codecs:m,startWithSAP:"1"===R,bandwidth:P,timescale:w,duration:A,encrypted:T,lang:v});else{let t;if(e.SegmentTemplate&&(t=r.YO(e.SegmentTemplate)?e.SegmentTemplate[0]:e.SegmentTemplate),n.SegmentTemplate&&(t=r.YO(n.SegmentTemplate)?n.SegmentTemplate[0]:n.SegmentTemplate),t){const e=d()(t.startNumber);if(f=t.initialization,w=a()(t.timescale||"1"),t.duration&&!t.SegmentTimeline){A=a()(t.duration);let s=A/w;const d=e+Math.ceil((i.duration||s)/s)-1;for(let a=e;a<=d;a++){const o=s*(a-e);let r=s*(a-e+1);a===d&&(s=i.duration-s*(d-e),r=i.duration),x.push({idx:a,start:o,end:r,url:I+t.media.replace(/\$RepresentationID\$/g,n.id).replace(/\$Number(%(\d+)d)?\$/g,((e,t,i)=>i?h(a,+i):(0,l.A)(a))),segmentDuration:s})}}else if(t.SegmentTimeline&&t.SegmentTimeline.S){const i=r.YO(t.SegmentTimeline.S)?t.SegmentTimeline.S:[t.SegmentTimeline.S];let s=0,o=e;for(let e=0;e<i.length;e++){let r=a()(i[e].d);i[e].t&&(s=a()(i[0].t));let m=1;i[e].r&&(m=d()(i[e].r)+1);for(let e=0;e<m;e++)x.push({idx:o,start:s/w,end:(s+r)/w,url:I+t.media.replace(/\$RepresentationID\$/g,n.id).replace(/\$Number(%(\d+)d)?\$/g,((e,t,i)=>i?h(o,+i):(0,l.A)(o))).replace(/\$Time\$/g,(0,l.A)(s)),segmentDuration:r/w}),o++,s+=r}}}else if(n.SegmentList){const e=r.YO(n.SegmentList.SegmentURL)?n.SegmentList.SegmentURL:[n.SegmentList.SegmentURL];let t=0,i=a()(n.SegmentList.duration);for(let s=0;s<e.length;s++)x.push({idx:s,start:t/w,end:(t+i)/w,url:I+e[s].media,segmentDuration:i/w}),t+=i}"video/mp4"===o?i.mediaList.video.push({id:n.id,baseURL:I,initSegment:I+f.replace(/\$RepresentationID\$/g,n.id).replace(/\$Bandwidth\$/g,(0,l.A)(P)),mediaSegments:x,mimeType:o,codecs:m,width:u,height:g,maxWidth:p,maxHeight:L,frameRate:S,sar:y,startWithSAP:"1"===R,bandwidth:P,timescale:w,duration:A,encrypted:T}):"audio/mp4"===o?i.mediaList.audio.push({id:n.id,baseURL:I,initSegment:I+f.replace(/\$RepresentationID\$/g,n.id).replace(/\$Bandwidth\$/g,(0,l.A)(P)),mediaSegments:x,mimeType:o,codecs:m,startWithSAP:"1"===R,bandwidth:P,timescale:w,duration:A,encrypted:T,lang:v}):"application/mp4"===o&&i.mediaList.subtitle.push({id:n.id,baseURL:I,initSegment:I+f.replace(/\$RepresentationID\$/g,n.id).replace(/\$Bandwidth\$/g,(0,l.A)(P)),mediaSegments:x,mimeType:o,codecs:m,startWithSAP:"1"===R,bandwidth:P,timescale:w,duration:A,encrypted:T,lang:v})}}))})),["video","audio"].forEach((e=>{i.mediaList[e].sort(((e,t)=>e.bandwidth-t.bandwidth))})),i}},79331:(e,t,i)=>{i.d(t,{A:()=>r});var s=i(68632),a=i.n(s),n=i(72739);const d={aloneValueName:"_@attribute"},o=[" ","/",'"',"'","<",">"];function r(e,t=d){e=(e=(e=(e=e.replace(/<!--[\s\S]*?-->/g,"")).replace(/[\n\t\r]/g,"")).replace(/>[ \t]+</g,"><")).replace(/<\?[^>]*\?>/g,"");const i=[];let s=0;function r(e,s){const n=i[i.length-1];n&&(e===t.aloneValueName||null==n.obj[t.aloneValueName]?null==n.obj[e]?n.obj[e]=s:a()(n.obj[e])?n.obj[e].push(s):n.obj[e]=[n.obj[e],s]:n.obj[t.aloneValueName]=[n.obj[t.aloneValueName],{tagName:e,...s}])}function l(t){for(;s<e.length;){if(e[s]===t)return!0;s++}return!1}function m(){u();let t="";for(;s<e.length&&!n.zy(o,e[s]);)t+=e[s],s++;return t}function u(){for(;s<e.length&&/\s|\r|\n/.test(e[s]);)s++}const h=/\s/,c=/'/,g=/"/;function f(){if(s>=e.length)return!0;u();let t=h;'"'!==e[s]&&"'"!=e[s]||(t='"'===e[s]?g:c,s++);let i="";for(;s<e.length;){if(t.test(e[s])){s++;break}i+=e[s],s++}return i}function p(){u();let t="";for(;s<e.length&&"<"!==e[s];)t+=e[s],s++;return t}function L(){for(;"<"===e[s];){const t=s;if(s++,u(),"/"!==e[s]){s=t;break}if(s++,m()===i[i.length-1].tag){if(i.length>1){const e=i.pop();r(e.tag,e.obj)}l(">"),s++,u()}else i.pop(),l(">"),s++,u()}}return function a(){if(s>=e.length)return;let n=s;if(u(),"<"!==e[s])return s=n,r(t.aloneValueName,p()),L(),a();let d=l("<");if(!d)return;n=s,s++;const o=m();if(i.push({obj:{},tag:o,start:n}),function(){for(;u(),">"!==e[s]&&"/"!==e[s];){let e=m();if(!e)break;"="===e[e.length-1]?e=e.substring(0,e.length-1):(l("="),s++),r(e,f())}}(),u(),"/"===e[s]){if(s++,i.length>1){const e=i.pop();r(e.tag,e.obj)}return l(">"),s++,L(),a()}d=l(">"),d&&(s++,u(),"<"!==e[s]&&(r(t.aloneValueName,p()),u()),L(),a())}(),{[i[0].tag]:i[0].obj}}}}]);