import {DefaultCrudRepository} from '@loopback/repository';
import {CommentTranslationProd, CommentTranslationProdRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CommentTranslationProdRepository extends DefaultCrudRepository<
  CommentTranslationProd,
  typeof CommentTranslationProd.prototype.lang,
  CommentTranslationProdRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(CommentTranslationProd, dataSource);
  }
}
