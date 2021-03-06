import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { CrudRestComponent } from '@loopback/rest-crud';
import multer from 'multer';
import { STORAGE_DIRECTORY, FILE_UPLOAD_SERVICE } from './services/file-upload-service.service'
// added for keycloak
import { AuthorizationComponent, AuthorizationBindings } from './comp/lb4-authorization/src';
import {
  AuthorizationKeycloakComponent,
  AuthorizationKeycloakBindings, KeycloakAuthorizeActionProvider
} from './comp/lb4-authorization-keycloak/src';
import { KeycloakClientConfigProvider } from './providers';

export class MicadoBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  // micado_options: any = { rest: {  cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', preflightContinue: false, optionsSuccessStatus: 204, maxAge: 86400, credentials: true,      },    }  };
  constructor(options: ApplicationConfig = { rest: { cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', preflightContinue: false, optionsSuccessStatus: 204, maxAge: 86400, credentials: true, }, } }) {
    super(options);
    // for keycloak
    this.component(AuthorizationComponent);
    this.component(AuthorizationKeycloakComponent);
    this.bind(AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG).toProvider(KeycloakClientConfigProvider);
    this.bind(AuthorizationBindings.Providers.AUTHORIZE_ACTION).toProvider(KeycloakAuthorizeActionProvider);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    // Configure file upload with multer options
    this.configureFileUpload(options.fileStorageDirectory);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.component(CrudRestComponent);
  }

  /**
 * Configure `multer` options for file upload
 */
  protected configureFileUpload (destination?: string) {
    // Upload files to `dist/.sandbox` by default
    destination = destination ?? path.join(__dirname, '../.sandbox');
    this.bind(STORAGE_DIRECTORY).to(destination);
    const multerOptions: multer.Options = {
      storage: multer.diskStorage({
        destination,
        // Use the original file name as is
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    };
    // Configure the file upload service with multer options
    this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
  }
}
