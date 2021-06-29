import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {StepLink, StepLinkRelations, StepLinkTranslation, StepLinkTranslationProd} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StepLinkTranslationRepository} from './step-link-translation.repository';
import {StepLinkTranslationProdRepository} from './step-link-translation-prod.repository';

export class StepLinkRepository extends DefaultCrudRepository<
  StepLink,
  typeof StepLink.prototype.id,
  StepLinkRelations
> {

  public readonly translations: HasManyRepositoryFactory<StepLinkTranslation, typeof StepLink.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<StepLinkTranslationProd, typeof StepLink.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('StepLinkTranslationRepository') protected stepLinkTranslationRepositoryGetter: Getter<StepLinkTranslationRepository>, @repository.getter('StepLinkTranslationProdRepository') protected stepLinkTranslationProdRepositoryGetter: Getter<StepLinkTranslationProdRepository>,
  ) {
    super(StepLink, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', stepLinkTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', stepLinkTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
