import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'topic_translated' }
  }
})
export class TopicTranslated extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  id?: number;

  @property({
    type: 'string',
    postgresql: { columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  icon?: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  lang?: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: { columnName: 'topic', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  topic?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<TopicTranslated>) {
    super(data);
  }
}

export interface TopicTranslatedRelations {
  // describe navigational properties here
}

export type TopicTranslatedWithRelations = TopicTranslated & TopicTranslatedRelations;
