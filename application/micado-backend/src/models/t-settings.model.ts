import {Entity, model, property, hasMany} from '@loopback/repository';
import {TSettingsTranslation} from './t-settings-translation.model';
import {TSettingsTranslationProd} from './t-settings-translation-prod.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'micadoapp', table: 't_settings'}}
})
export class TSettings extends Entity {
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
    postgresql: {columnName: 'key', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  key?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @hasMany(() => TSettingsTranslation, {keyTo: 'id'})
  translations: TSettingsTranslation[];

  @hasMany(() => TSettingsTranslationProd, {keyTo: 'id'})
  translationProd: TSettingsTranslationProd[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<TSettings>) {
    super(data);
  }
}

export interface TSettingsRelations {
  // describe navigational properties here
}

export type TSettingsWithRelations = TSettings & TSettingsRelations;
