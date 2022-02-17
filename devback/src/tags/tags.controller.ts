import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagsDto } from '../dto/create-tags.dto';
import { UpdateTagsDto } from '../dto/update-tags.dto';

@Controller('tags')
export class TagsController {
  constructor(public TagsService: TagsService) {}

  @Get()
  findAllTags() {
    return this.TagsService.findAll();
  }

  @Post()
  createTags(@Body() createTagsDto: CreateTagsDto) {
    return this.TagsService.create(createTagsDto);
  }

  @Get(':id')
  async findOneUser(@Param('id') id: number) {
    const data = await this.TagsService.read(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async updateTags(
    @Param('id') id: number,
    @Body() updateTagsDto: UpdateTagsDto,
  ) {
    await this.TagsService.update(id, updateTagsDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async removeTags(@Param('id') id: number) {
    await this.TagsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
