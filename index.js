"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
// await page.screenshot({path: 'exemplo1.png'});
//* Site do MTE http://www3.mte.gov.br/sistemas/mediador/ConsultarInstColetivo //
// https://medium.com/@fabiojanio/node-js-web-scraping-com-puppeteer-29dd974eb042 //
var cnpj = "58200916000175"; // SEM PONTOS, TRAÇOS E BARRAS!
// quant: quantidade de instrumentos coletivos: #divFiltro > div > form > h2 | <- regex para capturar -> \d(\d{1,})?\1
//
if (cnpj.length !== 14) {
    console.error('O campo CNPJ deve possuir somente 14 caracteres.');
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var day, browser, page, quant, ret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                day = new Date();
                return [4 /*yield*/, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto('http://www3.mte.gov.br/sistemas/mediador/ConsultarInstColetivo')];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.click('[id=chkNRCNPJ]')];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.type('input[id=txtNRCNPJ]', cnpj)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.select('[id=cboSTVigencia]', '2')];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.click('[id=btnPesquisar]')];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.waitFor(9000)];
            case 8:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        // Retorna a quantidade de convenções coletivas encontradas.
                        var res = [];
                        document.querySelectorAll('#divFiltro > div > form > h2').forEach(function (resul) { return res.push(resul.textContent); });
                        return /\d(\d{0,4})?/.exec(res[0])[0]; // Retorna o primeiro resultado tratado por expressão regular.
                    })];
            case 9:
                quant = _a.sent();
                return [4 /*yield*/, browser.close()];
            case 10:
                _a.sent();
                ret = { day: day, quant: quant };
                console.log(ret);
                return [2 /*return*/];
        }
    });
}); })();
