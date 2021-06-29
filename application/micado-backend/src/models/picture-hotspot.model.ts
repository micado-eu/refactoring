import {Entity, model, property, hasMany} from '@loopback/repository';
import {PictureHotspotTranslation} from './picture-hotspot-translation.model';
import {PictureHotspotTranslationProd} from './picture-hotspot-translation-prod.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'picture_hotspot'}
  }
})
export class PictureHotspot extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

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

  @hasMany(() => PictureHotspotTranslation, {keyTo: 'phtId'})
  translations: PictureHotspotTranslation[];

  @hasMany(() => PictureHotspotTranslationProd, {keyTo: 'phtId'})
  translations_prod: PictureHotspotTranslationProd[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  [prop: string]: any;

  constructor(data?: Partial<PictureHotspot>) {
    super(data);
  }
}

export interface PictureHotspotRelations {
  // describe navigational properties here
}

export type PictureHotspotWithRelations = PictureHotspot & PictureHotspotRelations;
