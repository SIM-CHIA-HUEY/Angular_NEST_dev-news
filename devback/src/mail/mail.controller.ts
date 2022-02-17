import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus, Query } from '@nestjs/common';
import { MailService } from "./mail.service";
import { UsersService } from "../users/users.service";

@Controller('mail')
export class MailController {
    constructor(public MailService: MailService, public usersService: UsersService) { }

    // @Get()
    // findAllArticles() {
    //     return this.ArticlesService.findAll();
    // }

    // @Get('/search')
    // async findArticlesSearch(@Query() query: any) {
    //     const res = await this.ArticlesService.findSearch(query.search);
    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: 'Articles fetched successfully',
    //         res,
    //     };
    // }

    // @Get('/user/:id')
    // async findAllUserArticles(@Param('id') id: number) {
    //     const res = await this.ArticlesService.findAllUserArticles(id);
    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: 'Articles fetched successfully',
    //         res,
    //     };
    // }

    @Post()
    async sendMail(@Body() body: any) {
        const users = await this.usersService.findNewsletter();
        let emailAdresses: any = []
        users.forEach(elem => {
            const json = {email : elem.email, nickName : elem.username}
            emailAdresses.push(json)
        })
        this.MailService.sendnewsletter(emailAdresses, body)
    }

    // @Get(':id')
    // async findOneArticle(@Param('id') id: number) {
    //     const data =  await this.ArticlesService.read(id);
    //     return {
    //       statusCode: HttpStatus.OK,
    //       message: 'Article fetched successfully',
    //       data,
    //     };
    // }

    // @Patch(':id')
    // async updateArticles(@Param('id') id: number, @Body() updateArticlesDto: UpdateArticlesDto) {
    //     await this.ArticlesService.update(id, updateArticlesDto);
    //     return {
    //                 statusCode: HttpStatus.OK,
    //                 message: 'Article updated successfully',
    //             };
    // }

    // @Delete(':id')
    // async removeArticles(@Param('id') id: number) {
    //     await this.ArticlesService.remove(id);
    //     return {
    //         statusCode: HttpStatus.OK,
    //         message: 'Article deleted successfully',
    //     };
    // }
}