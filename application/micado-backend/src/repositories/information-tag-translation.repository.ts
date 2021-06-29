import { DefaultCrudRepository } from '@loopback/repository';
import { InformationTagTranslation, InformationTagTranslationRelations } from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { BaseTranslationRepository } from './base-translation.repository';

export class InformationTagTranslationRepository extends BaseTranslationRepository<
    InformationTagTranslation,
    typeof InformationTagTranslation.prototype.id,
    InformationTagTranslationRelations
    > {
    constructor(
        @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
    ) {
        super(InformationTagTranslation, dataSource);
    }

    public getTranslatableColumnNames(): Array<string> {
        return ['tag'];
      }
}
