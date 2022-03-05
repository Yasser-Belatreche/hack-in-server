import { IActivityJoiningRequest } from "../../../Domain/ActivityJoiningRequest";
import { IActivitiesJoiningRequestsGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesJoiningRequestsGateway/ActivitiesJoiningRequestsGateway.interface";

class FakeActivitiesJoiningRequestsGateway
  implements IActivitiesJoiningRequestsGateway
{
  private map = new Map<string, IActivityJoiningRequest>();

  async save(
    request: IActivityJoiningRequest
  ): Promise<IActivityJoiningRequest> {
    this.map.set(request.requestId, request);
    return request;
  }

  async findRequestsFor(
    receiverId: string
  ): Promise<IActivityJoiningRequest[]> {
    const requests: IActivityJoiningRequest[] = [];

    this.map.forEach((request) => {
      if (request.receiverId === receiverId) {
        requests.push(request);
      }
    });

    return requests.reverse();
  }

  async findById(id: string): Promise<IActivityJoiningRequest | undefined> {
    return this.map.get(id);
  }

  async update(
    request: IActivityJoiningRequest
  ): Promise<IActivityJoiningRequest> {
    this.map.set(request.requestId, request);
    return request;
  }

  deleteAll() {
    this.map.clear();
  }
}

export { FakeActivitiesJoiningRequestsGateway };
