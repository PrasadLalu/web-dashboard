import { Exclude } from "class-transformer";

export class RegisteredUserDto {
    @Exclude()
    password: string;
}