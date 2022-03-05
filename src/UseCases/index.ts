import { ActivitiesServiceFacade } from "./ActivitiesService/ActivitiesService";
import { AuthServiceFacade } from "./AuthService/AuthServiceFacade";

import { FakeActivitiesGateway } from "../__tests__/__fakes__/Persistence/FakeActivitiesGateway";
import { FakeActivitiesJoiningRequestsGateway } from "../__tests__/__fakes__/Persistence/FakeActivitiesJoiningRequestsGateway";
import { FakeStudentsGateway } from "../__tests__/__fakes__/Persistence/FakeStudentsGateway";

const studentsGateway = new FakeStudentsGateway();
const activitiesGateway = new FakeActivitiesGateway();
const activitiesJoiningRequestsGateway =
  new FakeActivitiesJoiningRequestsGateway();

const authService = new AuthServiceFacade(studentsGateway);
const activitiesService = new ActivitiesServiceFacade(
  activitiesGateway,
  activitiesJoiningRequestsGateway,
  studentsGateway
);

export { authService, activitiesService };
