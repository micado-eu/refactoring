import {DefaultCrudRepository} from '@loopback/repository';
import {StepLinkTranslationProd, StepLinkTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StepLinkTranslationProdRepository extends DefaultCrudRepository<
  StepLinkTranslationProd,
  typeof StepLinkTranslationProd.prototype.lang,
  StepLinkTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(StepLinkTranslationProd, dataSource);
  }
}
