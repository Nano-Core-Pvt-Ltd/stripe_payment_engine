import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const secret = process.env.AUTH_JWT_SECRET;
            if (!secret) {
                throw new Error("AUTH_JWT_SECRET is not defined in the environment variables.");
            }
            const decodedSecret = Buffer.from(secret, 'base64');
            const decoded = jwt.verify(token, decodedSecret);
            request.user = decoded;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
