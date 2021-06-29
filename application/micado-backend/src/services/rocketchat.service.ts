import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { RocketchatDataSource } from '../datasources';



export interface RocketchatService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  adminLogin(admin:any, adminpwd: any, baseurl:any):Promise<any>
  createUser (payload: any, authToken:String, userid:String, baseurl:any): Promise<any>;
  
}

export class RocketchatProvider implements Provider<RocketchatService> {
  constructor(
    // identityserver must match the name property in the datasource json file
    @inject('datasources.rocketchat')
    protected dataSource: RocketchatDataSource = new RocketchatDataSource(),
  ) { }

  value (): Promise<RocketchatService> {
    return getService(this.dataSource);
  }
}


