import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PictureHotspot, PictureHotspotRelations, PictureHotspotTranslation, PictureHotspotTranslationProd} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PictureHotspotTranslationRepository} from './picture-hotspot-translation.repository';
import {PictureHotspotTranslationProdRepository} from './picture-hotspot-translation-prod.repository';

export class PictureHotspotRepository extends DefaultCrudRepository<
  PictureHotspot,
  typeof PictureHotspot.prototype.id,
  PictureHotspotRelations
> {

  public readonly translations: HasManyRepositoryFactory<PictureHotspotTranslation, typeof PictureHotspot.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<PictureHotspotTranslationProd, typeof PictureHotspot.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('PictureHotspotTranslationRepository') protected pictureHotspotTranslationRepositoryGetter: Getter<PictureHotspotTranslationRepository>, @repository.getter('PictureHotspotTranslationProdRepository') protected pictureHotspotTranslationProdRepositoryGetter: Getter<PictureHotspotTranslationProdRepository>,
  ) {
    super(PictureHotspot, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', pictureHotspotTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', pictureHotspotTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
