import APIRequest from '../lib/APIRequest';
import APIResponse from '../lib/APIResponse';

export default class UserController {
    constructor() { }

    public async getUsers(request: APIRequest): Promise<APIResponse> {
        return {
            users: [
                {
                    id: '1',
                    name: 'John',
                    lastName: 'Doe',
                    roles: ['user', 'admin']
                },
                {
                    id: '2',
                    name: 'Jane',
                    lastName: 'Doe',
                    roles: ['user', 'admin']
                }
            ]
        };
    }

    public async getUserById(request: APIRequest): Promise<APIResponse> {
        return {
            id: '1',
            name: 'John',
            lastName: 'Doe',
            roles: ['user', 'admin']
        };
    }
}