import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {IndividualInterventionPlan, IndividualInterventionPlanRelations, IndividualInterventionPlanInterventions} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {IndividualInterventionPlanInterventionsRepository} from './individual-intervention-plan-interventions.repository';

export class IndividualInterventionPlanRepository extends DefaultCrudRepository<
  IndividualInterventionPlan,
  typeof IndividualInterventionPlan.prototype.id,
  IndividualInterventionPlanRelations
> {

  public readonly interventions: HasManyRepositoryFactory<IndividualInterventionPlanInterventions, typeof IndividualInterventionPlan.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('IndividualInterventionPlanInterventionsRepository') protected individualInterventionPlanInterventionsRepositoryGetter: Getter<IndividualInterventionPlanInterventionsRepository>,
  ) {
    super(IndividualInterventionPlan, dataSource);
    this.interventions = this.createHasManyRepositoryFactoryFor('interventions', individualInterventionPlanInterventionsRepositoryGetter,);
    this.registerInclusionResolver('interventions', this.interventions.inclusionResolver);
  }
}
