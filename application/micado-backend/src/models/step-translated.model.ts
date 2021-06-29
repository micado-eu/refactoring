import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'step_translated'}
  }
})
export class StepTranslated extends Entity {
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'previous', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  previous?: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'cost', dataType: 'money', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  cost?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'location_specific', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  locationSpecific?: boolean;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'location', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  location?: string;

  @property({
    type: 'number',
    precision: 53,
    postgresql: {columnName: 'location_lon', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  locationLon?: number;

  @property({
    type: 'number',
    precision: 53,
    postgresql: {columnName: 'location_lat', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES'},
  })
  locationLat?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id_process', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  idProcess?: number;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  lang?: string;

  @property({
    type: 'string',
    length: 25,
    postgresql: {columnName: 'step', dataType: 'character varying', dataLength: 25, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  step?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<StepTranslated>) {
    super(data);
  }
}

export interface StepTranslatedRelations {
  // describe navigational properties here
}

export type StepTranslatedWithRelations = StepTranslated & StepTranslatedRelations;
