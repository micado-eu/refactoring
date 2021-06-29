import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
// for keycloak
import { AuthorizationBindings, AuthorizeAction } from './comp/lb4-authorization/src';

const SequenceActions = RestBindings.SequenceActions;

export class MySequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthorizationBindings.Providers.AUTHORIZE_ACTION) public authorize: AuthorizeAction
  ) { }

  async handle (context: RequestContext) {
    try {
      const { request, response } = context;
      const route = this.findRoute(request);
      console.log("-----------------")

      console.log(route.path);
      console.log("******************************")
      // !!IMPORTANT: authenticateRequest fails on static routes!
      if (!((route.path == '/') || (route.path == '/explorer') || (route.path == '/favicon.ico'))) {
        // Verify authentication cases
        await this.authorize(context);
        console.log("nell if")
      }


      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
