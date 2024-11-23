import { Injectable } from '@nestjs/common';

import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  // private readonly transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: this.configService.get('SMTP_USER'),
  //     clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //     clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //     refreshToken: this.configService.get('GOOGLE_OAUTH_CLIENT_REFRESH_TOKEN'),
  //   },
  // });

  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get('MAIL_HOST'),
    port: this.configService.get('MAIL_PORT'),
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: this.configService.get('MAIL_USER'),
      pass: this.configService.get('MAIL_PASSWORD'),
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Sleepr notification',
      text,
    });
  }
}
