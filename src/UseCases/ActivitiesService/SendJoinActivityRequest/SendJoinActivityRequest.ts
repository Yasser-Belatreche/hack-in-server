import type { IActivitiesJoiningRequestsGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesJoiningRequestsGateway/ActivitiesJoiningRequestsGateway.interface";

import { ActivityJoiningRequest } from "../../../Domain/ActivityJoiningRequest";
import { tokenManager } from "../../../Adapters/DrivenAdapters";
import { IActivitiesGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesGateway/ActivitiesGateway.interface";

type ActivityJoinRequestArgs = {
  authToken: string;
  activityId: string;
};

class SendJoinActivityRequestFactory {
  constructor(
    private readonly activitiesJoiningRequestsGateway: IActivitiesJoiningRequestsGateway,
    private readonly activitiesGateway: IActivitiesGateway
  ) {}

  async send(args: ActivityJoinRequestArgs) {
    const { activityId, authToken } = args;
    const authUserId = tokenManager.decode(authToken);

    const activity = await this.activitiesGateway.findById(activityId);
    if (!activity) throw new Error("no activity found");

    const receiverId = activity.ownerId;

    const joiningRequest = new ActivityJoiningRequest(
      activityId,
      authUserId,
      receiverId
    );
    await this.activitiesJoiningRequestsGateway.save(joiningRequest);

    return joiningRequest.info();
  }
}

export { SendJoinActivityRequestFactory };
