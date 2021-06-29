import { Entity, model, property, hasMany } from '@loopback/repository';
import { DocumentTypeTranslation } from './document-type-translation.model'
import { DocumentTypePicture } from './document-type-picture.model';
import {DocumentTypeTranslationProd} from './document-type-translation-prod.model';
import {ProcessProducedDocuments} from './process-produced-documents.model';
import {DocumentTypeValidator} from './document-type-validator.model';
import {StepDocument} from './step-document.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'document_type' } }
})
export class DocumentType extends Entity {
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
    required: false,
    postgresql: { columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  icon?: string;

  @property({
    type: 'string',
    length: 20,
    required: false,
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'issuer', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  issuer?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'model', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  model?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: { columnName: 'validable', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  validable: boolean;

  @property({
    type: 'Number',
    scale: 0,
    postgresql: { columnName: 'validity_duration', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  validityDuration?: number;
  
  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;


  @hasMany(() => DocumentTypeTranslation, { keyTo: 'id' })
  translations: DocumentTypeTranslation[];

  @hasMany(() => DocumentTypePicture)
  pictures: DocumentTypePicture[];

  @hasMany(() => DocumentTypeTranslationProd, {keyTo: 'id'})
  translations_prod: DocumentTypeTranslationProd[];

  @hasMany(() => ProcessProducedDocuments, {keyTo: 'idDocument'})
  generatedBy: ProcessProducedDocuments[];

  @hasMany(() => DocumentTypeValidator)
  validators: DocumentTypeValidator[];

  @hasMany(() => ProcessProducedDocuments, {keyTo: 'idDocument'})
  linkedProcess: ProcessProducedDocuments[];

  @hasMany(() => StepDocument, {keyTo: 'idDocument'})
  linkedStep: StepDocument[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;



  constructor(data?: Partial<DocumentType>) {
    super(data);
  }
}

export interface DocumentTypeRelations {
  // describe navigational properties here
}

export type DocumentTypeWithRelations = DocumentType & DocumentTypeRelations;
