import { Entity, model, property, hasMany } from '@loopback/repository';
import { InformationCategoryTranslation } from '.';
import {InformationCategoryTranslationProd} from './information-category-translation-prod.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'information_category' } }
})
export class InformationCategory extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;

  @property({
    type: 'string',
    postgresql: { columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  icon?: string;

  @property({
    type: 'boolean',
    postgresql: { columnName: 'link_integration_plan', dataType: 'bool', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  link_integration_plan?: boolean;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'bool', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @hasMany(() => InformationCategoryTranslation, { keyTo: 'id' })
  translations: InformationCategoryTranslation[];

  @hasMany(() => InformationCategoryTranslationProd, {keyTo: 'id'})
  translations_prod: InformationCategoryTranslationProd[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<InformationCategory>) {
    super(data);
  }
}

export interface InformationCategoryRelations {
  // describe navigational properties here
}

export type InformationCategoryWithRelations = InformationCategory & InformationCategoryRelations;
