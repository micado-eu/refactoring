import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DocumentType, DocumentTypeRelations, DocumentTypeTranslation, DocumentTypePicture, DocumentTypeTranslationProd, ProcessProducedDocuments, DocumentTypeValidator, StepDocument} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DocumentTypeTranslationRepository} from './document-type-translation.repository';
import {DocumentTypePictureRepository} from './document-type-picture.repository';
import {DocumentTypeTranslationProdRepository} from './document-type-translation-prod.repository';
import {ProcessProducedDocumentsRepository} from './process-produced-documents.repository';
import {DocumentTypeValidatorRepository} from './document-type-validator.repository';
import {StepDocumentRepository} from './step-document.repository';

export class DocumentTypeRepository extends DefaultCrudRepository<
  DocumentType,
  typeof DocumentType.prototype.id,
  DocumentTypeRelations
> {

  public readonly translations: HasManyRepositoryFactory<DocumentTypeTranslation, typeof DocumentType.prototype.id>;

  public readonly pictures: HasManyRepositoryFactory<DocumentTypePicture, typeof DocumentType.prototype.id>;

  public readonly translations_prod: HasManyRepositoryFactory<DocumentTypeTranslationProd, typeof DocumentType.prototype.id>;

  public readonly generatedBy: HasManyRepositoryFactory<ProcessProducedDocuments, typeof DocumentType.prototype.id>;

  public readonly validators: HasManyRepositoryFactory<DocumentTypeValidator, typeof DocumentType.prototype.id>;

  public readonly linkedProcess: HasManyRepositoryFactory<ProcessProducedDocuments, typeof DocumentType.prototype.id>;

  public readonly linkedStep: HasManyRepositoryFactory<StepDocument, typeof DocumentType.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('DocumentTypeTranslationRepository') protected documentTypeTranslationRepositoryGetter: Getter<DocumentTypeTranslationRepository>, @repository.getter('DocumentTypePictureRepository') protected documentTypePictureRepositoryGetter: Getter<DocumentTypePictureRepository>, @repository.getter('DocumentTypeTranslationProdRepository') protected documentTypeTranslationProdRepositoryGetter: Getter<DocumentTypeTranslationProdRepository>, @repository.getter('ProcessProducedDocumentsRepository') protected processProducedDocumentsRepositoryGetter: Getter<ProcessProducedDocumentsRepository>, @repository.getter('DocumentTypeValidatorRepository') protected documentTypeValidatorRepositoryGetter: Getter<DocumentTypeValidatorRepository>, @repository.getter('StepDocumentRepository') protected stepDocumentRepositoryGetter: Getter<StepDocumentRepository>,
  ) {
    super(DocumentType, dataSource);
    this.linkedStep = this.createHasManyRepositoryFactoryFor('linkedStep', stepDocumentRepositoryGetter,);
    this.registerInclusionResolver('linkedStep', this.linkedStep.inclusionResolver);
    this.linkedProcess = this.createHasManyRepositoryFactoryFor('linkedProcess', processProducedDocumentsRepositoryGetter,);
    this.registerInclusionResolver('linkedProcess', this.linkedProcess.inclusionResolver);
    this.validators = this.createHasManyRepositoryFactoryFor('validators', documentTypeValidatorRepositoryGetter,);
    this.registerInclusionResolver('validators', this.validators.inclusionResolver);
    this.generatedBy = this.createHasManyRepositoryFactoryFor('generatedBy', processProducedDocumentsRepositoryGetter,);
    this.registerInclusionResolver('generatedBy', this.generatedBy.inclusionResolver);
    this.translations_prod = this.createHasManyRepositoryFactoryFor('translations_prod', documentTypeTranslationProdRepositoryGetter,);
    this.registerInclusionResolver('translations_prod', this.translations_prod.inclusionResolver);
    this.pictures = this.createHasManyRepositoryFactoryFor('pictures', documentTypePictureRepositoryGetter,);
    this.registerInclusionResolver('pictures', this.pictures.inclusionResolver);
    this.translations = this.createHasManyRepositoryFactoryFor('translations', documentTypeTranslationRepositoryGetter,);
    this.registerInclusionResolver('translations', this.translations.inclusionResolver);
  }
}
