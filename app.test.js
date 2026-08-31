const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

const app = require("./app");

test("GET / returns the CI/CD success message", async () => {
    const server = http.createServer(app);

    await new Promise(resolve => server.listen(0, resolve));

    const port = server.address().port;

    const response = await new Promise((resolve, reject) => {
        http.get(`http://localhost:${port}/`, res => {
            let data = "";

            res.on("data", chunk => {
                data += chunk;
            });

            res.on("end", () => {
                resolve({
                    statusCode: res.statusCode,
                    body: data
                });
            });
        }).on("error", reject);
    });

    server.close();

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(
        response.body,
        "Hello! CI/CD pipeline is Working Successfully!"
    );
});
