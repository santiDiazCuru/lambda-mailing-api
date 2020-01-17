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
const landingModel_1 = __importDefault(require("../models/landingModel"));
class LandingController {
    contacto(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { consulta, nombre, email } = body;
            if (!consulta || !nombre || !email) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Faltan campos en el formulario"
                    })
                };
            }
            const { error, message } = yield landingModel_1.default.contacto(consulta, nombre, email);
            if (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: "Fallo en el envío del mail: " + message
                    })
                };
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "El email se ha enviado correctamente a " + email
                })
            };
        });
    }
    preinscripcion(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { consulta, nombre, email, curso } = body;
            if (!consulta || !nombre || !email || !curso) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Faltan campos en el formulario"
                    })
                };
            }
            if (curso !== "intro" && curso !== "bootcamp") {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Faltan campos en el formulario"
                    })
                };
            }
            const { error, message } = yield landingModel_1.default.preinscripcion(consulta, nombre, email, curso);
            if (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: "Fallo en el envío del mail: " + message
                    })
                };
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "El email se ha enviado correctamente a " + email
                })
            };
        });
    }
}
exports.default = new LandingController();
