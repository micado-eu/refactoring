import { Entity, model, property, hasMany, hasOne } from '@loopback/repository';
import { InformationTranslation, InformationTopic } from '.';
import {InformationTranslationProd} from './information-translation-prod.model';
import { InformationUserTypes } from './information-user-types.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'information' } }
})
export class Information extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    //postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;

  @property({
    type: 'string',
    length: 70,
    postgresql: { columnName: 'link', dataType: 'character varying', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  link?: string;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    postgresql: { columnName: 'category', dataType: 'int2', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  category?: number;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @property({
    type: 'number',
    postgresql: { columnName: 'creator', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  creator?: number;


  @hasMany(() => InformationTranslation, { keyTo: 'id' })
  translations: InformationTranslation[];

  @hasMany(() => InformationTranslationProd, {keyTo: 'id'})
  translations_prod: InformationTranslationProd[];

  @hasMany(() => InformationTopic, {keyTo: 'idInformation'})
  informationTopics: InformationTopic[];

  @hasMany(() => InformationUserTypes, {keyTo: 'idInformation'})
  informationUserTypes: InformationUserTypes[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Information>) {
    super(data);
  }
}

export interface InformationRelations {
  // describe navigational properties here
}

export type InformationWithRelations = Information & InformationRelations;
