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
  Document,
  DocumentPictures
} from '../models';
import {DocumentRepository} from '../repositories';

export class DocumentDocumentPicturesController {
  constructor(
    @repository(DocumentRepository) protected documentRepository: DocumentRepository,
  ) { }

  @get('/documents/{id}/document-pictures', {
    responses: {
      '200': {
        description: 'Array of Document has many DocumentPictures',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DocumentPictures)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DocumentPictures>,
  ): Promise<DocumentPictures[]> {
    return this.documentRepository.pictures(id).find(filter);
  }

  @post('/documents/{id}/document-pictures', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(DocumentPictures)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Document.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentPictures, {
            title: 'NewDocumentPicturesInDocument',
            exclude: ['id'],
            optional: ['docId']
          }),
        },
      },
    }) documentPictures: Omit<DocumentPictures, 'id'>,
  ): Promise<DocumentPictures> {
    this.encrypt(documentPictures)
    return this.documentRepository.pictures(id).create(documentPictures);
   
  }

  @patch('/documents/{id}/document-pictures', {
    responses: {
      '200': {
        description: 'Document.DocumentPictures PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DocumentPictures, {partial: true}),
        },
      },
    })
    documentPictures: Partial<DocumentPictures>,
    @param.query.object('where', getWhereSchemaFor(DocumentPictures)) where?: Where<DocumentPictures>,
  ): Promise<Count> {
    this.encrypt(documentPictures)
    return this.documentRepository.pictures(id).patch(documentPictures, where);
  }

  @del('/documents/{id}/document-pictures', {
    responses: {
      '200': {
        description: 'Document.DocumentPictures DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DocumentPictures)) where?: Where<DocumentPictures>,
  ): Promise<Count> {
    return this.documentRepository.pictures(id).delete(where);
  }

  encrypt (docPicture: any) {
    const crypto = require('crypto');
    const algorithm = process.env.ALGORITHM;
    const password = process.env.ALGORITHM_PASSWORD;
    // First, we'll generate the key. The key length is dependent on the algorithm.
    const key = crypto.scryptSync(password, process.env.SALT, Number(process.env.KEY_LENGTH)) 
    const iv = Buffer.alloc(Number(process.env.BUFFER_0), Number(process.env.BUFFER_1));
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(docPicture.picture, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log(encrypted);
    docPicture.picture=encrypted
    return docPicture
  }
}
