import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FeaturesFlags, FeaturesFlagsRelations, FeaturesFlagsTranslation, FeaturesFlagsTranslationProd} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {FeaturesFlagsTranslationRepository} from './features-flags-translation.repository';
import {FeaturesFlagsTranslationProdRepository} from './features-flags-translation-prod.repository';

export class FeaturesFlagsRepository extends DefaultCrudRepository<
  FeaturesFlags,
  typeof FeaturesFlags.prototype.id,
  FeaturesFlagsRelations
> {

  public readonly translations: HasManyRepositoryFactory<FeaturesFlagsTranslation, typeof FeaturesFlags.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<FeaturesFlagsTranslationProd, typeof FeaturesFlags.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('FeaturesFlagsTranslationRepository') protected featuresFlagsTranslationRepositoryGetter: Getter<FeaturesFlagsTranslationRepository>, @repository.getter('FeaturesFlagsTranslationProdRepository') protected featuresFlagsTranslationProdRepositoryGetter: Getter<FeaturesFlagsTranslationProdRepository>,
  ) {
    super(FeaturesFlags, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', featuresFlagsTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', featuresFlagsTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
