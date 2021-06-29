import {bind, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {existsSync, mkdirSync, promises as fsAsync, readdirSync, readFileSync, unlinkSync} from 'fs';
import simpleGit, {SimpleGit} from 'simple-git';
import {CommentsTranslationRepository, DocumentTypeTranslationRepository, EventCategoryTranslationRepository, EventTagTranslationRepository, EventTranslationRepository, GlossaryTranslationRepository, InformationCategoryTranslationRepository, InformationTagTranslationRepository, InformationTranslationRepository, InterventionCategoryTranslationRepository, InterventionTypesTranslationRepository, PictureHotspotTranslationRepository, ProcessTranslationRepository, StepLinkTranslationRepository, StepTranslationRepository, TopicTranslationRepository, UserTypesTranslationRepository, LanguagesRepository} from '../repositories';
import { Languages } from '../models';
import {
  WeblateService
} from '../services/weblate.service'
import { inject } from '@loopback/context';

// Should come from a config file or the database.
const MICADO_GIT_URL = process.env.MICADO_GIT_URL ?? '';
const MICADO_TRANSLATIONS_DIR = process.env.MICADO_TRANSLATIONS_DIR ?? '/tmp/translations';
const MICADO_WEBLATE_PROJECT = process.env.MICADO_WEBLATE_PROJECT ?? '';
const TRANSLATION_HOSTNAME = process.env.TRANSLATION_HOSTNAME ?? '';
const MICADO_WEBLATE_KEY = process.env.MICADO_WEBLATE_KEY ?? '';

@bind({scope: BindingScope.SINGLETON})
export class TranslationService {
  private componentRepos: {[componentName: string]: any}; // Any now but should be an interface that all repos inherit from.
  private gitInitialized: boolean;
  private git: SimpleGit;
  private sourceLanguage: string;

  constructor(
    @repository(CommentsTranslationRepository) protected commentsTranslationRepository: CommentsTranslationRepository,
    @repository(DocumentTypeTranslationRepository) protected documentTypeTranslationRepository: DocumentTypeTranslationRepository,
    @repository(EventCategoryTranslationRepository) protected eventCategoryTranslationRepository: EventCategoryTranslationRepository,
    @repository(EventTagTranslationRepository) protected eventTagTranslationRepository: EventTagTranslationRepository,
    @repository(EventTranslationRepository) protected eventTranslationRepository: EventTranslationRepository,
    @repository(GlossaryTranslationRepository) protected glossaryTranslationRepository: GlossaryTranslationRepository,
    @repository(InformationCategoryTranslationRepository) protected informationCategoryTranslationRepository: InformationCategoryTranslationRepository,
    @repository(InformationTagTranslationRepository) protected informationTagTranslationRepository: InformationTagTranslationRepository,
    @repository(InformationTranslationRepository) protected informationTranslationRepository: InformationTranslationRepository,
    @repository(InterventionCategoryTranslationRepository) protected interventionCategoryTranslationRepository: InterventionCategoryTranslationRepository,
    @repository(InterventionTypesTranslationRepository) protected interventionTypesTranslationRepository: InterventionTypesTranslationRepository,
    @repository(PictureHotspotTranslationRepository) protected pictureHotspotTranslationRepository: PictureHotspotTranslationRepository,
    @repository(ProcessTranslationRepository) protected processTranslationRepository: ProcessTranslationRepository,
    @repository(StepLinkTranslationRepository) protected stepLinkTranslationRepository: StepLinkTranslationRepository,
    @repository(StepTranslationRepository) protected stepTranslationRepository: StepTranslationRepository,
    @repository(TopicTranslationRepository) protected topicTranslationRepository: TopicTranslationRepository,
    @repository(UserTypesTranslationRepository) protected userTypesTranslationRepository: UserTypesTranslationRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
    @inject('services.Weblate') protected weblateService: WeblateService,
  ) {
    this.gitInitialized = false;
    
    // Map component names to their repos. TODO: should be done automatically.
    this.componentRepos = {
      'comments': this.commentsTranslationRepository,
      'document_type': this.documentTypeTranslationRepository,
      'event_category': this.eventCategoryTranslationRepository,
      'event_tag': this.eventTagTranslationRepository,
      'event': this.eventTranslationRepository,
      'glossary': this.glossaryTranslationRepository,
      'information_category': this.informationCategoryTranslationRepository,
      'information': this.informationTranslationRepository,
      'intervention_category': this.interventionCategoryTranslationRepository,
      'intervention_types': this.interventionTypesTranslationRepository,
      'picture_hotspot': this.pictureHotspotTranslationRepository,
      'process': this.processTranslationRepository,
      'step_link': this.stepLinkTranslationRepository,
      'step': this.stepTranslationRepository,
      'topic': this.topicTranslationRepository,
      'user_types': this.userTypesTranslationRepository,
    };
  }


  /**
   * Get a list of components that can be translated.
   *
   * @return A list of strings with the component slugs.
   */
  public getComponentSlugs(): Array<string> {
    return Object.keys(this.componentRepos);
  }

  private async install(): Promise<any> {
    for (const componentName in this.componentRepos) {
      // Remove previous files in git.
      readdirSync(MICADO_TRANSLATIONS_DIR).filter(
        fn => (fn.startsWith(componentName) && fn.endsWith('.json'))
      ).forEach((filename) => {
        unlinkSync(MICADO_TRANSLATIONS_DIR + '/' + filename);
      });
    }

    // Generate empty base language files.
    for (const componentName in this.componentRepos) {
      const file: any = {};
      file[this.sourceLanguage] = {};
      this.generateFiles(componentName, file);
    }

    await this.git.add('-u');
    await this.git.add('./*.json');
    await this.git.commit('Fresh install');
    await this.git.push('origin', 'master', {'--force': null});
  }

  /**
   * Initialize the service. Always call this and wait for the promise to resolve before using it.
   */
  public initializeService(): Promise<null> {
    return new Promise((resolve, reject) => {
      if (this.gitInitialized) {
        resolve();
      }

      if (!existsSync(MICADO_TRANSLATIONS_DIR)) {
        mkdirSync(MICADO_TRANSLATIONS_DIR);
      }

      this.git = simpleGit(MICADO_TRANSLATIONS_DIR);

      this.getDefaultActiveLanguage()
      .then((lang) => {
        this.sourceLanguage = lang;
	console.log('Source language: ' + this.sourceLanguage);
      }).then(() => {
        this.git.checkIsRepo()
        .then((isRepo) => {
          if (!isRepo) {
            if (MICADO_GIT_URL === '') {
              console.log('MICADO_GIT_URL environment variable is not set, this is required for the translation service to work.');
              return Promise.reject('No MICADO_GIT_URL given');
            }
            return this.git.clone(MICADO_GIT_URL, '.')
              .then(() => {
                return this.git.pull('origin', 'master');
              })
              .then(() => {
                return this.git.addConfig('user.name', 'backend');
              })
              .then(() => {
                return this.git.addConfig('user.email', 'backend@backend.backend')
              }).then(() => {
                return this.install();
              });
          }
        })
        .then(() => {
          this.gitInitialized = true;
          resolve();
        })
        .catch((reason) => {
          console.log('Could not initialize git: ', reason);
          reject(reason);
        });
      });
    });
  }

  public async getStatistics(): Promise<any> {
    return this.weblateService.statistics(MICADO_WEBLATE_PROJECT, MICADO_WEBLATE_KEY, 'weblate:8080');
  }

  public async updateTranslatables() {
    /*// Get all components
    let resp = await this.weblateService.components('micado-english');

    // Lock all components
    for(let i = 0; i < resp.results.length; i++) {
      await this.weblateService.lock('micado-english', resp.results[i].slug, true);
    }

    // Make weblate push changes
    await this.weblateService.git('micado-english', 'commit');
    await this.weblateService.git('micado-english', 'push');

    */

    if(MICADO_WEBLATE_KEY !== '') {
      await this.weblateService.git(MICADO_WEBLATE_PROJECT, 'commit', MICADO_WEBLATE_KEY, 'weblate:8080');
      await this.weblateService.git(MICADO_WEBLATE_PROJECT, 'push', MICADO_WEBLATE_KEY, 'weblate:8080');
    }

    await this.git.pull('origin', 'master');

    // Merge changes from weblate to database.
    for (const componentName in this.componentRepos) {
      await this.importTranslatablesComponent(componentName);
    }

    const componentBaseLanguageStrings: any = {};
    for (const componentName in this.componentRepos) {
      componentBaseLanguageStrings[componentName] = await this.updateComponentInGit(componentName);
    }


    await this.git.commit('New base language files generated');
    await this.git.push('origin', 'master');

    for (const componentName in this.componentRepos) {
      await this.componentRepos[componentName].updateToTranlating(componentBaseLanguageStrings[componentName]);
    }



    /*
    // Unlock all components
    for(let i = 0; i < resp.results.length; i++) {
      await this.weblateService.lock('micado-english', resp.results[i].slug, false);
    }*/


  }

  private async getDefaultActiveLanguage(): Promise<string> {
    let activeLanguagesObjects = await this.languagesRepository.findActive();
    for(let i = 0; i < activeLanguagesObjects.length; i++) {
      if(activeLanguagesObjects[i].isDefault) {
        return activeLanguagesObjects[i].lang;
      }
    }

    return 'en';
  }

  private async updateComponentInGit(componentName: string) {
    if (!this.gitInitialized) {
      console.log('Git is not initalized yet, try again later.');
      return;
    }

    // Get the repository for this component.
    const repo = this.componentRepos[componentName];

    // All strings in the base language that should be in git. (because they have siblings in 'translatable', 'translating' state.)
    const baseLanguageStrings = await repo.getBaseLanguageTranslatables(this.sourceLanguage);

    // All languages for this component that should be in git. (so we can create an empty file if it's not in git yet so that weblate will add that language)
    let languagesThatShouldBeInGit = await repo.getTranslatableLanguages();
    let activeLanguagesObjects = await this.languagesRepository.findActive();
    const activeLanguages = activeLanguagesObjects.map((l:any) => l.lang);
    languagesThatShouldBeInGit = languagesThatShouldBeInGit.filter((l:any) => activeLanguages.indexOf(l.lang) > -1); 

    const files: {[language: string]: {[key: string]: string}} = {};

    // Add all base language strings we need.
    baseLanguageStrings.forEach((translatable: any) => {
      if (!(translatable.lang in files)) {
        files[translatable.lang] = {};
      }

      for (const key in translatable.strings) {
        files[translatable.lang][translatable.id.toString() + '.' + key] = translatable.strings[key];
      }

    });

    // Add empty files for languages if not already in git.
    languagesThatShouldBeInGit.forEach((translatable: any) => {
      if (translatable.lang === this.sourceLanguage) {
        return;
      }

      if (!existsSync(MICADO_TRANSLATIONS_DIR + '/' + componentName + '.' + translatable.lang + '.json')) {
        files[translatable.lang] = {};
      }
    });

    if (!files.hasOwnProperty(this.sourceLanguage)) {
      // We need atleast an empty file for the source language in weblate.
      files[this.sourceLanguage] = {};
    }

    // Remove previous file in git.
    readdirSync(MICADO_TRANSLATIONS_DIR).filter(
      fn => (fn === (componentName + '.' + this.sourceLanguage + '.json'))
    ).forEach((filename) => {
      unlinkSync(MICADO_TRANSLATIONS_DIR + '/' + filename);
    });

    // Generate the file on the filesystem and push them to git.
    const results = this.generateFiles(componentName, files);
    const done = await Promise.all(results);
    await this.git.add(componentName + '.*.json');

    return baseLanguageStrings;
  }

  /*
  public async uploadTranslatables() {

    for(let componnent in this.componentRepos) {
     await this.uploadTranslatablesComponent(componnent);
    }
  }

  private async generateFilesDictionary() {
   for(let componnentName in this.componentRepos) {

    }
  }

  private async uploadTranslatablesComponent(componentName: string) {
   if(!this.gitInitialized) {
     console.log('Git is not initalized yet, try again later.');
     return;
   }

   // First we import pending translations to lessen the chance on merge conflicts.
   // In the future this can be replaced with just a git reset and the importing can be called from another controller if needed.
   await this.importTranslatablesComponent(componentName);

   console.log('Uploading translatables for component ' + componentName)

   // Get the repository for this component.
   const repo = this.componentRepos[componentName];

   // All the strings that should be send to weblate.
   let allLanguageComponents = await repo.getTranslatables();


   let files: {[language: string]: {[key: string]: string}} = {};

   allLanguageComponents.forEach((translatable: any) => {
     if(!(translatable.lang in files)) {
       files[translatable.lang] = {};
     }

     switch(translatable.translationState) {
       case 0:
         break;
       case 1:
         // Should be translated, so we remove the old translation.
         // Except if it's the source language, then we have to keep it.
         if(translatable.lang !== MICADO_SOURCE_LANGUAGE) {
           translatable.text = '';
         }
         break;
       case 2:
         // Weblate is still translating this one.
         if(translatable.lang !== MICADO_SOURCE_LANGUAGE) {
           translatable.text = '';
         }
         break;
       case 3:
       case 4:
         // Was already translated but we have to include it because one of the other languages has not been translated yet.
         // Otherwise webplate will think this string has not been translated yet.
         break;
     }

     files[translatable.lang][translatable.id.toString() + '.' + componentName] = translatable.text;
   });

   if(!files.hasOwnProperty(MICADO_SOURCE_LANGUAGE)) {
     // We need atleast an empty file for the source language in weblate.
     files[MICADO_SOURCE_LANGUAGE] = {};
   }



   // Remove previous files in git.
   fs.readdirSync(MICADO_TRANSLATIONS_DIR).filter(
     fn => (fn.startsWith(componentName) && fn.endsWith('.json'))
   ).forEach((filename) => {
     fs.unlinkSync(MICADO_TRANSLATIONS_DIR + '/' + filename);
   });

   // Generate the files on the filesystem and push them to git.
   let results = this.generateFiles(componentName, files);
   let done = await Promise.all(results);
   await this.git.add('-u');
   if(results.length > 0) {
     await this.git.add('./*.json');
   }
   await this.git.commit('New files generated');
   await this.git.push('origin', 'master');

   // Now they are pushed to git, so we update the status to 'translating'.
   // TODO: The fetching of allLanguageComponents and this updating should be done in a transaction.
   repo.updateToTranlating(allLanguageComponents);
  }


  private async importTranslatables() {
   for(const componentName in this.componentRepos) {
     await this.importTranslatablesComponent(componentName);
   }
  }
  */

  private async importTranslatablesComponent(componentName: string) {
    if (!this.gitInitialized) {
      console.log('Git is not initalized yet, try again later.');
      return;
    }

    console.log('Importing translations for component "' + componentName + '".');

    const repo = this.componentRepos[componentName];

    const data: {[id: string]: {[language: string]: {[columnName: string]: string}}} = {};

    const files = readdirSync(MICADO_TRANSLATIONS_DIR).filter(fn => (fn.startsWith(componentName) && fn.endsWith('.json')));
    files.forEach((filename) => {
      const [componentNameFromFile, language, extension] = filename.split('.');
      const rawData = readFileSync(MICADO_TRANSLATIONS_DIR + '/' + filename);
      const componentLanguageData = JSON.parse(rawData.toString());

      for (const key in componentLanguageData) {
        const dotIndex = key.indexOf('.');
        const id = key.substr(0, dotIndex);
        if (!data.hasOwnProperty(id)) {
          data[id] = {};
        }

        const columnName = key.substring(dotIndex + 1);
        if (!data[id].hasOwnProperty(language)) {
          data[id][language] = {};
        }

        data[id][language][columnName] = componentLanguageData[key];
      }
    });

    await repo.updateToTranslated(this.sourceLanguage, data);
    await repo.updateToProduction();
  }

  private generateFiles(componentName: string, fileDict: any) {
    const promises = [];
    for (const [lang, translations] of Object.entries(fileDict)) {
      promises.push(fsAsync.writeFile(MICADO_TRANSLATIONS_DIR + "/" + componentName + "." + lang + ".json", JSON.stringify(translations)));
    }

    return promises;
  }
}
