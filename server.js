// Koa server依赖
const Koa = require("koa");
const KoaRouter = require("koa-router");
const static = require("koa-static");
const KoaHttpRequest = require("koa-http-request");

// node dependency
const request = require("request");

// 文件读取依赖，主要是为了加载html静态资源
const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const cheerio = require("cheerio");
const readFileAsync = Promise.promisify(fs.readFile);

// koa & koa router 实例
var app = new Koa();
var router = new KoaRouter();

app.use(KoaHttpRequest({
    json: true, // automatically parsing of JSON response
    timeout: 3000,    // 3s timeout
    host: 'http://localhost:9001'
}));

router.get("/test", async(ctx, next) => {
    let repo = await ctx.get('/koa/users', null, {
        'User-Agent': 'koa-http-request'
    });
    ctx.body = repo;
});

router.get("/req", async(ctx, next) => {
    console.log("进入了API req log ...");
    request('http://localhost:9001/koa/users', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("拿到拉数据？？？？？") // 打印google首页
            console.log(body) // 打印google首页
        }
    })
    ctx.body = "request ...";
});

async function loadHtml(path) {
    try {
        console.log("Load文件路径: " + path);
        let content = await readFileAsync(path);
        console.log("Load文件内容: " + content);
        return cheerio.load(content);
    } catch (e) {
        console.log("加载HTML文件出错, e = " + e);
        return false;
    }
}

router.get("/", async (ctx, next) => {
    console.log("index page");
    const $html = await loadHtml(path.resolve(__dirname, "/index.html"));
    if (!$html) {
        ctx.body = "Interal Server Error...";
    }else {
        // console.log($html);
        ctx.body = $html.html();
    }
});

app.use(static(path.join(__dirname, "./dist")))

app.use(router.routes()).use(router.allowedMethods());

app.listen(3001, () => {
    console.log("server start at 3001.");
});
