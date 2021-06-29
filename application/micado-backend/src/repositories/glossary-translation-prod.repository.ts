import {DefaultCrudRepository} from '@loopback/repository';
import {GlossaryTranslationProd, GlossaryTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GlossaryTranslationProdRepository extends DefaultCrudRepository<
  GlossaryTranslationProd,
  typeof GlossaryTranslationProd.prototype.id,
  GlossaryTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(GlossaryTranslationProd, dataSource);
  }
}
