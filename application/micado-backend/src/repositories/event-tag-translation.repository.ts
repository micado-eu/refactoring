import {inject} from '@loopback/core';
import {MicadoDsDataSource} from '../datasources';
import {EventTagTranslation, EventTagTranslationRelations} from '../models';
import {BaseTranslationRepository} from './base-translation.repository';

export class EventTagTranslationRepository extends BaseTranslationRepository<
    EventTagTranslation,
    typeof EventTagTranslation.prototype.id,
    EventTagTranslationRelations
    > {
    constructor(
        @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
    ) {
        super(EventTagTranslation, dataSource);
    }

    getTranslatableColumnNames(): Array<string> {
        return ['tag'];
    }

    public getProdModelName(): string {
        return 'EventTagsTranslationProd';
    }

    public getProdModelModuleName(): string {
        return 'event-tags-translation-prod';
    }

    public getProdModelTableName(): string {
        return 'event_tags_translation';
    }
}
