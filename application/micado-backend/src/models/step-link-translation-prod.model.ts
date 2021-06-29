import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'step_link_translation_prod'}
  }
})
export class StepLinkTranslationProd extends Entity {
  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lang: string;

  @property({
    type: 'string',
    length: 25,
    postgresql: {columnName: 'description', dataType: 'character varying', dataLength: 25, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  id: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<StepLinkTranslationProd>) {
    super(data);
  }
}

export interface StepLinkTranslationProdRelations {
  // describe navigational properties here
}

export type StepLinkTranslationProdWithRelations = StepLinkTranslationProd & StepLinkTranslationProdRelations;
