import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'step_document' } }
})
export class StepDocument extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
    postgresql: { columnName: 'id_step', dataType: 'uuid', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
  })
  idStep: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: { columnName: 'id_document', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  idDocument: number;

  @property({
    type: 'boolean',
    required: true,
    jsonSchema: { nullable: true },
    postgresql: { columnName: 'is_out', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  isOut: boolean;

  @property({
    type: 'number',
    //   postgresql: { columnName: 'cost', dataType: 'money', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  cost?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<StepDocument>) {
    super(data);
  }
}

export interface StepDocumentRelations {
  // describe navigational properties here
}

export type StepDocumentWithRelations = StepDocument & StepDocumentRelations;
