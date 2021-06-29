import { Entity, model, property, hasMany, belongsTo } from '@loopback/repository';
import { InterventionTypesTranslation } from './intervention-types-translation.model';
import { InterventionCategory } from './intervention-category.model';
import {InterventionTypeValidator} from './intervention-type-validator.model';
import {InterventionTypesTranslationProd} from './intervention-types-translation-prod.model';
import {IndividualInterventionPlanInterventions} from './individual-intervention-plan-interventions.model';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'intervention_types' }
  }
})
export class InterventionTypes extends Entity {
  @property({
    type: 'Number',
    required: false,
    scale: 0,
    id: true,
    generated: true,
    //    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: false,
    scale: 0,
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'category_type', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  categoryType: number;

  @property({
    type: 'string',
    length: 100,
    postgresql: {columnName: 'external_id', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  externalId?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @hasMany(() => InterventionTypesTranslation, { keyTo: 'id' })
  translations: InterventionTypesTranslation[];

  @hasMany(() => InterventionTypeValidator, {keyTo: 'interventionTypeId'})
  interventionTypeValidators: InterventionTypeValidator[];

  @hasMany(() => InterventionTypesTranslationProd, {keyTo: 'id'})
  translations_prod: InterventionTypesTranslationProd[];

  @hasMany(() => IndividualInterventionPlanInterventions, {keyTo: 'interventionType'})
  linkedInterventions: IndividualInterventionPlanInterventions[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<InterventionTypes>) {
    super(data);
  }
}

export interface InterventionTypesRelations {
  // describe navigational properties here
}

export type InterventionTypesWithRelations = InterventionTypes & InterventionTypesRelations;
