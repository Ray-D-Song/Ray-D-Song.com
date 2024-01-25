function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";
import Koa from "koa";
import koaConnect from "koa-connect";
import koaStatic from "koa-static";
import koaCompress from "koa-compress";
var nodeEnv = process.env.NODE_ENV;
var _dirname = typeof __dirname !== "undefined" ? __dirname : dirname(fileURLToPath(import.meta.url));
function createDevServer() {
    return _createDevServer.apply(this, arguments);
}
function _createDevServer() {
    _createDevServer = _async_to_generator(function() {
        var vite, server;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        createViteServer({
                            server: {
                                middlewareMode: true
                            },
                            appType: "custom"
                        })
                    ];
                case 1:
                    vite = _state.sent();
                    server = new Koa();
                    server.use(koaConnect(function(req, res, next) {
                        vite.middlewares.handle(req, res, next);
                    }));
                    server.use(function() {
                        var _ref = _async_to_generator(function(param) {
                            var request, response, url, template, render, _ref, appHtml, html, e;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        request = param.request, response = param.response;
                                        url = request.url;
                                        _state.label = 1;
                                    case 1:
                                        _state.trys.push([
                                            1,
                                            5,
                                            ,
                                            6
                                        ]);
                                        template = fs.readFileSync("index.html", "utf-8");
                                        return [
                                            4,
                                            vite.transformIndexHtml(url, template)
                                        ];
                                    case 2:
                                        template = _state.sent();
                                        return [
                                            4,
                                            vite.ssrLoadModule("/src/serverEntry.ts")
                                        ];
                                    case 3:
                                        render = _state.sent().serverRender;
                                        return [
                                            4,
                                            render(url)
                                        ];
                                    case 4:
                                        _ref = _state.sent(), appHtml = _ref.html;
                                        html = template.replace("<!-- ssr -->", appHtml);
                                        response.status = 200;
                                        response.set("Content-Type", "text/html");
                                        response.body = html;
                                        return [
                                            3,
                                            6
                                        ];
                                    case 5:
                                        e = _state.sent();
                                        vite.ssrFixStacktrace(e);
                                        console.log(e);
                                        response.status = 500;
                                        response.body = e.stack;
                                        return [
                                            3,
                                            6
                                        ];
                                    case 6:
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function(_) {
                            return _ref.apply(this, arguments);
                        };
                    }());
                    return [
                        2,
                        server
                    ];
            }
        });
    });
    return _createDevServer.apply(this, arguments);
}
function createProdServer() {
    return _createProdServer.apply(this, arguments);
}
function _createProdServer() {
    _createProdServer = _async_to_generator(function() {
        var server;
        return _ts_generator(this, function(_state) {
            server = new Koa();
            server.use(koaCompress({
                threshold: 2048
            }));
            server.use(koaStatic("".concat(_dirname, "/client"), {
                index: false
            }));
            server.use(function() {
                var _ref = _async_to_generator(function(param) {
                    var request, response, url, template, render, manifest, _ref, appHtml, storeState, preload, html, e;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                request = param.request, response = param.response;
                                url = request.url;
                                _state.label = 1;
                            case 1:
                                _state.trys.push([
                                    1,
                                    4,
                                    ,
                                    5
                                ]);
                                template = fs.readFileSync("".concat(_dirname, "/client/index.html"), "utf-8");
                                return [
                                    4,
                                    import("".concat(_dirname, "/server/serverEntry.js"))
                                ];
                            case 2:
                                render = _state.sent().serverRender;
                                manifest = JSON.parse(fs.readFileSync("".concat(_dirname, "/client/.vite/ssr-manifest.json"), "utf-8"));
                                return [
                                    4,
                                    render(url, manifest)
                                ];
                            case 3:
                                _ref = _state.sent(), appHtml = _ref.html, storeState = _ref.storeState, preload = _ref.preload;
                                html = template.replace("<!-- ssr -->", appHtml).replace("<!-- preload -->", preload).replace("'<!-- store -->'", JSON.stringify(storeState));
                                response.status = 200;
                                response.set("Content-Type", "text/html");
                                response.body = html;
                                return [
                                    3,
                                    5
                                ];
                            case 4:
                                e = _state.sent();
                                console.log(e);
                                response.status = 500;
                                response.body = e.stack;
                                return [
                                    3,
                                    5
                                ];
                            case 5:
                                return [
                                    2
                                ];
                        }
                    });
                });
                return function(_) {
                    return _ref.apply(this, arguments);
                };
            }());
            return [
                2,
                server
            ];
        });
    });
    return _createProdServer.apply(this, arguments);
}
if (nodeEnv === "development") {
    createDevServer().then(function(s) {
        return s.listen(80);
    }).then(function() {
        console.log("dev server: http://127.0.0.1:80");
    }).catch(function(e) {
        console.log(e);
    });
} else {
    createProdServer().then(function(s) {
        return s.listen(process.env.SERVER_PORT);
    }).then(function() {
        console.log("prod server start, ", "port: ".concat(process.env.SERVER_PORT));
    }).catch(function(e) {
        console.log(e);
    });
}

