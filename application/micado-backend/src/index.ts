import {MicadoBackendApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import { EventCronUnpublishService } from './services';
import { RestBindings } from '@loopback/rest';
export {MicadoBackendApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new MicadoBackendApplication(options);
  await app.boot();
  await app.start();
  app.bind(RestBindings.REQUEST_BODY_PARSER_OPTIONS).to({limit: '10mb'})
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  const cronService: EventCronUnpublishService = await app.get("services.EventCronUnpublishService")
  await cronService.start()

  return app;
}
