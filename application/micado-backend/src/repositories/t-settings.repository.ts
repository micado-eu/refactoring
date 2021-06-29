import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TSettings, TSettingsRelations, TSettingsTranslation, TSettingsTranslationProd} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TSettingsTranslationRepository} from './t-settings-translation.repository';
import {TSettingsTranslationProdRepository} from './t-settings-translation-prod.repository';

export class TSettingsRepository extends DefaultCrudRepository<
  TSettings,
  typeof TSettings.prototype.id,
  TSettingsRelations
> {

  public readonly translations: HasManyRepositoryFactory<TSettingsTranslation, typeof TSettings.prototype.id>;

  public readonly translationProd: HasManyRepositoryFactory<TSettingsTranslationProd, typeof TSettings.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('TSettingsTranslationRepository') protected tSettingsTranslationRepositoryGetter: Getter<TSettingsTranslationRepository>, @repository.getter('TSettingsTranslationProdRepository') protected tSettingsTranslationProdRepositoryGetter: Getter<TSettingsTranslationProdRepository>,
  ) {
    super(TSettings, dataSource);
    this.translationProd = this.createHasManyRepositoryFactoryFor('translationProd', tSettingsTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translationProd', this.translationProd.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', tSettingsTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
