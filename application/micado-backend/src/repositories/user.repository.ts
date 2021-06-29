import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {User, UserRelations, UserAttribute, IndividualInterventionPlan, UmTenant, UserPictures, UserPreferences, UserConsent} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserAttributeRepository} from './user-attribute.repository';
import {IndividualInterventionPlanRepository} from './individual-intervention-plan.repository';
import {UmTenantRepository} from './um-tenant.repository';
import {UserPicturesRepository} from './user-pictures.repository';
import {UserPreferencesRepository} from './user-preferences.repository';
import {UserConsentRepository} from './user-consent.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.umId,
  UserRelations
> {

  public readonly attributes: HasManyRepositoryFactory<UserAttribute, typeof User.prototype.umId>;

  public readonly interventionPlans: HasManyRepositoryFactory<IndividualInterventionPlan, typeof User.prototype.umId>;

  public readonly tenant: HasOneRepositoryFactory<UmTenant, typeof User.prototype.umId>;

  public readonly userPicture: HasOneRepositoryFactory<UserPictures, typeof User.prototype.umId>;

  public readonly userPreferences: HasManyRepositoryFactory<UserPreferences, typeof User.prototype.umId>;

  public readonly userConsent: HasOneRepositoryFactory<UserConsent, typeof User.prototype.umId>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('UserAttributeRepository') protected userAttributeRepositoryGetter: Getter<UserAttributeRepository>, @repository.getter('IndividualInterventionPlanRepository') protected individualInterventionPlanRepositoryGetter: Getter<IndividualInterventionPlanRepository>, @repository.getter('UmTenantRepository') protected tenantRepositoryGetter: Getter<UmTenantRepository>, @repository.getter('UserPicturesRepository') protected userPicturesRepositoryGetter: Getter<UserPicturesRepository>, @repository.getter('UserPreferencesRepository') protected userPreferencesRepositoryGetter: Getter<UserPreferencesRepository>, @repository.getter('UserConsentRepository') protected userConsentRepositoryGetter: Getter<UserConsentRepository>,
  ) {
    super(User, dataSource);
    this.userConsent = this.createHasOneRepositoryFactoryFor('userConsent', userConsentRepositoryGetter);
    this.registerInclusionResolver('userConsent', this.userConsent.inclusionResolver);
    this.userPreferences = this.createHasManyRepositoryFactoryFor('userPreferences', userPreferencesRepositoryGetter,);
    this.registerInclusionResolver('userPreferences', this.userPreferences.inclusionResolver);
    this.userPicture = this.createHasOneRepositoryFactoryFor('userPicture', userPicturesRepositoryGetter);
    this.registerInclusionResolver('userPicture', this.userPicture.inclusionResolver);
    this.tenant = this.createHasOneRepositoryFactoryFor('tenant', tenantRepositoryGetter);
    this.registerInclusionResolver('tenant', this.tenant.inclusionResolver);
    this.interventionPlans = this.createHasManyRepositoryFactoryFor('interventionPlans', individualInterventionPlanRepositoryGetter,);
    this.registerInclusionResolver('interventionPlans', this.interventionPlans.inclusionResolver);
    this.attributes = this.createHasManyRepositoryFactoryFor('attributes', userAttributeRepositoryGetter,);
    this.registerInclusionResolver('attributes', this.attributes.inclusionResolver);
  }
}
