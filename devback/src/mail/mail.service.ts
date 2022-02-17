import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CommentsModule } from 'src/comments/comments.module';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendnewsletter(users:any, info: any) {

    users.forEach(async (elem:any) => {
        await this.mailerService.sendMail({
            to: elem.email,
            subject: 'Your Dev.News newsletter !',
            template: 'src/mail/templates/newsletter',
            context: {
              nickName: elem.nickName,
              content: info.content,
            },
        });
    })
  }

}
