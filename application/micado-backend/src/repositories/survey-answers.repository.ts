import {DefaultCrudRepository} from '@loopback/repository';
import {SurveyAnswers, SurveyAnswersRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SurveyAnswersRepository extends DefaultCrudRepository<
  SurveyAnswers,
  typeof SurveyAnswers.prototype.idAnswer,
  SurveyAnswersRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(SurveyAnswers, dataSource);
  }
}
