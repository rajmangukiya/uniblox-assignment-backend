import express from "express";
import orderContoller from "./controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth({ isAdmin: false }), orderContoller.createOrder);
router.get("/", auth({ isAdmin: false }), orderContoller.getOrders);
router.get("/analytics", auth({ isAdmin: true }), orderContoller.getAnalytics);

export default router;  