import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailDataRequired, MailService } from '@sendgrid/mail';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  sgMail: MailService;
  emailVerificationPath: string;
  resetPasswordPath: string;
  systemName: string;
  sendgridEmail: string;

  constructor(private configService: ConfigService) {
    const FRONTEND_HOST = this.configService.get<string>('FRONTEND_HOST');
    this.emailVerificationPath =
      FRONTEND_HOST +
      this.configService.get<string>('FRONTEND_EMAIL_VERIFICATION_ROUTE');
    this.resetPasswordPath =
      FRONTEND_HOST +
      this.configService.get<string>('FRONTEND_RESET_PASSWORD_ROUTE');
    this.sendgridEmail = this.configService.get<string>('SENDGRID_EMAIL');
    this.sgMail = new MailService();
    this.sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { to, content, subject } = sendEmailDto;
    const msg: MailDataRequired = {
      to,
      from: {
        email: this.sendgridEmail,
        name: 'F0 Home BRVT',
      },
      subject,
      html: content,
    };

    try {
      await this.sgMail.send(msg);
      return HttpStatus.OK;
    } catch (e) {
      throw new InternalServerErrorException('Send email failed');
    }
  }

  async sendVerificationEmail({ email, token }) {
    const url = `${this.emailVerificationPath}?token=${token}`;
    const content = `Click <a href='${url}'>here</a> to confirm your email`;
    await this.sendEmail({
      to: email,
      subject: 'F0 Home BRVT - Verify your email',
      content,
    });
  }

  async sendResetPasswordEmail({ email, token }) {
    const url = `${this.resetPasswordPath}?token=${token}`;
    const content = `Click <a href='${url}'>here</a> to reset your password`;
    await this.sendEmail({
      to: email,
      subject: 'F0 Home BRVT - Reset your password',
      content,
    });
  }
}
