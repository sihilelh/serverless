import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import { cbError } from '../utils/http.utils';
import { Middleware } from '../common/types/route.interface';
import { Request } from '../common/types/http.interface';



function createAjvInstance() {
  const ajv = new Ajv();
  ajvFormats(ajv);

  ajv.addFormat('date', {
    type: 'string',
    validate: /^\d{4}-\d{2}-\d{2}$/,
  });

  ajv.addFormat('time', {
    type: 'string',
    validate: /^\d{2}:\d{2}$/,
  });

  ajv.addFormat('strict-time', {
    type: 'string',
    validate: /^([01]\d|2[0-3]):([0-5]\d)$/, // AJV will automatically call `.test(value)`
  });

  ajv.addFormat('year', {
    type: 'string',
    validate: /^(19|20)\d{2}$/,
  });

  ajv.addFormat('month', {
    type: 'string',
    validate: /^(0[1-9]|1[0-2])$/,
  });

  ajv.addFormat('iso-timestamp', {
    type: 'string',
    validate: /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z?$/,
  });

  return ajv;
}

export function ValidateRequest(
  schema: object,
): Middleware {
  const ajv = createAjvInstance();

  return async (req: Request, next) => {
    const isValid = ajv.validate(schema, req.body);

    if (!isValid || Object.keys(req.body).length === 0) {
      return cbError(
        "Bad Request",
        400,
        ajv.errorsText(ajv.errors, { separator: '\n' }),
      );
    }

    return next(req);
  };
}

export function ValidateQueryParams(
  schema: any,
): Middleware {
  const ajv = createAjvInstance();

  return async (req: Request, next) => {
    const queryParams: any = req.query;
    for (const query in queryParams) {
      if (schema.properties[query]?.type === 'number') {
        queryParams[query] = parseInt(queryParams[query]);
      } else if (schema.properties[query]?.type === 'boolean') {
        const lowerValue =
          typeof queryParams[query] === 'string'
            ? queryParams[query].toLowerCase()
            : queryParams[query];
        queryParams[query] =
          lowerValue === 'true' ? true : lowerValue === 'false' ? false : undefined;
      }
    }
    const isValid = ajv.validate(schema, queryParams);

    if (!isValid) {
      return cbError(
        "Bad Request",
        400,
        ajv.errorsText(ajv.errors, { separator: '\n' }),
      );
    }

    return next(req);
  };
}
