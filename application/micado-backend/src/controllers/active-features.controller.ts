// Uncomment these imports to begin using these cool features!
import { get, param, HttpErrors } from '@loopback/rest';
import { MicadoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

// import {inject} from '@loopback/context';


export class ActiveFeaturesController {
  constructor(
    @inject('datasources.micadoDS') protected dataSource: MicadoDsDataSource,
  ) { }

  @get('/active-features')
  async active_features (
  ): Promise<any> {
    //Preconditions
    return this.dataSource.execute("select * from active_features")

  }
}
