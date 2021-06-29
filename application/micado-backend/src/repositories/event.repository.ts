import { DefaultCrudRepository, HasManyRepositoryFactory, repository, Filter } from '@loopback/repository';
import { Event, EventRelations, EventTranslation, EventTranslationProd, EventTopic, EventUserTypes} from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { EventTranslationRepository } from '.';
import {EventTranslationProdRepository} from './event-translation-prod.repository';
import { EventTopicRepository } from './event-topic.repository';
import { EventUserTypesRepository } from './event-user-types.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
  > {
  public readonly ordersTranslations: HasManyRepositoryFactory<
    EventTranslation,
    typeof Event.prototype.id
  >;

  public readonly translations: HasManyRepositoryFactory<EventTranslation, typeof Event.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<EventTranslationProd, typeof Event.prototype.id>;

  public readonly eventTopics: HasManyRepositoryFactory<EventTopic, typeof Event.prototype.id>;

  public readonly eventUserTypes: HasManyRepositoryFactory<EventUserTypes, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
    @repository.getter('EventTranslationRepository') getEventTranslationRepository: Getter<EventTranslationRepository>,
    @repository.getter('EventTranslationRepository') protected eventTranslationRepositoryGetter: Getter<EventTranslationRepository>,
    @repository.getter('EventTranslationProdRepository') protected eventTranslationProdRepositoryGetter: Getter<EventTranslationProdRepository>,
    @repository.getter('EventTopicRepository') protected eventTopicRepositoryGetter: Getter<EventTopicRepository>,
    @repository.getter('EventUserTypesRepository') protected eventUserTypesRepositoryGetter: Getter<EventUserTypesRepository>
  ) {
    super(Event, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', eventTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', eventTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
    this.eventTopics = this.createHasManyRepositoryFactoryFor('eventTopics', eventTopicRepositoryGetter,);
    this.registerInclusionResolver('eventTopics', this.eventTopics.inclusionResolver);
    this.eventUserTypes = this.createHasManyRepositoryFactoryFor('eventUserTypes', eventUserTypesRepositoryGetter,);
    this.registerInclusionResolver('eventUserTypes', this.eventUserTypes.inclusionResolver);
  }

 /* async findPublished(filter?: Filter<Event>) {
    let combinedFilters = { where: { published: true } }
    if (filter) {
      combinedFilters = { ...filter, ...combinedFilters }
    }
    return await this.find(combinedFilters)
  }*/
}
