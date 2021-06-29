import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Step, StepRelations, StepTranslation, StepDocument, StepTranslationProd, MixedIcons} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {StepTranslationRepository} from './step-translation.repository';
import {StepDocumentRepository} from './step-document.repository';
import {StepTranslationProdRepository} from './step-translation-prod.repository';
import {MixedIconsRepository} from './mixed-icons.repository';

export class StepRepository extends DefaultCrudRepository<
  Step,
  typeof Step.prototype.id,
  StepRelations
> {

  public readonly translations: HasManyRepositoryFactory<StepTranslation, typeof Step.prototype.id>;

  public readonly documents: HasManyRepositoryFactory<StepDocument, typeof Step.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<StepTranslationProd, typeof Step.prototype.id>;

  public readonly icon: HasOneRepositoryFactory<MixedIcons, typeof Step.prototype.stepIcon>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('StepTranslationRepository') protected stepTranslationRepositoryGetter: Getter<StepTranslationRepository>, @repository.getter('StepDocumentRepository') protected stepDocumentRepositoryGetter: Getter<StepDocumentRepository>, @repository.getter('StepTranslationProdRepository') protected stepTranslationProdRepositoryGetter: Getter<StepTranslationProdRepository>, @repository.getter('MixedIconsRepository') protected mixedIconsRepositoryGetter: Getter<MixedIconsRepository>,
  ) {
    super(Step, dataSource);
    this.icon = this.createHasOneRepositoryFactoryFor('icon', mixedIconsRepositoryGetter);
    this.registerInclusionResolver('icon', this.icon.inclusionResolver);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', stepTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.documents = this.createHasManyRepositoryFactoryFor('documents', stepDocumentRepositoryGetter,);
    this.registerInclusionResolver('documents', this.documents.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', stepTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
