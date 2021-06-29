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
  DocumentTypePicture,
  PictureHotspot,
} from '../models';
import {DocumentTypePictureRepository} from '../repositories';

export class DocumentTypePicturePictureHotspotController {
  constructor(
    @repository(DocumentTypePictureRepository) protected documentTypePictureRepository: DocumentTypePictureRepository,
  ) { }

  @get('/document-type-pictures/{id}/picture-hotspots', {
    responses: {
      '200': {
        description: 'Array of DocumentTypePicture has many PictureHotspot',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PictureHotspot)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PictureHotspot>,
  ): Promise<PictureHotspot[]> {
    return this.documentTypePictureRepository.hotspots(id).find(filter);
  }

  @post('/document-type-pictures/{id}/picture-hotspots', {
    responses: {
      '200': {
        description: 'DocumentTypePicture model instance',
        content: {'application/json': {schema: getModelSchemaRef(PictureHotspot)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DocumentTypePicture.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspot, {
            title: 'NewPictureHotspotInDocumentTypePicture',
            exclude: ['id'],
            optional: ['pictureId']
          }),
        },
      },
    }) pictureHotspot: Omit<PictureHotspot, 'id'>,
  ): Promise<PictureHotspot> {
    return this.documentTypePictureRepository.hotspots(id).create(pictureHotspot);
  }

  @patch('/document-type-pictures/{id}/picture-hotspots', {
    responses: {
      '200': {
        description: 'DocumentTypePicture.PictureHotspot PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspot, {partial: true}),
        },
      },
    })
    pictureHotspot: Partial<PictureHotspot>,
    @param.query.object('where', getWhereSchemaFor(PictureHotspot)) where?: Where<PictureHotspot>,
  ): Promise<Count> {
    return this.documentTypePictureRepository.hotspots(id).patch(pictureHotspot, where);
  }

  @del('/document-type-pictures/{id}/picture-hotspots', {
    responses: {
      '200': {
        description: 'DocumentTypePicture.PictureHotspot DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PictureHotspot)) where?: Where<PictureHotspot>,
  ): Promise<Count> {
    return this.documentTypePictureRepository.hotspots(id).delete(where);
  }
}
