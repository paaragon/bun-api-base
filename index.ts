export default {
    port: 3001,
    fetch(request: Request) {
        const { url, method } = request;
        const { pathname } = new URL(url);

        return new Response(
            JSON.stringify({ result: 'Hello World!' }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}