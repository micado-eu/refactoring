import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'picture_hotspot_translated'}
  }
})
export class PictureHotspotTranslated extends Entity {
  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  id?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'x', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  x?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'y', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  y?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'picture_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  pictureId?: number;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PictureHotspotTranslated>) {
    super(data);
  }
}

export interface PictureHotspotTranslatedRelations {
  // describe navigational properties here
}

export type PictureHotspotTranslatedWithRelations = PictureHotspotTranslated & PictureHotspotTranslatedRelations;
