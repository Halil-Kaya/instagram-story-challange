import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { CustomException } from '@app/exceptions/exceptions/custom.exception';

export function ApiExceptions(...Exceptions: (new () => CustomException)[]): MethodDecorator {
    const groupedMetadata = Object.fromEntries(
        Exceptions.map((Exception): [number, ApiResponseOptions] => {
            const exception = new Exception() as CustomException;

            // You should use type for circuler dependcy or lazy resolvers
            const m_decorator = ApiProperty({
                example: exception.message,
                type: 'string'
            });

            // You should use type for circuler dependcy or lazy resolvers
            const e_decorator = ApiProperty({
                example: exception.errorCode,
                type: 'string'
            });

            const hs_decorator = ApiProperty({
                example: exception.httpStatusCode,
                type: 'number'
            });

            hs_decorator(Exception.prototype, 'httpStatusCode');
            e_decorator(Exception.prototype, 'errorCode');
            m_decorator(Exception.prototype, 'message');

            return [
                exception.errorCode,
                {
                    description: exception.constructor.name,
                    schema: {
                        properties: {
                            meta: {
                                type: 'object',
                                properties: {
                                    requestId: {
                                        type: 'string',
                                        default: 'req-1'
                                    },
                                    httpStatusCode: {
                                        type: 'number',
                                        default: exception.httpStatusCode
                                    },
                                    errorCode: {
                                        type: 'string',
                                        default: exception.errorCode
                                    },
                                    message: {
                                        type: 'string',
                                        default: exception.message
                                    }
                                }
                            }
                        }
                    }
                }
            ];
        })
    );

    return (target: object, key?: string | symbol, descriptor?: PropertyDescriptor) => {
        const responses = Reflect.getMetadata(DECORATORS.API_RESPONSE, descriptor.value) || {};
        Reflect.defineMetadata(DECORATORS.API_RESPONSE, { ...responses, ...groupedMetadata }, descriptor.value);
        return descriptor;
    };
}
