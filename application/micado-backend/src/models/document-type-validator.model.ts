import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'micadoapp', table: 'document_type_validator'}
  }
})
export class DocumentTypeValidator extends Entity {
  @property({
    type: 'number',
    required: true,
    id:true,
    scale: 0,
    postgresql: {columnName: 'document_type_id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  documentTypeId: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'validable_by_tenant', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  validableByTenant?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<DocumentTypeValidator>) {
    super(data);
  }
}

export interface DocumentTypeValidatorRelations {
  // describe navigational properties here
}

export type DocumentTypeValidatorWithRelations = DocumentTypeValidator & DocumentTypeValidatorRelations;
