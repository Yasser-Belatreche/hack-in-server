import { IActivityJoiningRequest } from "../../../Domain/ActivityJoiningRequest";
import { tokenManager } from "../../../Adapters/DrivenAdapters";
import { IActivitiesJoiningRequestsGateway } from "../../../Adapters/DrivenAdapters/Persistence/ActivitiesJoiningRequestsGateway/ActivitiesJoiningRequestsGateway.interface";
import { IStudentsGateway } from "../../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";

type ResponseArgs = {
  authToken: string;
  requestId: string;
  response: "accept" | "decline";
};

class ResponseToRequestFactory {
  constructor(
    private readonly activitiesJoiningRequestsGateway: IActivitiesJoiningRequestsGateway,
    private readonly studentsGateway: IStudentsGateway
  ) {}

  async response(args: ResponseArgs) {
    const { authToken, requestId, response } = args;
    const authUserId = tokenManager.decode(authToken);

    const request = await this.findRequestById(requestId);
    if (request?.receiverId !== authUserId) {
      throw new Error("Action not allowed");
    }

    request.status = response === "accept" ? "accepted" : "declined";
    await this.updateRequest(request);

    return request;
  }

  private async findRequestById(id: string) {
    return await this.activitiesJoiningRequestsGateway.findById(id);
  }

  private async updateRequest(request: IActivityJoiningRequest) {
    return await this.activitiesJoiningRequestsGateway.update(request);
  }
}

export { ResponseToRequestFactory };
