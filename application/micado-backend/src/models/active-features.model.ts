import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'active_features'}
  }
})
export class ActiveFeatures extends Entity {
  @property({
    type: 'string',
    id:true,
    postgresql: {columnName: 'features', dataType: 'json', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  features?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  [prop: string]: any;

  constructor(data?: Partial<ActiveFeatures>) {
    super(data);
  }
}

export interface ActiveFeaturesRelations {
  // describe navigational properties here
}

export type ActiveFeaturesWithRelations = ActiveFeatures & ActiveFeaturesRelations;
