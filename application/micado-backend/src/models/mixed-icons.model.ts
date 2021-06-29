import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 'mixed_icons'}}
})
export class MixedIcons extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    generated: true,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  icon?: string;

  @property({
    type: 'number',
    postgresql: {columnName: 'related_entity', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  relatedEntity?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<MixedIcons>) {
    super(data);
  }
}

export interface MixedIconsRelations {
  // describe navigational properties here
}

export type MixedIconsWithRelations = MixedIcons & MixedIconsRelations;
