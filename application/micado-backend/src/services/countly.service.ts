import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { CountlyDataSource } from '../datasources';



export interface CountlyService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  dashboard (api_key: string, app_id: string, auth: string, baseurl: any): Promise<any>;
}

export class CountlyProvider implements Provider<CountlyService> {
  constructor(
    // identityserver must match the name property in the datasource json file
    @inject('datasources.countly')
    protected dataSource: CountlyDataSource = new CountlyDataSource(),
  ) { }

  value (): Promise<CountlyService> {
    return getService(this.dataSource);
  }
}


export interface CountlyApiParameters {
  api_key: string;
  app_id: string;
}