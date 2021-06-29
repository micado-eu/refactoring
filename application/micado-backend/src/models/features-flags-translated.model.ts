import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'features_flags_translated' }
  }
})
export class FeaturesFlagsTranslated extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  id?: number;

  @property({
    type: 'string',
    postgresql: { columnName: 'flag_key', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  flagKey?: string;

  @property({
    type: 'boolean',
    postgresql: { columnName: 'enabled', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  enabled?: boolean;

  @property({
    type: 'string',
    length: 10,
    postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  lang?: string;

  @property({
    type: 'string',
    length: 30,
    postgresql: { columnName: 'feature', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  feature?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FeaturesFlagsTranslated>) {
    super(data);
  }
}

export interface FeaturesFlagsTranslatedRelations {
  // describe navigational properties here
}

export type FeaturesFlagsTranslatedWithRelations = FeaturesFlagsTranslated & FeaturesFlagsTranslatedRelations;
