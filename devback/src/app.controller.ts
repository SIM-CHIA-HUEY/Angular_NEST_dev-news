import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage, Multer } from 'multer';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
    private usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Response() res) {
    const token = await this.authService.login(req.user);

    res.cookie('access_token', token).send({ access_token: token });
    return this.authService.login(req.user);

  }

  @Get('uploads/:imageName')
    invoke(@Request() req, @Response() res) {
      return res.sendFile(req.path, { root: './' });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('uploaded_file', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split(".");
          const fileExt = fileNameSplit[fileNameSplit.length -1];
          cb(null, `${Date.now()}.${fileExt}`);
      }
    }),
  }))

  async uploadedFile(@UploadedFile() file) {
    return file
  }
}
