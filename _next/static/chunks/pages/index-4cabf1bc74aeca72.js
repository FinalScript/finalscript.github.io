(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{35430:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var a=n(67294),s=n(9473),i=n(3283),r=n.n(i),l=n(76509),o=n(29513),c=n(25675),d=n.n(c),u=n(50029),x=n(87794),h=n.n(x),m=n(12305),p=function(e){return{type:"FETCH_DATA_FAILED",payload:e}},f=n(57592),v=n(33065),w=n(69415),g=n(9008),y=n(41664),b=n.n(y),j=n(21190),S=n(85893),N=function(){var e=(0,s.I0)(),t=(0,s.v9)((function(e){return e.general})),n=(0,a.useState)(!1),i=n[0],r=n[1];(0,a.useEffect)((function(){var e="true"===sessionStorage.getItem("markAlreadyClicked");r(e)}),[]);return(0,S.jsx)("div",{className:"relative",children:(0,S.jsx)("div",{className:"fixed flex justify-center right-[18%] z-30 transition-all duration-300 select-none "+(t.botCurrentSpeech||t.botToggled?"-bottom-24":"-bottom-32 animate-bounce hover:animate-none"),children:(0,S.jsxs)(j.M,{children:[t.botCurrentSpeech&&!t.botToggled&&(0,S.jsxs)(f.E.div,{exit:{scale:0},initial:{scale:0},animate:{scale:1,transformOrigin:"bottom right",transition:{duration:.2,delay:.4,ease:"easeInOut"}},className:"absolute flex justify-center items-center bottom-[200px] right-[150px] px-10 py-3 text-gray-900 rounded-xl md:mt-0",children:[(0,S.jsx)("div",{className:"absolute w-full h-full overflow-hidden select-none text-bubble",children:(0,S.jsx)(d(),{src:"/images/text-bubble.png",layout:"fill",objectFit:"fill"})}),(0,S.jsx)("div",{className:"z-50 mb-10 w-max max-w-[20rem]",children:(0,S.jsx)("p",{className:"text-center w-full "+(t.botCurrentSpeech.isError?" text-red-500":" text-black"),children:t.botCurrentSpeech.message})})]},"text-bubble"),(0,S.jsx)(f.E.div,{exit:{opacity:0,translateY:400},initial:{opacity:0,translateY:400},animate:{opacity:1,translateY:0,transition:{duration:.3}},className:"drop-shadow-red h-[30vh] w-[13.5vh] transition-all duration-500 select-none ",children:(0,S.jsx)(d(),{title:"Mark Bot",src:"/images/mark.png",layout:"fill",objectFit:"contain",className:"cursor-pointer",onClick:function(){t.botCurrentSpeech?e((0,v.$i)()):(i||(r(!0),sessionStorage.setItem("markAlreadyClicked","true")),e((0,v.t9)()))}})},"text-bot-mark"),!i&&!t.botCurrentSpeech&&(0,S.jsx)(f.E.div,{exit:{opacity:0},initial:{opacity:0},animate:{opacity:1,scale:[0,2,1],transition:{duration:.5}},className:"z-20 flex items-center justify-center text-center absolute bottom-[33vh] rounded-xl md:mt-0",children:(0,S.jsx)("div",{className:"h-[80px] w-[70px] flex items-center exclamation-mark cursor-pointer",children:(0,S.jsx)(d(),{src:"/images/exclamation-mark.png",layout:"fill",objectFit:"contain"})})},"exclamation-mark"),(0,S.jsx)(f.E.div,{className:"z-20 p-5 flex items-center justify-center space-x-5 absolute bottom-[31vh] text-gray-900 rounded-xl md:mt-0",children:(0,S.jsx)(j.M,{children:t.botToggled&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(f.E.a,{href:"https://discord.gg/2hVNsWRaJV",target:"_blank",rel:"noopener noreferrer",variants:{hidden:{opacity:0,translateX:-100,zIndex:-5,transition:{delay:.3,duration:.1}},show:{opacity:1,translateX:0,zIndex:-4,transition:{delay:.2,duration:.4}}},exit:"hidden",initial:"hidden",animate:"show",whileHover:{scale:1.1},className:"relative w-[50px] h-[50px] cursor-pointer discord-button",children:(0,S.jsx)(d(),{src:"/images/discord-icon.png",layout:"fill",objectFit:"contain"})},"discord-button"),(0,S.jsx)(f.E.div,{variants:{hidden:{opacity:0,translateX:-100,zIndex:-7,transition:{delay:.2,duration:.1}},show:{opacity:1,translateX:0,zIndex:-6,transition:{delay:.4,duration:.4}}},onClick:function(){e((0,v.t9)())},exit:"hidden",initial:"hidden",animate:"show",whileHover:{scale:1.1},className:"h-[50px] flex items-center whitelist-button cursor-pointer",children:(0,S.jsx)(b(),{href:"/whitepaper",children:(0,S.jsx)("div",{className:"h-[50px] w-[200px] flex items-center whitelist-button cursor-pointer",children:(0,S.jsx)(d(),{src:"/images/whitepaper-button.png",layout:"fill",objectFit:"contain"})})})},"whitepaper-button"),(0,S.jsx)(f.E.a,{href:"https://twitter.com/MinerVerseNFT",target:"_blank",rel:"noopener noreferrer",variants:{hidden:{opacity:0,translateX:-100,zIndex:-8,transition:{delay:.1,duration:.1}},show:{opacity:1,translateX:0,zIndex:-7,transition:{delay:.6,duration:.4}}},exit:"hidden",initial:"hidden",animate:"show",whileHover:{scale:1.1},className:"relative w-[50px] h-[50px] cursor-pointer twitter-button",children:(0,S.jsx)(d(),{src:"/images/twitter-icon.png",layout:"fill",objectFit:"contain"})},"twitter-button")]})})})]})})})},k=n(11163),E="w-[650px] min-w-[650px] max-w-[650px] 2xl:w-[35vw] 2xl:min-w-[35vw] 2xl:max-w-[35vw] xl:w-[40vw] xl:min-w-[40vw] xl:max-w-[40vw] lg:w-[50vw] lg:min-w-[50vw] lg:max-w-[50vw] sm:w-[720px] sm:min-w-[720px] sm:max-w-[720px] left-[-80px] sm:left-[-20px] md:left-[3vw] h-[85vh] min-h-[85vh] max-h-[85vh]",C="w-[380] min-w-[380px] max-w-[380px] 2xl:w-[21vw] 2xl:min-w-[21vw] 2xl:max-w-[21vw] xl:w-[25vw] xl:min-w-[25vw] xl:max-w-[25vw] lg:w-[33vw] lg:min-w-[33vw] lg:max-w-[33vw] sm:w-[420px] sm:min-w-[420px] sm:max-w-[420px] left-[110px] sm:left-[-20px] 2xl:left-[12.5vw] xl:left-[13.5vw] lg:left-[15.5vw] md:left-[3vw] mb-[8vh] px-[vw] 2xl:px-[2.5vw] xl:px-[2vw] lg:px-[1.5vw] py-[3vh] h-[65vh] min-h-[65vh] max-h-[65vh]",T="-mx-[2vw] 2xl:-mx-[3vw] xl:-mx-[3.5vw] lg:-mx-[4vw] -my-[3.5vh]",_=function(){var e=(0,s.I0)(),t=(0,k.useRouter)(),n=(0,s.v9)((function(e){return e.blockchain})),i=(0,s.v9)((function(e){return e.contractData})),c=(0,s.v9)((function(e){return e.general})),x=(0,a.useState)(""),y=x[0],b=x[1],j=(0,a.useState)(0),_=j[0],M=j[1],I=["Price: ".concat(r().utils.fromWei(i.price)," ").concat(l.$.nativeCurrency.symbol),"Total Supply: ".concat(i.maxTotalSupply," Miners"),"Presale Supply: ".concat(i.maxPresaleSupply," Miners"),"".concat(i.superPercentage,"% chance to mint a Super Miner")];(0,a.useEffect)((function(){e(function(){var e=(0,u.Z)(h().mark((function e(t){var n,a,s,i,r,l,o,c,d,u,x,f,v;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.h.getState().blockchain.smartContract;case 3:if(!(n=e.sent)){e.next=51;break}return e.next=7,null===n||void 0===n?void 0:n.methods.BASE_SUPER_PERCENTAGE().call();case 7:return a=e.sent,e.next=10,null===n||void 0===n?void 0:n.methods.MAX_PER_MINT().call();case 10:return s=e.sent,e.next=13,null===n||void 0===n?void 0:n.methods.NFT_TAX().call();case 13:return i=e.sent,e.next=16,null===n||void 0===n?void 0:n.methods.baseSupply().call();case 16:return r=e.sent,e.next=19,null===n||void 0===n?void 0:n.methods.presaleSupply().call();case 19:return l=e.sent,e.next=22,null===n||void 0===n?void 0:n.methods.MAX_BASE_SUPPLY().call();case 22:return o=e.sent,e.next=25,null===n||void 0===n?void 0:n.methods.MAX_PRESALE_SUPPLY().call();case 25:return c=e.sent,e.next=28,null===n||void 0===n?void 0:n.methods.totalSupply().call();case 28:return d=e.sent,e.next=31,null===n||void 0===n?void 0:n.methods.presaleOpen().call();case 31:return u=e.sent,e.next=34,null===n||void 0===n?void 0:n.methods.baseSalesOpen().call();case 34:return x=e.sent,e.next=37,null===n||void 0===n?void 0:n.methods.gameStarted().call();case 37:if(f=e.sent,v=0,!x){e.next=45;break}return e.next=42,null===n||void 0===n?void 0:n.methods.BASE_MINT_PRICE().call();case 42:v=e.sent,e.next=48;break;case 45:return e.next=47,null===n||void 0===n?void 0:n.methods.PRESALE_MINT_PRICE().call();case 47:v=e.sent;case 48:t({type:"FETCH_DATA_SUCCESS",payload:{superPercentage:parseFloat(a),maxPerMint:parseInt(s),nftTax:i,baseSupply:parseInt(r),presaleSupply:parseInt(l),maxBaseSupply:parseInt(o),maxPresaleSupply:parseInt(c),maxTotalSupply:parseInt(o)+parseInt(c),totalSupply:d,presaleOpen:u,baseSalesOpen:x,gameStarted:f,price:v}}),e.next=52;break;case 51:t(p({errorMsg:"Smart contract doesn't exist"}));case 52:e.next=58;break;case 54:e.prev=54,e.t0=e.catch(0),console.log(e.t0),t(p({errorMsg:e.t0}));case 58:case"end":return e.stop()}}),e,null,[[0,54]])})));return function(t){return e.apply(this,arguments)}}())}),[n.smartContract]),(0,a.useEffect)((function(){var t;b(""),n.account&&e((t=n.account,function(){var e=(0,u.Z)(h().mark((function e(n){var a,s;return h().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.h.getState().blockchain.smartContract;case 3:if(!(a=e.sent)){e.next=11;break}return e.next=7,null===a||void 0===a?void 0:a.methods.isWhiteListed(t).call();case 7:s=e.sent,n({type:"UPDATE_IS_WHITELISTED",payload:{isWhiteListed:s}}),e.next=12;break;case 11:n(p({errorMsg:"Smart contract doesn't exist"}));case 12:e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0),n(p({errorMsg:e.t0}));case 18:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}()))}),[n.account,n.network]),(0,a.useEffect)((function(){M(""!==y?parseFloat(i.price)*parseFloat(y)+parseFloat(i.nftTax):0)}),[y]);var P=function(){return!i.gameStarted&&(!!i.baseSalesOpen||!(!i.presaleOpen||!i.isWhiteListed))};return(0,S.jsxs)("div",{className:"relative overflow-auto h-screen w-screen",children:[(0,S.jsx)(g.default,{children:(0,S.jsx)("title",{children:"Home | MinerVerse"})}),!c.isLoading&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(N,{}),(0,S.jsxs)(f.E.section,{exit:{opacity:0},initial:{opacity:0},animate:{opacity:1,transition:{duration:.6,delay:.1}},className:"text-gray-400 body-font h-full flex items-center relative",children:[(0,S.jsxs)("div",{className:"fixed flex items-end justify-start sm:justify-center lg:justify-start sm:pr-36 lg:pr-0 h-full min-h-full bottom-0 z-10",children:[(0,S.jsx)("div",{className:"relative overflow-hidden select-none drop-shadow-dark-brown "+E,children:(0,S.jsx)(d(),{src:"/images/parchment-frame.png",layout:"fill",objectFit:"fill"})}),(0,S.jsxs)("button",{className:"flex justify-center items-center relative overflow-hidden select-none transition-all hover:scale-105 h-[16vh] w-[40vh] self-center ml-24 mt-10 z-50 drop-shadow-arrow cursor-pointer  ",onClick:function(){l.e1.whitelistOnly&&!l.e1.whitelistedWallets.find((function(e){var t;return e.toLowerCase()===(null===(t=n.account)||void 0===t?void 0:t.toLowerCase())||""}))?e((0,v.hc)("Woah there, game is still in development, you're not allowed to enter yet!")):t.push("/game")},children:[(0,S.jsx)(d(),{src:"/images/arrow-sign.png",layout:"fill",objectFit:"contain"}),(0,S.jsx)("h2",{className:"z-20 text-[8vh] mr-10 mb-3 text-white font-bold play-button",children:"PLAY"})]})]}),(0,S.jsx)("div",{className:"relative flex justify-start sm:justify-center lg:justify-start h-full min-h-full w-screen min-w-screen items-end px-[1vw]",children:!c.isLoading&&(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)("div",{className:"relative text-gray-900 rounded-xl flex justify-center z-10 "+C,children:[(0,S.jsx)("div",{className:"absolute -z-10 w-full h-full overflow-hidden select-none drop-shadow-brown  "+T,children:(0,S.jsx)(d(),{src:"/images/parchment.png",layout:"fill",objectFit:"fill"})}),(0,S.jsxs)("div",{className:"flex flex-col h-full mint-container",children:[(0,S.jsx)("h2",{className:"text-center font-bold rounded-t-xl",children:(0,S.jsx)("span",{children:"Mint Miners"})}),(0,S.jsx)("div",{className:"relative text-md flex items-center justify-center section",children:(0,S.jsx)("div",{className:"relative image",children:(0,S.jsx)(d(),{src:"/images/MinerTrio.png",objectFit:"contain",layout:"fill"})})}),(0,S.jsxs)("div",{className:"relative section",children:[(0,S.jsx)("div",{className:"flex justify-end",children:(0,S.jsx)("p",{className:"font-medium text-gray-900",children:function(){var e="- / -";return i.totalSupply&&(i.baseSalesOpen||i.gameStarted&&!i.presaleOpen?(e=i.totalSupply+" / "+i.maxTotalSupply,i.totalSupply>=i.maxTotalSupply&&(e="Sold Out")):e=i.totalSupply+" / "+i.maxPresaleSupply),e}()})}),(0,S.jsx)("div",{className:"w-full bg-yellow-900 rounded-full progress",children:(0,S.jsx)("div",{className:"bg-green-500 h-full rounded-full",style:{width:function(){var e="0%";i.totalSupply&&(e=i.baseSalesOpen||i.gameStarted&&!i.presaleOpen?(i.totalSupply/i.maxTotalSupply*100).toFixed(2)+"%":(i.totalSupply/i.maxPresaleSupply*100).toFixed(2)+"%");return e}()}})})]}),(0,S.jsxs)("div",{className:"relative flex flex-col section",children:[(0,S.jsxs)("label",{htmlFor:"quantity",className:"text-gray-900 flex justify-between",children:[(0,S.jsx)("span",{className:"font-bold",children:"Quantity"}),(0,S.jsxs)("span",{className:"tracking-widest",children:["MAX ( ",i.maxPerMint," )"]})]}),(0,S.jsx)("input",{disabled:!P(),title:i.isWhiteListed||!i.baseSalesOpen?"":"You're not whitelisted",type:"text",id:"quantity",name:"quantity",min:0,max:i.maxPerMint,onSelect:function(e){"0"===y&&b("")},value:y,onChange:function(e){var t=e.target,n=t.value,a=t.min,s=t.max;isNaN(n)?b(""):(n=Math.max(Number(a),Math.min(Number(s),Number(n))).toString(),b("0"===n?"":n))},placeholder:"Max ".concat(i.maxPerMint," at a time"),className:"w-full text-center disabled:cursor-not-allowed placeholder:text-gray-700 bg-zinc-400 bg-opacity-20 focus:bg-transparent focus:ring-2 rounded border-gray-600 outline-none transition-colors duration-200 ease-in-out"})]}),(0,S.jsxs)("div",{className:"section font-bold",children:[(0,S.jsxs)("div",{className:"relative tracking-widest flex justify-between",children:[(0,S.jsx)("h5",{children:"NFT Tax"}),(0,S.jsx)("h5",{children:0===_?"--":r().utils.fromWei(i.nftTax)+" AVAX"})]}),(0,S.jsxs)("div",{className:"relative tracking-widest flex justify-between",children:[(0,S.jsx)("h4",{children:"Total"}),(0,S.jsxs)("h4",{children:[0===_?"--":r().utils.fromWei(_.toString())+" AVAX"," "]})]})]}),(0,S.jsx)("div",{className:"relative flex flex-col section",children:n.hasMetaMask?n.account?(0,S.jsx)(S.Fragment,{children:(0,S.jsx)("button",{disabled:!!n.isRightNetwork&&!P(),onClick:function(){n.isRightNetwork?setTimeout((function(){var t;if(l.e1.whitelistOnly&&!l.e1.whitelistedWallets.find((function(e){var t;return e.toLowerCase()===(null===(t=n.account)||void 0===t?void 0:t.toLowerCase())||""})))e((0,v.hc)("Woah there, game is still in development, you're not allowed to enter yet!"));else if(""===y&&e((0,v.hc)("Please enter a quantity (0-".concat(i.maxPerMint,")"))),n.smartContract&&n.account&&""!==y)if(i.baseSalesOpen)null===(t=n.smartContract)||void 0===t||t.methods.mintBase(parseInt(y)).send({gasLimit:String(855e3),to:l.dq.contractAddress,from:n.account,value:_}).once("sending",(function(e){console.log(e)})).once("sent",(function(e){console.log(e)})).once("transactionHash",(function(t){e((0,v.zn)("Requesting ".concat(y," ").concat("1"===y?"miner":"miners","... Please wait"))),console.log(t)})).once("receipt",(function(t){e((0,v.zn)("Your ".concat("1"===y?"miner has":"miners have"," arrived!"))),console.log(t)})).on("error",(function(t){e((0,v.hc)("Oh no! Your ".concat("1"===y?"miner":"miners"," couldn't make it!"))),console.log(t)})).then((function(t){n.account&&e((0,o.cr)(n.account)),e((0,v.V_)({isError:!1,key:"Transaction-"+t.transactionHash,hash:t.transactionHash,link:"https://testnet.snowtrace.io/tx/".concat(t.transactionHash)})),console.log(t)}));else if(i.presaleOpen&&i.isWhiteListed){var a;null===(a=n.smartContract)||void 0===a||a.methods.presaleMintBase(parseInt(y)).send({gasLimit:String(855e3),to:l.dq.contractAddress,from:n.account,value:_}).once("error",(function(e){console.log(e)})).then((function(t){n.account&&e((0,o.cr)(n.account)),e((0,v.V_)({isError:!1,key:"Transaction-"+t.transactionHash,hash:t.transactionHash,link:"https://testnet.snowtrace.io/tx/".concat(t.transactionHash)})),console.log(t.transactionHash)})).catch((function(e){console.log(e)}))}}),100):(0,o.If)()},title:!i.isWhiteListed&&i.baseSalesOpen&&n.isRightNetwork?"You're not whitelisted":"",className:"w-full text-white text-shadow-white font-bold border-0 disabled:cursor-not-allowed focus:outline-none rounded shadow-center-lg "+(n.isRightNetwork?"bg-cyan-400  hover:bg-cyan-500 disabled:hover:bg-cyan-400 shadow-cyan-400":" bg-red-600 cursor-pointer shadow-red-700"),children:n.isRightNetwork?"Mint":"Switch Network \ud83d\udd3a"})}):(0,S.jsx)("button",{onClick:function(){e((0,o.$j)())},className:"w-full bg-cyan-400 hover:bg-cyan-500 shadow-center-lg shadow-cyan-500 font-semibold text-gray-900 rounded-lg",children:"Connect Wallet"}):(0,S.jsx)(w.G,{})}),(0,S.jsxs)("div",{className:"relative flex flex-col section",children:[(0,S.jsx)("h3",{className:"font-bold text-center",children:"Sale Details"}),I.map((function(e,t){return(0,S.jsxs)("p",{className:"flex justify-between text-center",children:[(0,S.jsx)("span",{children:"\ud83d\udc8e"}),(0,S.jsx)("span",{children:e}),(0,S.jsx)("span",{children:"\ud83d\udc8e"})]},t)}))]})]})]})})})]},"minting-container")]})]})}},45301:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(35430)}])}},function(e){e.O(0,[774,888,179],(function(){return t=45301,e(e.s=t);var t}));var t=e.O();_N_E=t}]);