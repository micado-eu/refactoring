import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PictureHotspot,
  PictureHotspotTranslationProd,
} from '../models';
import {PictureHotspotRepository} from '../repositories';

export class PictureHotspotPictureHotspotTranslationProdController {
  constructor(
    @repository(PictureHotspotRepository) protected pictureHotspotRepository: PictureHotspotRepository,
  ) { }

  @get('/picture-hotspots/{id}/picture-hotspot-translation-prods', {
    responses: {
      '200': {
        description: 'Array of PictureHotspot has many PictureHotspotTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PictureHotspotTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PictureHotspotTranslationProd>,
  ): Promise<PictureHotspotTranslationProd[]> {
    return this.pictureHotspotRepository.translations_prod(id).find(filter);
  }

  @post('/picture-hotspots/{id}/picture-hotspot-translation-prods', {
    responses: {
      '200': {
        description: 'PictureHotspot model instance',
        content: {'application/json': {schema: getModelSchemaRef(PictureHotspotTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PictureHotspot.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspotTranslationProd, {
            title: 'NewPictureHotspotTranslationProdInPictureHotspot',
            //exclude: ['phtId'],
            optional: ['phtId']
          }),
        },
      },
    }) pictureHotspotTranslationProd: Omit<PictureHotspotTranslationProd, 'phtId'>,
  ): Promise<PictureHotspotTranslationProd> {
    return this.pictureHotspotRepository.translations_prod(id).create(pictureHotspotTranslationProd);
  }

  @patch('/picture-hotspots/{id}/picture-hotspot-translation-prods', {
    responses: {
      '200': {
        description: 'PictureHotspot.PictureHotspotTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspotTranslationProd, {partial: true}),
        },
      },
    })
    pictureHotspotTranslationProd: Partial<PictureHotspotTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(PictureHotspotTranslationProd)) where?: Where<PictureHotspotTranslationProd>,
  ): Promise<Count> {
    return this.pictureHotspotRepository.translations_prod(id).patch(pictureHotspotTranslationProd, where);
  }

  @del('/picture-hotspots/{id}/picture-hotspot-translation-prods', {
    responses: {
      '200': {
        description: 'PictureHotspot.PictureHotspotTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PictureHotspotTranslationProd)) where?: Where<PictureHotspotTranslationProd>,
  ): Promise<Count> {
    return this.pictureHotspotRepository.translations_prod(id).delete(where);
  }
}
