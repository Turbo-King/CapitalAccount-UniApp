
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/news/news","pages/me/me","pages/business/business","pages/transactionRecord/transactionRecord","pages/contact/contact","pages/news-detail/news-detail","pages/personalDetails/personalDetails"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"南通职业大学金融","navigationBarBackgroundColor":"#b50e03","backgroundColor":"#F8F8F8"},"tabBar":{"selectedColor":"#b50e03","color":"#ccc","list":[{"text":"首页","pagePath":"pages/index/index","iconPath":"static/icon/home.png","selectedIconPath":"static/icon/home-active.png"},{"text":"新闻资讯","pagePath":"pages/news/news","iconPath":"static/icon/news.png","selectedIconPath":"static/icon/news-active.png"},{"text":"金融业务","pagePath":"pages/business/business","iconPath":"static/icon/business.png","selectedIconPath":"static/icon/business-active.png"},{"text":"我的","pagePath":"pages/me/me","iconPath":"static/icon/member.png","selectedIconPath":"static/icon/member-active.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"CapitalAccount","compilerVersion":"3.1.22","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"登陆个人账户","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#007AFF"}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/me/me","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/business/business","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":false}},{"path":"/pages/transactionRecord/transactionRecord","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"交易记录"}},{"path":"/pages/contact/contact","meta":{},"window":{"enablePullDownRefresh":false}},{"path":"/pages/news-detail/news-detail","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"资讯详情"}},{"path":"/pages/personalDetails/personalDetails","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
