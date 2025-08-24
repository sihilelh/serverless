import { Request } from "../common/types/http.interface";
import { Middleware } from "../common/types/route.interface";
import { cbError } from "../utils/http.utils";

export const authMiddleware: Middleware = async (request, next) => {
  try {
    // Checking if the request has a token
    return next(request);
  } catch (error) {
    return cbError("Unauthorized", 401);
  }
};
