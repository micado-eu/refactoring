import { Entity, model, property, hasMany} from '@loopback/repository';
import {GlossaryTranslation} from './glossary-translation.model';
import {GlossaryTranslationProd} from './glossary-translation-prod.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'glossary' } }
})
export class Glossary extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    //    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;
  
  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @property({
    type: 'number',
    postgresql: { columnName: 'creator', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  creator?: number;
  /*
  @property({
    type: 'string',
    required: true,
    length: 10,
    //  id: 2,
    postgresql: { columnName: 'lang', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  lang: string;

  @property({
    type: 'string',
    length: 20,
    postgresql: { columnName: 'title', dataType: 'character varying', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  title?: string;

  @property({
    type: 'string',
    postgresql: { columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  description?: string;

  @property({
    type: 'date',
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'translation_date', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  translationDate?: string;
*/


  @hasMany(() => GlossaryTranslation, {keyTo: 'id'})
  translations: GlossaryTranslation[];

  @hasMany(() => GlossaryTranslationProd, {keyTo: 'id'})
  translations_prod: GlossaryTranslationProd[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Glossary>) {
    super(data);
  }
}

export interface GlossaryRelations {
  // describe navigational properties here
}

export type GlossaryWithRelations = Glossary & GlossaryRelations;
