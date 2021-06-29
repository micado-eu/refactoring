import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InterventionCategory, InterventionCategoryRelations, InterventionCategoryTranslation, InterventionCategoryTranslationProd, InterventionTypes} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InterventionCategoryTranslationRepository} from './intervention-category-translation.repository';
import {InterventionCategoryTranslationProdRepository} from './intervention-category-translation-prod.repository';
import {InterventionTypesRepository} from './intervention-types.repository';

export class InterventionCategoryRepository extends DefaultCrudRepository<
  InterventionCategory,
  typeof InterventionCategory.prototype.id,
  InterventionCategoryRelations
> {

  public readonly translations: HasManyRepositoryFactory<InterventionCategoryTranslation, typeof InterventionCategory.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<InterventionCategoryTranslationProd, typeof InterventionCategory.prototype.id>;

  public readonly linkedInterventionType: HasManyRepositoryFactory<InterventionTypes, typeof InterventionCategory.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('InterventionCategoryTranslationRepository') protected interventionCategoryTranslationRepositoryGetter: Getter<InterventionCategoryTranslationRepository>, @repository.getter('InterventionCategoryTranslationProdRepository') protected interventionCategoryTranslationProdRepositoryGetter: Getter<InterventionCategoryTranslationProdRepository>, @repository.getter('InterventionTypesRepository') protected interventionTypesRepositoryGetter: Getter<InterventionTypesRepository>,
  ) {
    super(InterventionCategory, dataSource);
    this.linkedInterventionType = this.createHasManyRepositoryFactoryFor('linkedInterventionType', interventionTypesRepositoryGetter,);
    this.registerInclusionResolver('linkedInterventionType', this.linkedInterventionType.inclusionResolver);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', interventionCategoryTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', interventionCategoryTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
