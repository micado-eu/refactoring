import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'document_type_translation' }
  }
})
export class DocumentTypeTranslation extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;

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

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'translation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  translationDate?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'translationState', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  translationState: number;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  [prop: string]: any;

  constructor(data?: Partial<DocumentTypeTranslation>) {
    super(data);
  }
}

export interface DocumentTypeTranslationRelations {
  // describe navigational properties here
}

export type DocumentTypeTranslationWithRelations = DocumentTypeTranslation & DocumentTypeTranslationRelations;
