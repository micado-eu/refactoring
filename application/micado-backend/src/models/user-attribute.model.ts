import { Entity, model, property } from '@loopback/repository';

@model({
  settings: { idInjection: false, postgresql: { schema: 'wso2_shared', table: 'um_user_attribute' } }
})
export class UserAttribute extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: true,
    postgresql: { columnName: 'um_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  umId?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: { columnName: 'um_attr_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umAttrName?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: { columnName: 'um_attr_value', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umAttrValue?: string;

  @property({
    type: 'string',
    length: 31,
    postgresql: { columnName: 'um_profile_id', dataType: 'character varying', dataLength: 31, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umProfileId?: string;

  @property({
    type: 'number',
    postgresql: { columnName: 'um_user_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umUserId?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: { columnName: 'um_tenant_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  umTenantId?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 // [prop: string]: any;

  constructor(data?: Partial<UserAttribute>) {
    super(data);
  }
}

export interface UserAttributeRelations {
  // describe navigational properties here
}

export type UserAttributeWithRelations = UserAttribute & UserAttributeRelations;
