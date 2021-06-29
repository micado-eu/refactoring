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
import { JSONObject } from '@loopback/core';
import { StepStepDocumentController } from './step-step-document.controller';
import { StepRepository, StepLinkRepository } from '../repositories';

export class GraphController {
  constructor(
    @repository(StepRepository) public stepRepository: StepRepository,
    @repository(StepLinkRepository) public stepLinkRepository: StepLinkRepository,
  ) { }
  @post('/save-process-steps', {
    responses: {
      '200': {
        description: 'Saving result',
      },
    },
  })
  async persistallgraph (
    @requestBody()
    data: any,
  ): Promise<JSONObject> {
    let result: JSONObject = {}
    console.log(data)
    // save new steps
    let new_steps = data.steps.filter((step: any) => { return (step.is_new != null && step.is_new) })
    console.log("new steps")
    console.log(new_steps)
    const saveSteps = async () => {
      await this.asyncForEach(new_steps, async (nstep: any) => {

        // filter only needed data
        let savingStep = JSON.parse(JSON.stringify(nstep, ['id', 'cost', 'locationSpecific', 'location', 'locationLon', 'locationLat', 'idProcess','link','stepIcon']));
        // save new step
        await this.stepRepository.create(savingStep)
          .then(
            result => {
              console.log("saved step")
              console.log(result)
            }
          )
        // save translations
        const saveTranslations = async () => {
          await this.asyncForEach(nstep.translations, async (transl: any) => {

            let savingTranslation = JSON.parse(JSON.stringify(transl, ['id', 'lang', 'step', 'description', 'translationState']));
            let trid = nstep.id
            console.log(savingTranslation)

            this.stepRepository.translations(trid).create(savingTranslation)
              .then((trres) => {
                console.log("saved translation")
                console.log(trres)
              }).catch(error => {
                console.log(error)
              })

          });
        }
        await saveTranslations()

        // here we need also to save the documents of the step
        const saveDocuments = async () => {
          if(nstep.documents != null){
          // have to delete all documents
          await this.stepRepository.documents(nstep.id).delete({})
          // then add all documents back
          await this.asyncForEach(nstep.documents, async (doc: any) => {

            let savingDoc = JSON.parse(JSON.stringify(doc, ['idDocument', 'cost', 'idStep', 'isOut']));
            let trid = nstep.id
            console.log(savingDoc)


            this.stepRepository.documents(trid).create(savingDoc)
              .then((trres) => {
                console.log("saved translation")
                console.log(trres)
              }).catch(error => {
                console.log(error)
              })

          });
        }
        }
        await saveDocuments()


      });
    }
    await saveSteps()
    // save translations of new steps

    let changed_steps = data.steps.filter((step: any) => { return (step.is_edited != null && (step.is_edited && !step.is_new)) })
    console.log("changed_steps")
    console.log(changed_steps)
    const editSteps = async () => {
      await this.asyncForEach(changed_steps, async (cstep: any) => {

        // filter only needed data
        let editingStep = JSON.parse(JSON.stringify(cstep, ['id', 'cost', 'locationSpecific', 'location', 'locationLon', 'locationLat', 'idProcess','link','stepIcon']));
        // save new step
        await this.stepRepository.updateById(editingStep.id, editingStep)
          .then(
            result => {
              console.log("edited step")
              console.log(result)
            }
          )
        // save translations
        const editTranslations = async () => {
          await this.asyncForEach(cstep.translations, async (transl: any) => {

            let editingTranslation = JSON.parse(JSON.stringify(transl, ['id', 'lang', 'step', 'description', 'translationState']));
            let trid = cstep.id
            console.log(editingTranslation)
            let where = {
              id: { eq: editingTranslation.id }, lang: { eq: editingTranslation.lang }
            }
            this.stepRepository.translations(trid).patch(editingTranslation, where)
              .then((trres) => {
                console.log("saved translation")
                console.log(trres)
              }).catch(error => {
                console.log(error)
              })

          });
        }
        await editTranslations()

        // here we need also to save the documents of the step
        // here we need also to save the documents of the step
        const saveDocuments = async () => {
          if(cstep.documents != null){
          // have to delete all documents
          await this.stepRepository.documents(cstep.id).delete({})
          // then add all documents back
          await this.asyncForEach(cstep.documents, async (doc: any) => {

            let savingDoc = JSON.parse(JSON.stringify(doc, ['idDocument', 'cost', 'idStep', 'isOut']));
            let trid = cstep.id
            console.log(savingDoc)


            this.stepRepository.documents(trid).create(savingDoc)
              .then((trres) => {
                console.log("saved translation")
                console.log(trres)
              }).catch(error => {
                console.log(error)
              })

          });
        }
      }
        await saveDocuments()
      });
    }
    await editSteps()


    // add the new steplinks
   let new_steps_links = data.steplinks.filter((steplink: any) => { return (steplink.is_new != null && steplink.is_new) })
    console.log("new steplinks")
    console.log(new_steps_links)
    const saveStepsLinks = async () => {
      await this.asyncForEach(new_steps_links, async (nstep_link: any) => {

        // filter only needed data
        let savingStepLink = JSON.parse(JSON.stringify(nstep_link, ['id', 'fromStep', 'toStep', 'idProcess']));
        // save new step
        await this.stepLinkRepository.create(savingStepLink)
          .then(
            result => {
              console.log("saved step")
              console.log(result)
            }
          )
        // save translations
        const saveLinkTranslations = async () => {
          await this.asyncForEach(nstep_link.translations, async (transl: any) => {

            let savingTranslation = JSON.parse(JSON.stringify(transl, ['id', 'lang', 'description']));
            let trid = nstep_link.id
            console.log(savingTranslation)

            this.stepLinkRepository.translations(trid).create(savingTranslation)
              .then((trres) => {
                console.log("saved translation")
                console.log(trres)
              }).catch(error => {
                console.log(error)
              })

          });
        }
        await saveLinkTranslations()
      });
    }
    await saveStepsLinks()
    let changed_step_links = data.steplinks.filter((step: any) => { return (step.is_edited != null && (step.is_edited && !step.is_new)) })
    console.log("changed_steps")
    console.log(changed_step_links)
    const editStepLinks = async () => {
      await this.asyncForEach(changed_step_links, async (cstep: any) => {

        // filter only needed data
        let editingStep = JSON.parse(JSON.stringify(cstep, ['id', 'fromStep', 'toStep', 'idProcess']));
        // save new step
        await this.stepLinkRepository.updateById(editingStep.id, editingStep)
          .then(
            result => {
              console.log("edited step")
              console.log(result)
            }
          )
        // save translations
        const editTranslationsLinks = async () => {
          await this.asyncForEach(cstep.translations, async (transl: any) => {

            let editingTranslation = JSON.parse(JSON.stringify(transl, ['id', 'lang', 'description', 'translationState']));
            let trid = cstep.id
            console.log(editingTranslation)
            let where = {
              id: { eq: editingTranslation.id }, lang: { eq: editingTranslation.lang }
            }
            this.stepLinkRepository.translations(trid).patch(editingTranslation, where)
              .then((trres) => {
                console.log("saved translation")
                console.log(trres)
              }).catch(error => {
                console.log(error)
              })

          });
        }
        await editTranslationsLinks()
      })
    }
    
    await editStepLinks()

        
    // edit steplinks
   /* let changed_step_links = data.steplinks.filter((steplink: any) => { return (steplink.is_edited != null && (steplink.is_edited && !steplink.is_new)) })
    console.log("changed_steplinks")
    console.log(changed_step_links)
    const editLinkTranslations = async () => {
      if(changed_step_links.length != 0){
        console.log("I AM TRANSLATIONS")
        console.log(changed_step_links)

      await this.asyncForEach(changed_step_links.translations, async (transl: any) => {
        console.log("I AM TRANLS")
        console.log(transl)
        let editingLinkTranslation = JSON.parse(JSON.stringify(transl, ['id', 'lang', 'description']));
        let trid = changed_step_links.id
        console.log(editingLinkTranslation)
        let where = {
          id: { eq: editingLinkTranslation.id }, lang: { eq: editingLinkTranslation.lang }
        }
        this.stepLinkRepository.translations(trid).patch(editingLinkTranslation, where)
          .then((trres) => {
            console.log("saved translation")
            console.log(trres)
          }).catch(error => {
            console.log(error)
          })

      });
    }
  }*/
    //await editLinkTranslations()
    
    // delete step links
    let deleting_step_links = data.steplinks.filter((steplink: any) => { return (steplink.to_delete != null && steplink.to_delete) })
    console.log("deleting_steplinks")
    console.log(deleting_step_links)
    const deleteStepLinks = async () => {
      await this.asyncForEach(deleting_step_links, async (dstep_link: any) => {
        // delete translations
        await this.stepLinkRepository.translations(dstep_link.id).delete({})
       
        // delete step
        await this.stepLinkRepository.deleteById(dstep_link.id);


      })
    }
    await deleteStepLinks()
    // delete step
    let deleting_steps = data.steps.filter((step: any) => { return (step.to_delete != null && step.to_delete) })
    console.log("deleting_steps")
    console.log(deleting_steps)
    const deleteSteps = async () => {
      await this.asyncForEach(deleting_steps, async (dstep: any) => {
        // delete documents
        await this.stepRepository.documents(dstep.id).delete({})
        // delete translations
        await this.stepRepository.translations(dstep.id).delete({})
        let deleting_links: any = []
        let links_to_delete = data.steplinks.filter((a_link: any) => {
         return a_link.fromStep == dstep.id || a_link.toStep == dstep.id
       })
       if(links_to_delete != null){
        await this.asyncForEach(links_to_delete, async (deleting_a_link: any) =>{
          deleting_links.push(deleting_a_link)
        })
       await this.asyncForEach(deleting_links, async (dlink: any) => {
        await this.stepLinkRepository.translations(dlink.id).delete({})
        await this.stepLinkRepository.deleteById(dlink.id);

       })
       }
        // delete step
        await this.stepRepository.deleteById(dstep.id);


      })
    }
    await deleteSteps()


    return result
  }

  async asyncForEach (array: any, callback: any) {
    
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    
  }
}
}
