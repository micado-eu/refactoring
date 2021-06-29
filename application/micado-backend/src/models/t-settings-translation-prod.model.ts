import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 't_settings_translation_prod'}
  }
})
export class TSettingsTranslationProd extends Entity {
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
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  lang?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'value', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  value?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<TSettingsTranslationProd>) {
    super(data);
  }
}

export interface TSettingsTranslationProdRelations {
  // describe navigational properties here
}

export type TSettingsTranslationProdWithRelations = TSettingsTranslationProd & TSettingsTranslationProdRelations;
