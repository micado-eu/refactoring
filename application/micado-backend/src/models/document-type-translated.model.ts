import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'document_type_translated' }
  }
})
export class DocumentTypeTranslated extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  id?: number;

  @property({
    type: 'string',
    postgresql: { columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  icon?: string;

  @property({
    type: 'string',
    length: 20,
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
    postgresql: { columnName: 'validable', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  validable?: boolean;

  @property({
    type: 'number',
    scale: 0,
    postgresql: { columnName: 'validity_duration', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  validityDuration?: number;

  @property({
    type: 'string',
    length: 10,
    postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  lang?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: { columnName: 'document', dataType: 'character varying', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  document?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  description?: string;

  

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<DocumentTypeTranslated>) {
    super(data);
  }
}

export interface DocumentTypeTranslatedRelations {
  // describe navigational properties here
}

export type DocumentTypeTranslatedWithRelations = DocumentTypeTranslated & DocumentTypeTranslatedRelations;
