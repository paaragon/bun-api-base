import { Endpoint } from './Server';

export default class APIRequest {
    public body: JSON;
    public headers: any;
    public query: any;
    public params: any;

    constructor() { }

    public static async fromRequest(req: Request, endpoint: Endpoint, searchParams: URLSearchParams): Promise<APIRequest> {
        const apiReq = new APIRequest();
        apiReq.body = await req.json();
        apiReq.headers = {}; // TODO - parse headers
        apiReq.query = APIRequest.getSearchParams(searchParams);
        apiReq.params = {}; // TODO - parse url patams

        return apiReq;
    }

    private static getSearchParams(searchParams: URLSearchParams): { [key: string]: string | string[] } {
        const ret: { [key: string]: string | string[] } = {};
        searchParams.forEach((value, key) => {
            const val = ret[key] ? [...ret[key], value] : value;
            ret[key] = val;
        });

        return ret;
    }
}