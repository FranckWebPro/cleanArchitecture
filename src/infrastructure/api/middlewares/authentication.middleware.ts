import { Request } from "express";
import { AuthenticatedContext } from "../../../core/ports/api.port";
import { container } from "tsyringe";
import { UserRepository } from "../../../core/ports/database.port";
import { ExistingUser, NotExistingUser } from "../../../core/entities/user.entity";
import { UnauthorizedError } from "../error-handler";

const extractTokenFromRequest = (request: Request): "TOKEN_NOT_FOUND" | string => {
    const authorization = request.headers['authorization'];
    if (typeof authorization === 'string') {
        return authorization.replace("Bearer ", "") || "TOKEN_NOT_FOUND";
    }
    return "TOKEN_NOT_FOUND";
}

const verifyAndDecodeJwtToken = (token: string): "INVALID_JWT_TOKEN" | {id: string} => {
 try{
    const notExistingUser = new NotExistingUser();
    return notExistingUser.verifyAndDecodeUserAccessToken(token);
 } catch {
    return "INVALID_JWT_TOKEN";
 }
}

const retrieveUserFromId = async (id: string): Promise<"UNKNOWN_USER" | ExistingUser> => {
    const userRepository = container.resolve<UserRepository>("UserRepository");
   return (await userRepository.findById(id)) || "UNKNOWN_USER";
}

const getUserFromJWT = async (
    token: string
): Promise<"INVALID_JWT_TOKEN" | "UNKNOWN_USER" | {userId: string}> => {
    const payload = verifyAndDecodeJwtToken(token);
    if(payload === "INVALID_JWT_TOKEN") {
        return payload
    }
    const user = await retrieveUserFromId(payload.id);
    if(user === "UNKNOWN_USER") {
        return user;
    }

    return{
        userId: user.id
    }
}

export async function expressAuthentication(
    request: Request, 
    _securityName: string, 
    _scopes: string[]
): Promise<AuthenticatedContext> {
    const token = extractTokenFromRequest(request);

    if(token === "TOKEN_NOT_FOUND") {
        return Promise.reject(new UnauthorizedError("Mising authentication"))
    }

    const user = await getUserFromJWT(token);

    if(user === "INVALID_JWT_TOKEN" || user === "UNKNOWN_USER") {
        return Promise.reject(new UnauthorizedError("Invalid token"))
    }

    return Promise.resolve(user);
}