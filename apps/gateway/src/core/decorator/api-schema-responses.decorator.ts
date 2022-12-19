import { applyDecorators } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from "@nestjs/swagger";

export const ApiResponseWithSchema = (status : HttpStatusCodes,model?: Function | string) => {
    return applyDecorators(
        ApiResponse({
            status ,
            schema: {
                properties: {
                    meta: {
                        type: 'object',
                        properties: {
                            requestId: {
                                type: 'string'
                            },
                            headers: {
                                type: 'object'
                            },
                            params: {
                                type: 'object'
                            },
                            status: {
                                type: 'boolean'
                            },
                            errorCode: {
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

export enum HttpStatusCodes {
    OK = 200,
    CREATED = 201
}