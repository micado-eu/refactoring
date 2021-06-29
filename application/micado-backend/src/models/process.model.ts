import { Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import { ProcessTranslation } from './process-translation.model';
import { ProcessUsers } from './process-users.model';
import { ProcessTopic } from './process-topic.model';
import { ProcessComments } from './process-comments.model';
import {DocumentType} from './document-type.model';
import {ProcessTranslationProd} from './process-translation-prod.model';
import {ProcessProducedDocuments} from './process-produced-documents.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'process'}}
})
export class Process extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    generated: true,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 70,
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'link', dataType: 'character varying', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  link?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'published_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  publishedDate?: string;
  

  @hasMany(() => ProcessTranslation, {keyTo: 'id'})
  translations: ProcessTranslation[];

  @hasMany(() => ProcessUsers, {keyTo: 'idProcess'})
  applicableUsers: ProcessUsers[];

  @hasMany(() => ProcessTopic, {keyTo: 'idProcess'})
  processTopics: ProcessTopic[];

  @hasMany(() => ProcessComments, {keyTo: 'idprocess'})
  comments: ProcessComments[];


  /*@belongsTo(() => DocumentType, {name: 'process_document'})
  produced_document: number;*/
  @hasMany(() => ProcessProducedDocuments, {keyTo: 'idProcess'})
  producedDoc: ProcessProducedDocuments[];
  @hasMany(() => ProcessTranslationProd, {keyTo: 'id'})
  translations_prod: ProcessTranslationProd[];

  
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<Process>) {
    super(data);
  }
}

export interface ProcessRelations {
  // describe navigational properties here
}

export type ProcessWithRelations = Process & ProcessRelations;
