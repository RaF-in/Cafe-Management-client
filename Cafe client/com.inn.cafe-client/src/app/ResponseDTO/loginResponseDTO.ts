import { User } from "../domain/User";

export class loginResponseDTO {
    email?: string;
    jwtToken?: string;
    expiresIn?: Date;
    userData?: User;
}