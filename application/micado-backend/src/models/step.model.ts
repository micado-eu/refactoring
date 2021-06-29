import { Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import { StepTranslation } from './step-translation.model';
import {StepDocument} from './step-document.model';
import {StepTranslationProd} from './step-translation-prod.model';
import {MixedIcons} from './mixed-icons.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'step' } }
})
export class Step extends Entity {
  @property({
    type: 'string',
    required: true,
    id: 1,
    //  postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: string;

  @property({
    type: 'number',
    //  postgresql: {columnName: 'cost', dataType: 'money', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  cost?: number;

  @property({
    type: 'boolean',
    postgresql: { columnName: 'location_specific', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  locationSpecific?: boolean;

  @property({
    type: 'string',
    length: 100,
    postgresql: { columnName: 'location', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  location?: string;

  @property({
    type: 'number',
    precision: 53,
    postgresql: { columnName: 'location_lon', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES' },
  })
  locationLon?: number;

  @property({
    type: 'number',
    precision: 53,
    postgresql: { columnName: 'location_lat', dataType: 'float', dataLength: null, dataPrecision: 53, dataScale: null, nullable: 'YES' },
  })
  locationLat?: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: { columnName: 'id_process', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  idProcess: number;

   @property({
    type: 'number',
    scale: 0,
    postgresql: { columnName: 'step_icon', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  stepIcon: number;

  @property({
    type: 'string',
    postgresql: { columnName: 'link', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  link?: string;

  @hasMany(() => StepTranslation, {keyTo: 'id'})
  translations: StepTranslation[];

  @hasMany(() => StepDocument, {keyTo: 'idStep'})
  documents: StepDocument[];

  @hasMany(() => StepTranslationProd, {keyTo: 'id'})
  translations_prod: StepTranslationProd[];

  @hasOne(() => MixedIcons, {keyTo: 'id', keyFrom:'stepIcon'})
  icon: MixedIcons;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<Step>) {
    super(data);
  }
}

export interface StepRelations {
  // describe navigational properties here
}

export type StepWithRelations = Step & StepRelations;
