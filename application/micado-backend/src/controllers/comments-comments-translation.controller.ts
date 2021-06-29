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
  Comments,
  CommentsTranslation,
} from '../models';
import {CommentsRepository} from '../repositories';

export class CommentsCommentsTranslationController {
  constructor(
    @repository(CommentsRepository) protected commentsRepository: CommentsRepository,
  ) { }

  @get('/comments/{id}/comments-translations', {
    responses: {
      '200': {
        description: 'Array of Comments has many CommentsTranslation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CommentsTranslation)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CommentsTranslation>,
  ): Promise<CommentsTranslation[]> {
    return this.commentsRepository.translations(id).find(filter);
  }

  @post('/comments/{id}/comments-translations', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {'application/json': {schema: getModelSchemaRef(CommentsTranslation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comments.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentsTranslation, {
            title: 'NewCommentsTranslationInComments',
            //exclude: ['lang'],
            optional: ['id']
          }),
        },
      },
    }) commentsTranslation: CommentsTranslation,
  ): Promise<CommentsTranslation> {
    return this.commentsRepository.translations(id).create(commentsTranslation);
  }

  @patch('/comments/{id}/comments-translations', {
    responses: {
      '200': {
        description: 'Comments.CommentsTranslation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentsTranslation, {partial: true}),
        },
      },
    })
    commentsTranslation: Partial<CommentsTranslation>,
    @param.query.object('where', getWhereSchemaFor(CommentsTranslation)) where?: Where<CommentsTranslation>,
  ): Promise<Count> {
    return this.commentsRepository.translations(id).patch(commentsTranslation, where);
  }

  @del('/comments/{id}/comments-translations', {
    responses: {
      '200': {
        description: 'Comments.CommentsTranslation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CommentsTranslation)) where?: Where<CommentsTranslation>,
  ): Promise<Count> {
    return this.commentsRepository.translations(id).delete(where);
  }
}
