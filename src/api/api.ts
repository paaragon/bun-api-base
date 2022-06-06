import UserController from './controllers/UserController';
import Server, { Endpoint } from './lib/Server';

function normalizedPort(): number {
    return process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
}

const port = normalizedPort();
console.log(`Server started at port ${port}`);

const userController = new UserController();

const endpoints: Endpoint[] = [
    { path: '/api/v1/user', method: 'GET', handler: userController.getUsers },
    { path: '/api/v1/user', method: 'POST', handler: userController.getUsers },
    { path: '/api/v1/user/(.*)', method: 'GET', handler: userController.getUserById },
]

const server = new Server(port, endpoints);

export default server.start();