import { model, Schema } from "mongoose";
import { IActivity } from "../../../../../../Domain/Activity";

const ActivitySchema = new Schema<ReturnType<IActivity["info"]>>({
  activityId: {
    type: String,
    unique: true,
  },
  createdAt: String,
  desc: String,
  ownerId: String,
  title: String,
});

const ActivityModel = model("Activities", ActivitySchema);

export { ActivityModel };
