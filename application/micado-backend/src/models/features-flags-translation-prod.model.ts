import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'features_flags_translation_prod'}
  }
})
export class FeaturesFlagsTranslationProd extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lang: string;

  @property({
    type: 'string',
    length: 30,
    postgresql: {columnName: 'feature', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  feature?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'translation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  translationDate?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<FeaturesFlagsTranslationProd>) {
    super(data);
  }
}

export interface FeaturesFlagsTranslationProdRelations {
  // describe navigational properties here
}

export type FeaturesFlagsTranslationProdWithRelations = FeaturesFlagsTranslationProd & FeaturesFlagsTranslationProdRelations;
