import {Entity, model, property, hasMany} from '@loopback/repository';
import {PictureHotspot} from './picture-hotspot.model';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'document_type_picture'}
  }
})
export class DocumentTypePicture extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated:true,
    //postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'image', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  image?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'document_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  documentTypeId: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'order', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  order?: number;

  @hasMany(() => PictureHotspot, {keyTo: 'pictureId'})
  hotspots: PictureHotspot[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  [prop: string]: any;

  constructor(data?: Partial<DocumentTypePicture>) {
    super(data);
  }
}

export interface DocumentTypePictureRelations {
  // describe navigational properties here
}

export type DocumentTypePictureWithRelations = DocumentTypePicture & DocumentTypePictureRelations;
