import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignInDto {

    @IsNotEmpty({message:'email must be string'})
    @IsEmail({}, {message: 'must be a valid email'})
    email: string;

    @IsNotEmpty({message:'password must be not empty'})
    @IsString({message: 'password must be a string'})
    @MinLength(5,{message: 'minimum legth for password is 5'})
    password: string;
}
