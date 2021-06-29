import { Entity, model, property, hasMany} from '@loopback/repository';
import {StepLinkTranslation} from './step-link-translation.model';
import {StepLinkTranslationProd} from './step-link-translation-prod.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'step_link' } }
})
export class StepLink extends Entity {
  @property({
    type: 'string',
    required: true,
    id: 1,
    //    postgresql: {columnName: 'id', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    postgresql: { columnName: 'from_step', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  fromStep: string;

  @property({
    type: 'string',
    required: true,
    postgresql: { columnName: 'to_step', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  toStep: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: { columnName: 'id_process', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  idProcess: number;

  @hasMany(() => StepLinkTranslation, {keyTo: 'id'})
  translations: StepLinkTranslation[];

  @hasMany(() => StepLinkTranslationProd, {keyTo: 'id'})
  translations_prod: StepLinkTranslationProd[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<StepLink>) {
    super(data);
  }
}

export interface StepLinkRelations {
  // describe navigational properties here
}

export type StepLinkWithRelations = StepLink & StepLinkRelations;
