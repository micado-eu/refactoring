import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'picture_hotspot_translation_prod'}
  }
})
export class PictureHotspotTranslationProd extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'pht_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  phtId: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lang: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: {columnName: 'title', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  title?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'message', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  message?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<PictureHotspotTranslationProd>) {
    super(data);
  }
}

export interface PictureHotspotTranslationProdRelations {
  // describe navigational properties here
}

export type PictureHotspotTranslationProdWithRelations = PictureHotspotTranslationProd & PictureHotspotTranslationProdRelations;
