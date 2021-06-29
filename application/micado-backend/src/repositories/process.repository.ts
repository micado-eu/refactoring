import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Process, ProcessRelations, ProcessTranslation, ProcessUsers, ProcessTopic, ProcessComments, DocumentType, ProcessTranslationProd, ProcessProducedDocuments} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProcessTranslationRepository} from './process-translation.repository';
import {ProcessUsersRepository} from './process-users.repository';
import {ProcessTopicRepository} from './process-topic.repository';
import {ProcessCommentsRepository} from './process-comments.repository';
import {DocumentTypeRepository} from './document-type.repository';
import {ProcessTranslationProdRepository} from './process-translation-prod.repository';
import {ProcessProducedDocumentsRepository} from './process-produced-documents.repository';

export class ProcessRepository extends DefaultCrudRepository<
  Process,
  typeof Process.prototype.id,
  ProcessRelations
> {

  public readonly translations: HasManyRepositoryFactory<ProcessTranslation, typeof Process.prototype.id>;

  public readonly applicableUsers: HasManyRepositoryFactory<ProcessUsers, typeof Process.prototype.id>;

  public readonly processTopics: HasManyRepositoryFactory<ProcessTopic, typeof Process.prototype.id>;

  public readonly comments: HasManyRepositoryFactory<ProcessComments, typeof Process.prototype.id>;


 // public readonly process_document: BelongsToAccessor<DocumentType, typeof Process.prototype.id>;
  public readonly producedDoc: HasManyRepositoryFactory<ProcessProducedDocuments, typeof Process.prototype.id>;
  public readonly translations_prod: HasManyRepositoryFactory<ProcessTranslationProd, typeof Process.prototype.id>;


  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('ProcessTranslationRepository') protected processTranslationRepositoryGetter: Getter<ProcessTranslationRepository>, @repository.getter('ProcessUsersRepository') protected processUsersRepositoryGetter: Getter<ProcessUsersRepository>, @repository.getter('ProcessTopicRepository') protected processTopicRepositoryGetter: Getter<ProcessTopicRepository>, @repository.getter('ProcessCommentsRepository') protected processCommentsRepositoryGetter: Getter<ProcessCommentsRepository>, @repository.getter('DocumentTypeRepository') protected documentTypeRepositoryGetter: Getter<DocumentTypeRepository>, @repository.getter('ProcessTranslationProdRepository') protected processTranslationProdRepositoryGetter: Getter<ProcessTranslationProdRepository>, @repository.getter('ProcessProducedDocumentsRepository') protected processProducedDocumentsRepositoryGetter: Getter<ProcessProducedDocumentsRepository>,
  ) {
    super(Process, dataSource);
    this.producedDoc = this.createHasManyRepositoryFactoryFor('producedDoc', processProducedDocumentsRepositoryGetter,);
    this.registerInclusionResolver('producedDoc', this.producedDoc.inclusionResolver);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', processTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
   // this.process_document = this.createBelongsToAccessorFor('process_document', documentTypeRepositoryGetter,);
    //this.registerInclusionResolver('process_document', this.process_document.inclusionResolver);
    this.comments = this.createHasManyRepositoryFactoryFor('comments', processCommentsRepositoryGetter,);
    this.registerInclusionResolver('comments', this.comments.inclusionResolver);
    this.processTopics = this.createHasManyRepositoryFactoryFor('processTopics', processTopicRepositoryGetter,);
    this.registerInclusionResolver('processTopics', this.processTopics.inclusionResolver);
    this.applicableUsers = this.createHasManyRepositoryFactoryFor('applicableUsers', processUsersRepositoryGetter,);
    this.registerInclusionResolver('applicableUsers', this.applicableUsers.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', processTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
