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
import {service, inject} from '@loopback/core';
import { TopicTranslationRepository } from '../repositories';
import {promises as fsAsync} from 'fs';
import fs from 'fs';
import simpleGit, {SimpleGit} from 'simple-git';
import { TranslationService } from '../services';

export class TranslationController {
  constructor(
    @repository(TopicTranslationRepository) public topicTranslationRepository: TopicTranslationRepository,
    @service() public translationService: TranslationService,
  ) {
   }


  @get('/sendtotranslation', {
    responses: {
      '200': {
        description: 'Topic export',
        content: { 'application/json': { schema: AnyType } },
      },
    },
  })
  async sendtotranslation (

  ): Promise<any> {
    await this.translationService.initializeService();
    //await this.translationService.install();
    await this.translationService.updateTranslatables();
    //await this.translationService.initializeService();
    //this.translationService.uploadTranslatables();
  }

  @get('/translation-statistics', {
    responses: {
      '200': {
        description: 'Statistics of the translations',
        content: { 'application/json': { schema: AnyType } },
      },
    },
  })
  async status (

  ): Promise<any> {
    return this.translationService.getStatistics();
  }
}
