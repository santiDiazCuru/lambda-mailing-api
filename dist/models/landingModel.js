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
const ect_1 = __importDefault(require("ect"));
const path_1 = __importDefault(require("path"));
const mailgunRepository_1 = __importDefault(require("../repositories/mailgunRepository"));
const templateGenerator = ect_1.default({
    root: path_1.default.join(__dirname, "../templates"),
    ext: ".ect"
});
class LandingModel {
    contacto(consulta, nombre, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalHtml = templateGenerator.render("consulta", {
                nombre,
                curso: "",
                consulta: consulta
            });
            const dataForEmail = {
                from: `Plataforma 5 <admisiones@plataforma5.la>`,
                to: `${nombre} <${email}>`,
                bcc: "Plataforma 5 <admisiones@plataforma5.la>",
                subject: "Gracias por Contactarte",
                html: finalHtml
            };
            const response = yield mailgunRepository_1.default.asyncSendMail(dataForEmail);
            return response;
        });
    }
    preinscripcion(consulta, nombre, email, curso) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalHtml = templateGenerator.render(`aplicar-${curso}`, {
                nombre,
                curso,
                consulta
            });
            const dataForEmail = {
                from: `Plataforma 5 <admisiones@plataforma5.la>`,
                to: `${nombre} <${email}>`,
                bcc: "Plataforma 5 <admisiones@plataforma5.la>",
                subject: "Gracias por Contactarte",
                html: finalHtml
            };
            const response = yield mailgunRepository_1.default.asyncSendMail(dataForEmail);
            return response;
        });
    }
}
exports.default = new LandingModel();
