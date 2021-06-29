import {DefaultCrudRepository} from '@loopback/repository';
import {DocumentPictures, DocumentPicturesRelations} from '../models';
import {MicadoDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DocumentPicturesRepository extends DefaultCrudRepository<
  DocumentPictures,
  typeof DocumentPictures.prototype.id,
  DocumentPicturesRelations
> {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(DocumentPictures, dataSource);
  }
}
