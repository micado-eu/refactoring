import { DefaultCrudRepository, repository, HasManyRepositoryFactory, Filter } from '@loopback/repository';
import { Glossary, GlossaryRelations, GlossaryTranslation, GlossaryTranslationProd} from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { GlossaryTranslationRepository } from './glossary-translation.repository';
import {GlossaryTranslationProdRepository} from './glossary-translation-prod.repository';

export class GlossaryRepository extends DefaultCrudRepository<
  Glossary,
  typeof Glossary.prototype.id,
  GlossaryRelations
  > {

  public readonly translations: HasManyRepositoryFactory<GlossaryTranslation, typeof Glossary.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<GlossaryTranslationProd, typeof Glossary.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('GlossaryTranslationRepository') protected glossaryTranslationRepositoryGetter: Getter<GlossaryTranslationRepository>, @repository.getter('GlossaryTranslationProdRepository') protected glossaryTranslationProdRepositoryGetter: Getter<GlossaryTranslationProdRepository>,
  ) {
    super(Glossary, dataSource);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', glossaryTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', glossaryTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }

  /*async findPublished(filter?: Filter<Glossary>) {
    let combinedFilters = { where: { published: true } }
    if (filter) {
      combinedFilters = { ...filter, ...combinedFilters }
    }
    return await this.find(combinedFilters)
  }*/
}
