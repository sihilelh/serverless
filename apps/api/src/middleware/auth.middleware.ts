import { Request } from "../common/types/http.interface";

export const authMiddleware = (req: Request, next: () => void) => {
  next();
};
