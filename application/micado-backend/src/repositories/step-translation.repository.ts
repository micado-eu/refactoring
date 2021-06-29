import {inject} from '@loopback/core';
import {MicadoDsDataSource} from '../datasources';
import {StepTranslation, StepTranslationRelations} from '../models';
import {BaseTranslationRepository} from './base-translation.repository';

export class StepTranslationRepository extends BaseTranslationRepository<
  StepTranslation,
  typeof StepTranslation.prototype.id,
  StepTranslationRelations
  > {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(StepTranslation, dataSource);
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['step', 'description'];
  }

  public getLinkedTable(): {tableName: string, idColumn: string, foreignKey: string} | null {
    return {
      tableName: 'process',
      idColumn: 'id',
      foreignKey: 'id_process'
    };
  }
}
