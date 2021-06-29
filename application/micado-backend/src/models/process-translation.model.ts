import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'process_translation' }
  }
})
export class ProcessTranslation extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: true,
    //   postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    length: 10,
    required: true,
    postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  lang?: string;

  @property({
    type: 'string',
    length: 50,
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'process', dataType: 'character varying', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  process?: string;

  @property({
    type: 'string',
    jsonSchema: { nullable: true },
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

  constructor(data?: Partial<ProcessTranslation>) {
    super(data);
  }
}

export interface ProcessTranslationRelations {
  // describe navigational properties here
}

export type ProcessTranslationWithRelations = ProcessTranslation & ProcessTranslationRelations;
