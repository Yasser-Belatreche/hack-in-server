import {tokenManager} from '../../DrivenAdapters';

describe('TokenManager', () => {
  it('should generate a unique Bearer token for each key', () => {
    expect(tokenManager.generateToken('hello')).toContain('Bearer ');
    expect(tokenManager.generateToken('hello')).not.toEqual(
      tokenManager.generateToken('hiiiooo'),
    );
    expect(tokenManager.generateToken('hello')).not.toEqual(
      tokenManager.generateToken('fooo'),
    );
    expect(tokenManager.generateToken('hello')).not.toEqual(
      tokenManager.generateToken('baar'),
    );
    expect(tokenManager.generateToken('hello')).not.toEqual(
      tokenManager.generateToken('world happy'),
    );
  });

  it('should not decode an invalid token', () => {
    expect(() => tokenManager.decode('someInvalidToken')).toThrowError();
  });

  it('should decode the token and return his value', () => {
    for (let i = 0; i < 3; i++) {
      const value = Math.floor(Math.random() * 10 ** 5).toString();
      const token = tokenManager.generateToken(value);

      expect(tokenManager.decode(token)).toEqual(value);
    }
  });
});
