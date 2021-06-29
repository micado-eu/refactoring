import {DefaultCrudRepository} from '@loopback/repository';
import {InformationTranslationProd, InformationTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InformationTranslationProdRepository extends DefaultCrudRepository<
  InformationTranslationProd,
  typeof InformationTranslationProd.prototype.id,
  InformationTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(InformationTranslationProd, dataSource);
  }
}
