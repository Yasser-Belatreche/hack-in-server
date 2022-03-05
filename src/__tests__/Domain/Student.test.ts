import {Student} from '../../Domain/Student';

describe('Student Entity', () => {
  it('should not have a student with an unvalid email', () => {
    expect(() => new Student('notVaid', 'somePassword')).toThrow();
  });

  it('should trim and lowercase the email, and trim the password', () => {
    const email = 'valid@mail.com';
    const password = 'somePassword    ';
    const student = new Student(email, password);

    expect(student.email).toEqual(email.trim().toLowerCase());
    expect(student.password).toEqual(password.trim());
  });

  it('should set the a unique id for each newly registred student', () => {
    const student1 = new Student('email@gmail.com', 'somePassword');
    student1.newRegistred('John', 'female');

    const student2 = new Student('email@gmail.com', 'somePassword');
    student2.newRegistred('John', 'female');

    expect(student1.userId).not.toEqual(student2.userId);
  });

  it('should set all the user information, when the student is newly created', () => {
    const userInfo = {
      email: 'email@gmail.com',
      password: 'password',
      sex: 'male',
      name: 'myName',
    } as const;
    const student = new Student(userInfo.email, userInfo.password);
    student.newRegistred(userInfo.name, userInfo.sex);

    const {userId, ...restInfo} = student.info();
    expect(restInfo).toEqual(userInfo);
  });
});
