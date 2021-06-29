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
  CommentTranslationProd,
} from '../models';
import {CommentsRepository} from '../repositories';

export class CommentsCommentTranslationProdController {
  constructor(
    @repository(CommentsRepository) protected commentsRepository: CommentsRepository,
  ) { }

  @get('/comments/{id}/comment-translation-prods', {
    responses: {
      '200': {
        description: 'Array of Comments has many CommentTranslationProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CommentTranslationProd)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<CommentTranslationProd>,
  ): Promise<CommentTranslationProd[]> {
    return this.commentsRepository.translations_prod(id).find(filter);
  }

  @post('/comments/{id}/comment-translation-prods', {
    responses: {
      '200': {
        description: 'Comments model instance',
        content: {'application/json': {schema: getModelSchemaRef(CommentTranslationProd)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comments.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentTranslationProd, {
            title: 'NewCommentTranslationProdInComments',
            //exclude: ['lang'],
            optional: ['id']
          }),
        },
      },
    }) commentTranslationProd: Omit<CommentTranslationProd, 'lang'>,
  ): Promise<CommentTranslationProd> {
    return this.commentsRepository.translations_prod(id).create(commentTranslationProd);
  }

  @patch('/comments/{id}/comment-translation-prods', {
    responses: {
      '200': {
        description: 'Comments.CommentTranslationProd PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CommentTranslationProd, {partial: true}),
        },
      },
    })
    commentTranslationProd: Partial<CommentTranslationProd>,
    @param.query.object('where', getWhereSchemaFor(CommentTranslationProd)) where?: Where<CommentTranslationProd>,
  ): Promise<Count> {
    return this.commentsRepository.translations_prod(id).patch(commentTranslationProd, where);
  }

  @del('/comments/{id}/comment-translation-prods', {
    responses: {
      '200': {
        description: 'Comments.CommentTranslationProd DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(CommentTranslationProd)) where?: Where<CommentTranslationProd>,
  ): Promise<Count> {
    return this.commentsRepository.translations_prod(id).delete(where);
  }
}
