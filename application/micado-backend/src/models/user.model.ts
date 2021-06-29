import { Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {UserAttribute} from './user-attribute.model';
import {IndividualInterventionPlan} from './individual-intervention-plan.model';
import {UmTenant} from './um-tenant.model';
import {UserPictures} from './user-pictures.model';
import {UserPreferences} from './user-preferences.model';
import {UserConsent} from './user-consent.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'wso2_shared', table: 'um_user' } }
})
export class User extends Entity {
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
    postgresql: { columnName: 'um_user_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umUserName?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: { columnName: 'um_user_password', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umUserPassword?: string;

  @property({
    type: 'string',
    length: 31,
    postgresql: { columnName: 'um_salt_value', dataType: 'character varying', dataLength: 31, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umSaltValue?: string;

  @property({
    type: 'boolean',
    postgresql: { columnName: 'um_require_change', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umRequireChange?: boolean;

  @property({
    type: 'date',
    postgresql: { columnName: 'um_changed_time', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  umChangedTime?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: { columnName: 'um_tenant_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  umTenantId?: number;

  @hasMany(() => UserAttribute, {keyTo: 'umUserId'})
  attributes: UserAttribute[];

  @hasMany(() => IndividualInterventionPlan)
  interventionPlans: IndividualInterventionPlan[];

  @hasOne(() => UmTenant, {keyTo: 'umId', keyFrom: 'umTenantId'})
  tenant: UmTenant;

  @hasOne(() => UserPictures, {keyTo: 'userId'})
  userPicture: UserPictures;

  @hasMany(() => UserPreferences, {keyTo: 'idUser'})
  userPreferences: UserPreferences[];

  @hasOne(() => UserConsent, {keyTo: 'idUser'})
  userConsent: UserConsent;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 // [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
