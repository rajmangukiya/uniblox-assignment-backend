import { couponsDB } from "../db/models/coupon";
import couponQueries from "../db/queries/coupon";
import { makeRequest, createTestUser, getAuthCookies, getAdminAuthCookies } from "./helpers/test-utils";

// Clear database before each test
beforeEach(() => {
  couponsDB.length = 0;
});

describe("Coupon API - POST /api/v1/coupon/", () => {
  beforeEach(() => {
    couponsDB.length = 0;
  });

  it("should add coupon successfully as admin", async () => {
    const adminCookies = await getAdminAuthCookies();

    const couponData = {
      code: "SAVE10",
      fixedDiscount: 10,
      nThValue: 2,
    };

    await makeRequest()
      .post("/api/v1/coupon")
      .set("Cookie", adminCookies)
      .send(couponData)
      .expect(200);
  });
});

describe("Coupon API - GET /api/v1/coupon/", () => {

  it("should get all coupons successfully", async () => {
    const adminCookies = await getAdminAuthCookies();

    const response = await makeRequest()
      .get("/api/v1/coupon/")
      .set("Cookie", adminCookies)
      .expect(200);

    console.log('response11', response.body);
  });
});

