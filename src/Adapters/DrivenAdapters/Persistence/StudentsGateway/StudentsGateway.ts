import { IStudent, Student } from "../../../../Domain/Student";
import { StudentModel } from "../_SETUP_/Mongo/models/Student.model";
import { IStudentsGateway } from "./IStudentsGateway.interface";

class StudentsGateway implements IStudentsGateway {
  async save(student: IStudent): Promise<IStudent> {
    await StudentModel.create(student.info());
    return student;
  }

  async findByEmail(email: string): Promise<IStudent | undefined> {
    const info = await StudentModel.findOne({ email });
    if (!info) return undefined;

    return this.getStudentEntity(info);
  }

  async findById(id: string): Promise<IStudent | undefined> {
    const info = await StudentModel.findOne({ userId: id });
    if (!info) return undefined;

    return this.getStudentEntity(info);
  }

  private getStudentEntity(info: ReturnType<IStudent["info"]>) {
    const student = new Student(info.email, info.password);
    student.userId = info.userId;
    student.sex = info.sex;
    student.name = info.name;

    return student;
  }
}

export { StudentsGateway };
