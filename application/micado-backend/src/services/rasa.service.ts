import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { RasaDataSource } from '../datasources';



export interface RasaService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  train (token: string, payload: any, baseurl: any): Promise<any>;
}

export class RasaProvider implements Provider<RasaService> {
  constructor(
    // identityserver must match the name property in the datasource json file
    @inject('datasources.rasa')
    protected dataSource: RasaDataSource = new RasaDataSource(),
  ) { }

  value (): Promise<RasaService> {
    return getService(this.dataSource);
  }
}

/*
export interface CountlyApiParameters {
  api_key: string;
  app_id: string;
}
*/
