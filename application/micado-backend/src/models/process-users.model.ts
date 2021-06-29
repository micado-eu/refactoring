import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'process_users'}}
})
export class ProcessUsers extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id_process', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idProcess: number;

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
//  [prop: string]: any;

  constructor(data?: Partial<ProcessUsers>) {
    super(data);
  }
}

export interface ProcessUsersRelations {
  // describe navigational properties here
}

export type ProcessUsersWithRelations = ProcessUsers & ProcessUsersRelations;
