import {DefaultCrudRepository} from '@loopback/repository';
import {StepTranslationProd, StepTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StepTranslationProdRepository extends DefaultCrudRepository<
  StepTranslationProd,
  typeof StepTranslationProd.prototype.lang,
  StepTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(StepTranslationProd, dataSource);
  }
}
