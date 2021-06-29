import { DefaultCrudRepository } from '@loopback/repository';
import { Languages, LanguagesRelations } from '../models';
import { MicadoDsDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class LanguagesRepository extends DefaultCrudRepository<
  Languages,
  typeof Languages.prototype.lang,
  LanguagesRelations
  > {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(Languages, dataSource);
  }

  async findActive(): Promise<(Languages & LanguagesRelations)[]> {
    let activeLanguages = await this.find({ where: { active: true } })
    return activeLanguages
  }
}
