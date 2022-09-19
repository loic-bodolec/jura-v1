import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from '../../../dataLayer/entities/User';

interface JuraJwtPayload {
  [key: string]: string | Role;
}

export class JWTService {
  private jwtToken = jwt;

  public generateToken({ userId, role }: JuraJwtPayload): string {
    const payload = { userId, role, iat: Date.now() };
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.ACCESS_TOKEN_EXPIRES_IN) {
      throw new Error('ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRES_IN is not defined');
    }
    return this.jwtToken.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  public verifyToken(token: string): JwtPayload {
    if (!process.env.ACCESS_TOKEN_SECRET || !token) {
      throw new Error('ACCESS_TOKEN_SECRET or token is not defined');
    }
    return this.jwtToken.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
  }
}
