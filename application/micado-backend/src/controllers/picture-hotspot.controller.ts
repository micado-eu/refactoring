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
import {PictureHotspot} from '../models';
import {PictureHotspotRepository} from '../repositories';

export class PictureHotspotController {
  constructor(
    @repository(PictureHotspotRepository)
    public pictureHotspotRepository : PictureHotspotRepository,
  ) {}

  @post('/picture-hotspots', {
    responses: {
      '200': {
        description: 'PictureHotspot model instance',
        content: {'application/json': {schema: getModelSchemaRef(PictureHotspot)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspot, {
            title: 'NewPictureHotspot',
            exclude: ['id'],
          }),
        },
      },
    })
    pictureHotspot: Omit<PictureHotspot, 'id'>,
  ): Promise<PictureHotspot> {
    return this.pictureHotspotRepository.create(pictureHotspot);
  }

  @get('/picture-hotspots/count', {
    responses: {
      '200': {
        description: 'PictureHotspot model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PictureHotspot) where?: Where<PictureHotspot>,
  ): Promise<Count> {
    return this.pictureHotspotRepository.count(where);
  }

  @get('/picture-hotspots', {
    responses: {
      '200': {
        description: 'Array of PictureHotspot model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PictureHotspot, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PictureHotspot) filter?: Filter<PictureHotspot>,
  ): Promise<PictureHotspot[]> {
    return this.pictureHotspotRepository.find(filter);
  }

  @patch('/picture-hotspots', {
    responses: {
      '200': {
        description: 'PictureHotspot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspot, {partial: true}),
        },
      },
    })
    pictureHotspot: PictureHotspot,
    @param.where(PictureHotspot) where?: Where<PictureHotspot>,
  ): Promise<Count> {
    return this.pictureHotspotRepository.updateAll(pictureHotspot, where);
  }

  @get('/picture-hotspots/{id}', {
    responses: {
      '200': {
        description: 'PictureHotspot model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PictureHotspot, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PictureHotspot, {exclude: 'where'}) filter?: FilterExcludingWhere<PictureHotspot>
  ): Promise<PictureHotspot> {
    return this.pictureHotspotRepository.findById(id, filter);
  }

  @patch('/picture-hotspots/{id}', {
    responses: {
      '204': {
        description: 'PictureHotspot PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspot, {partial: true}),
        },
      },
    })
    pictureHotspot: PictureHotspot,
  ): Promise<void> {
    await this.pictureHotspotRepository.updateById(id, pictureHotspot);
  }

  @put('/picture-hotspots/{id}', {
    responses: {
      '204': {
        description: 'PictureHotspot PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pictureHotspot: PictureHotspot,
  ): Promise<void> {
    await this.pictureHotspotRepository.replaceById(id, pictureHotspot);
  }

  @del('/picture-hotspots/{id}', {
    responses: {
      '204': {
        description: 'PictureHotspot DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pictureHotspotRepository.deleteById(id);
  }

 
}
