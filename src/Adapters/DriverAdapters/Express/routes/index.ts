import { Router } from "express";

import { addActivityHandler } from "../controllers/addActivity";
import { getActivitiesHandler } from "../controllers/getActivities";
import { getJoiningActivitiesRequestsHandler } from "../controllers/getJoiningRequests";
import { loginHandler } from "../controllers/login";
import { registerHandler } from "../controllers/register";
import { responseToRequestsHandler } from "../controllers/responseToRequests";
import { sendJoinActivityRequestHandler } from "../controllers/sendJoinActivityRequest";

const router: Router = Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);
router.get("/activities", getActivitiesHandler);
router.post("/addActivity", addActivityHandler);
router.get("/joinActivitiesRequests", getJoiningActivitiesRequestsHandler);
router.put("/responseToJoiningRequests", responseToRequestsHandler);
router.post("/sendJoinActivityRequest", sendJoinActivityRequestHandler);

export default router;
