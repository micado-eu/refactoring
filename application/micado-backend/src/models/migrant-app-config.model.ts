import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'migrant_app_config'}
  }
})
export class MigrantAppConfig extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'features', dataType: 'json', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  features?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MigrantAppConfig>) {
    super(data);
  }
}

export interface MigrantAppConfigRelations {
  // describe navigational properties here
}

export type MigrantAppConfigWithRelations = MigrantAppConfig & MigrantAppConfigRelations;
