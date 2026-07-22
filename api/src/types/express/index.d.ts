import { AccessTokenPayload } from "../../utils/jwtTokenHelper";
import { RequestContext } from "../../setup/requestContext";

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
      auth?: AccessTokenPayload.data;
    }
  }
}
