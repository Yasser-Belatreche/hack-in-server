import type { IStudentsGateway } from "../../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";
import { tokenManager } from "../../../Adapters/DrivenAdapters";

class LoginFactory {
  constructor(private readonly studentsGateway: IStudentsGateway) {}

  async login(email: string, password: string): Promise<string> {
    const student = await this.studentsGateway.findByEmail(
      email.toLowerCase().trim()
    );

    if (!student) throw new Error("student not exsit");
    if (student.password !== password.trim()) throw new Error("wrong passwrod");

    const token = tokenManager.generateToken(student.userId);

    return token;
  }
}

export { LoginFactory };
