import { model, Schema } from "mongoose";
import { IActivityJoiningRequest } from "../../../../../../Domain/ActivityJoiningRequest";

const RequestSchema = new Schema<ReturnType<IActivityJoiningRequest["info"]>>({
  requestId: {
    type: String,
    unique: true,
  },
  activityId: String,
  receiverId: String,
  senderId: String,
  createdAt: String,
  status: String,
});

const ActivityJoiningRequestModel = model(
  "ActivityJoiningRequests",
  RequestSchema
);

export { ActivityJoiningRequestModel };
