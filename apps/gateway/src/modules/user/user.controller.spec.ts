import {UserController} from "./user.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {ClientProxy, ClientsModule, Transport} from "@nestjs/microservices";

describe('UserController', () => {
    let mockUserController: UserController
    let mockUserServiceClient: ClientProxy

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ClientsModule.register([
                    {
                        name: 'USER_SERVICE',
                        transport: Transport.TCP,
                        options: {
                            host: 'user-service'
                        }
                    },
                ]),
            ],
            controllers: [UserController]
        }).compile()
        mockUserController = module.get<UserController>(UserController)
        mockUserServiceClient = module.get<ClientProxy>('USER_SERVICE')
    })

    it('should be defined', function () {
        expect(mockUserController).toBeDefined()
        expect(mockUserServiceClient).toBeDefined()
    });

})