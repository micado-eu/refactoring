import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Survey, SurveyRelations, SurveyAnswers} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SurveyAnswersRepository} from './survey-answers.repository';

export class SurveyRepository extends DefaultCrudRepository<
  Survey,
  typeof Survey.prototype.id,
  SurveyRelations
> {

  public readonly answers: HasManyRepositoryFactory<SurveyAnswers, typeof Survey.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('SurveyAnswersRepository') protected surveyAnswersRepositoryGetter: Getter<SurveyAnswersRepository>,
  ) {
    super(Survey, dataSource);
    this.answers = this.createHasManyRepositoryFactoryFor('answers', surveyAnswersRepositoryGetter,);
    this.registerInclusionResolver('answers', this.answers.inclusionResolver);
  }
}
