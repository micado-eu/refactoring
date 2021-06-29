import { repository } from '@loopback/repository';
import { get, param } from '@loopback/rest';
import { EventTranslationProdRepository, InformationTranslationProdRepository, ProcessTranslationProdRepository, TopicRepository } from '../repositories';

// Based on this POC: https://github.com/codeurjc/poc-full-text-search/tree/pgroonga
export class SearchController {
  constructor(
    @repository(EventTranslationProdRepository)
    public eventRepository: EventTranslationProdRepository,
    @repository(InformationTranslationProdRepository)
    public informationRepository: InformationTranslationProdRepository,
    @repository(ProcessTranslationProdRepository)
    public processRepository: ProcessTranslationProdRepository,
    @repository(TopicRepository)
    public topicRepository: TopicRepository
  ) { }

  // private SEARCH_QUERY = `
  //   SELECT 
  //       id, %title%, description, lang,
  //       pgroonga_score(tableoid, ctid) AS score,
  //       pgroonga_snippet_html(%title%, ARRAY%search_context%) AS title_context,
  //       pgroonga_snippet_html(description, ARRAY%search_context%) AS description_context
  //   FROM %table%
  //   WHERE lang=$1 AND ARRAY[%title%, description] &@~ ('%search%', ARRAY[2, 1], '%table%_pgroonga_index')::pgroonga_full_text_search_condition
  //   ORDER BY score DESC;
  // `.replace(/\n|\r/g, ' '); // Replace new line chars with a single white space

  private SEARCH_QUERY = `
  SELECT 
      id,
      pgroonga_score(tableoid, ctid) AS score
  FROM %table%
  WHERE lang=$1 AND ARRAY[%title%, description] &@~ ($2, ARRAY[2, 1], '%table%_pgroonga_index')::pgroonga_full_text_search_condition
  ORDER BY score DESC;
`.replace(/\n|\r/g, ' '); // Replace new line chars with a single white space


private SEARCH_QUERY_NULL =

`select *, (select to_jsonb(array_agg(pt.id_topic)) from %topic% pt where pt.%topic_link%=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from %user% pu where pu.%user_link%=t.id) as users from %table% t inner join %table%_translation_prod tt on t.id = ANY ($3::int[]) and t.id=tt.id and tt.lang=$2 union select *, (select to_jsonb(array_agg(pt.id_topic)) from %topic% pt where pt.%topic_link%=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from %user% pu where pu.%user_link%=t.id) as users from %table% t inner join %table%_translation_prod tt on t.id = ANY ($3::int[]) and t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from %table% t inner join %table%_translation_prod tt on t.id = tt.id and tt.lang = $2)`.replace(/\n|\r/g, ' ');


//private SEARCH_QUERY_TOPIC =

//`select * from (select *, (select to_jsonb(array_agg(pt.id_topic)) from %topic% pt where pt.%topic_link%=t.id ) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from %user% pu where pu.%user_link%=t.id) as users from %table% t inner join %table%_translation_prod tt on t.id = ANY ($3::int[]) and t.id=tt.id and tt.lang=$2 union select *, (select to_jsonb(array_agg(pt.id_topic)) from %topic% pt where pt.%topic_link%=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from %user% pu where pu.%user_link%=t.id) as users from %table% t inner join %table%_translation_prod tt on t.id = ANY ($3::int[]) and t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from %table% t inner join %table%_translation_prod tt on t.id = tt.id and tt.lang = $2)) as foo where topics notnull`.replace(/\n|\r/g, ' ');


  @get('/search', {
    responses: {
      '200': {
        description: 'Search in events, information and processes powered by PGroonga'
      },
    },
  })
  async search(
    @param.query.string('lang') lang = 'en',
    @param.query.string('words') words: string
  ) {
    let search = ""
    if (!words) {
      throw {
        status: 400,
        message: "Please include text in the words query parameter"
      }
    }
    const wordsToSearch = words.split(',')
    // Append the terms to search with OR operator
    wordsToSearch.forEach((word, index, array) => {
      search += word;
      if (index !== (array.length - 1)) {
        search += " OR ";
      }
    })
    let queryEvents = this.SEARCH_QUERY
      .split("%table%").join("event_translation_prod")
      .split("%title%").join("event")
    let queryInfo = this.SEARCH_QUERY
      .split("%table%").join("information_translation_prod")
      .split("%title%").join("information")
    let queryProcesses = this.SEARCH_QUERY
      .split("%table%").join("process_translation_prod")
      .split("%title%").join("process")
    let results = await Promise.all([
      this.eventRepository.dataSource.execute(queryEvents, [lang, search]),
      this.informationRepository.dataSource.execute(queryInfo, [lang, search]),
      this.processRepository.dataSource.execute(queryProcesses, [lang, search])
    ])
    return {
      "events": results[0],
      "information": results[1],
      "processes": results[2]
    }
  }

  @get('/search-full', {
    responses: {
      '200': {
        description: 'Search in events, information and processes powered by PGroonga'
      },
    },
  })
  async searchFull(
    @param.query.string('lang') lang = 'en',
    @param.query.string('words') words: string,
    @param.query.number('topicid') topicid = 0
  ) {
    let events:any[] = []
    let processes:any[] =[]
    let info:any[] = []
    let the_topics:any[] = []
    if(topicid != 0){
     let topics_return = await this.topicRepository.dataSource.execute(` WITH RECURSIVE c AS (SELECT ` + topicid + ` AS id UNION ALL SELECT sa.id FROM topic AS sa JOIN c ON c.id = sa. father) SELECT id FROM c`)
     console.log(the_topics)
     topics_return.forEach((top:any)=>{
       the_topics.push(top.id)
     })
    }
    let search = ""
    if (!words) {
      throw {
        status: 400,
        message: "Please include text in the words query parameter"
      }
    }
    const wordsToSearch = words.split(',')
    // Append the terms to search with OR operator
    wordsToSearch.forEach((word, index, array) => {
      search += word;
      if (index !== (array.length - 1)) {
        search += " OR ";
      }
    })
    let queryEvents = this.SEARCH_QUERY
      .split("%table%").join("event_translation_prod")
      .split("%title%").join("event")
    let queryInfo = this.SEARCH_QUERY
      .split("%table%").join("information_translation_prod")
      .split("%title%").join("information")
    let queryProcesses = this.SEARCH_QUERY
      .split("%table%").join("process_translation_prod")
      .split("%title%").join("process")
    let results = await Promise.all([
      this.eventRepository.dataSource.execute(queryEvents, [lang, search]),
      this.informationRepository.dataSource.execute(queryInfo, [lang, search]),
      this.processRepository.dataSource.execute(queryProcesses, [lang, search])
    ])
    console.log("I am processes found by pgroonga")
    let info_id:any[] = []
    let event_id:any[] =[]
    let process_ids:any[] =[]
    results[0].forEach((res:any)=>{
      event_id.push(res.id)
    })
    results[1].forEach((res:any)=>{
      info_id.push(res.id)
    })
    results[2].forEach((res:any) => {
      process_ids.push(res.id)
    });
    let fullQueryEvents = this.SEARCH_QUERY_NULL
    .split("%table%").join("event")
    .split("%topic%").join("event_topic")
    .split("%topic_link%").join("id_event")
    .split("%user%").join("event_user_types")
    .split("%user_link%").join("id_event")
    let fullQueryinfo = this.SEARCH_QUERY_NULL
    .split("%table%").join("information")
    .split("%topic%").join("information_topic")
    .split("%topic_link%").join("id_information")
    .split("%user%").join("information_user_types")
    .split("%user_link%").join("id_information")
    let fullQueryProcesses = this.SEARCH_QUERY_NULL
    .split("%table%").join("process")
    .split("%topic%").join("process_topic")
    .split("%topic_link%").join("id_process")
    .split("%user%").join("process_users")
    .split("%user_link%").join("id_process")
    let full_results:any[] = []
    if(the_topics.length >0){
       full_results =  await Promise.all([
        this.eventRepository.dataSource.execute(fullQueryEvents, ['en', lang, event_id]),
        this.informationRepository.dataSource.execute(fullQueryinfo, ['en', lang, info_id]),
        this.processRepository.dataSource.execute(fullQueryProcesses, ['en', lang, process_ids])
      ])
      if(full_results[0].length>0){
        full_results[0].forEach((el:any)=>{
          if(el.topics){
            let temp =  el.topics.some((el:any)=>  {return the_topics.includes(el)})
            if(temp){
              events.push(el)
            }
          }

        })
      }
      if(full_results[1].length>0){
        full_results[1].forEach((el:any)=>{
          if(el.topics){
            let temp =  el.topics.some((el:any)=>  {return the_topics.includes(el)})
            if(temp){
              info.push(el)
            }
          }

        })
      } 
      if(full_results[2].length>0){
        full_results[2].forEach((el:any)=>{
          if(el.topics){
            let temp =  el.topics.some((el:any)=>  {return the_topics.includes(el)})
            if(temp){
              processes.push(el)
            }
          }

        })
      }  
      
      
      
      return {
        "events": events,
        "information": info,
        "processes": processes
      }

    }
    else{
      full_results =  await Promise.all([
        this.eventRepository.dataSource.execute(fullQueryEvents, ['en', lang, event_id ]),
        this.informationRepository.dataSource.execute(fullQueryinfo, ['en', lang, info_id ]),
        this.processRepository.dataSource.execute(fullQueryProcesses, ['en', lang, process_ids])
      ]) 
      return {
        "events": full_results[0],
        "information": full_results[1],
        "processes": full_results[2]
      }
    }

    //console.log(full_results)
    //for every entity we need to search on the repository with where id in id list from previous search
    /*return {
      "events": full_results[0],
      "information": full_results[1],
      "processes": full_results[2]
    }*/
  }
}