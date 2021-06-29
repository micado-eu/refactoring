import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'step_link_translation' }
  }
})
export class StepLinkTranslation extends Entity {
  @property({
    type: 'string',
    required: true,
    //   postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  lang: string;

  @property({
    type: 'string',
    length: 25,
    postgresql: { columnName: 'description', dataType: 'character varying', dataLength: 25, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  description?: string;

  @property({
    type: 'string',
    required: true,
    id: true,
    postgresql: { columnName: 'id', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  id: string;

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

  constructor(data?: Partial<StepLinkTranslation>) {
    super(data);
  }
}

export interface StepLinkTranslationRelations {
  // describe navigational properties here
}

export type StepLinkTranslationWithRelations = StepLinkTranslation & StepLinkTranslationRelations;
