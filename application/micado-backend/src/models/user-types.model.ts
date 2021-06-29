import { Entity, model, property, hasMany } from '@loopback/repository';
import { UserTypesTranslation } from './user-types-translation.model';
import {UserTypesTranslationProd} from './user-types-translation-prod.model';
import {ProcessUsers} from './process-users.model';

@model({
  settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'user_types' } }
})
export class UserTypes extends Entity {
  @property({
    type: 'number',
    required: false,
    scale: 0,
    id: 1,
    generated: true,
    postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id: number;

  @property({
    type: 'string',
    //   postgresql: { columnName: 'icon', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  icon?: string;

  @property({
    type: 'boolean',
    postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  published?: boolean;

  @hasMany(() => UserTypesTranslation, { keyTo: 'id' })
  translations: UserTypesTranslation[];

  @hasMany(() => UserTypesTranslationProd, {keyTo: 'id'})
  translations_prod: UserTypesTranslationProd[];

  @hasMany(() => ProcessUsers, {keyTo: 'idUserTypes'})
  linkedProcess: ProcessUsers[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //  [prop: string]: any;

  constructor(data?: Partial<UserTypes>) {
    super(data);
  }
}

export interface UserTypesRelations {
  // describe navigational properties here
}

export type UserTypesWithRelations = UserTypes & UserTypesRelations;
