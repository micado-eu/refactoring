import { getService } from '@loopback/service-proxy';
import { inject, Provider } from '@loopback/core';
import { IdentityserverDataSource } from '../datasources';



export interface IdentityService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  consent (tenant: String, principal: String, auth: String, baseurl: String): Promise<String>;
  receipt (receipt: String, auth: String, baseurl: String, tenant: String): Promise<any>;
  addGroups (role: String, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  getGroup (role: String, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  getUserGroups (user: String, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  getAllGroups (auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  createUser (username: String, password: String, name: String, surname: String, email: String, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  addToGroups (groupid: String, username: String, userid: String, location: String, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  removeFromGroups (groupid: String, username: String, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  updateUsers (payload: any, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
  updateUsersByAdmin (userid:String, payload: any, auth: String, baseurl: String, tenant: String, authType: String): Promise<any>;
}

export class IdentityProvider implements Provider<IdentityService> {
  constructor(
    // identityserver must match the name property in the datasource json file
    @inject('datasources.identityserver')
    protected dataSource: IdentityserverDataSource = new IdentityserverDataSource(),
  ) { }

  value (): Promise<IdentityService> {
    return getService(this.dataSource);
  }
}


