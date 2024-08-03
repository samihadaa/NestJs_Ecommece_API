import { UserSignInDto } from './dto/signin-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSignUpDto } from './dto/signup-user.dto';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<User> {
    const userExist = await this.findUserByEmail(userSignUpDto.email);
    if (userExist) {
      throw new BadRequestException('this email exist');
    }
    userSignUpDto.password = await hash(userSignUpDto.password, 10);
    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }
  async signin(userSignInDto: UserSignInDto) {
    const userExist = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSignInDto.email })
      .getOne();
    if (!userExist) throw new BadRequestException(`this email doesn't exist`);
    const passworMatch = await compare(
      userSignInDto.password,
      userExist.password,
    );
    if (!passworMatch) throw new BadRequestException('password not matching');
    delete userExist.password;
    return userExist;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
  
  async getAccessToken(user: User): Promise<string> {
    if (!process.env.ACCESS_TOKEN_SECRET_KEY) {
      throw new Error('ACCESS_TOKEN_SECRET_KEY is not defined');
    }
  
    const payload = { id: user.id, email: user.email };
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const options = { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME || '1h' }; 
    return sign(payload, secretKey, options);
  }

}
