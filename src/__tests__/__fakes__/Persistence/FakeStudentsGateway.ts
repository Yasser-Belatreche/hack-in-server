import type { IStudent } from "../../../Domain/Student";
import type { IStudentsGateway } from "../../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";

class FakeStudentsGateway implements IStudentsGateway {
  private map = new Map<string, IStudent>();

  async save(student: IStudent): Promise<IStudent> {
    this.map.set(student.userId, student);
    return student;
  }

  async findById(id: string): Promise<IStudent | undefined> {
    return this.map.get(id);
  }

  async findByEmail(email: string): Promise<IStudent | undefined> {
    let target: IStudent | undefined;

    this.map.forEach((student) => {
      if (student.email === email) {
        target = student;
      }
    });

    return target;
  }

  deleteAll() {
    this.map.clear();
  }
}

export { FakeStudentsGateway };
