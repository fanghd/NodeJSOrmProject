const Koa = require('koa');
const app = new Koa();
const path = require('path');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const multer = require('koa-multer');
const static = require('koa-static');
const preMidware = require('./app/midware/preMidware');
const postMidware = require('./app/midware/postMidware');
const localeMidware = require('./app/midware/localeMidware');
const helmet = require("koa-helmet");
// const compress = require('koa-compress')
const loginMidware = require('yami-sso-client').koa;
const limitMidware = require('./app/midware/limitMidware');
const WebConf = require('./config/webConf');
const cors = require('koa2-cors')
require('./app/tools/global');
require('./app/redis');

const upload = multer({ dest: WebConf.pkgUploadPath.path + '/' });

//信任proxy头部，支持 X-Forwarded-Host
app.proxy = true;

// error handler
onerror(app);

//防洪水攻击
app.use(limitMidware());

//安全防护
app.use(helmet());

app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', ctx.headers.origin || "*");
	ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
	ctx.set('Access-Control-Allow-Headers', ['Content-Type']);
	ctx.set({ 'Content-Type': 'application/json' });
	if (ctx.method == 'OPTIONS') {
		ctx.body = '';
		ctx.status = 204;
	} else {
		await next();
	}
})


//设置ejs模板
// app.use(views(__dirname + '/views', {
//     extension: 'ejs'
// }));

app.use(bodyparser());

app.use(upload.single('suse')); //这里决定了上传包的name只能叫suse。

//国际化多语言中间件
// app.use(localeMidware);

//前置中间件
preMidware.forEach((midware) => {
	app.use(midware);
});

//登录校验
let loginConf = require('./config/loginConf.js');
loginConf.ignore = loginConf.ignore.concat(['/static', '/todonode.tar.gz', '/favicon.ico', '/pages/server/api/get_locale']);
app.use(loginMidware(loginConf));

//激活router
// dcache 会添加新的 page、api router， 不能提前
const { pageRouter, apiRouter } = require('./app/router');
app.use(pageRouter.routes(), pageRouter.allowedMethods());
app.use(apiRouter.routes(), apiRouter.allowedMethods());

//激活静态资源中间件
app.use(static(path.join(__dirname, './client/dist'), { maxage: 7 * 24 * 60 * 60 * 1000 }));
app.use(static(path.join(__dirname, './files'), { maxage: 7 * 24 * 60 * 60 * 1000 }));

//后置中间件
postMidware.forEach((midware) => {
	app.use(midware);
});
//
module.exports = app;
