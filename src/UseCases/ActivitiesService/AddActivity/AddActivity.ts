import { Activity } from "../../../Domain/Activity";
import { tokenManager } from "../../../Adapters/DrivenAdapters";
import { IActivitiesGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesGateway/ActivitiesGateway.interface";

type ActivityArgs = {
  authToken: string;
  title: string;
  desc: string;
};

class AddActivityFactory {
  constructor(private readonly activitiesGateway: IActivitiesGateway) {}

  async add(args: ActivityArgs) {
    const authUserId = tokenManager.decode(args.authToken);
    const activity = new Activity({ ownerId: authUserId, ...args });

    await this.activitiesGateway.save(activity);

    return activity.info();
  }
}

export { AddActivityFactory };
