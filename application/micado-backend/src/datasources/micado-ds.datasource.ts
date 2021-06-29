import {
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {juggler} from '@loopback/repository';
import config from './micado-ds.datasource.config.json';

@lifeCycleObserver('datasource')
export class MicadoDsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'micadoDS';

  constructor(
    @inject('datasources.config.micadoDS', {optional: true})
    dsConfig: any = config,
  ) {
    console.log("SONO QUI")
    console.log(process.env.MICADO_DB_PWD)
    console.log(dsConfig)
    dsConfig.password = process.env.MICADO_DB_PWD
    dsConfig.user = process.env.MICADO_DB_USER
    dsConfig.database = process.env.POSTGRES_DB
    dsConfig.schema = process.env.MICADO_DB_SCHEMA
    dsConfig.url = "postgres://"+process.env.MICADO_DB_USER + ":" + process.env.MICADO_DB_PWD + "@micado_db/" + process.env.POSTGRES_DB

    console.log(dsConfig)
    super(dsConfig);
  }

  /**
   * Start the datasource when application is started
   */
  start(): ValueOrPromise<void> {
    // Add your logic here to be invoked when the application is started
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }
}
