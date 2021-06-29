import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {IndividualInterventionPlanInterventions, IndividualInterventionPlanInterventionsRelations, IndividualInterventionPlan, CompletedInterventionDocument} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {IndividualInterventionPlanRepository} from './individual-intervention-plan.repository';
import {CompletedInterventionDocumentRepository} from './completed-intervention-document.repository';

export class IndividualInterventionPlanInterventionsRepository extends DefaultCrudRepository<
  IndividualInterventionPlanInterventions,
  typeof IndividualInterventionPlanInterventions.prototype.id,
  IndividualInterventionPlanInterventionsRelations
> {

  public readonly interventionPlan: HasOneRepositoryFactory<IndividualInterventionPlan, typeof IndividualInterventionPlanInterventions.prototype.id>;

  public readonly document: HasOneRepositoryFactory<CompletedInterventionDocument, typeof IndividualInterventionPlanInterventions.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('IndividualInterventionPlanRepository') protected individualInterventionPlanRepositoryGetter: Getter<IndividualInterventionPlanRepository>, @repository.getter('CompletedInterventionDocumentRepository') protected completedInterventionDocumentRepositoryGetter: Getter<CompletedInterventionDocumentRepository>,
  ) {
    super(IndividualInterventionPlanInterventions, dataSource);
    this.document = this.createHasOneRepositoryFactoryFor('document', completedInterventionDocumentRepositoryGetter);
    this.registerInclusionResolver('document', this.document.inclusionResolver);
    this.interventionPlan = this.createHasOneRepositoryFactoryFor('interventionPlan', individualInterventionPlanRepositoryGetter);
    this.registerInclusionResolver('interventionPlan', this.interventionPlan.inclusionResolver);
  }
}
