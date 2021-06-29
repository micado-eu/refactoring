import { Entity, model, property, hasMany } from '@loopback/repository';
import { InterventionCategoryTranslation } from './intervention-category-translation.model';
import {InterventionCategoryTranslationProd} from './intervention-category-translation-prod.model';
import {InterventionTypes} from './intervention-types.model';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'intervention_category' }
  }
})
export class InterventionCategory extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    generated:true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;
  
  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'external_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  externalId?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;


  @hasMany(() => InterventionCategoryTranslation, { keyTo: 'id' })
  translations: InterventionCategoryTranslation[];

  @hasMany(() => InterventionCategoryTranslationProd, {keyTo: 'id'})
  translations_prod: InterventionCategoryTranslationProd[];

  @hasMany(() => InterventionTypes, {keyTo: 'categoryType'})
  linkedInterventionType: InterventionTypes[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InterventionCategory>) {
    super(data);
  }
}

export interface InterventionCategoryRelations {
  // describe navigational properties here
}

export type InterventionCategoryWithRelations = InterventionCategory & InterventionCategoryRelations;
