import { APIGatewayEvent } from "aws-lambda";
import LandingController from "./controllers/landingController";

export const consulta = async (event: APIGatewayEvent): Promise<any> => {
  const body = JSON.parse(event.body);
  const response = await LandingController.contacto(body);
  return response;
};

export const preinscripcion = async (event: APIGatewayEvent): Promise<any> => {
  const body = JSON.parse(event.body);
  const response = LandingController.preinscripcion(body);
  return response;
};
