import { IActivity } from "../../../Domain/Activity";
import { IActivitiesGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesGateway/ActivitiesGateway.interface";

class FakeActivitiesGateway implements IActivitiesGateway {
  private map = new Map<string, IActivity>();

  async save(activity: IActivity): Promise<IActivity> {
    this.map.set(activity.activityId, activity);
    return activity;
  }

  async findById(id: string): Promise<IActivity | undefined> {
    return this.map.get(id);
  }

  async getAll(): Promise<IActivity[]> {
    const activities: IActivity[] = [];

    this.map.forEach((activity) => {
      activities.push(activity);
    });
    activities.reverse();

    return activities;
  }

  deleteAll() {
    this.map.clear();
  }
}

export { FakeActivitiesGateway };
