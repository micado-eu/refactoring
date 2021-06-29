import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Comments, CommentsRelations, CommentsTranslation, CommentTranslationProd, Tenant} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CommentsTranslationRepository} from './comments-translation.repository';
import {CommentTranslationProdRepository} from './comment-translation-prod.repository';
import {TenantRepository} from './tenant.repository';

export class CommentsRepository extends DefaultCrudRepository<
  Comments,
  typeof Comments.prototype.id,
  CommentsRelations
> {

  public readonly translations: HasManyRepositoryFactory<CommentsTranslation, typeof Comments.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<CommentTranslationProd, typeof Comments.prototype.id>;

  public readonly tenant: HasOneRepositoryFactory<Tenant, typeof Comments.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('CommentsTranslationRepository') protected commentsTranslationRepositoryGetter: Getter<CommentsTranslationRepository>, @repository.getter('CommentTranslationProdRepository') protected commentTranslationProdRepositoryGetter: Getter<CommentTranslationProdRepository>, @repository.getter('TenantRepository') protected tenantRepositoryGetter: Getter<TenantRepository>,
  ) {
    super(Comments, dataSource);
    this.tenant = this.createHasOneRepositoryFactoryFor('tenant', tenantRepositoryGetter);
    this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', commentTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', commentsTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
