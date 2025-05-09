import {BadRequestException, Injectable} from '@nestjs/common';
import { ForgotPasswordRequestDto } from './dtos/forgot-password.dto';
import { ResetPasswordRequestDto } from './dtos/reset-password.dto';
import { ChangePasswordRequestDto } from './dtos/change-password.dto';
import { updateUserDto } from './dtos/update-user-profile.dto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import {UsersRepo} from '../domain/repos/users.repo';
import {User} from '@prisma/client';
import {GetUserListRequestDto} from './dtos/user-list.request.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepo,
    private readonly jwtService: JwtService,
  ) {}

  async getUserProfile({ email }: { email: string }): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findAndSort(queryOptions?: GetUserListRequestDto): Promise<User[]> {
    return await this.userRepository.getAllUsers(queryOptions);
  }

  async getUserRole({ userId }: { userId: string }): Promise<string> {
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user.role;
  }

  async forgotPassword({ email }: ForgotPasswordRequestDto) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const token = await
      this.jwtService.signAsync({email}, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h'
      })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 's.labodzin@gmail.com',
        pass: 'your-email-password',
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
      from: 's.labodzin@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click on this link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async resetPassword({ email, newPassword, repeatPassword }: ResetPasswordRequestDto) {
    if (newPassword !== repeatPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    user.hashedPassword = await argon2.hash(newPassword);
    await this.userRepository.updateUserByEmailOrId(user, email);

    return { message: 'Password reset successfully' };
  }

  async changePassword({
                         id,
                         oldPassword,
                         newPassword,
                         repeatOldPassword,
                       }: ChangePasswordRequestDto) {
    if (oldPassword !== repeatOldPassword) {
      throw new Error('Old passwords do not match');
    }

    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await argon2.verify(user.hashedPassword, oldPassword);
    if (!passwordMatch) {
      throw new Error('Old password is incorrect');
    }

    user.hashedPassword = await argon2.hash(newPassword);
    await this.userRepository.updateUserByEmailOrId(user, id);

    return { message: 'Password changed successfully' };
  }

  async update(id: string, updateUserDto: updateUserDto, file: Express.Multer.File) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.email = updateUserDto.email;
    user.image = file.filename;

    await this.userRepository.updateUserByEmailOrId(user, id);

    return { message: 'Profile changed successfully' };
  }
}
