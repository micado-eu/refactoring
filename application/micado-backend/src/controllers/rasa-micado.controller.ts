// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {
  Count,
  CountSchema,
  AnyType,
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
import fs from 'fs';
import { DocumentTypeRepository } from '../repositories';
import { DocumentTypeTranslationRepository } from '../repositories';
import { ProcessRepository } from '../repositories';

export class RasaMicadoController {
  constructor(
    @repository(DocumentTypeRepository) protected documentTypeRepository: DocumentTypeRepository,
    @repository(DocumentTypeTranslationRepository) protected documentTypeTranslationRepository: DocumentTypeTranslationRepository,
    @repository(ProcessRepository) protected processRepository: ProcessRepository,
  ) { }


  @get('/generate-nlu', {
    responses: {
      '200': {
        description: 'Topic export',
        content: { 'application/json': { schema: AnyType } },
      },
    },
  })
  async export (

  ): Promise<any> {

    //   let allTopics: any
    /*
    let allTopics = await this.topicTranslationRepository.find()
    console.log(allTopics)
    let lang = ["en"]
    //   let engTopics = allTopics.filter(function (atopic: any) { return atopic.lang == lang })

    lang.forEach(alang => {

      let langTopics = allTopics.filter(function (atopic: any) { return atopic.lang == alang })
      let exportArray = JSON.parse("[]")
      langTopics.forEach(record => {
        exportArray.push({ id: record.id, content: { topic: record.topic } })
      });
      console.log(exportArray)
      fs.writeFile("topics." + alang + ".json", JSON.stringify(exportArray), (err) => {
        if (err) console.log(err)
      })
    });
*/
    let filter = {
      include: [
        {
          relation: 'translations',
        },
      ],
    };

    this.documentTypeRepository.find(filter)
      .then(docs => {
        console.log(docs)
        // create a stream
        const stream = fs.createWriteStream('nlu.md', { flags: 'a' });

        // append data to the file
        docs.forEach((doc) => {
          if (doc.translations != null) {
            stream.write(`${doc.translations[0].document}\n`);
          }
        });

        // end stream
        stream.end();

      })



    return "gioppo";
  }

  /* @get('/process_x_doc', {
     responses: {
       '200': {
         description: 'Topic export',
         content: { 'application/json': { schema: AnyType } },
       },
     },
   })
   async process_x_doc (
     @param.query.string('document') document = "",
     @param.query.string('lang') lang = 'en'
 
   ): Promise<any> {
 
     let filter = {
       "where": {
         "document": { "eq": document }
       }
     };
 
     let found_processes: any = []
 
 
 
     await this.documentTypeTranslationRepository.find(filter)
       .then(async (docs) => {
         console.log(docs)
         let docs_id: any = []
         docs.forEach((doc) => {
           docs_id.push(doc.id)
         })
 
         console.log(docs_id)
 
         let process_filter = {
           "where": {
             "produced_document": { "inq": docs_id }
           },
           include: [
             {
               relation: 'translations',
               scope: {
                 where: {
                   lang: { "eq": lang }
                 }
               }
             },
           ],
         };
 
         const search = async () => {
 
           await this.processRepository.find(process_filter)
             .then(processes => {
               console.log(processes)
               processes.forEach((proc) => {
                 let a_process = { id: proc.id, process: proc.translations[0].process }
                 console.log(a_process)
                 found_processes.push(a_process)
               })
             })
         }
         await search()
 
       })
 
     console.log("found processes:")
     console.log(found_processes)
     return found_processes
   }*/

}
