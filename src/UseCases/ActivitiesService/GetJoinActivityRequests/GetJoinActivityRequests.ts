import type { IActivityJoiningRequest } from "../../../Domain/ActivityJoiningRequest";
import type { IStudentsGateway } from "../../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";

import type { IActivitiesJoiningRequestsGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesJoiningRequestsGateway/ActivitiesJoiningRequestsGateway.interface";

import { tokenManager } from "../../../Adapters/DrivenAdapters";

class GetJoinActivityRequestsFactory {
  constructor(
    private readonly activitiesJoiningRequestsGateway: IActivitiesJoiningRequestsGateway,
    private readonly studentsGateway: IStudentsGateway
  ) {}

  async getList(authToken: string) {
    const authUserId = tokenManager.decode(authToken);

    const requests = await this.findActivitiesJoiningRequestsFor(authUserId);
    const senders = await this.getRequestsSenders(requests);

    return requests.map((request, i) => ({
      request: request.info(),
      sender: senders[i]?.info(),
    }));
  }

  private async findActivitiesJoiningRequestsFor(id: string) {
    return await this.activitiesJoiningRequestsGateway.findRequestsFor(id);
  }

  private async getRequestsSenders(requests: IActivityJoiningRequest[]) {
    return await Promise.all(
      requests.map((request) => this.studentsGateway.findById(request.senderId))
    );
  }
}

export { GetJoinActivityRequestsFactory };
