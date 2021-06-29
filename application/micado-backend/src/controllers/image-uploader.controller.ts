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
  get,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import { ImageUploadService, IMAGE_UPLOAD_SERVICE } from '../services/image-upload-service.service'
import csv from 'csv-parser'
import fs from 'fs';
import path from 'path';



export class ImageUploaderController {
  constructor(
    @inject(IMAGE_UPLOAD_SERVICE) private handler: ImageUploadService,
  ) { }

  @post('/upload-image', {
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
  async imageUpload (
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {

    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {

          let uploadedPayload: any = ImageUploaderController.getFilesAndFields(request)
          resolve(uploadedPayload);
        }
      });
    });
  }

  @get('/list-image', {
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
  async listImages (
  ): Promise<object> {
    return fs.promises.readdir("/images/")
    /*
      .then(filenames => {
        for (let filename of filenames) {
          console.log(filename)
        }
        return new Promise(()=>{return filenames})
      })
      // If promise is rejected 
      .catch(err => {
        console.log(err)
      })
      */
  }
  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields (request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      mimetype: f.mimetype,
      size: f.size,
      new_filename: f.filename
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

}
