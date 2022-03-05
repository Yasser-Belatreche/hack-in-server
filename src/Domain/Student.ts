import {v4 as generateRandomId} from 'uuid';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

export interface IStudent {
  userId: string;
  name?: string;
  email: string;
  password: string;
  sex?: 'male' | 'female';
  newRegistred(name: string, sex: 'male' | 'female'): void;
  info(): NonFunctionProperties<IStudent>;
}

class Student implements IStudent {
  _userId?: string;
  name?: string;
  password: string;
  email: string;
  sex?: 'male' | 'female';

  constructor(email: string, password: string) {
    if (!this.isValidEmail(email)) throw new Error('unvalid email');

    this.email = email.toLowerCase().trim();
    this.password = password.trim();
  }

  public get userId(): string {
    if (!this._userId) throw new Error('no userId');
    return this._userId;
  }

  newRegistred(name: string, sex: 'male' | 'female'): void {
    this._userId = generateRandomId();
    this.name = name.trim();
    this.sex = sex;
  }

  info(): NonFunctionProperties<IStudent> {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      password: this.password,
      sex: this.sex,
    };
  }

  private isValidEmail(e: string): boolean {
    return EMAIL_PATTERN.test(e);
  }
}

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export {Student};
