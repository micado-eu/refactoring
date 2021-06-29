import { DefaultCrudRepository, HasManyRepositoryFactory, repository, Filter } from '@loopback/repository';
import { Information, InformationRelations, InformationTranslation, InformationTranslationProd, InformationTopic, InformationUserTypes} from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { InformationTranslationRepository } from '.';
import {InformationTranslationProdRepository} from './information-translation-prod.repository';
import { InformationTopicRepository } from './information-topic.repository';
import { InformationUserTypesRepository } from './information-user-types.repository';

export class InformationRepository extends DefaultCrudRepository<
  Information,
  typeof Information.prototype.id,
  InformationRelations
  > {
  public readonly ordersTranslations: HasManyRepositoryFactory<
    InformationTranslation,
    typeof Information.prototype.id
  >;

  public readonly translations: HasManyRepositoryFactory<InformationTranslation, typeof Information.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<InformationTranslationProd, typeof Information.prototype.id>;

  public readonly informationTopics: HasManyRepositoryFactory<InformationTopic, typeof Information.prototype.id>;

  public readonly informationUserTypes: HasManyRepositoryFactory<InformationUserTypes, typeof Information.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
    @repository.getter('InformationTranslationRepository') protected informationTranslationRepositoryGetter: Getter<InformationTranslationRepository>,
    @repository.getter('InformationTranslationProdRepository') protected informationTranslationProdRepositoryGetter: Getter<InformationTranslationProdRepository>,
    @repository.getter('InformationTopicRepository') protected informationTopicRepositoryGetter: Getter<InformationTopicRepository>,
    @repository.getter('InformationUserTypesRepository') protected informationUserTypesRepositoryGetter: Getter<InformationUserTypesRepository>
  ) {
    super(Information, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', informationTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', informationTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
    this.informationTopics = this.createHasManyRepositoryFactoryFor('informationTopics', informationTopicRepositoryGetter,);
    this.registerInclusionResolver('informationTopics', this.informationTopics.inclusionResolver);
    this.informationUserTypes = this.createHasManyRepositoryFactoryFor('informationUserTypes', informationUserTypesRepositoryGetter,);
    this.registerInclusionResolver('informationUserTypes', this.informationUserTypes.inclusionResolver);
  }

  /*async findPublished(filter?: Filter<Information>) {
    let combinedFilters = { where: { published: true } }
    if (filter) {
      combinedFilters = { ...filter, ...combinedFilters }
    }
    return await this.find(combinedFilters)
  }*/
}
