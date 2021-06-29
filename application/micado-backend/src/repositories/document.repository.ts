import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Document, DocumentRelations, DocumentPictures, DocumentType} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DocumentPicturesRepository} from './document-pictures.repository';
import {DocumentTypeRepository} from './document-type.repository';

export class DocumentRepository extends DefaultCrudRepository<
  Document,
  typeof Document.prototype.id,
  DocumentRelations
> {

  public readonly pictures: HasManyRepositoryFactory<DocumentPictures, typeof Document.prototype.id>;

  public readonly documentType: HasOneRepositoryFactory<DocumentType, typeof Document.prototype.id>;

  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource, @repository.getter('DocumentPicturesRepository') protected documentPicturesRepositoryGetter: Getter<DocumentPicturesRepository>, @repository.getter('DocumentTypeRepository') protected documentTypeRepositoryGetter: Getter<DocumentTypeRepository>,
  ) {
    super(Document, dataSource);
    this.documentType = this.createHasOneRepositoryFactoryFor('documentType', documentTypeRepositoryGetter);
    this.registerInclusionResolver('documentType', this.documentType.inclusionResolver);
    this.pictures = this.createHasManyRepositoryFactoryFor('pictures', documentPicturesRepositoryGetter,);
    this.registerInclusionResolver('pictures', this.pictures.inclusionResolver);
  }
}
