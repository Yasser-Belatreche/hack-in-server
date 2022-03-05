import { ActivitiesServiceFacade } from "./ActivitiesService/ActivitiesService";
import { AuthServiceFacade } from "./AuthService/AuthServiceFacade";

import { StudentsGateway } from "../Adapters/DrivenAdapters/Persistence/StudentsGateway/StudentsGateway";
import { ActivitiesGateway } from "../Adapters/DrivenAdapters/Persistence/ActivitiesGateway/ActivitiesGateway";
import { ActivitiesJoiningRequestsGateway } from "../Adapters/DrivenAdapters/Persistence/ActivitiesJoiningRequestsGateway/ActivitiesJoiningRequestsGateway";

const studentsGateway = new StudentsGateway();
const activitiesGateway = new ActivitiesGateway();
const activitiesJoiningRequestsGateway = new ActivitiesJoiningRequestsGateway();

const authService = new AuthServiceFacade(studentsGateway);
const activitiesService = new ActivitiesServiceFacade(
  activitiesGateway,
  activitiesJoiningRequestsGateway,
  studentsGateway
);

export { authService, activitiesService };
