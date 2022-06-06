export default class APIRequest {
    public body: JSON;
    public headers: any;
    public query: any;
    public params: any;

    constructor() { }

    public static async fromRequest(req: Request): Promise<APIRequest> {
        const apiReq = new APIRequest();
        apiReq.body = await req.json();
        apiReq.headers = {}; // TODO - parse headers
        apiReq.query = {}; // TODO - parse query params
        apiReq.params = {}; // TODO - parse url patams

        return apiReq;
    }
}