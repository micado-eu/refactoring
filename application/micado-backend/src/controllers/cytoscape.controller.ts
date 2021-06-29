// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
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
import { Step, StepDocument } from '../models';
import { StepRepository } from '../repositories';
import { StepLinkRepository } from '../repositories';
import { DocumentTypeTranslationRepository } from '../repositories';



export class CytoscapeController {
  constructor(
    @repository(StepRepository)
    public stepRepository: StepRepository,
    @repository(StepLinkRepository) protected stepLinkRepository: StepLinkRepository,
    @repository(DocumentTypeTranslationRepository) protected documentTypeTranslationRepository: DocumentTypeTranslationRepository,
  ) { }


  @get('/cytoscape', {
    responses: {
      '200': {
        description: 'Array of Step model instances',
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      },
    },
  })
  async cytoscape (
    @param.query.number('processid') processid = 0,
    @param.query.string('lang') lang = 'en'
  ): Promise<any> {
    let cyto = { elements: JSON.parse("[]") }
    let steps = await this.stepRepository.find({
      where: {
        idProcess: { eq: processid },
      },

      include: [
        {
          relation: "translations"
        },
        {
          relation: "documents"
        }
      ]
    });

    let steplinks = await this.stepLinkRepository.find({
      where: {
        idProcess: { eq: processid },
      },

      include: [
        {
          relation: "translations"
        }
      ]
    });

    const start = async () => {
      await this.asyncForEach(steps, async (astep: any) => {
        console.log("nel primo asynforeach")
        console.log(astep)
        let curTransl = astep.translations.filter(function (atransl: any) { return atransl.lang == lang }, lang)[0]
        let docarray = JSON.parse("[]")

        if (astep.documents != null) {
          console.log("there are documents in the step")

          const parti = async () => {
            await this.asyncForEach(astep.documents, async (adoc: any) => {
              console.log("nel secondo asynforeach")
              console.log(adoc)
              /*
              let docs = await this.documentTypeTranslationRepository.find({
                where: {
                  id: { eq: adoc.idDocument },
                  lang: { eq: lang }
                }
              })
              console.log(docs)
              docarray.push(docs[0].document)
              */
              docarray.push(adoc.idDocument)
            })
            console.log('Dopo il secondo asyncforeach');

          }
          await parti()

        } else {
          console.log("there are NO documents in the step")
        }



        console.log(curTransl)
        let element = {
          group: "nodes", data: {
            id: astep.id,
            title: curTransl.step,
            description: curTransl.description,
            location: astep.location,
            longitude: astep.locationLon,
            latitude: astep.locationLat,
            required_documents: docarray
          }
        }
        cyto.elements.push(element)
      });
      console.log('Dopo il primo asyncforeach');
    }


    await start();


    steplinks.forEach(asteplink => {
      console.log(asteplink)
      let curTransl = asteplink.translations.filter(function (atransl) { return atransl.lang == lang }, lang)[0]
      console.log(curTransl)
      let element = {
        group: "edges", data: {
          id: asteplink.id,
          source: asteplink.fromStep,
          target: asteplink.toStep,
          description: curTransl.description
        }
      }
      cyto.elements.push(element)
    });

    console.log(cyto)

    return cyto
  }




  async asyncForEach (array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

}
