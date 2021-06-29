import {inject} from '@loopback/core';
import {MicadoDsDataSource} from '../datasources';
import {CommentsTranslation, CommentsTranslationRelations} from '../models';
import {BaseTranslationRepository} from './base-translation.repository';

export class CommentsTranslationRepository extends BaseTranslationRepository<
  CommentsTranslation,
  typeof CommentsTranslation.prototype.lang,
  CommentsTranslationRelations
  > {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(CommentsTranslation, dataSource);
  }

  getTranslatableColumnNames(): Array<string> {
    return ['comment'];
  }

  public getProdModelName(): string {
    return 'CommentTranslationProd'
  }

  public getProdModelModuleName(): string {
    return 'comment-translation-prod';
  }

  public getProdModelTableName(): string {
    return 'comment_translation_prod';
  }
}
