// Uncomment these imports to begin using these cool features!

import { inject } from '@loopback/context';
import { get, param, HttpErrors } from '@loopback/rest';
import {
  CountlyService,
  CountlyApiParameters
} from '../services/countly.service'

export class CountlyproxyController {
  constructor(
    @inject('services.Countly')
    protected countlyService: CountlyService,
  ) { }
  /*
    @get('/dashboard/{api_key}/{app_id}')
    async translations (
      @param.path.string('api_key') api_key: string,
      @param.path.string('app_id') app_id: string,
    ): Promise<any> {
      //Preconditions
  
      return this.countlyService.dashboard(<CountlyApiParameters>{
        api_key,
        app_id,
      });
  
    }
  */
}
