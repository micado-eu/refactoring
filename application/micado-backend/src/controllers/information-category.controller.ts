import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {InformationCategory} from '../models';
import {InformationCategoryRepository} from '../repositories';

export class InformationCategoryController {
  constructor(
    @repository(InformationCategoryRepository)
    public informationCategoryRepository : InformationCategoryRepository,
  ) {}

  @post('/information-categories', {
    responses: {
      '200': {
        description: 'InformationCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(InformationCategory)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategory, {
            title: 'NewInformationCategory',
            exclude: ['id'],
          }),
        },
      },
    })
    informationCategory: Omit<InformationCategory, 'id'>,
  ): Promise<InformationCategory> {
    return this.informationCategoryRepository.create(informationCategory);
  }

  @get('/information-categories/count', {
    responses: {
      '200': {
        description: 'InformationCategory model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(InformationCategory) where?: Where<InformationCategory>,
  ): Promise<Count> {
    return this.informationCategoryRepository.count(where);
  }

  @get('/information-categories', {
    responses: {
      '200': {
        description: 'Array of InformationCategory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InformationCategory, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(InformationCategory) filter?: Filter<InformationCategory>,
  ): Promise<InformationCategory[]> {
    return this.informationCategoryRepository.find(filter);
  }

  @patch('/information-categories', {
    responses: {
      '200': {
        description: 'InformationCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategory, {partial: true}),
        },
      },
    })
    informationCategory: InformationCategory,
    @param.where(InformationCategory) where?: Where<InformationCategory>,
  ): Promise<Count> {
    return this.informationCategoryRepository.updateAll(informationCategory, where);
  }

  @get('/information-categories/{id}', {
    responses: {
      '200': {
        description: 'InformationCategory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InformationCategory, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InformationCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<InformationCategory>
  ): Promise<InformationCategory> {
    return this.informationCategoryRepository.findById(id, filter);
  }

  @patch('/information-categories/{id}', {
    responses: {
      '204': {
        description: 'InformationCategory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InformationCategory, {partial: true}),
        },
      },
    })
    informationCategory: InformationCategory,
  ): Promise<void> {
    await this.informationCategoryRepository.updateById(id, informationCategory);
  }

  @put('/information-categories/{id}', {
    responses: {
      '204': {
        description: 'InformationCategory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() informationCategory: InformationCategory,
  ): Promise<void> {
    await this.informationCategoryRepository.replaceById(id, informationCategory);
  }

  @del('/information-categories/{id}', {
    responses: {
      '204': {
        description: 'InformationCategory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.informationCategoryRepository.deleteById(id);
  }
  
  @get('/temp-information-categories', {
    responses: {
      '200': {
        description: 'Gets published information category entries with translation (temp)',
      },
    },
  })
  async temptranslatedunion(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.informationCategoryRepository.dataSource.execute(`
    select
      *
    from
      information_category t
    inner join information_category_translation tt on
      t.id = tt.id
      and tt.lang = $2
    union
    select
      *
    from
    information_category t
    inner join information_category_translation tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
      information_category t
      inner join information_category_translation tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang]);
  }

  @get('/temp-information-category', {
    responses: {
      '200': {
        description: 'Gets published information category with translation (temp)',
      },
    },
  })
  async temptranslatedunionsingle(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en',
    @param.query.string('id') id = -1
  ): Promise<void> {
    return this.informationCategoryRepository.dataSource.execute(`
    select
      *
    from
      information_category t
    inner join information_category_translation tt on
      t.id = tt.id
      and tt.lang = $2
    where
      t.id = ${id}
    union
    select
      *
    from
      information_category t
    inner join information_category_translation tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
        information_category t
      inner join information_category_translation tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang]);


  }
  @get('/production-information-categories', {
    responses: {
      '200': {
        description: 'Gets published information category entries with translation (prod)',
      },
    },
  })
  async translatedunion(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.informationCategoryRepository.dataSource.execute(`
    select
      *
    from
      information_category t
    inner join information_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2
    union
    select
      *
    from
    information_category t
    inner join information_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
      information_category t
      inner join information_category_translation_prod tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang]);
  }

  @get('/production-information-category', {
    responses: {
      '200': {
        description: 'Gets published information category with translation (prod)',
      },
    },
  })
  async translatedunionsingle(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en',
    @param.query.string('id') id = -1
  ): Promise<void> {
    return this.informationCategoryRepository.dataSource.execute(`
    select
      *
    from
      information_category t
    inner join information_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2
    where
      t.id = ${id}
    union
    select
      *
    from
      information_category t
    inner join information_category_translation_prod tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
        information_category t
      inner join information_category_translation_prod tt on
        t.id = tt.id
        and tt.lang = $2)
    `, [defaultlang, currentlang]);
  }
}
