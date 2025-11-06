import dotenv from "dotenv";

// Load environment variables for testing
dotenv.config({ path: ".env.test" });

// Set default JWT_SECRET if not provided
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "test-secret-key-for-jwt";
}

