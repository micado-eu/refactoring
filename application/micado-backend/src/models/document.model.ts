import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {DocumentPictures} from './document-pictures.model';
import {DocumentType} from './document-type.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'document'}}
})
export class Document extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    generated:true,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'user_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  userId?: number;
  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'document_type', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  documentTypeId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'user_tenant', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  userTenant?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'ask_validate_by_tenant', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  askValidateByTenant?: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'validated', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  validated: boolean;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'validation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  validationDate?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'validated_by_tenant', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  validatedByTenant?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'validated_by_user', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  validatedByUser?: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'uploaded_by_me', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  uploadedByMe: boolean;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: {columnName: 'expiration_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  expirationDate?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'shareable', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  shareable: boolean;

  @hasMany(() => DocumentPictures, {keyTo: 'docId'})
  pictures: DocumentPictures[];

  @hasOne(() => DocumentType, {keyTo: 'id'})
  documentType: DocumentType;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Document>) {
    super(data);
  }
}

export interface DocumentRelations {
  // describe navigational properties here
}

export type DocumentWithRelations = Document & DocumentRelations;
