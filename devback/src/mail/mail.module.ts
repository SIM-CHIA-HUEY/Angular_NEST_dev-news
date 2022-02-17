import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        MailerModule.forRoot({
          transport: {
            host: 'smtp.gmail.com',
            secure: false,
            auth: {
              user: 'devnewscodingacademy@gmail.com',
              pass: 'devnews1@coding',
            },
          },
          defaults: {
            from: '"No reply" <devnewscodingacademy@gmail.com>',
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
            options: {
              strict: true,
            },
          },
        }),
      UsersModule],
controllers: [MailController],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
