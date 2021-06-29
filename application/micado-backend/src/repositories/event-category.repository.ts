import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { EventCategory, EventCategoryRelations, EventCategoryTranslation, EventCategoryTranslationProd} from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { EventCategoryTranslationRepository } from '.';
import {EventCategoryTranslationProdRepository} from './event-category-translation-prod.repository';

export class EventCategoryRepository extends DefaultCrudRepository<
  EventCategory,
  typeof EventCategory.prototype.id,
  EventCategoryRelations
  > {
  public readonly orders: HasManyRepositoryFactory<
    EventCategoryTranslation,
    typeof EventCategory.prototype.id
  >;

  public readonly translations: HasManyRepositoryFactory<EventCategoryTranslation, typeof EventCategory.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<EventCategoryTranslationProd, typeof EventCategory.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
    @repository.getter('EventCategoryTranslationRepository') getEventCategoryTranslationRepository: Getter<EventCategoryTranslationRepository>,
    @repository.getter('EventCategoryTranslationRepository') protected eventCategoryTranslationRepositoryGetter: Getter<EventCategoryTranslationRepository>, @repository.getter('EventCategoryTranslationProdRepository') protected eventCategoryTranslationProdRepositoryGetter: Getter<EventCategoryTranslationProdRepository>,
  ) {
    super(EventCategory, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', eventCategoryTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', eventCategoryTranslationRepositoryGetter);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
