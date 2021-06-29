import { inject } from '@loopback/context';
import { get, post, param, del, patch, HttpErrors } from '@loopback/rest';
import { create } from 'domain';
import {RocketchatService,} from '../services/rocketchat.service'

export class CreateRocketchatUserController {
  constructor(
    @inject('services.Rocketchat') protected RocketchatService: RocketchatService,
  ) {}
  @post('/admin-login')
  async adminLogin(
  ): Promise<any>{
  return this.RocketchatService.adminLogin(
    process.env.ROCKETCHAT_ADMIN,
    process.env.ROCKETCHAT_ADMIN_PWD,
    process.env.ROCKETCHAT_HOSTNAME
  )
  }
  @post('/create-rocketchat-user')
  async createUser(
    @param.query.string('payload') payload:any,
  ): Promise<any>{
    console.log(payload)
    let payloadJSON = JSON.parse(payload)
    console.log("before getting credentials")
    let credentials = await this.adminLogin()
    console.log(credentials)
    let token = credentials.data.authToken
    let userid = credentials.data.userId
    console.log(token)
    console.log(userid)
    console.log("after credentials")

    return this.RocketchatService.createUser(
    payloadJSON,
    token,
    userid,
    process.env.ROCKETCHAT_HOSTNAME
  )
  }
}

