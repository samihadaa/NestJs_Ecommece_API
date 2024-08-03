import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSignInDto } from "./signin-user.dto";

export class UserSignUpDto extends UserSignInDto {
    @IsNotEmpty({message:'name must be not empty'})
    @IsString({message: 'name must be a string'})
    name: string;
}
