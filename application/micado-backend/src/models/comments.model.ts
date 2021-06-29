import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {CommentsTranslation} from './comments-translation.model';
import {CommentTranslationProd} from './comment-translation-prod.model';
import {Tenant} from './tenant.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'comments'}}
})
export class Comments extends Entity {

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
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'tenant_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  tenantId: number;

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

  @hasMany(() => CommentsTranslation, {keyTo: 'id'})
  translations: CommentsTranslation[];

  @hasMany(() => CommentTranslationProd, {keyTo: 'id'})
  translations_prod: CommentTranslationProd[];

  @hasOne(() => Tenant, {keyTo: 'id', keyFrom: 'tenantId'})
  tenant: Tenant;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Comments>) {
    super(data);
  }
}

export interface CommentsRelations {
  // describe navigational properties here
}

export type CommentsWithRelations = Comments & CommentsRelations;
