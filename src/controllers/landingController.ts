import LandingModel from "../models/landingModel";

class LandingController {
  public async contacto(body: any): Promise<IResponse> {
    const { consulta, nombre, email }: IContactoParams = body;
    if (!consulta || !nombre || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Faltan campos en el formulario"
        })
      };
    }
    const { error, message } = await LandingModel.contacto(
      consulta,
      nombre,
      email
    );
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
  }

  public async preinscripcion(body: any): Promise<any> {
    const { consulta, nombre, email, curso }: IPreinscripcionParams = body;
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
          message: "El campo curso sólo puede ser 'intro' o 'bootcamp'"
        })
      };
    }
    const { error, message } = await LandingModel.preinscripcion(
      consulta,
      nombre,
      email,
      curso
    );
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
  }
}

export default new LandingController();

interface IContactoParams {
  consulta: string;
  nombre: string;
  email: string;
}

interface IPreinscripcionParams {
  consulta: string;
  nombre: string;
  email: string;
  curso: string;
}

interface IResponse {
  statusCode: number;
  body: string;
}
