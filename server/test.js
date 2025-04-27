const { spawn } = require("child_process");
const http = require("http");

console.log("🚀 Starting backend with npm run dev...");
const server = spawn("npm", ["run", "dev"], { shell: true });

server.stdout.on("data", (data) => {
  console.log(`[server]: ${data}`);
});

server.stderr.on("data", (data) => {
  console.error(`[error]: ${data}`);
});

// Wait 8 sec for server to start
setTimeout(() => {
  console.log("🧪 Running health check...");

  http.get("http://localhost:8000", (res) => {
    if (res.statusCode === 200) {
      console.log("✅ Server is healthy!");
      process.exit(0);
    } else {
      console.error("❌ Status code:", res.statusCode);
      process.exit(1);
    }
  }).on("error", (err) => {
    console.error("❌ Health check failed:", err.message);
    process.exit(1);
  });

}, 15000);