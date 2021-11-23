import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { bcryptCompare } from 'src/common/utils/bcrypt-util';
import { VolunteerService } from 'src/volunteer/volunteer.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendVerificationEmailDto } from './dto/send-verificaiton-email.dto';
import { SignEmailTokenDto } from './dto/sign-email-token.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { EmailPayload } from './interfaces/email-payload';
import { UserPayload } from './interfaces/user-payload';

@Injectable()
export class AuthService {
  jwtExpireDefault: string;

  constructor(
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
    private readonly volunteerService: VolunteerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {
    this.jwtExpireDefault = this.configService.get<string>('JWT_EXPIRE');
  }

  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;
    const valid = await bcryptCompare(password, user.password);
    if (!valid) return null;
    return user;
  }

  async login(user: UserPayload) {
    const { userId, email, role } = user;
    const payload: UserPayload = { userId, email, role };
    // Add role id to payload
    if (role === 'doctor')
      payload.doctorId = (await this.doctorService.findOneByUserId(userId)).id;
    else if (role === 'volunteer')
      payload.volunteerId = (
        await this.volunteerService.findOneByUserId(userId)
      ).id;

    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const { token } = verifyEmailDto;
    const email = this.extractEmailFromToken(token);
    return await this.userService.activateUserByEmail(email);
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword, email } = changePasswordDto;
    const user = await this.getUserByEmailAndPassword(email, oldPassword);
    if (!user)
      throw new ForbiddenException('Username and password do not match!');
    await this.userService.updatePassword(email, newPassword);
    return HttpStatus.OK;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, token } = resetPasswordDto;
    const email = this.extractEmailFromToken(token);
    await this.userService.updatePassword(email, password);
    return HttpStatus.OK;
  }

  async sendVerificationEmail(
    sendEmailVerificationDto: SendVerificationEmailDto,
  ) {
    const { email } = sendEmailVerificationDto;
    const token = this.signEmailToken({ email, expiresIn: '1d' });

    // Check and throw error if the user is already active
    await this.userService.getNonActiveUserByEmail(email);
    return await this.emailService.sendVerificationEmail({ email, token });
  }

  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto;
    const token = this.signEmailToken({ email, expiresIn: '1h' });
    return await this.emailService.sendResetPasswordEmail({ email, token });
  }

  private extractEmailFromToken(token: string) {
    try {
      const payload: EmailPayload = this.jwtService.verify(token);
      const { email } = payload;
      return email;
    } catch (e) {
      throw new UnauthorizedException('Invalid token!');
    }
  }

  private signEmailToken(signEmailTokenDto: SignEmailTokenDto) {
    const { email, expiresIn = this.jwtExpireDefault } = signEmailTokenDto;
    return this.jwtService.sign({ email }, { expiresIn });
  }
}
