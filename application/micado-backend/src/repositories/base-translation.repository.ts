import {DefaultCrudRepository, Entity} from '@loopback/repository';

export abstract class BaseTranslationRepository<
  E extends Entity,
  IdType,
  Relations extends object
  > extends DefaultCrudRepository<E, IdType, Relations> {

  getIdColumnName(): string {
    return 'id';
  }

  getBaseModelIdColumnName(): string {
    return 'id';
  }

  getTranslatableColumnNames(): Array<string> {
    const tableName = this.getTableName();
    return [tableName.replace(/\_translation$/, "")];
  }

  public getTableName(): string {
    return (<any>(this.modelClass)).settings.postgresql.table;
  }

  public getProdModelTableName(): string {
    const transTableName = this.getTableName();
    return transTableName + '_prod';
  }

  public getBaseModelTableName(): string {
    const transTableName = this.getTableName();
    return transTableName.substring(0, transTableName.lastIndexOf("_translation"));
  }

  public getProdModelName(): string {
    const translationModelName = (<any>this.modelClass).definition.name;
    const translationProdModelName = translationModelName + 'Prod';
    return translationProdModelName;
  }

  public getProdModelModuleName(): string {
    const translationProdModelName = this.getProdModelName();
    const prodModelModuleName = translationProdModelName.replace(/[A-Z]/g, m => '-' + m.toLowerCase()).substring(1);
    return prodModelModuleName;
  }

  public async getBaseLanguageTranslatables(language: string): Promise<any> {
    const q = 'SELECT "' + this.getIdColumnName() + '" as "id", "lang", ' + this.getTranslatableColumnNames().map(c => `"${c}"`).join(',') + ', "translationState" FROM ' + this.getTableName() + ' t1 WHERE "lang"=$1 AND (SELECT COUNT(*) from ' + this.getTableName() + ' WHERE "' + this.getIdColumnName() + '"=t1.' + this.getIdColumnName() + ' AND "translationState" in (1,2)) > 0;';
    const results = await this.dataSource.execute(q, [language]);

    for (let i = 0; i < results.length; i++) {
      const strings: any = {};
      this.getTranslatableColumnNames().forEach((columnName) => {
        strings[columnName] = results[i][columnName];
        delete results[i][columnName];
      });
      results[i]['strings'] = strings;
    }

    return results;
  }

  getLinkedTable(): {tableName: string, idColumn: string, foreignKey: string} | null {
    return null;
  }

  public getTranslatableLanguages(): any {
    const q = 'SELECT DISTINCT "lang" FROM ' + this.getTableName() + ' t1 WHERE (SELECT COUNT(*) from ' + this.getTableName() + ' WHERE "' + this.getIdColumnName() + '"=t1.' + this.getIdColumnName() + ' AND "translationState" in (1,2)) > 0;';
    return this.dataSource.execute(q);
  }

  /**
   * Update strings in the translating state to translated if they are non empty and changed.
   * @param baseLanguage: The base language.
   * @param translations: dictionary of {"1": {en: "house", nl: "huis"}}
   */
  public async updateToTranslated(baseLanguage: string, translations: {[id: string]: {[language: string]: {[columnName: string]: string}}}) {
    const columnsAssign = this.getTranslatableColumnNames();
    for (let i = 0; i < columnsAssign.length; i++) {
      columnsAssign[i] = columnsAssign[i] + '=' + '$' + (i + 1).toString();
    }

    const columnsUpdated = this.getTranslatableColumnNames();
    for (let i = 0; i < columnsUpdated.length; i++) {
      columnsUpdated[i] = '(t1.' + columnsUpdated[i] + ' != $' + (i + 1).toString() + ' OR t1.' + columnsUpdated[i] + ' ISNULL)';
    }


    let q = `
    UPDATE ` + this.getTableName() + ` AS t1
    SET ` + columnsAssign.join(', ') + `,
    "translationState" = 3
    WHERE "translationState" = 2
    AND "lang" = $` + (columnsAssign.length + 1).toString() + `
    AND "` + this.getIdColumnName() + `" = $` + (columnsAssign.length + 2).toString() + `
    AND ` + columnsUpdated.join(' AND ') + `;
    `;

    for (const id in translations) {
      for (const language in translations[id]) {
        const args: Array<any> = [];
        this.getTranslatableColumnNames().forEach((columnName) => {
          if (!translations[id][language].hasOwnProperty(columnName)) {
            return;
          }

          let text = translations[id][language][columnName];
          if (text === null) {
            return;
          }

          text = text.trim();
          if (text.length === 0) {
            return;
          }

          args.push(text);
        });

        if (args.length !== this.getTranslatableColumnNames().length) {
          // Some columns are empty or null. So we don't update this.
          continue;
        }

        args.push(language);
        args.push(id);
        await this.dataSource.execute(q, args);
      }
    }

    // Since the base language will never be updated above to the 'translated' state (because it never changes compared to the old value)
    // we update them here if all their siblings are translated.
    q = 'UPDATE ' + this.getTableName() + ' AS t1 SET "translationState" = 3 WHERE "translationState" = 2 AND "lang" = $1 AND (SELECT COUNT(*) from ' + this.getTableName() + ' WHERE "' + this.getIdColumnName() + '"=t1.' + this.getIdColumnName() + ' AND "translationState" != 2) > 1;';
    await this.dataSource.execute(q, [baseLanguage]);
  }

  protected async getUpdateToProductionQuery(): Promise<string> {
    const prodModelModuleName = this.getProdModelModuleName();

    const prodTranslationModelModule = await import('../models/' + prodModelModuleName + '.model');

    const prodTranslationModelFields = Object.keys(prodTranslationModelModule[this.getProdModelName()].definition.properties).map(
      (key: string) => prodTranslationModelModule[this.getProdModelName()].definition.properties[key].postgresql.columnName
    );
    const valuesPlaceholder = prodTranslationModelFields.map((f: any, id: number) => '$' + (id + 1).toString());
    const updateFieldValues = [];
    for (let i = 0; i < prodTranslationModelFields.length; i++) {
      updateFieldValues.push('"' + prodTranslationModelFields[i] + '" = ' + valuesPlaceholder[i]);
    }


    const linkedTable = this.getLinkedTable();
    let q = '';
    if (linkedTable === null) {
      q = `
    INSERT INTO ` + this.getProdModelTableName() + `(` + prodTranslationModelFields.map((f: any) => {return '"' + f + '"';}).join(',') + `)
      SELECT DISTINCT` + prodTranslationModelFields.map((f: any) => {return '"' + f + '"';}).join(',') + `
      FROM ` + this.getTableName() + ` t1
      WHERE t1."translationState" = 3 AND t1."` + this.getIdColumnName() + `"
      IN (SELECT t2."` + this.getBaseModelIdColumnName() + `" FROM ` + this.getBaseModelTableName() + ` t2 WHERE t2.published=TRUE)
    ON CONFLICT ("` + this.getIdColumnName() + `", "lang") DO UPDATE SET ` + prodTranslationModelFields.map((f: any) => {return '"' + f + '"=EXCLUDED."' + f + '"';}).join(',') + `
  `;
    } else {
      q = `
      INSERT INTO ` + this.getProdModelTableName() + `(` + prodTranslationModelFields.map((f: any) => {return '"' + f + '"';}).join(',') + `)
        SELECT DISTINCT ` + prodTranslationModelFields.map((f: any) => {return 't1."' + f + '"';}).join(',') + `
        FROM ` + this.getTableName() + ` t1, ` + linkedTable.tableName + ` t2
        WHERE t1."translationState" = 3 AND t2."published" = TRUE AND t2."` + linkedTable.idColumn + `" = (SELECT "` + linkedTable.foreignKey + `" FROM ` + this.getBaseModelTableName() + ` WHERE "` + this.getBaseModelIdColumnName() + `" = t1."` + this.getIdColumnName() + `")
      ON CONFLICT ("` + this.getIdColumnName() + `", "lang") DO UPDATE SET ` + prodTranslationModelFields.map((f: any) => {return '"' + f + '"=EXCLUDED."' + f + '"';}).join(',') + `
    `;
    }

    return q;
  }

  /**
 * Update all translation strings to the production table (if they are published).
 */
  public async updateToProduction() {
    const q = await this.getUpdateToProductionQuery();
    await this.dataSource.execute(q);
  }

  /**
   * Update strings in the translatable state to translating.
   * @param translatables: Array of [{translationState: 1, id: 1}, ...]
   */
  public async updateToTranlating(translatables: [{translationState: number, id: number}]) {
    const ids = translatables.filter((t: any) => (t.translationState === 1)).map((t: any) => t.id);

    if (ids.length === 0) {
      return;
    }

    const q = 'UPDATE ' + this.getTableName() + ' SET "translationState" = 2 WHERE "translationState" = 1 AND "' + this.getIdColumnName() + '" in ( ' + ids.map((id, i) => '$' + (i + 1).toString()).join(',') + ' );';
    await this.dataSource.execute(q, ids);
  }
}
