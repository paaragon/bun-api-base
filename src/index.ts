export default {
    port: normalizedPort(),
    fetch(request: Request) {
        console.log(`Server started at ${normalizedPort()}`);
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

function normalizedPort() {
    return process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
}