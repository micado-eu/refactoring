import {DefaultCrudRepository} from '@loopback/repository';
import {PictureHotspotTranslationProd, PictureHotspotTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PictureHotspotTranslationProdRepository extends DefaultCrudRepository<
  PictureHotspotTranslationProd,
  typeof PictureHotspotTranslationProd.prototype.phtId,
  PictureHotspotTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(PictureHotspotTranslationProd, dataSource);
  }
}
