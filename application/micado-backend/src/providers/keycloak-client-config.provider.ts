import { KeycloakClientConfig } from '../comp/lb4-authorization-keycloak/src';
import { Provider } from '@loopback/context';

export class KeycloakClientConfigProvider
    implements Provider<KeycloakClientConfig> {
    constructor() { }

    value (): KeycloakClientConfig {
        return {
            'auth-server-url': 'http://localhost:8090/auth/',
            'confidential-port': 0,
            'ssl-required': 'external',
            'public-client': true,
            'use-resource-role-mappings': true,
            realm: 'migrants',
            resource: 'migrant_app'
        };
    }
}

