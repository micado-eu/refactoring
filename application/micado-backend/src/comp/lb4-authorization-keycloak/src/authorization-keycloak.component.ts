import { AuthorizationBindings } from '../../lb4-authorization/src';
import { Component, ProviderMap } from '@loopback/core';
import { AuthorizationKeycloakBindings } from './types';
import {
  KeycloakClientConfigProvider
} from './providers';
/*
import {
  KeycloakAuthorizeActionProvider,
  KeycloakClientConfigProvider
} from './providers';
*/
export class AuthorizationKeycloakComponent implements Component {
  providers?: ProviderMap;

  constructor() {
    this.providers = {

      [AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG
        .key]: KeycloakClientConfigProvider
    };
  }
  /*
  constructor() {
    this.providers = {
      [AuthorizationBindings.Providers.AUTHORIZE_ACTION
        .key]: KeycloakAuthorizeActionProvider,
      [AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG
        .key]: KeycloakClientConfigProvider
    };
  }
  */
}
