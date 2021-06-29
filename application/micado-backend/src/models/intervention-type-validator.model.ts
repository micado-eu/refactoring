import { Entity, model, property } from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'micadoapp', table: 'intervention_type_validator' }
  }
})
export class InterventionTypeValidator extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: { columnName: 'tenant_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  tenantId: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 2,
    postgresql: { columnName: 'intervention_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  interventionTypeId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<InterventionTypeValidator>) {
    super(data);
  }
}

export interface InterventionTypeValidatorRelations {
  // describe navigational properties here
}

export type InterventionTypeValidatorWithRelations = InterventionTypeValidator & InterventionTypeValidatorRelations;
