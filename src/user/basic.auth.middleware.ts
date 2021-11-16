import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user/user.service";

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {
    }
 
    
    async use(req: Request, res: Response, next: NextFunction) {
            //console.log(req.headers.authorization)

            // check for basic auth header
            if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                return res.status(401).json({ message: 'Missing Authorization Header' });
            }
        
            // verify auth credentials
            const base64Credentials =  req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [email, password] = credentials.split(':');
            const user = await this.userService.findByEmailAndPassword( {Id: -1, Email: email, Password: password});
            if (!user) {
                return res.status(401).json({ message: 'Invalid Authentication Credentials' });
            }
        
            // attach user to request object
            // req.user = user
        
        next();
    }

    
}