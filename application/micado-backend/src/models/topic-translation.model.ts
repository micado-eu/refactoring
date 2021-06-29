import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'topic_translation' },
    /*
    foreignKeys: {
      topic_translation_id_fkey: {
        name: 'topic_translation_id_fkey',
        entity: 'Topic',
        entityKey: 'id',
        foreignKey: 'id',
      },
      topic_translation_lang_fkey: {
        name: 'topic_translation_lang_fkey',
        entity: 'Languages',
        entityKey: 'lang',
        foreignKey: 'lang',
      },
    }
    */
  }
})
export class TopicTranslation extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    //   postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;

  @property({
    type: 'string',
    length: 10,
    required: true,
    //    id: 2,
    //   postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  lang?: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: { columnName: 'topic', dataType: 'character varying', dataLength: 40, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  topic?: string;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'translation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  translationDate?: string;

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

  /*
  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: { columnName: 'topic_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  topicid: number;
*/
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<TopicTranslation>) {
    super(data);
  }
}

export interface TopicTranslationRelations {
  // describe navigational properties here
}

export type TopicTranslationWithRelations = TopicTranslation & TopicTranslationRelations;
