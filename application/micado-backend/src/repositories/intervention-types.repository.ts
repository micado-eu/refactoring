import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {InterventionTypes, InterventionTypesRelations, InterventionTypesTranslation, InterventionTypeValidator, InterventionTypesTranslationProd, IndividualInterventionPlanInterventions} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {InterventionTypesTranslationRepository} from './intervention-types-translation.repository';
import {InterventionTypeValidatorRepository} from './intervention-type-validator.repository';
import {InterventionTypesTranslationProdRepository} from './intervention-types-translation-prod.repository';
import {IndividualInterventionPlanInterventionsRepository} from './individual-intervention-plan-interventions.repository';

export class InterventionTypesRepository extends DefaultCrudRepository<
  InterventionTypes,
  typeof InterventionTypes.prototype.id,
  InterventionTypesRelations
> {

  public readonly translations: HasManyRepositoryFactory<InterventionTypesTranslation, typeof InterventionTypes.prototype.id>;

  public readonly interventionTypeValidators: HasManyRepositoryFactory<InterventionTypeValidator, typeof InterventionTypes.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<InterventionTypesTranslationProd, typeof InterventionTypes.prototype.id>;

  public readonly linkedInterventions: HasManyRepositoryFactory<IndividualInterventionPlanInterventions, typeof InterventionTypes.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('InterventionTypesTranslationRepository') protected interventionTypesTranslationRepositoryGetter: Getter<InterventionTypesTranslationRepository>, @repository.getter('InterventionTypeValidatorRepository') protected interventionTypeValidatorRepositoryGetter: Getter<InterventionTypeValidatorRepository>, @repository.getter('InterventionTypesTranslationProdRepository') protected interventionTypesTranslationProdRepositoryGetter: Getter<InterventionTypesTranslationProdRepository>, @repository.getter('IndividualInterventionPlanInterventionsRepository') protected individualInterventionPlanInterventionsRepositoryGetter: Getter<IndividualInterventionPlanInterventionsRepository>,
  ) {
    super(InterventionTypes, dataSource);
    this.linkedInterventions = this.createHasManyRepositoryFactoryFor('linkedInterventions', individualInterventionPlanInterventionsRepositoryGetter,);
    this.registerInclusionResolver('linkedInterventions', this.linkedInterventions.inclusionResolver);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', interventionTypesTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.interventionTypeValidators = this.createHasManyRepositoryFactoryFor('interventionTypeValidators', interventionTypeValidatorRepositoryGetter,);
    this.registerInclusionResolver('interventionTypeValidators', this.interventionTypeValidators.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', interventionTypesTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
