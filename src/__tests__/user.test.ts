import request from "supertest";
import app from "../app";
import userQueries from "../db/queries/user";
import { usersDB } from "../db/models/user";
import { makeRequest, createTestUser, loginTestUser, getAuthCookies, getAdminAuthCookies } from "./helpers/test-utils";

describe("User API - POST /api/v1/user/register", () => {

  it("should register a new user successfully", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const response = await makeRequest()
      .post("/api/v1/user/register")
      .send(userData)
      .expect(200);

  });

  it("should return error if user already exists", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    // Create user first
    await createTestUser(userData);

    // Try to create same user again
    const response = await makeRequest()
      .post("/api/v1/user/register")
      .send(userData)
      .expect(500);
  });
});

describe("User API - POST /api/v1/user/login", () => {

  beforeEach(async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    };
    await createTestUser(userData);
  });

  it("should login with valid credentials", async () => {
    const credentials = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await makeRequest()
      .post("/api/v1/user/login")
      .send(credentials)
      .expect(200);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User logged in successfully");

    // Verify cookie was set
    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(Array.isArray(cookies)).toBe(true);
    expect(cookies.length).toBeGreaterThan(0);
    expect(cookies[0]).toContain("token=");
  });

  it("should return error for non-existent user", async () => {
    const credentials = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    const response = await makeRequest()
      .post("/api/v1/user/login")
      .send(credentials)
      .expect(500);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("User not found");
  });

  it("should return error for invalid password", async () => {
    const credentials = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    const response = await makeRequest()
      .post("/api/v1/user/login")
      .send(credentials)
      .expect(500);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Invalid password");
  });


});