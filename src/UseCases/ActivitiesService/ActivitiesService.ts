import type { IActivitiesGateway } from "../../Adapters/DrivenAdapters/Persistence/ActivitiesGateway/ActivitiesGateway.interface";
import type { IActivitiesJoiningRequestsGateway } from "../../Adapters/DrivenAdapters/Persistence/ActivitiesJoiningRequestsGateway/ActivitiesJoiningRequestsGateway.interface";
import type { IStudentsGateway } from "../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";

import { AddActivityFactory } from "./AddActivity/AddActivity";
import { GetActivitiesFactory } from "./GetActivities/GetActivities";
import { GetJoinActivityRequestsFactory } from "./GetJoinActivityRequests/GetJoinActivityRequests";
import { ResponseToRequestFactory } from "./ResponseToJoiningRequest/ResponseToJoiningRequest";
import { SendJoinActivityRequestFactory } from "./SendJoinActivityRequest/SendJoinActivityRequest";

type ActivityArgs = {
  authToken: string;
  title: string;
  desc: string;
};

type ActivityJoinRequestArgs = {
  authToken: string;
  activityId: string;
};

type ResponseArgs = {
  authToken: string;
  requestId: string;
  response: "accept" | "decline";
};

class ActivitiesServiceFacade {
  constructor(
    private readonly activitiesGateway: IActivitiesGateway,
    private readonly activitiesJoiningRequestsGateway: IActivitiesJoiningRequestsGateway,
    private readonly studentsGateway: IStudentsGateway
  ) {}

  async addActivity(args: ActivityArgs) {
    const addActivityFactory = new AddActivityFactory(this.activitiesGateway);
    return await addActivityFactory.add(args);
  }

  async getActivities(authToken: string) {
    const getActivitiesFactory = new GetActivitiesFactory(
      this.activitiesGateway
    );
    return await getActivitiesFactory.getList(authToken);
  }

  async sendActivityJoinRequest(args: ActivityJoinRequestArgs) {
    const sendJoinRequestFactory = new SendJoinActivityRequestFactory(
      this.activitiesJoiningRequestsGateway,
      this.activitiesGateway
    );
    return await sendJoinRequestFactory.send(args);
  }

  async getActivityJoinRequests(authToken: string) {
    const getJoinRequestFactory = new GetJoinActivityRequestsFactory(
      this.activitiesJoiningRequestsGateway,
      this.studentsGateway
    );
    return await getJoinRequestFactory.getList(authToken);
  }

  async responseToJoiningRequest(args: ResponseArgs) {
    const responseToRequestFactory = new ResponseToRequestFactory(
      this.activitiesJoiningRequestsGateway,
      this.studentsGateway
    );

    return await responseToRequestFactory.response(args);
  }
}

export { ActivitiesServiceFacade };
