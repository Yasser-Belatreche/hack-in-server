import { Activity, IActivity } from "../../../../Domain/Activity";
import { ActivityModel } from "../_SETUP_/Mongo/models/Activity.model";
import { IActivitiesGateway } from "./ActivitiesGateway.interface";

class ActivitiesGateway implements IActivitiesGateway {
  async save(activity: IActivity): Promise<IActivity> {
    const info = await ActivityModel.create(activity.info());
    return this.getActivityEntity(info);
  }

  async findById(id: string): Promise<IActivity | undefined> {
    const info = await ActivityModel.findOne({ activityId: id });
    if (!info) return undefined;

    return this.getActivityEntity(info);
  }

  async getAll(): Promise<IActivity[]> {
    const info = await ActivityModel.find();
    return info.map((info) => this.getActivityEntity(info));
  }

  private getActivityEntity(info: ReturnType<IActivity["info"]>): IActivity {
    const activity = new Activity(info);
    activity.activityId = info.activityId;
    activity.createdAt = info.createdAt;
    activity.desc = info.desc;
    activity.ownerId = info.ownerId;
    activity.title = info.title;

    return activity;
  }
}

export { ActivitiesGateway };
