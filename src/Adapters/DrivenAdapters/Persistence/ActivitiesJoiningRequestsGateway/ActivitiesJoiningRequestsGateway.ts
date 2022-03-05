import {
  ActivityJoiningRequest,
  IActivityJoiningRequest,
} from "../../../../Domain/ActivityJoiningRequest";
import { ActivityJoiningRequestModel } from "../_SETUP_/Mongo/models/ActivityJoiningRequest.model";
import { IActivitiesJoiningRequestsGateway } from "./ActivitiesJoiningRequestsGateway.interface";

class ActivitiesJoiningRequestsGateway
  implements IActivitiesJoiningRequestsGateway
{
  async save(
    request: IActivityJoiningRequest
  ): Promise<IActivityJoiningRequest> {
    await ActivityJoiningRequestModel.create(request.info());
    return request;
  }

  async findById(id: string): Promise<IActivityJoiningRequest | undefined> {
    const info = await ActivityJoiningRequestModel.findOne({ activityId: id });
    if (!info) return undefined;

    return this.getRequestEntity(info);
  }

  async update(
    request: IActivityJoiningRequest
  ): Promise<IActivityJoiningRequest> {
    await ActivityJoiningRequestModel.updateOne(
      { requestId: request.requestId },
      request.info()
    );
    return request;
  }

  async findRequestsFor(
    receiverId: string
  ): Promise<IActivityJoiningRequest[]> {
    const infos = await ActivityJoiningRequestModel.find({ receiverId });
    return infos.map((info) => this.getRequestEntity(info));
  }

  private getRequestEntity(info: ReturnType<IActivityJoiningRequest["info"]>) {
    const request = new ActivityJoiningRequest(
      info.activityId,
      info.senderId,
      info.receiverId
    );
    request.createdAt = info.createdAt;
    request.requestId = info.requestId;
    request.status = info.status;

    return request;
  }
}

export { ActivitiesJoiningRequestsGateway };
