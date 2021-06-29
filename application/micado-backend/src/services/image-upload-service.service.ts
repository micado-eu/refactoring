import { bind, /* inject, */ BindingScope, config, Provider, BindingKey, ContextTags } from '@loopback/core';
import multer from 'multer';
import * as path from 'path';
import {v4 as uuidv4} from 'uuid';
/*
 * Fix the service type. Possible options can be:
 * - import {FileUploadService} from 'your-module';
 * - export type FileUploadService = string;
 * - export interface FileUploadService {}
 */
import { RequestHandler } from 'express-serve-static-core';
export type ImageUploadService = RequestHandler;

export const IMAGE_UPLOAD_SERVICE = BindingKey.create<ImageUploadService>(
  'services.ImageUpload',
);

//export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

@bind({ scope: BindingScope.TRANSIENT, tags: { [ContextTags.KEY]: IMAGE_UPLOAD_SERVICE }, })
export class ImageUploadServiceProvider implements Provider<ImageUploadService> {
  private static readonly MAX_SIZE_MB = 25
  private static readonly VALID_MIMETYPES = ['image/bmp', 'image/gif', 'image/x-icon', 'image/jpeg', 'image/png', 'image/svg+xml']

  constructor(/* Add @inject to inject parameters */@config() private options: multer.Options = {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/images/')
      },
      filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext)
      }
    }),
    fileFilter: function (req, file, callback) {
      if (!ImageUploadServiceProvider.VALID_MIMETYPES.includes(file.mimetype)) {
        return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
    },
    limits: {
      fileSize: 1024 * 1024 * ImageUploadServiceProvider.MAX_SIZE_MB // Max 25 MB
    }
  }) { }

  value(): ImageUploadService {
    return multer(this.options).any();
  }
}