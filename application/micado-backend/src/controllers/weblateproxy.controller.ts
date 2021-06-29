// Uncomment these imports to begin using these cool features!

import { inject } from '@loopback/context';
import { get, param, HttpErrors } from '@loopback/rest';
import {
  WeblateService
} from '../services/weblate.service'

export class WeblateproxyController {
  constructor(
    @inject('services.Weblate')
    protected weblateService: WeblateService,
  ) { }

  @get('/translations')
  async translations (
  ): Promise<any> {
    //Preconditions

    return this.weblateService.translations(this.calcAuth(), process.env.TRANSLATION_HOSTNAME);

  }

  calcAuth () {
    var b = Buffer.from(process.env.WEBLATE_ADMIN_NAME + ':' + process.env.WEBLATE_ADMIN_PASSWORD);
    // If we don't use toString(), JavaScript assumes we want to convert the object to utf8.
    // We can make it convert to other formats by passing the encoding type to toString().
    var s = b.toString('base64');
    return s
  }


}
