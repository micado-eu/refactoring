import { FeaturesFlagsTranslation } from './features-flags-translation.model';
import { Entity, model, property, hasMany } from '@loopback/repository';
import { FeaturesFlagsTranslationProd } from './features-flags-translation-prod.model';


@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'features_flags' } }
})
export class FeaturesFlags extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    //    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: { columnName: 'flag_key', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  flagKey?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: { columnName: 'enabled', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  enabled: boolean;

  @hasMany(() => FeaturesFlagsTranslation, {keyTo: 'id'})
  translations: FeaturesFlagsTranslation[];

  @hasMany(() => FeaturesFlagsTranslationProd, {keyTo: 'id'})
  translations_prod: FeaturesFlagsTranslationProd[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;




  constructor(data?: Partial<FeaturesFlags>) {
    super(data);
  }
}

export interface FeaturesFlagsRelations {
  // describe navigational properties here
}

export type FeaturesFlagsWithRelations = FeaturesFlags & FeaturesFlagsRelations;
