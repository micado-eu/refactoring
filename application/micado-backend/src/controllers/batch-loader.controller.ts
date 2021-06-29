// Uncomment these imports to begin using these cool features!

import { inject } from '@loopback/context';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
//import { inject } from '@loopback/core';
import {
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
  param
} from '@loopback/rest';
import { FileUploadService, FileUploadServiceProvider, FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY } from '../services/file-upload-service.service'
import csv from 'csv-parser'
import fs from 'fs';
import path from 'path';

import {
  EventCategoryRepository,
  EventCategoryTranslationRepository,
  EventRepository,
  EventTranslationRepository,
  GlossaryRepository,
  GlossaryTranslationRepository,
  InformationCategoryRepository,
  InformationCategoryTranslationRepository,
  InformationRepository,
  InformationTranslationRepository,
  InterventionCategoryRepository,
  InterventionCategoryTranslationRepository,
  LanguagesRepository,
  ProcessRepository,
  ProcessTranslationRepository,
  SettingsRepository
} from '../repositories';


export class BatchLoaderController {
  constructor(
    @inject(FILE_UPLOAD_SERVICE) private handler: FileUploadService,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(GlossaryTranslationRepository) protected glossaryTranslationRepository: GlossaryTranslationRepository,
    @repository(GlossaryRepository) protected glossaryRepository: GlossaryRepository,
    @repository(ProcessTranslationRepository) protected processTranslationRepository: ProcessTranslationRepository,
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
    @repository(EventTranslationRepository) protected eventTranslationRepository: EventTranslationRepository,
    @repository(EventRepository) protected eventRepository: EventRepository,
    @repository(InformationTranslationRepository) protected informationTranslationRepository: InformationTranslationRepository,
    @repository(InformationRepository) protected informationRepository: InformationRepository,
    @repository(InformationCategoryTranslationRepository) protected informationCategoryTranslationRepository: InformationCategoryTranslationRepository,
    @repository(InformationCategoryRepository) protected informationCategoryRepository: InformationCategoryRepository,
    @repository(EventCategoryTranslationRepository) protected eventCategoryTranslationRepository: EventCategoryTranslationRepository,
    @repository(EventCategoryRepository) protected eventCategoryRepository: EventCategoryRepository,
    @repository(InterventionCategoryRepository) protected interventionCategoryRepository: InterventionCategoryRepository,
    @repository(InterventionCategoryTranslationRepository) protected interventionCategoryTranslationRepository: InterventionCategoryTranslationRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,

  ) { }

  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    let settings = await this.settingsRepository.find({});
    //   let lang_filter = { where: { active: true } }
    let languages = await this.languagesRepository.find({ where: { active: true } });

    console.log(settings)
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          let def_lang = settings.filter((el: any) => { return el.key === 'default_language' })[0]

          console.log(def_lang)

          let uploadedPayload: any = BatchLoaderController.getFilesAndFields(request)
          console.log(uploadedPayload)
          console.log(uploadedPayload.fields.entity)
          console.log(uploadedPayload.fields.creator)
          const results: any = [];
          let csv_options: any = { trim: true }
          fs.createReadStream('.sandbox' + "/" + uploadedPayload.files[0].originalname)
            .pipe(csv(csv_options))
            .on('data', (data: any) => results.push(data))
            .on('end', () => {
              console.log(results);
              this.loadData(uploadedPayload.fields.entity, results, def_lang.value, languages, uploadedPayload.fields.creator)
              // [
              //   { NAME: 'Daffy Duck', AGE: '24' },
              //   { NAME: 'Bugs Bunny', AGE: '22' }
              // ]
            });
          resolve(uploadedPayload);
        }
      });
    });
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return { files, fields: request.body };
  }

  private loadData(entity: string, csv: any, def_lang: any, act_lang: any, creator?: number) {
    console.log("in load data")
    console.log(csv)
    switch (entity) {
      case "glossary":
        csv.forEach((element: any) => {
          this.glossaryRepository.create({
            creator
          })
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add text")
              console.log(def_lang)
              element.lang = def_lang
              element.id = newEntity.id
              element.translationDate = new Date().toISOString()
              console.log(element)
              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.glossaryTranslationRepository.create(element)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = {
                    lang: alang.lang,
                    id: newEntity.id,
                    title: '',
                    description: '',
                    translationDate: new Date().toISOString()
                  }
                  this.glossaryTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "process":
        csv.forEach((element: any) => {
          //var creatingEntity: any = { startDate: element.start_date, endDate: element.end_date, category: 0 }
          this.processRepository.create({})
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add languages")
              console.log(def_lang)
              //              element.lang = def_lang
              //              element.id = newEntity.id
              console.log(element)
              let newTransl = { lang: def_lang, id: newEntity.id, process: element.title, description: element.description }

              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.processTranslationRepository.create(newTransl)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = { lang: alang.lang, id: newEntity.id, process: '', description: '' }
                  this.processTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "event":
        csv.forEach((element: any) => {
          var creatingEntity: any = { 
            startDate: element.start_date, 
            endDate: element.end_date,
            creator,
            location: element.location ? element.location : undefined,
            cost: element.cost ? element.cost : undefined
          }
          this.eventRepository.create(creatingEntity)
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add languages")
              console.log(def_lang)
              //              element.lang = def_lang
              //              element.id = newEntity.id
              console.log(element)
              let newTransl = {
                lang: def_lang,
                id: newEntity.id,
                event: element.title,
                description: element.description,
                translationDate: new Date().toISOString()
              }

              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.eventTranslationRepository.create(newTransl)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = {
                    lang: alang.lang,
                    id: newEntity.id,
                    event: '',
                    description: '',
                    translationDate: new Date().toISOString()
                  }
                  this.eventTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "information":
        csv.forEach((element: any) => {
          this.informationRepository.create({
            creator
          })
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add languages")
              console.log(def_lang)
              //              element.lang = def_lang
              //              element.id = newEntity.id
              console.log(element)
              let newTransl = {
                lang: def_lang,
                id: newEntity.id,
                information: element.title,
                description: element.description,
                translationDate: new Date().toISOString()
              }

              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.informationTranslationRepository.create(newTransl)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = { lang: alang.lang, id: newEntity.id, information: '', description: '' }
                  this.informationTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "information_category":
        csv.forEach((element: any) => {
          this.informationCategoryRepository.create({ link_integration_plan: false })
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add languages")
              console.log(def_lang)
              //              element.lang = def_lang
              //              element.id = newEntity.id
              console.log(element)
              let newTransl = {
                lang: def_lang,
                id: newEntity.id,
                informationCategory: element.title,
                translationState: 0,
                translationDate: new Date().toISOString()
              }

              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.informationCategoryTranslationRepository.create(newTransl)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = {
                    lang: alang.lang,
                    id: newEntity.id,
                    informationCategory: '',
                    translationState: 0,
                    translationDate: new Date().toISOString()
                  }
                  this.informationCategoryTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "event_category":
        csv.forEach((element: any) => {
          this.eventCategoryRepository.create({ link_integration_plan: false })
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add languages")
              console.log(def_lang)
              //              element.lang = def_lang
              //              element.id = newEntity.id
              console.log(element)
              let newTransl = {
                lang: def_lang,
                id: newEntity.id,
                eventCategory: element.title,
                translationState: 0,
                translationDate: new Date().toISOString()
              }

              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.eventCategoryTranslationRepository.create(newTransl)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = {
                    lang: alang.lang,
                    id: newEntity.id,
                    eventCategory: '',
                    translationState: 0,
                    translationDate: new Date().toISOString()
                  }
                  this.eventCategoryTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "intervention_category":
        csv.forEach((element: any) => {
          // TODO check if external_id has a value and in that case add to the create
          this.interventionCategoryRepository.create({})
            .then(newEntity => {
              console.log(newEntity)

              console.log("ready to add text")
              console.log(def_lang)
              element.lang = def_lang
              element.id = newEntity.id
              console.log(element)
              act_lang.forEach((alang: any) => {
                if (alang.lang === def_lang) {
                  this.interventionCategoryTranslationRepository.create(element)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                } else {
                  let empty = { lang: alang.lang, id: newEntity.id, title: '' }
                  this.interventionCategoryTranslationRepository.create(empty)
                    .then(newTranslation => {
                      console.log(newTranslation)
                    })
                }
              });
            })

        });
        break;
      case "Apple":
        break;
      default:
        console.log("There is a problem in the entity you sent")
    }

  }
}
