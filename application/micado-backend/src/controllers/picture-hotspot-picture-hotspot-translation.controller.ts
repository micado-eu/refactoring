import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  PictureHotspot,
  PictureHotspotTranslation,
} from '../models';
import { PictureHotspotRepository } from '../repositories';
import { SettingsRepository } from '../repositories';
import { LanguagesRepository } from '../repositories';


export class PictureHotspotPictureHotspotTranslationController {
  constructor(
    @repository(PictureHotspotRepository) protected pictureHotspotRepository: PictureHotspotRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
    @repository(LanguagesRepository) protected languagesRepository: LanguagesRepository,
  ) { }

  @get('/picture-hotspots/{id}/picture-hotspot-translations', {
    responses: {
      '200': {
        description: 'Array of PictureHotspot has many PictureHotspotTranslation',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PictureHotspotTranslation) },
          },
        },
      },
    },
  })
  async find (
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PictureHotspotTranslation>,
  ): Promise<PictureHotspotTranslation[]> {
    return this.pictureHotspotRepository.translations(id).find(filter);
  }

  @post('/picture-hotspots/{id}/picture-hotspot-translations', {
    responses: {
      '200': {
        description: 'PictureHotspot model instance',
        content: { 'application/json': { schema: getModelSchemaRef(PictureHotspotTranslation) } },
      },
    },
  })
  async create (
    @param.path.number('id') id: typeof PictureHotspot.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspotTranslation, {
            title: 'NewPictureHotspotTranslationInPictureHotspot',
            //           exclude: ['phtId'],
            optional: ['phtId']
          }),
        },
      },
    }) pictureHotspotTranslation: PictureHotspotTranslation,
    //    }) pictureHotspotTranslation: Omit < PictureHotspotTranslation, 'phtId' >,
  ): Promise<PictureHotspotTranslation> {
    return this.pictureHotspotRepository.translations(id).create(pictureHotspotTranslation);
  }

  @patch('/picture-hotspots/{id}/picture-hotspot-translations', {
    responses: {
      '200': {
        description: 'PictureHotspot.PictureHotspotTranslation PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch (
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PictureHotspotTranslation, { partial: true }),
        },
      },
    })
    pictureHotspotTranslation: Partial<PictureHotspotTranslation>,
    @param.query.object('where', getWhereSchemaFor(PictureHotspotTranslation)) where?: Where<PictureHotspotTranslation>,
  ): Promise<Count> {
    return this.pictureHotspotRepository.translations(id).patch(pictureHotspotTranslation, where);
  }

  @del('/picture-hotspots/{id}/picture-hotspot-translations', {
    responses: {
      '200': {
        description: 'PictureHotspot.PictureHotspotTranslation DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete (
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PictureHotspotTranslation)) where?: Where<PictureHotspotTranslation>,
  ): Promise<Count> {
    return this.pictureHotspotRepository.translations(id).delete(where);
  }

  @get('/picture-hotspots-migrant', {
    responses: {
      '200': {
        description: 'picture hotspots GET for the frontend',
      },
    },
  })
  async translatedunion (
    @param.query.string('defaultlang') defaultlang = 'en',
    @param.query.string('currentlang') currentlang = 'en',
    @param.query.number('pictureId') pictureId:number
  ): Promise<void> {
    let selected_spot:any
    await this.pictureHotspotRepository.dataSource.execute(
      "select * from picture_hotspot t inner join picture_hotspot_translation_prod tt on t.id=tt.pht_id and tt.lang=$2 union select * from picture_hotspot t inner join picture_hotspot_translation_prod tt on t.id = tt.pht_id and tt.lang = $1 and t.id not in (select t.id from picture_hotspot t inner join picture_hotspot_translation_prod tt on t.id = tt.pht_id and tt.lang = $2)",
      [defaultlang, currentlang]
    ).then((spots)=>{
        console.log("i a spots")
        console.log(spots)
        selected_spot =  spots.filter((sp:any)=>{
          return sp.picture_id == pictureId
        })
        console.log(selected_spot)
        
      })
      return selected_spot
  }

  @get('/picture-hotspots/to-production', {
    responses: {
      '200': {
        description: 'process GET for the frontend',
      },
    },
  })
  async publish (
    @param.query.number('pht_id') pht_id:number,
  ): Promise<void> {
    let settings = await this.settingsRepository.find({});
    //   let lang_filter = { where: { active: true } }
    let languages = await this.languagesRepository.find({ where: { active: true } });
    let def_lang = settings.filter((el: any) => { return el.key === 'default_language' })[0]
    let idx = languages.findIndex(el => el.lang == def_lang.value)
    languages.splice(idx, 1)
    this.pictureHotspotRepository.dataSource.execute("insert into picture_hotspot_translation_prod(pht_id, lang ,title, message) select picture_hotspot_translation.pht_id, picture_hotspot_translation.lang, picture_hotspot_translation.title, picture_hotspot_translation.message from picture_hotspot_translation where "+'"translationState"'+" >= '2' and pht_id=$1 and lang=$2", [pht_id, def_lang.value]);
    languages.forEach((lang:any)=>{
      this.pictureHotspotRepository.dataSource.execute("insert into picture_hotspot_translation_prod(pht_id, lang ,title, message) select picture_hotspot_translation.pht_id, picture_hotspot_translation.lang, picture_hotspot_translation.title, picture_hotspot_translation.message from picture_hotspot_translation where "+'"translationState"'+" > '2' and pht_id=$1 and lang=$2", [pht_id, lang.lang]);
    })
  }
}
