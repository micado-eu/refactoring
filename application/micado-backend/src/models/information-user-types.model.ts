import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'information_user_types'}}
})
export class InformationUserTypes extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: true,
    postgresql: {columnName: 'id_information', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idInformation: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_user_types', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idUserTypes: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InformationUserTypes>) {
    super(data);
  }
}

export interface InformationUserTypesRelations {
  // describe navigational properties here
}

export type InformationUserTypesWithRelations = InformationUserTypes & InformationUserTypesRelations;
