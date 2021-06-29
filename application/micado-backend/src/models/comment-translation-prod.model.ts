import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'comment_translation_prod'}
  }
})
export class CommentTranslationProd extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lang: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'comment', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  comment?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'translationdate', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  translationdate?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: true,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<CommentTranslationProd>) {
    super(data);
  }
}

export interface CommentTranslationProdRelations {
  // describe navigational properties here
}

export type CommentTranslationProdWithRelations = CommentTranslationProd & CommentTranslationProdRelations;
