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
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('ingredients') ingredients: string[],
    @Body('isVisible') isVisible: boolean,
    @Body('image') image: string,
  ): Promise<PostDocument> {
    return this.postService.create(
      title,
      description,
      ingredients,
      isVisible,
      image,
    );
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
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('ingredients') ingredients: string[],
    @Body('isVisible') isVisible: boolean,
    @Body('image') image: string,
    date: Date,
  ): Promise<PostDocument> {
    return this.postService.update(id, description, image, isVisible, date);
  }

  @Delete(':id')
  delatePost(@Param('id') id: string) {
    return this.postService.delate(id);
  }
}
