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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const mailer = mailgun_js_1.default({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN
});
class MailgunRepository {
    asyncSendMail(emailData) {
        return __awaiter(this, void 0, void 0, function* () {
            const func = () => __awaiter(this, void 0, void 0, function* () { return mailer.messages().send(emailData); });
            try {
                const res = yield func();
                return { error: false, message: "" };
            }
            catch (err) {
                return { error: true, message: err };
            }
        });
    }
}
exports.default = new MailgunRepository();
