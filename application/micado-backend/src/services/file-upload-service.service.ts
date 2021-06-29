import { bind, /* inject, */ BindingScope, config, Provider, BindingKey, ContextTags } from '@loopback/core';
import multer from 'multer';
/*
 * Fix the service type. Possible options can be:
 * - import {FileUploadService} from 'your-module';
 * - export type FileUploadService = string;
 * - export interface FileUploadService {}
 */
import { RequestHandler } from 'express-serve-static-core';
export type FileUploadService = RequestHandler;

export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadService>(
  'services.FileUpload',
);

export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');

@bind({ scope: BindingScope.TRANSIENT, tags: { [ContextTags.KEY]: FILE_UPLOAD_SERVICE }, })
export class FileUploadServiceProvider implements Provider<FileUploadService> {
  constructor(/* Add @inject to inject parameters */@config() private options: multer.Options = {}) { }

  value (): FileUploadService {
    return multer(this.options).any();
  }
}
