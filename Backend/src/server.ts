import app from "./app";
import { env } from "./config/env";
import { disconnectPrisma } from "./config/db";

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on port: http://localhost:${env.PORT}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);
  
  server.close(async () => {
    console.log("HTTP server closed.");
    
    try {
      await disconnectPrisma();
      console.log("Database connections closed.");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
