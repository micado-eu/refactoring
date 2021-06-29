import {inject} from '@loopback/core';
import {MicadoDsDataSource} from '../datasources';
import {StepLinkTranslation, StepLinkTranslationRelations} from '../models';
import {BaseTranslationRepository} from './base-translation.repository';

export class StepLinkTranslationRepository extends BaseTranslationRepository<
  StepLinkTranslation,
  typeof StepLinkTranslation.prototype.id,
  StepLinkTranslationRelations
  > {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(StepLinkTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['description'];
  }

  public getLinkedTable(): {tableName: string, idColumn: string, foreignKey: string} | null {
    return {
      tableName: 'process',
      idColumn: 'id',
      foreignKey: 'id_process'
    };
  }
}
