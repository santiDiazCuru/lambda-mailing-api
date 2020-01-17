import ECT from "ect";
import path from "path";
import MailgunRepository from "../repositories/mailgunRepository";
const templateGenerator: any = ECT({
  root: path.join(__dirname, "../templates"),
  ext: ".ect"
});

class LandingModel {
  public async contacto(
    consulta: string,
    nombre: string,
    email: string
  ): Promise<IContactoResponse> {
    const finalHtml: string = templateGenerator.render("consulta", {
      nombre,
      curso: "",
      consulta: consulta
    });
    const dataForEmail: IDataForEmail = {
      from: `Plataforma 5 <admisiones@plataforma5.la>`,
      to: `${nombre} <${email}>`,
      bcc: "Plataforma 5 <admisiones@plataforma5.la>",
      subject: "Gracias por Contactarte",
      html: finalHtml
    };
    const response = await MailgunRepository.asyncSendMail(dataForEmail);
    return response;
  }

  public async preinscripcion(
    consulta: string,
    nombre: string,
    email: string,
    curso: string
  ): Promise<any> {
    const finalHtml: string = templateGenerator.render(`aplicar-${curso}`, {
      nombre,
      curso,
      consulta
    });
    const dataForEmail: IDataForEmail = {
      from: `Plataforma 5 <admisiones@plataforma5.la>`,
      to: `${nombre} <${email}>`,
      bcc: "Plataforma 5 <admisiones@plataforma5.la>",
      subject: "Gracias por Contactarte",
      html: finalHtml
    };
    const response = await MailgunRepository.asyncSendMail(dataForEmail);
    return response;
  }
}

export default new LandingModel();

interface IDataForEmail {
  from: string;
  to: string;
  bcc: string;
  subject: string;
  html: string;
}

interface IContactoResponse {
  error: boolean;
  message: string;
}
