import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { EventTag, EventTagRelations, EventTagTranslation, EventTagsTranslationProd } from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { EventTagTranslationRepository } from '.';
import { EventTagsTranslationProdRepository } from '.';

export class EventTagRepository extends DefaultCrudRepository<
    EventTag,
    typeof EventTag.prototype.id,
    EventTagRelations
    > {
    public readonly orders: HasManyRepositoryFactory<
        EventTagTranslation,
        typeof EventTag.prototype.id
    >;
    public readonly translations_prod: HasManyRepositoryFactory<
    EventTagsTranslationProd,
    typeof EventTag.prototype.id
    >;

    public readonly translations: HasManyRepositoryFactory<EventTagTranslation, typeof EventTag.prototype.id>;
    constructor(
        @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
        @repository.getter('EventTagTranslationRepository') getEventTagTranslationRepository: Getter<EventTagTranslationRepository>,
        @repository.getter('EventTagTranslationRepository') protected eventTagTranslationRepositoryGetter: Getter<EventTagTranslationRepository>,
        @repository.getter('EventTagsTranslationProdRepository') getEventTagsTranslationProdRepository: Getter<EventTagsTranslationProdRepository>,
        @repository.getter('EventTagsTranslationProdRepository') protected eventTagsTranslationProdRepositoryGetter: Getter<EventTagsTranslationProdRepository>,
    ) {
        super(EventTag, dataSource);
        this.translations = this.createHasManyRepositoryFactoryFor('translations', eventTagTranslationRepositoryGetter);
        this.registerInclusionResolver('translations', this.translations.inclusionResolver);
        this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', eventTagsTranslationProdRepositoryGetter,);
        this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    }
}
