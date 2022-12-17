import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseWithSchema = (model?: Function | string) => {
    return applyDecorators(
        ApiOkResponse({
            status: 200,
            schema: {
                properties: {
                    meta: {
                        type: 'object',
                        properties: {
                            requestId: {
                                type: 'string'
                            }
                        }
                    },
                    result: model ? { $ref: getSchemaPath(model), type: 'object' } : { type: 'object' }
                }
            }
        })
    );
};
