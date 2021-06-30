//import {Keycloak} from 'keycloak-connect';
import KeycloakConnect = require('keycloak-connect');
//import BearerStore = require('keycloak-connect/stores/bearer-store');
import cookieSession from 'cookie-session';
const requester = require("request");
const util = require('util')
const requestPromise = util.promisify(requester);
import { RequestContext, Request, Response } from '@loopback/rest';
import { inject, Provider, Getter, Setter } from '@loopback/context';
import { oc } from 'ts-optchain';
import {
  AuthorizationBindings,
  AuthorizeAction,
  RolesMetadata
} from '../../../lb4-authorization/src';
import {
  Middleware,
  MiddlewareChain,
  NextFunction,
  runMiddleware
} from 'middleware-runner';
import {
  AccessToken,
  AuthorizationKeycloakBindings,
  KeycloakClientConfig,
  KeycloakRequest,
  KeycloakTokenContent,
  User
} from '../types';

const { env } = process;

export class KeycloakAuthorizeActionProvider
  implements Provider<AuthorizeAction> {
  cookieMiddleware: Middleware;

  keycloak: KeycloakConnect.Keycloak;
  //bt: BearerStore;

  keycloakMiddleware: Middleware;

  constructor(
    @inject.getter(AuthorizationBindings.Providers.ROLES_METADATA)
    public getRolesMetadata: Getter<RolesMetadata>,
    @inject.setter(AuthorizationBindings.Providers.CURRENT_USER)
    readonly setCurrentUser: Setter<User>,
    @inject(AuthorizationKeycloakBindings.Providers.KEYCLOAK_CLIENT_CONFIG, {
      optional: true
    })
    public keycloakClientConfig: KeycloakClientConfig
  ) {
    this.keycloak = new KeycloakConnect({}, keycloakClientConfig || {});
    this.cookieMiddleware = cookieSession({
      secret: env.COOKIE_SECRET || 'some-secret',
      name: 'keycloak_grant',
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });
    this.keycloakMiddleware = (this.keycloak.middleware({
      logout: '/logout'
    }) as unknown) as Middleware;
  }

  value (): AuthorizeAction {
    return (context: RequestContext) => this.action(context);
  }


  async action (context: RequestContext): Promise<boolean> {
    const { request, response } = context;
    const rolesMetadata = await this.getRolesMetadata();

    const keycloakHost = 'keycloak';
    const keycloakPort = '8080';
    const realmName = 'migrants';

    console.log("SONO NELLA ACTION DI KEYCLOAK PROVIDER")
    console.log("request")
    //    console.log(request)
    console.log("context")
    //    console.log(context)
    console.log("rolesMetadata")
    console.log(rolesMetadata)
    console.log("this.keycloak")
    console.log(this.keycloak)
    console.log("this.cookieMiddleware")
    console.log(this.cookieMiddleware)
    console.log("this.keycloakMiddleware")
    console.log(this.keycloakMiddleware)
    console.log("this.userMiddleware")
    console.log(this.userMiddleware)

    console.log("########")
    if (request.headers.authorization) {
      // configure the request to your keycloak server
      const options = {
        method: 'GET',
        url: `http://${keycloakHost}:${keycloakPort}/auth/realms/${realmName}/protocol/openid-connect/userinfo`,
        headers: {
          // add the token you received to the userinfo request, sent to keycloak
          Authorization: request.headers.authorization,
        },
      };
      console.log("there is a token")
      console.log(request.headers.authorization)
      console.log(options)
      // send a request to the userinfo endpoint on keycloak
      const response = await requestPromise(options, (error: any, response: any, body: any) => {
        console.log("in the requester function return")
        console.log(error)
        if (error) {
          console.log(error)
          console.log(response.statusCode)
          console.log(body)
        }
        console.log(error)
        console.log(response.statusCode)
        console.log(body)

        // if the request status isn't "OK", the token is invalid
        if (response.statusCode !== 200) {
          console.log("token is invalid")
          console.log(body.error)
        }
        // the token is valid pass request onto your next function
        else {
          //      next();
          console.log("token valid")
        }
        return
      })
      console.log("after requester")
    } else {
      console.log("there is no token")
    }
    console.log("########")


    if (!oc(rolesMetadata).roleNames([]).length) return true;
    const user = await runMiddleware<User>(request, response, [
      this.cookieMiddleware,
      //     this.keycloakMiddleware,
      //this.getProtectMiddleware(rolesMetadata),
      //this.userMiddleware
    ]);
    this.setCurrentUser(user);
    //return !!user.id;
    return true;
  }

  getProtectMiddleware (rolesMetadata: RolesMetadata): MiddlewareChain {
    console.log("getProtectMiddleware")
    //this.keycloak.
    let x = oc(rolesMetadata).roleNames([]).length
      ? oc(rolesMetadata)
        .roleNames([])
        .map(roleName => this.keycloak.protect(roleName))
      : this.keycloak.protect();
    console.log(x);
    return x;
  }

  userMiddleware (request: Request, _response: Response, next: NextFunction) {
    const keycloakRequest = request as KeycloakRequest;
    const accessToken: AccessToken | null = oc(
      keycloakRequest
    ).kauth.grant.access_token(null);
    console.log("in usermiddleware")
    console.log(accessToken)
    if (!accessToken) {
      console.log("no access token")
      throw Error(
        `No access token provided in grant. Grant:" ${JSON.stringify(
          oc(keycloakRequest).kauth.grant({ access_token: { content: null } })
        )}`
      );
    }
    const tokenContent: KeycloakTokenContent = accessToken.content as KeycloakTokenContent;
    if (!tokenContent) {
      throw Error(
        `No content provided in access token. Access token:" ${JSON.stringify(
          accessToken
        )}`
      );
    }
    const user: User = {
      email: tokenContent.email,
      id: tokenContent.sub,
      name: `${tokenContent.given_name} ${tokenContent.family_name}`,
      teams: tokenContent.groups
    };
    return next(null, user);
  }
}
