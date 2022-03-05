import { RegisterFactory, RegistrationArgs } from "./Regsiter/Register";

import { LoginFactory } from "./Login/Login";
import type { IStudentsGateway } from "../../Adapters/DrivenAdapters/Persistence/StudentsGateway/IStudentsGateway.interface";

interface IAuthServiceFacade {
  login(email: string, password: string): Promise<string>;
  register(args: RegistrationArgs): Promise<string>;
}

class AuthServiceFacade implements IAuthServiceFacade {
  constructor(private readonly studentsGateway: IStudentsGateway) {}

  async login(email: string, password: string): Promise<string> {
    const loginFactory = new LoginFactory(this.studentsGateway);

    return await loginFactory.login(email, password);
  }

  async register(args: RegistrationArgs): Promise<string> {
    const registerFactory = new RegisterFactory(this.studentsGateway);

    return await registerFactory.register(args);
  }
}

export { AuthServiceFacade };
