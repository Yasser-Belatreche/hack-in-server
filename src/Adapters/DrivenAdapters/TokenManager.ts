import jwt from 'jsonwebtoken';

class TokenManager {
  private readonly SECRET_KEY: string = '12345678';

  generateToken(key: string): string {
    const token = jwt.sign(key, this.SECRET_KEY);
    return `Bearer ${token}`;
  }

  decode(bearerToken: string): string {
    const [, token] = bearerToken.split('Bearer ');

    const value = jwt.verify(token, this.SECRET_KEY) as string;
    return value;
  }
}

export {TokenManager};
