import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Date } from 'mongoose';
import { PostDocument } from './post.schema';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(
    @Body('user_id') user_id: string,
    @Body('description') description: string,
    @Body('image') image: string,
    @Body('isVisible') isVisible: boolean,
  ): Promise<PostDocument> {
    return this.postService.create(user_id, description, image, isVisible);
  }

  @Get()
  findAllPosts(): Promise<PostDocument[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findPost(@Param('id') id: string): Promise<PostDocument> {
    return this.postService.find(id);
  }

  @Patch(':id')
  updatePost(
    @Param('id') id: string,
    @Body('description') description: string,
    @Body('image') image: string,
    @Body('isVisible') isVisible: boolean,
    date: Date,
  ): Promise<PostDocument> {
    return this.postService.update(id, description, image, isVisible, date);
  }

  @Delete(':id')
  delatePost(@Param('id') id: string) {
    return this.postService.delate(id);
  }
}
