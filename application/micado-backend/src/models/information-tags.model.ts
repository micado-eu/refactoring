import { Entity, model, property, hasMany, hasOne } from '@loopback/repository';
import { InformationTagTranslation, Information, InformationTagsTranslationProd } from '.';


@model({
    settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'information_tags' } }
})
export class InformationTag extends Entity {
    @property({
        type: 'number',
        required: false,
        scale: 0,
        id: true,
        generated: true,
        //postgresql: { columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    })
    id: number;

    @property({
        type: 'number',
        required: false,
        scale: 0,
        postgresql: { columnName: 'information_id', dataType: 'int2', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    })
    informationId: number;

    @property({
        type: 'boolean',
        postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
      })
      published?: boolean;

    @hasMany(() => InformationTagTranslation, { keyTo: 'id' })
    translations: InformationTagTranslation[];

    @hasMany(() => InformationTagsTranslationProd, { keyTo: 'id' })
    translations_prod: InformationTagsTranslationProd[];


    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // [prop: string]: any;

    constructor(data?: Partial<InformationTag>) {
        super(data);
    }
}

export interface InformationTagRelations {
    // describe navigational properties here
}

export type InformationTagWithRelations = InformationTag & InformationTagRelations;
