import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DocumentTypePicture, DocumentTypePictureRelations, PictureHotspot} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PictureHotspotRepository} from './picture-hotspot.repository';

export class DocumentTypePictureRepository extends DefaultCrudRepository<
  DocumentTypePicture,
  typeof DocumentTypePicture.prototype.id,
  DocumentTypePictureRelations
> {

  public readonly hotspots: HasManyRepositoryFactory<PictureHotspot, typeof DocumentTypePicture.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('PictureHotspotRepository') protected pictureHotspotRepositoryGetter: Getter<PictureHotspotRepository>,
  ) {
    super(DocumentTypePicture, dataSource);
    this.hotspots = this.createHasManyRepositoryFactoryFor('hotspots', pictureHotspotRepositoryGetter,);
    this.registerInclusionResolver('hotspots', this.hotspots.inclusionResolver);
  }
}
