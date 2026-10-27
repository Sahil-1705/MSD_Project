const net = require('net');

function assertPortAvailable(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.once('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use. Stop that process before starting the app.`));
        return;
      }

      reject(error);
    });

    server.listen(port, () => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });
}

async function main() {
  for (const port of [5000, 5173]) {
    await assertPortAvailable(port);
  }
}

main().catch((error) => {
  console.error(`[predev] ${error.message}`);
  process.exitCode = 1;
});
