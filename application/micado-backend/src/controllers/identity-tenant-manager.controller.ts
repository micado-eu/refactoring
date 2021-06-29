// Uncomment these imports to begin using these cool features!
import { inject } from '@loopback/context';
import { get, post, param, del, patch, HttpErrors } from '@loopback/rest';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import { TenantRepository } from '../repositories';
import { Tenant } from '../models';
import {
  IdentityService,

} from '../services/identity.service'

// import {inject} from '@loopback/context';
var soap = require('soap');
var request = require('request')

var req = request.defaults({
  strictSSL: false
});

export class IdentityTenantManagerController {
  constructor(
    @repository(TenantRepository) public tenantRepository: TenantRepository,
    @inject('services.Identity') protected identityService: IdentityService,
  ) { }


  @get('/getTenant/{tenant}')
  async getTenant (
    @param.path.string('tenant') tenantDomain: String,
  ): Promise<any> {
    //Preconditions
    console.log("in the identity controller")
    console.log(tenantDomain)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")
    var url = 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService?wsdl'
    var args = { tenantDomain: tenantDomain };
    var options = {
      request: req,
      wsdl_options: {
        forever: true,
        rejectUnauthorized: false,
        strictSSL: false
      },
      endpoint: 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService.TenantMgtAdminServiceHttpsEndpoint/'
    }
    var tenantInfo = null
    return new Promise((resolve, reject) => {
      soap.createClient(url, options, function (err: any, client: any) {
        client.setSecurity(new soap.BasicAuthSecurity(process.env.WSO2_IDENTITY_ADMIN_USER, process.env.WSO2_IDENTITY_ADMIN_PWD));
        console.log(JSON.stringify(client.describe()))
        client.getTenant(args, function (err: any, result: any) {
          console.log(result);
          return resolve(result)
        });
      });
    })
  }

  @get('/getTenant')
  async retrieveTenants (
  ): Promise<any> {
    //Preconditions
    console.log("in the identity controller retrieveTenants")
    //    var url = '/code/micado-backend/src/datasources/TenantMgtAdminService.xml';
    console.log("IN RETRIEVE TENANT FUCNTION")


    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")
    console.log(process.env.MICADO_ENV)
    console.log(innerPort)
    var url = 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService?wsdl'
    console.log(url)
    var args = {};
    var options = {
      request: req,
      wsdl_options: {
        forever: true,
        rejectUnauthorized: false,
        strictSSL: false
      },
      endpoint: 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService.TenantMgtAdminServiceHttpsEndpoint/'
    }
    var tenantInfo = null
    return new Promise((resolve, reject) => {
      soap.createClient(url, options, function (err: any, client: any) {
        client.setSecurity(new soap.BasicAuthSecurity(process.env.WSO2_IDENTITY_ADMIN_USER, process.env.WSO2_IDENTITY_ADMIN_PWD));
        console.log(JSON.stringify(client.describe()))

        client.retrieveTenants(args, function (err: any, result: any) {
          //     client.getTenant(args, function (err: any, result: any) {
          console.log("RETRIEVED TENANTS")

          console.log(result);
          return resolve(result)
        });
      });
    })
  }

  @post('/wso2Tenant')
  async addTenant (
    @param.query.string('tenant') tenantDomain: String,
    @param.query.string('password') password: String,
    @param.query.string('email') email: String,
    @param.query.string('firstname') firstname: String,
    @param.query.string('lastname') lastname: String,
  ): Promise<any> {
    //Preconditions
    console.log("in the identity controller ADD TENANT")
    console.log(tenantDomain)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")
    var url = 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService?wsdl'
    let tenants = await this.retrieveTenants()
    console.log(tenants)
    let maxTenant = tenants.retrieveTenantsResponse.return.sort(
      function (a: any, b: any) {
        return b['tenantId'] - a['tenantId'];
      }
    )[0]['tenantId']
    console.log("MAX TENANT")
    console.log(maxTenant)
    maxTenant++
    var args = {
      tenantInfoBean: {
        active: true,
        admin: "admin",
        adminPassword: password,
        createdDate: '',
        email: email,
        firstname: firstname,
        lastname: lastname,
        originatedService: '',
        successKey: '',
        tenantDomain: tenantDomain,
        tenantId: maxTenant,
        usagePlan: ''
      }
    };
    var options = {
      request: req,
      wsdl_options: {
        forever: true,
        rejectUnauthorized: false,
        strictSSL: false
      },
      endpoint: 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService.TenantMgtAdminServiceHttpsEndpoint/'
    }
    var tenantInfo = null
    return new Promise((resolve, reject) => {
      soap.createClient(url, options, function (err: any, client: any) {
        client.setSecurity(new soap.BasicAuthSecurity(process.env.WSO2_IDENTITY_ADMIN_USER, process.env.WSO2_IDENTITY_ADMIN_PWD));
        console.log(JSON.stringify(client.describe()))
        client.addTenant(args, function (err: any, result: any) {
          console.log("ADDING THE TENANT")
          console.log(result);
          console.log(err)
          result.tenantInfoBean = args.tenantInfoBean
          return resolve(result)
        });
      });
    })
  }

  @post('/wso2TenantPlusDB')
  async addTenantPlusDB (
    @param.query.string('tenant') tenantDomain: string,
    @param.query.string('password') password: string,
    @param.query.string('email') email: String,
    @param.query.string('firstname') firstname: String,
    @param.query.string('lastname') lastname: String,
    @param.query.string('tenantname') tenantname: string,
    @param.query.string('link') link: string,
    @param.query.string('address') address: string,
    @param.query.string('contactmail') contactmail: string,
  ): Promise<any> {
    console.log("BEFORE CREATING TENANT")
    let isRet = await this.addTenant(tenantDomain, password, email, firstname, lastname)
    console.log("AFTER CREATING TENANT")
    console.log("THIS IS RETURN FROM CREATING TENANT")
    console.log(isRet)
    // since we are adding the tenant we also need to add the roles that are needed
    // we only add NGO tenants so we need to use the admin and password we just created since that is the only one allowed to operate in the tenant
    console.log("ADDING SUPERADMIN ROLE TO NEW TENANT")
    let roleRet1 = await this.addRole("APPLICATION/micado_ngo_superadmin", tenantDomain, "admin" + '@' + tenantDomain, password)
    console.log("RETURN FROM ADDING SUPERADMIN ROLE")
    console.log(roleRet1)
    console.log("ADDING MIGRANT MANAGER ROLE TO NEW TENANT")
    let roleRet2 = await this.addRole("APPLICATION/micado_ngo_migrant_manager", tenantDomain, "admin" + '@' + tenantDomain, password)
    console.log("RETURN FROM ADDING MIGRANT MANAGER ROLE")
    console.log(roleRet2)
    let dbTenant: Tenant = new Tenant({
      id: isRet.tenantInfoBean.tenantId,
      name: tenantname,
      link: link,
      email: contactmail,
      address: address
    })
    console.log("THIS IS DBTENANT")
    console.log(dbTenant)
    console.log("BEFORE CREATING TENANT ON DB WITH DBTENANT")
    return this.tenantRepository.create(dbTenant);
  }

  @del('/wso2Tenant')
  async delTenant (
    @param.query.string('tenant') tenantDomain: String,
  ): Promise<any> {
    //Preconditions
    console.log("in the identity controller")
    console.log(tenantDomain)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")
    var url = 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService?wsdl'
    var args = {
      tenantDomain: tenantDomain
    }
    var options = {
      request: req,
      wsdl_options: {
        forever: true,
        rejectUnauthorized: false,
        strictSSL: false
      },
      endpoint: 'https://' + process.env.IDENTITY_HOSTNAME + innerPort + '/services/TenantMgtAdminService.TenantMgtAdminServiceHttpsEndpoint/'
    }
    var tenantInfo = null
    return new Promise((resolve, reject) => {
      soap.createClient(url, options, function (err: any, client: any) {
        client.setSecurity(new soap.BasicAuthSecurity(process.env.WSO2_IDENTITY_ADMIN_USER, process.env.WSO2_IDENTITY_ADMIN_PWD));
        console.log(JSON.stringify(client.describe()))
        client.deleteTenant(args, function (err: any, result: any) {
          console.log(result);
          console.log(err)
          //        result.tenantInfoBean = args.tenantInfoBean
          return resolve(result)
        });
      });
    })
  }

  @del('/wso2TenantPlusDB')
  async deleteTenantPlusDB (
    @param.query.string('tenant') tenantDomain: String,
    @param.query.number('id') id: number,
  ): Promise<any> {

    let isRet = await this.delTenant(tenantDomain)
    console.log(isRet)
    return this.tenantRepository.deleteById(id);
  }

  // Role/Groups management

  @post('/wso2Role')
  async addRole (
    @param.query.string('role') role: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller ADD ROLE")
    console.log(role)
    console.log(authType)

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")

    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    return this.identityService.addGroups(
      role,
      auth,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }

  @get('/wso2Role')
  async getGroup (
    @param.query.string('role') role: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller getGroup")
    console.log(role)
    console.log(tenant)
    console.log(admin)
    console.log(adminpwd)
    console.log(authType)

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")

    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    return this.identityService.getGroup(
      role,
      auth,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }

  @get('/wso2UserRoles')
  async getUserGroups (
    @param.query.string('user') user: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller getGroup")
    console.log(user)
    console.log(tenant)
    console.log(admin)
    console.log(adminpwd)
    console.log(authType)

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")

    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    return this.identityService.getUserGroups(
      user,
      auth,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }

  @patch('/wso2Role')
  async addToGroup (
    @param.query.string('groupid') groupid: string,
    @param.query.string('username') username: string,
    @param.query.string('userid') userid: string,
    @param.query.string('location') location: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller addtogroup")
    console.log(groupid)
    console.log(tenant)
    console.log(admin)
    console.log(adminpwd)
    console.log(authType)
    console.log(groupid)
    console.log(username)
    console.log(location)
    console.log(userid)

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")

    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    return this.identityService.addToGroups(
      groupid,
      username,
      userid,
      location,
      auth,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }
  @patch('/updateUser')
  async updateUser (
    //@param.query.string('userid') userid: string,
    /*@param.query.string('username') username: string,
    @param.query.string('givenName') givenName: string,
    @param.query.string('familyName') familyName: string,
    @param.query.string('phoneNumber') phoneNumber: string,
    @param.query.string('country') country: string,
    @param.query.string('gender') gender: string,
    @param.query.string('dob') dob: string,
    @param.query.string('email') email: string,*/
    @param.query.string('payload') payload: any,
    @param.query.string('tenant') tenant: string,
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = '',
    @param.query.number('isPswd') isPswd: number = 0,
    @param.query.number('isAdmin') isAdmin: number = 0
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller updateUser")
    //console.log(userid)
    console.log(tenant)
    console.log(admin)
    console.log(adminpwd)
    console.log(authType)
    console.log(payload)
    let paylodJSON: any = JSON.parse(payload)
    console.log(paylodJSON)
    let working_payload: any
    let possibleRoles: string[] = ['micado_ngo_migrant_manager', 'micado_ngo_admin', 'micado_ngo_superadmin', 'micado_admin', 'micado_migrant_manager']
    if (isPswd) {
      console.log("I'm saving a password")
      working_payload = { "schemas": [], "Operations": [{ "op": "add", "value": { "password": paylodJSON.password } }] }
    }
    else {
      if (tenant == 'carbon.super') {
        console.log(payload.username)
        console.log("in migrant tenant")
        working_payload = {
          "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
          ],
          "Operations": [
            {
              "op": "add",
              "value": {
                "emails": [
                  {
                    "value": paylodJSON.email
                  }
                ],
                "name":
                {
                  "givenName": paylodJSON.givenName,
                  "familyName": paylodJSON.familyName
                },
                "userName": paylodJSON.username,
                "phoneNumbers": [
                  {
                    "type": "mobile",
                    "value": paylodJSON.phoneNumber
                  }
                ],
                "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                  "country": paylodJSON.nationality,
                  "gender": paylodJSON.gender,
                  "dob": paylodJSON.date_of_birth
                }
              }
            }
          ]
        }
        console.log("after assigning payload")
        console.log(working_payload.Operations[0].value)
      }
      else if (tenant == 'pa.micado.eu') {
        console.log("in PA tenant")
        working_payload = {
          "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
          ],
          "Operations": [
            {
              "op": "add",
              "value": {
                "emails": [
                  {
                    "type": "work",
                    "value": paylodJSON.email
                  }
                ],
                "name":
                {
                  "givenName": paylodJSON.givenName,
                  "familyName": paylodJSON.familyName
                },
                "userName": paylodJSON.username,
                "phoneNumbers": [
                  {
                    "type": "mobile",
                    "value": paylodJSON.phoneNumber
                  }
                ]
              }
            }
          ]
        }
      }
      else {
        console.log("in NGO tenant")
        working_payload = {
          "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
          ],
          "Operations": [
            {
              "op": "add",
              "value": {
                "emails": [
                  {
                    "type": "work",
                    "value": paylodJSON.email
                  }
                ],
                "name":
                {
                  "givenName": paylodJSON.givenName,
                  "familyName": paylodJSON.familyName
                },
                "userName": paylodJSON.username,
                "phoneNumbers": [
                  {
                    "type": "mobile",
                    "value": paylodJSON.phoneNumber
                  }
                ]
              }
            }
          ]
        }
      }
    }

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")
    console.log("before calling update")
    console.log(working_payload)
    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    if (!isAdmin) {
      return this.identityService.updateUsers(
        working_payload,
        auth,
        process.env.IDENTITY_HOSTNAME + innerPort,
        tenant,
        authType
      );
    }
    else {
      let rolesArr = paylodJSON.roles
      possibleRoles.forEach((element: any) => {
        console.log(element)
        if (possibleRoles.includes(element)) {
          console.log("role removal")
          // need to get the role
          this.getGroup(element, tenant, admin, adminpwd, authType, authToken)
            .then((theGroup) => {
              console.log("found group")
              console.log(theGroup)
              if (theGroup.totalResults > 0) {
                console.log("before group removal")
                console.log(theGroup.Resources[0].id)
                //         
                this.removeFromGroups(theGroup.Resources[0].id, paylodJSON.username, tenant, admin, adminpwd, authType, authToken)
              }
            })

        }
      });
      let userRet = await this.updateUserByAdmin(paylodJSON.userid, working_payload, tenant, authType, authToken)
      console.log("i am user return")
      console.log(userRet)
      // need to get useid and location 
      rolesArr.forEach((element: any) => {
        console.log(element)
        if (possibleRoles.includes(element)) {
          console.log("role included")
          // need to get the role
          this.getGroup(element, tenant, admin, adminpwd, authType, authToken)
            .then((theGroup) => {
              console.log("group found")

              console.log(theGroup)
              if (theGroup.totalResults > 0) {
                console.log(theGroup.Resources[0].id)
                console.log("adding to group")
                //         
                this.addToGroup(theGroup.Resources[0].id, paylodJSON.username, paylodJSON.userid, userRet.meta.location, tenant, admin, adminpwd, authType, authToken)
              }
            })

        }
      })
    }


  }
  @patch('/updateUserByAdmin')
  async updateUserByAdmin (
    @param.query.string('userid') userid: string,
    /*@param.query.string('username') username: string,
    @param.query.string('givenName') givenName: string,
    @param.query.string('familyName') familyName: string,
    @param.query.string('phoneNumber') phoneNumber: string,
    @param.query.string('country') country: string,
    @param.query.string('gender') gender: string,
    @param.query.string('dob') dob: string,
    @param.query.string('email') email: string,*/
    @param.query.string('payload') payload: any,
    @param.query.string('tenant') tenant: string,
    //@param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    //@param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Bearer',
    @param.query.string('authToken') authToken: string = '',
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller updateUser")
    //console.log(userid)
    console.log(tenant)
    console.log("I am payload in update user by admin")
    console.log(payload)
    console.log(authType)
    console.log("before update by admin invocation")
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")
    return this.identityService.updateUsersByAdmin(
      userid,
      payload,
      authToken,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }

  @post('/wso2User')
  async addUser (
    @param.query.string('username') username: string,
    @param.query.string('password') password: string,
    @param.query.string('name') name: string,
    @param.query.string('surname') surname: string,
    @param.query.string('email') email: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller")
    console.log(username)
    console.log(authType)

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")

    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    return this.identityService.createUser(
      username,
      password,
      name,
      surname,
      email,
      auth,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }

  @post('/wso2UserComplete')
  async addUserComplete (
    @param.query.string('username') username: string,
    @param.query.string('password') password: string,
    @param.query.string('name') name: string,
    @param.query.string('surname') surname: string,
    @param.query.string('email') email: string,
    @param.query.string('roles') roles: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller")
    let rolesArr = JSON.parse(roles)
    console.log(rolesArr)
    console.log(authType)
    let possibleRoles: string[] = ['pa_sp','ngo_sp','micado_ngo_migrant_manager', 'micado_ngo_superadmin', 'micado_admin', 'micado_migrant_manager']
    console.log(possibleRoles)
    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    console.log(rolesArr)
    // I need to create the user
    let userRet = await this.addUser(username, password, name, surname, email, tenant, admin, adminpwd, authType, authToken)
    console.log(userRet)
    // need to get useid and location 
    rolesArr.forEach((element: any) => {
      console.log(element)
      if (possibleRoles.includes(element)) {
        console.log("role included")
        // need to get the role
        this.getGroup(element, tenant, admin, adminpwd, authType, authToken)
          .then((theGroup) => {
            console.log(theGroup)
            if (theGroup.totalResults > 0) {
              console.log(theGroup.Resources[0].id)
              //         
              this.addToGroup(theGroup.Resources[0].id, username, userRet.id, userRet.meta.location, tenant, admin, adminpwd, authType, authToken)
            }
          })

      }
    });
    // I need to get the roles id for the requested roles
    return null
  }
  @patch('/wso2RoleRemoval')
  async removeFromGroups (
    @param.query.string('groupid') groupid: string,
    @param.query.string('username') username: string,
    //@param.query.string('userid') userid: string,
    //@param.query.string('location') location: string,
    @param.query.string('tenant') tenant = 'super',
    @param.query.string('admin') admin = (process.env.WSO2_IDENTITY_ADMIN_USER != null ? process.env.WSO2_IDENTITY_ADMIN_USER : ''),
    @param.query.string('adminpwd') adminpwd = (process.env.WSO2_IDENTITY_ADMIN_PWD != null ? process.env.WSO2_IDENTITY_ADMIN_PWD : ''),
    @param.query.string('authType') authType = 'Basic',
    @param.query.string('authToken') authToken: string = ''
  ): Promise<any> {
    //This function can be called either passing the credentials of the admin of with the access token from a logged user
    // authType can be 'Bearer' or 'Basic' for authTocker or user:pwd hash
    console.log("in the identity controller getGroup")
    console.log(groupid)
    console.log(tenant)
    console.log(admin)
    console.log(adminpwd)
    console.log(authType)

    let auth: String
    if (authType === 'Basic') {
      auth = this.calcAuth(admin, adminpwd)
    } else {
      auth = authToken
    }
    console.log(auth)
    var innerPort = (process.env.MICADO_ENV != undefined && process.env.MICADO_ENV.localeCompare("dev") == 0 ? "" : ":9443")

    //"YWRtaW5AbWlncmFudHMubWljYWRvLmV1Om1pY2Fkb2FkbTIwMjA="
    return this.identityService.removeFromGroups(
      groupid,
      username,
      auth,
      process.env.IDENTITY_HOSTNAME + innerPort,
      tenant,
      authType
    );

  }

  calcAuth (admin: string, adminpwd: String) {

    var b = Buffer.from(admin + ':' + adminpwd);
    // If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
    // We can make it convert to other formats by passing the encoding type to toString().
    var s = b.toString('base64');
    return s
  }
}
