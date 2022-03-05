import type { IStudentsGateway } from "../../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";

import { IStudent, Student } from "../../../Domain/Student";
import { tokenManager } from "../../../Adapters/DrivenAdapters";

export type RegistrationArgs = {
  name: string;
  email: string;
  password: string;
  sex: "male" | "female";
};

class RegisterFactory {
  constructor(private readonly studentsGateway: IStudentsGateway) {}

  async register(args: RegistrationArgs): Promise<string> {
    const student = this.getNewStudent(args);

    const existingStudent = await this.findStudentByEmail(student.email);
    if (existingStudent) throw new Error("email already userd");

    await this.studentsGateway.save(student);

    const token = this.generateToken(student.userId);

    return token;
  }

  private getNewStudent(args: RegistrationArgs): Student {
    const { email, password, name, sex } = args;

    const student = new Student(email, password);
    student.newRegistred(name, sex);

    return student;
  }

  private async findStudentByEmail(
    email: string
  ): Promise<IStudent | undefined> {
    return await this.studentsGateway.findByEmail(email);
  }

  private generateToken(userId: string): string {
    return tokenManager.generateToken(userId);
  }
}

export { RegisterFactory };
