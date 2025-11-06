import request from "supertest";
import app from "../../app";

const TEST_SERVER_URL = process.env.TEST_SERVER_URL;
const isIntegrationTest = !!TEST_SERVER_URL;

export const makeRequest = () => {
  if (isIntegrationTest) {
    return request(TEST_SERVER_URL!);
  }
  return request(app);
};

export const createTestUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await makeRequest()
    .post("/api/v1/user/register")
    .send(userData);
  return response;
};

export const loginTestUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await makeRequest()
    .post("/api/v1/user/login")
    .send(credentials);
  return response;
};

export const getAuthCookies = async (credentials: {
  email: string;
  password: string;
}) => {
  const loginResponse = await loginTestUser(credentials);

  return loginResponse.headers['set-cookie'];
};

export const getAdminAuthCookies = async () => {
  // process.env.MASTER_PASSWORD = "1234567890";
  await makeRequest()
    .post("/api/v1/user/register-admin")
    .send({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      masterPassword: "1234567890",
    });

  const loginResponse = await loginTestUser({
    email: "admin@example.com",
    password: "admin123",
  });

  return loginResponse.headers['set-cookie'];
};
