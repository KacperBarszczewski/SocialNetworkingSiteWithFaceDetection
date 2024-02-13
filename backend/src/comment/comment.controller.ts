import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentDocument } from './comment.schema';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createPost(
    @Body('user_id') user_id: string,
    @Body('text') text: string,
    @Body('post_id') post_id: string,
    @Body('isVisible') isVisible: boolean,
  ): Promise<CommentDocument> {
    return this.commentService.create(user_id, text, post_id, isVisible);
  }

  @Get(':post_id')
  findPost(@Param('post_id') post_id: string): Promise<CommentDocument[]> {
    return this.commentService.find(post_id);
  }
}
