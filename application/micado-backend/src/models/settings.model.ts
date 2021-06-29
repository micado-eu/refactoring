import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'settings' } }
})
export class Settings extends Entity {
  @property({
    type: 'string',
    required: true,
    id: 1,
    postgresql: { columnName: 'key', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  key: string;

  @property({
    type: 'string',
    length: 1500,
    postgresql: { columnName: 'value', dataType: 'text', dataLength: 1500, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  value?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<Settings>) {
    super(data);
  }
}

export interface SettingsRelations {
  // describe navigational properties here
}

export type SettingsWithRelations = Settings & SettingsRelations;
