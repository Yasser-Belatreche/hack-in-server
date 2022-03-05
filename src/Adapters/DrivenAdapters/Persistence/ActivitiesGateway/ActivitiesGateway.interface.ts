import { IActivity } from "../../../../Domain/Activity";

export interface IActivitiesGateway {
  save(activity: IActivity): Promise<IActivity>;
  findById(id: string): Promise<IActivity | undefined>;
  getAll(): Promise<IActivity[]>;
}
