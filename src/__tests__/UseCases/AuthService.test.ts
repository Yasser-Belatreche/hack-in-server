import {FakeStudentsGateway} from '../__fakes__/Persistence/FakeStudentsGateway';

import {AuthServiceFacade} from '../../UseCases/AuthService/AuthServiceFacade';

describe('AuthService', () => {
  const studentsGateway = new FakeStudentsGateway();
  const authService = new AuthServiceFacade(studentsGateway);

  const userInfo = {
    name: 'some name',
    sex: 'male',
    email: 'email@gmail.com',
    password: 'somePassword',
  } as const;

  afterEach(() => {
    studentsGateway.deleteAll();
  });

  it('should be able to login after registration, without any problems', async () => {
    await authService.register(userInfo);
    await authService.login(userInfo.email, userInfo.password);
  });

  it('every user should have a unique token after registration', async () => {
    const token1 = await authService.register(userInfo);
    const token2 = await authService.register({
      ...userInfo,
      email: 'mail@gmail.com',
    });
    expect(token1).not.toEqual(token2);
  });

  it('every user should have a unique token after login', async () => {
    await authService.register(userInfo);
    await authService.register({
      ...userInfo,
      email: 'mail@gmail.com',
    });
    const token1 = await authService.login(userInfo.email, userInfo.password);
    const token2 = await authService.login('mail@gmail.com', userInfo.password);

    expect(token1).not.toEqual(token2);
  });

  it('should not be able to register with an unvalid mail', async () => {
    await expect(
      authService.register({
        ...userInfo,
        email: 'notValid',
      }),
    ).rejects.toBeTruthy();
  });

  it('should not log a student in when he does not exist', async () => {
    await expect(
      authService.login('not@exist.com', 'password'),
    ).rejects.toBeTruthy();
  });

  it('should not have two students with the same email', async () => {
    await authService.register(userInfo);
    await expect(authService.register(userInfo)).rejects.toBeTruthy();
  });

  it('should be able to login with a wrong password', async () => {
    await authService.register(userInfo);
    await expect(
      authService.login(userInfo.email, 'wrongPassword'),
    ).rejects.toBeTruthy();
  });
});
