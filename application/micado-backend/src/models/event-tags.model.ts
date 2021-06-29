import { Entity, model, property, hasMany, hasOne } from '@loopback/repository';
import { EventTagTranslation, Event, EventTagsTranslationProd } from '.';


@model({
    settings: { idInjection: false, postgresql: { schema: 'micadoapp', table: 'event_tags' } }
})
export class EventTag extends Entity {
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
        postgresql: { columnName: 'event_id', dataType: 'int2', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    })
    eventId: number;

    @property({
        type: 'boolean',
        postgresql: {columnName: 'published', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
      })
      published?: boolean;

    @hasMany(() => EventTagTranslation, { keyTo: 'id' })
    translations: EventTagTranslation[];

    @hasMany(() => EventTagsTranslationProd, { keyTo: 'id' })
    translations_prod: EventTagsTranslationProd[];


    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // [prop: string]: any;

    constructor(data?: Partial<EventTag>) {
        super(data);
    }
}

export interface EventTagRelations {
    // describe navigational properties here
}

export type EventTagWithRelations = EventTag & EventTagRelations;
