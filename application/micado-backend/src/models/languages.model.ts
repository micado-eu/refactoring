import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'languages' } }
})
export class Languages extends Entity {
  @property({
    type: 'String',
    required: true,
    length: 10,
    id: true,
    //    postgresql: {columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  lang: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: { columnName: 'iso_code', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  isoCode?: string;

  @property({
    type: 'string',
    length: 25,
    postgresql: { columnName: 'name', dataType: 'character varying', dataLength: 25, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  name?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: { columnName: 'active', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  active: boolean;

  @property({
    type: 'boolean',
    required: true,
    postgresql: { columnName: 'is_default', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  isDefault: boolean;

  @property({
    type: 'string',
    length: 25,
    postgresql: { columnName: 'voice_string', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  voiceString?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: { columnName: 'voice_active', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  voiceActive: boolean;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Languages>) {
    super(data);
  }
}

export interface LanguagesRelations {
  // describe navigational properties here
}

export type LanguagesWithRelations = Languages & LanguagesRelations;
