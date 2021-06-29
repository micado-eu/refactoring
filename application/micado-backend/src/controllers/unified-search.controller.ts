// Uncomment these imports to begin using these cool features!
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
import { Process } from '../models';
import { ProcessRepository } from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository,InformationRepository,EventRepository,TopicRepository } from '../repositories';
// import {inject} from '@loopback/context';


export class UnifiedSearchController {
  constructor(
    @repository(ProcessRepository) public processRepository: ProcessRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
    @repository(InformationRepository) public informationRepository: InformationRepository,
    @repository(EventRepository) public eventRepository: EventRepository,
    @repository(TopicRepository) public topicRepository: TopicRepository,
  ) {}


  @get('/unified-search', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async topicsearch (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en',
    @param.query.number('topic') topic:number

  ): Promise<any> {
    let processes:any = []
    let information:any =[]
    let events:any=[]
    if(topic == undefined){
      console.log("inside if")
       processes = await this.processRepository.dataSource.execute(
        "select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation_prod tt on t.id=tt.id and tt.lang=$2 where NOT EXISTS(SELECT * from process_topic pt2 WHERE pt2.id_process =t.id) union select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation_prod tt on t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from process t inner join process_translation_prod tt on t.id = tt.id and tt.lang = $2)",
        [defaultlang, currentlang]
      );
      information = await this.informationRepository.dataSource.execute(`
    select
      *,
      (
      select
        to_jsonb(array_agg(it.id_topic))
      from
        information_topic it
      where
        it.id_information = t.id) as topics,
      (
      select
        to_jsonb(array_agg(iu.id_user_types))
      from
        information_user_types iu
      where
        iu.id_information = t.id) as users
    from
      information t
    inner join information_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2
    where not EXISTS(SELECT * from information_topic pt2 WHERE pt2.id_information =t.id and pt2.id_topic =4)
    union
    select
      *,
      (
      select
        to_jsonb(array_agg(it.id_topic))
      from
        information_topic it
      where
        it.id_information = t.id) as topics,
      (
      select
        to_jsonb(array_agg(iu.id_user_types))
      from
        information_user_types iu
      where
        iu.id_information = t.id) as users
    from
      information t
    inner join information_translation_prod tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
        information t
      inner join information_translation_prod tt on
        t.id = tt.id
        and tt.lang = $2)
  `,
        [defaultlang, currentlang]
      );
      events = await this.eventRepository.dataSource.execute(`
  select
    *,
    (
    select
      to_jsonb(array_agg(it.id_topic))
    from
      event_topic it
    where
      it.id_event = t.id) as topics,
    (
    select
      to_jsonb(array_agg(iu.id_user_types))
    from
      event_user_types iu
    where
      iu.id_event = t.id) as users
  from
    event t
  inner join event_translation_prod tt on
    t.id = tt.id
    and tt.lang = $2
  where not EXISTS(SELECT * from event_topic pt2 WHERE pt2.id_event =t.id and pt2.id_topic =4)
  union
  select
    *,
    (
    select
      to_jsonb(array_agg(it.id_topic))
    from
      event_topic it
    where
      it.id_event = t.id) as topics,
    (
    select
      to_jsonb(array_agg(iu.id_user_types))
    from
      event_user_types iu
    where
      iu.id_event = t.id) as users
  from
    event t
  inner join event_translation_prod tt on
    t.id = tt.id
    and tt.lang = $1
    and t.id not in (
    select
      t.id
    from
      event t
    inner join event_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2)
`,
        [defaultlang, currentlang]
      );
    }
    else{
      console.log("inside else")
       processes = await this.processRepository.dataSource.execute("select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation_prod tt on t.id=tt.id and tt.lang=$2 where EXISTS(SELECT * from process_topic pt2 WHERE pt2.id_process =t.id and pt2.id_topic =$3) union select *, (select to_jsonb(array_agg(pt.id_topic)) from process_topic pt where pt.id_process=t.id) as topics, (select to_jsonb(array_agg(pu.id_user_types)) from process_users pu where pu.id_process=t.id) as users,(select coalesce(avg(value),0) from ratings r where r.content_type=1 AND r.content_id=t.id) as rating from process t inner join process_translation_prod tt on t.id = tt.id and tt.lang = $1 and t.id not in (select t.id from process t inner join process_translation_prod tt on t.id = tt.id and tt.lang = $2)",
       [defaultlang, currentlang, topic]);
     information = await this.informationRepository.dataSource.execute(`
    select
      *,
      (
      select
        to_jsonb(array_agg(it.id_topic))
      from
        information_topic it
      where
        it.id_information = t.id) as topics,
      (
      select
        to_jsonb(array_agg(iu.id_user_types))
      from
        information_user_types iu
      where
        iu.id_information = t.id) as users
    from
      information t
    inner join information_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2
    where EXISTS(SELECT * from information_topic pt2 WHERE pt2.id_information =t.id and pt2.id_topic =4)
    union
    select
      *,
      (
      select
        to_jsonb(array_agg(it.id_topic))
      from
        information_topic it
      where
        it.id_information = t.id) as topics,
      (
      select
        to_jsonb(array_agg(iu.id_user_types))
      from
        information_user_types iu
      where
        iu.id_information = t.id) as users
    from
      information t
    inner join information_translation_prod tt on
      t.id = tt.id
      and tt.lang = $1
      and t.id not in (
      select
        t.id
      from
        information t
      inner join information_translation_prod tt on
        t.id = tt.id
        and tt.lang = $2)
  `);
   events = await this.eventRepository.dataSource.execute(`
  select
    *,
    (
    select
      to_jsonb(array_agg(it.id_topic))
    from
      event_topic it
    where
      it.id_event = t.id) as topics,
    (
    select
      to_jsonb(array_agg(iu.id_user_types))
    from
      event_user_types iu
    where
      iu.id_event = t.id) as users
  from
    event t
  inner join event_translation_prod tt on
    t.id = tt.id
    and tt.lang = $2
  where EXISTS(SELECT * from event_topic pt2 WHERE pt2.id_event =t.id and pt2.id_topic =4)
  union
  select
    *,
    (
    select
      to_jsonb(array_agg(it.id_topic))
    from
      event_topic it
    where
      it.id_event = t.id) as topics,
    (
    select
      to_jsonb(array_agg(iu.id_user_types))
    from
      event_user_types iu
    where
      iu.id_event = t.id) as users
  from
    event t
  inner join event_translation_prod tt on
    t.id = tt.id
    and tt.lang = $1
    and t.id not in (
    select
      t.id
    from
      event t
    inner join event_translation_prod tt on
      t.id = tt.id
      and tt.lang = $2)
`);
    }
    
  let results = {process:processes, information:information, events:events}
  return results
  }


  @get('/parent-topics', {
    responses: {
      '200': {
        description: 'Process model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async parenttopic (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en'
  ): Promise<any> {
    let topics:any = await this.topicRepository.dataSource.execute("select * from topic t inner join topic_translation_prod tt on t.id=tt.id and tt.lang=$2 union select * from topic t inner join topic_translation_prod  tt on t.id = tt.id and tt.lang = $1and t.id not in (select t.id from topic t inner join topic_translation_prod tt on t.id = tt.id and tt.lang = $2)",
    [defaultlang, currentlang])
      console.log(topics)

    let settings = await this.settingsRepository.find({});
    let parent_topics_temp:any = settings.filter((el: any) => { return el.key === 'father_topics' })[0].value
    let parent_topics:any = JSON.parse(parent_topics_temp)
    console.log(parent_topics)
    let full_topics:any = []
    parent_topics.forEach((topic:any)=>{
       let temp:any = topics.filter((tp:any)=>{
        return tp.id == topic
      })[0]
      if(temp){
        full_topics.push(temp)
      }
    })
    return full_topics
  }
}
