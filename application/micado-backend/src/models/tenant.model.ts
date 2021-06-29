import { Entity, model, property, hasOne } from '@loopback/repository';
import { UmTenant } from './um-tenant.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'tenant' } }
})
export class Tenant extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;

  @property({
    type: 'string',
    length: 50,
    postgresql: { columnName: 'name', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  name?: string;

  @property({
    type: 'string',
    length: 70,
    postgresql: { columnName: 'link', dataType: 'character varying', dataLength: 70, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  link?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: { columnName: 'email', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  email?: string;

  @property({
    type: 'string',
    length: 100,
    postgresql: { columnName: 'address', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  address?: string;

  @hasOne(() => UmTenant, { keyTo: 'umId' })
  tenantData: UmTenant;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //[prop: string]: any;

  constructor(data?: Partial<Tenant>) {
    super(data);
  }
}

export interface TenantRelations {
  // describe navigational properties here
}

export type TenantWithRelations = Tenant & TenantRelations;
