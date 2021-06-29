import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { InformationTag, InformationTagRelations, InformationTagTranslation, InformationTagsTranslationProd } from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { InformationTagTranslationRepository } from '.';
import { InformationTagsTranslationProdRepository } from '.';

export class InformationTagRepository extends DefaultCrudRepository<
    InformationTag,
    typeof InformationTag.prototype.id,
    InformationTagRelations
    > {
    public readonly orders: HasManyRepositoryFactory<
        InformationTagTranslation,
        typeof InformationTag.prototype.id
    >;
    public readonly translations_prod: HasManyRepositoryFactory<
    InformationTagsTranslationProd,
    typeof InformationTag.prototype.id
    >;

    public readonly translations: HasManyRepositoryFactory<InformationTagTranslation, typeof InformationTag.prototype.id>;
    constructor(
        @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
        @repository.getter('InformationTagTranslationRepository') getInformationTagTranslationRepository: Getter<InformationTagTranslationRepository>,
        @repository.getter('InformationTagTranslationRepository') protected informationTagTranslationRepositoryGetter: Getter<InformationTagTranslationRepository>,
        @repository.getter('InformationTagsTranslationProdRepository') getInformationTagsTranslationProdRepository: Getter<InformationTagsTranslationProdRepository>,
        @repository.getter('InformationTagsTranslationProdRepository') protected informationTagsTranslationProdRepositoryGetter: Getter<InformationTagsTranslationProdRepository>,
    ) {
        super(InformationTag, dataSource);
        this.translations = this.createHasManyRepositoryFactoryFor('translations', informationTagTranslationRepositoryGetter);
        this.registerInclusionResolver('translations', this.translations.inclusionResolver);
        this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', informationTagsTranslationProdRepositoryGetter,);
        this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    }
}
