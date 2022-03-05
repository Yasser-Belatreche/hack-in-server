import { IStudent } from "../../../../Domain/Student";

export interface IStudentsGateway {
  findByEmail(email: string): Promise<IStudent | undefined>;
  findById(id: string): Promise<IStudent | undefined>;
  save(student: IStudent): Promise<IStudent>;
}
