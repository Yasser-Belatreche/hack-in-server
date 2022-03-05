import { IActivityJoiningRequest } from "../../../../Domain/ActivityJoiningRequest";

export interface IActivitiesJoiningRequestsGateway {
  save(request: IActivityJoiningRequest): Promise<IActivityJoiningRequest>;
  findById(id: string): Promise<IActivityJoiningRequest | undefined>;
  findRequestsFor(receiverId: string): Promise<IActivityJoiningRequest[]>;
  update(request: IActivityJoiningRequest): Promise<IActivityJoiningRequest>;
}
