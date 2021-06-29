// Uncomment these imports to begin using these cool features!
import { get, post, param, HttpErrors } from '@loopback/rest';
import {
  CountlyService,

} from '../services/countly.service'
import { inject } from '@loopback/context';

// import {inject} from '@loopback/context';

const COUNTLY_MIGRANTS_API_KEY = process.env.COUNTLY_MIGRANTS_API_KEY || '';
const COUNTLY_MIGRANTS_APP_ID = process.env.COUNTLY_MIGRANTS_APP_ID || '';
const ANALYTIC_HOSTNAME = process.env.ANALYTIC_HOSTNAME || '';


export class CountlyController {
  constructor(
    @inject('services.Countly') protected countlyService: CountlyService,
  ) { }

  @get('/getDashboard')
  async getDashboard (
  ): Promise<any> {
    console.log(COUNTLY_MIGRANTS_API_KEY)
    console.log(COUNTLY_MIGRANTS_APP_ID)
    console.log(process.env.COUNTLY_ADMIN)
    console.log(process.env.COUNTLY_ADMIN_PWD)
    console.log(this.calcAuth())


    return this.countlyService.dashboard(
      COUNTLY_MIGRANTS_API_KEY,
      COUNTLY_MIGRANTS_APP_ID,
      this.calcAuth(),
      ANALYTIC_HOSTNAME
    );
  }
  calcAuth () {
    var b = Buffer.from(process.env.COUNTLY_ADMIN + ':' + process.env.COUNTLY_ADMIN_PWD);
    // If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
    // We can make it convert to other formats by passing the encoding type to toString().
    var s = b.toString('base64');
    return s
  }
}
