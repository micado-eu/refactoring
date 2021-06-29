import { service } from '@loopback/core';
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
import { Information } from '../models';
import { InformationRepository } from '../repositories';

export class InformationController {
  constructor(
    @repository(InformationRepository)
    public informationRepository: InformationRepository
  ) { }

  @post('/information', {
    responses: {
      '200': {
        description: 'Information model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Information) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Information, {
            title: 'NewInformation',
            exclude: ['id'],
          }),
        },
      },
    })
    information: Omit<Information, 'id'>,
  ): Promise<Information> {
    return this.informationRepository.create(information);
  }

  @post('/information/unpublished', {
    responses: {
      '200': {
        description: 'Information model instance (unpublished)',
        content: { 'application/json': { schema: getModelSchemaRef(Information) } },
      },
    },
  })
  async createUnpublished(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Information, {
            title: 'NewUnpublishedInformation',
            exclude: ['id'],
            //optional: ['published']
          }),
        },
      },
    })
    information: Omit<Information, 'id'>,
  ): Promise<Information> {
    //information.published = false
    return this.informationRepository.create(information);
  }

  @get('/information/count', {
    responses: {
      '200': {
        description: 'Information model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(Information) where?: Where<Information>,
  ): Promise<Count> {
    return this.informationRepository.count(where);
  }

  @get('/information', {
    responses: {
      '200': {
        description: 'Array of Information model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Information, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Information) filter?: Filter<Information>,
  ): Promise<Information[]> {
    return this.informationRepository.find(filter);
  }

  /*@get('/information/published', {
    responses: {
      '200': {
        description: 'Array of Published Information model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Information, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findPublished(
    @param.filter(Information) filter?: Filter<Information>,
  ): Promise<Information[]> {
    return this.informationRepository.findPublished(filter);
  }*/

  @patch('/information', {
    responses: {
      '200': {
        description: 'Information PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Information, { partial: true }),
        },
      },
    })
    information: Information,
    @param.where(Information) where?: Where<Information>,
  ): Promise<Count> {
    return this.informationRepository.updateAll(information, where);
  }

  @get('/information/{id}', {
    responses: {
      '200': {
        description: 'Information model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Information, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Information, { exclude: 'where' }) filter?: FilterExcludingWhere<Information>
  ): Promise<Information> {
    return this.informationRepository.findById(id, filter);
  }

  @patch('/information/{id}', {
    responses: {
      '204': {
        description: 'Information PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Information, { partial: true }),
        },
      },
    })
    information: Information,
  ): Promise<void> {
    await this.informationRepository.updateById(id, information);
  }

  @patch('/information/{id}/unpublished', {
    responses: {
      '204': {
        description: 'Information PATCH success (marks information as unpublished in the process)',
      },
    },
  })
  async updateByIdUnpublished(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Information, { partial: true }),
        },
      },
    })
    information: Information,
  ): Promise<void> {
    //information.published = false
    await this.informationRepository.updateById(id, information);
  }

  @put('/information/{id}', {
    responses: {
      '204': {
        description: 'Information PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() information: Information,
  ): Promise<void> {
    await this.informationRepository.replaceById(id, information);
  }

  @del('/information/{id}', {
    responses: {
      '204': {
        description: 'Information DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.informationRepository.deleteById(id);
  }

  @get('/production-information', {
    responses: {
      '200': {
        description: 'Gets published information with topics, user types, and translation (prod)',
      },
    },
  })
  async translatedunion(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.informationRepository.dataSource.execute(`
      select
        *,
        (
        select
          to_jsonb(array_agg(it.id_topic))
        from
          information_topic it
        where
          it.id_information = t.id) as topics,
        (
        select
          to_jsonb(array_agg(iu.id_user_types))
        from
          information_user_types iu
        where
          iu.id_information = t.id) as users
      from
        information t
      inner join information_translation_prod tt on
        t.id = tt.id
        and tt.lang = $2
        and (tt.information = '') is false
      union
      select
        *,
        (
        select
          to_jsonb(array_agg(it.id_topic))
        from
          information_topic it
        where
          it.id_information = t.id) as topics,
        (
        select
          to_jsonb(array_agg(iu.id_user_types))
        from
          information_user_types iu
        where
          iu.id_information = t.id) as users
      from
        information t
      inner join information_translation_prod tt on
        t.id = tt.id
        and tt.lang = $1
        and t.id not in (
        select
          t.id
        from
          information t
        inner join information_translation_prod tt on
          t.id = tt.id
          and tt.lang = $2
          and (tt.information = '') is false)
    `, [defaultlang, currentlang]);

    
  }
  @get('/temp-information', {
    responses: {
      '200': {
        description: 'Gets published information with topics, user types, and translation (temp)',
      },
    },
  })
  async temptranslatedunion(
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<void> {
    return this.informationRepository.dataSource.execute(`
      select
        *,
        (
        select
          to_jsonb(array_agg(it.id_topic))
        from
          information_topic it
        where
          it.id_information = t.id) as topics,
        (
        select
          to_jsonb(array_agg(iu.id_user_types))
        from
          information_user_types iu
        where
          iu.id_information = t.id) as users
      from
        information t
      inner join information_translation tt on
        t.id = tt.id
        and tt.lang = $2
        and (tt.information = '') is false
      union
      select
        *,
        (
        select
          to_jsonb(array_agg(it.id_topic))
        from
          information_topic it
        where
          it.id_information = t.id) as topics,
        (
        select
          to_jsonb(array_agg(iu.id_user_types))
        from
          information_user_types iu
        where
          iu.id_information = t.id) as users
      from
        information t
      inner join information_translation tt on
        t.id = tt.id
        and tt.lang = $1
        and t.id not in (
        select
          t.id
        from
          information t
        inner join information_translation tt on
          t.id = tt.id
          and tt.lang = $2
          and (tt.information = '') is false)
    `, [defaultlang, currentlang]);
  }
}
