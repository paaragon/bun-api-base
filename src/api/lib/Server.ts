import APIRequest from './APIRequest';
import APIResponse from './APIResponse';

export interface Endpoint {
    method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' | string;
    path: string;
    handler: (request: APIRequest) => Promise<APIResponse>
}

export default class Server {
    constructor(
        public port: number,
        public endpoints: Endpoint[]
    ) { }

    start() {
        Bun.serve({
            port: this.port,
            fetch: (request: Request) => this.onFetch(request),
            error: (error: Error) => this.onError(error),
        });
    }

    private async onFetch(request: Request) {
        const { url, method } = request;
        const { pathname, searchParams } = new URL(url);

        const endpoint = this.matchRequestEndpoint(method, pathname);
        if (!endpoint) {
            return this.notFound();
        }

        try {
            const apiRequest = await APIRequest.fromRequest(request, endpoint, searchParams);
            const apiResponse = await endpoint.handler(apiRequest);
            return new Response(JSON.stringify(apiResponse),
                { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
        } catch (e) {
            return new Response(
                JSON.stringify({ error: true, message: e }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    private onError(error: Error) {
        console.log(error);
        return new Response("Uh oh!!\n" + error.toString(), { status: 500 });
    }

    private notFound() {
        return new Response(
            JSON.stringify({ error: true, message: 'Not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    private matchRequestEndpoint(method: string, pathname: string): Endpoint | undefined {
        for (const ep of this.endpoints) {
            const regExp = new RegExp(`${ep.method} ${ep.path}`);
            const test = regExp.test(`${method} ${pathname}`)
            if (test) {
                return ep;
            }
        }

        return;
    }
}