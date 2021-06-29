import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { InformationCategory, InformationCategoryRelations, InformationCategoryTranslation, InformationCategoryTranslationProd} from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { InformationCategoryTranslationRepository } from '.';
import {InformationCategoryTranslationProdRepository} from './information-category-translation-prod.repository';

export class InformationCategoryRepository extends DefaultCrudRepository<
  InformationCategory,
  typeof InformationCategory.prototype.id,
  InformationCategoryRelations
  > {
  public readonly orders: HasManyRepositoryFactory<
    InformationCategoryTranslation,
    typeof InformationCategory.prototype.id
  >;

  public readonly translations: HasManyRepositoryFactory<InformationCategoryTranslation, typeof InformationCategory.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<InformationCategoryTranslationProd, typeof InformationCategory.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
    @repository.getter('InformationCategoryTranslationRepository') getInformationCategoryTranslationRepository: Getter<InformationCategoryTranslationRepository>,
    @repository.getter('InformationCategoryTranslationRepository') protected informationCategoryTranslationRepositoryGetter: Getter<InformationCategoryTranslationRepository>, @repository.getter('InformationCategoryTranslationProdRepository') protected informationCategoryTranslationProdRepositoryGetter: Getter<InformationCategoryTranslationProdRepository>,
  ) {
    super(InformationCategory, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', informationCategoryTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', informationCategoryTranslationRepositoryGetter);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
