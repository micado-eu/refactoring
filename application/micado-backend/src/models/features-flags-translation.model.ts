import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'features_flags_translation' },
    foreignKeys: {
      fk_fft_feature_flag_id: {
        name: 'fk_fft_feature_flag_id',
        entity: 'FeaturesFlags',
        entityKey: 'id',
        foreignKey: 'id',
      },
      fk_fft_lang_id: {
        name: 'fk_fft_lang_id',
        entity: 'Languages',
        entityKey: 'lang',
        foreignKey: 'lang',
      },
    }
  }
})
export class FeaturesFlagsTranslation extends Entity {
  @property({
    type: 'Number',
    required: true,
    scale: 0,
    id: 1,
    generated: false,
    //    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;


  @property({
    type: 'string',
    required: true,
    length: 10,
    id: 2,
    generated: false,
    //   postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  lang?: string;

  @property({
    type: 'string',
    length: 30,
    postgresql: { columnName: 'feature', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  feature?: string;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'translation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  translationDate?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'translationState', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  translationState: number;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<FeaturesFlagsTranslation>) {
    super(data);
  }
}

export interface FeaturesFlagsTranslationRelations {
  // describe navigational properties here
}

export type FeaturesFlagsTranslationWithRelations = FeaturesFlagsTranslation & FeaturesFlagsTranslationRelations;
