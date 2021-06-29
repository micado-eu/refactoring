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
import { threadId } from 'worker_threads';
import {Document} from '../models';
import {DocumentRepository} from '../repositories';

export class DocumentController {
  constructor(
    @repository(DocumentRepository)
    public documentRepository : DocumentRepository,
  ) {}

  @post('/documents', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {'application/json': {schema: getModelSchemaRef(Document)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {
            title: 'NewDocument',
            exclude: ['id'],
          }),
        },
      },
    })
    document: Omit<Document, 'id'>,
  ): Promise<Document> {
    return this.documentRepository.create(document);
  }

  @get('/documents/count', {
    responses: {
      '200': {
        description: 'Document model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.count(where);
  }

  @get('/documents', {
    responses: {
      '200': {
        description: 'Array of Document model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Document, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Document) filter?: Filter<Document>,
  ): Promise<Document[]> {
    let documents:any
    await this.documentRepository.find(filter).then((promise_return)=>{
      documents = promise_return
    })
    documents.forEach((doc:any) => {
      if(doc.pictures){
        doc.pictures.forEach((picture:any) => {
          this.decipher(picture)
        });
      }
      
    });
    return documents

  }

  @patch('/documents', {
    responses: {
      '200': {
        description: 'Document PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Document,
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.updateAll(document, where);
  }

  @get('/documents/{id}', {
    responses: {
      '200': {
        description: 'Document model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Document, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Document, {exclude: 'where'}) filter?: FilterExcludingWhere<Document>
  ): Promise<Document> {
    let document:any
     await this.documentRepository.findById(id, filter).then((promise_return)=>{
      document = promise_return
    })
    document.pictures.forEach((picture:any) => {
      this.decipher(picture)
    });
    return document
    
   
  }

  @patch('/documents/{id}', {
    responses: {
      '204': {
        description: 'Document PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Document,
  ): Promise<void> {
    await this.documentRepository.updateById(id, document);
  }

  @put('/documents/{id}', {
    responses: {
      '204': {
        description: 'Document PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() document: Document,
  ): Promise<void> {
    await this.documentRepository.replaceById(id, document);
  }

  @del('/documents/{id}', {
    responses: {
      '204': {
        description: 'Document DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.documentRepository.deleteById(id);
  }

  decipher(picture:any){
    const crypto = require('crypto');
    const algorithm = process.env.ALGORITHM;
    const password = process.env.ALGORITHM_PASSWORD;
    const key = crypto.scryptSync(password, process.env.SALT, Number(process.env.KEY_LENGTH));
    const iv = Buffer.alloc(Number(process.env.BUFFER_0), Number(process.env.BUFFER_1));
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(picture.picture, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    picture.picture = decrypted    
    return picture
  }
}
