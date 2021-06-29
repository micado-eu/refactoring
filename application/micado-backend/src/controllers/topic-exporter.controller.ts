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
import { TopicTranslation } from '../models';
import { TopicTranslationRepository } from '../repositories';
import fs from 'fs';

export class TopicExporterController {
  constructor(
    @repository(TopicTranslationRepository)
    public topicTranslationRepository: TopicTranslationRepository,
  ) { }



  @get('/topicexport', {
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





    return "gioppo";
  }
}
