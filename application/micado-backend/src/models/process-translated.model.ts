import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'process_translated'}
  }
})
export class ProcessTranslated extends Entity {
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'string',
    length: 70,
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
    postgresql: {columnName: 'publication_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  publicationDate?: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  lang?: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: {columnName: 'process', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  process?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProcessTranslated>) {
    super(data);
  }
}

export interface ProcessTranslatedRelations {
  // describe navigational properties here
}

export type ProcessTranslatedWithRelations = ProcessTranslated & ProcessTranslatedRelations;
