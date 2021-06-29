import {inject} from '@loopback/core';
import {MicadoDsDataSource} from '../datasources';
import {PictureHotspotTranslation, PictureHotspotTranslationRelations} from '../models';
import {BaseTranslationRepository} from './base-translation.repository';

export class PictureHotspotTranslationRepository extends BaseTranslationRepository<
  PictureHotspotTranslation,
  typeof PictureHotspotTranslation.prototype.phtId,
  PictureHotspotTranslationRelations
  > {
  constructor(
    @inject('datasources.micadoDS') dataSource: MicadoDsDataSource,
  ) {
    super(PictureHotspotTranslation, dataSource);
  }

  getIdColumnName(): string {
    return 'pht_id';
  }

  public getTranslatableColumnNames(): Array<string> {
    return ['title', 'message'];
  }


  protected async getUpdateToProductionQuery(): Promise<string> {
    return `
    INSERT INTO ` + this.getProdModelTableName() + `("title", "message", "pht_id", "lang")
      SELECT DISTINCT t1."title", t1."message", t1."pht_id", t1."lang"
      FROM ` + this.getTableName() + ` t1, document_type_picture t2, document_type t3
      WHERE t1."translationState" = 3 AND t3."published" = TRUE AND t3."id" = (SELECT "document_type_id" FROM document_type_picture WHERE "id" = (SELECT "picture_id" FROM picture_hotspot WHERE "id" = t1."pht_id"))
    ON CONFLICT ("` + this.getIdColumnName() + `", "lang") DO UPDATE SET "title"=EXCLUDED."title", "message"=EXCLUDED."message", "pht_id"=EXCLUDED."pht_id", "lang"=EXCLUDED."lang"
  `;
  }
}
