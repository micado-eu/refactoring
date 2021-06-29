import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'picture_hotspot_translation'}
  }
})
export class PictureHotspotTranslation extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: true,
    postgresql: {columnName: 'pht_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  phtId?: number;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  lang?: string;

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
 // [prop: string]: any;

  constructor(data?: Partial<PictureHotspotTranslation>) {
    super(data);
  }
}

export interface PictureHotspotTranslationRelations {
  // describe navigational properties here
}

export type PictureHotspotTranslationWithRelations = PictureHotspotTranslation & PictureHotspotTranslationRelations;
