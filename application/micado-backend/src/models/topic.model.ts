import { Entity, model, property, hasMany } from '@loopback/repository';
import { TopicTranslation } from './topic-translation.model'
import {TopicTranslationProd} from './topic-translation-prod.model';
import {ProcessTopic} from './process-topic.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'topic' } }
})
export class Topic extends Entity {
  @property({
    type: 'Number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    //    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    //   postgresql: { columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  icon?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @property({
    type: 'Number',
    scale: 0,
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'father', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  father: number;

  @hasMany(() => TopicTranslation, { keyTo: 'id' })
  translations: TopicTranslation[];

  @hasMany(() => TopicTranslationProd, {keyTo: 'id'})
  translations_prod: TopicTranslationProd[];

  @hasMany(() => ProcessTopic, {keyTo: 'idTopic'})
  linkedProcess: ProcessTopic[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<Topic>) {
    super(data);
  }
}

export interface TopicRelations {
  // describe navigational properties here
}

export type TopicWithRelations = Topic & TopicRelations;
