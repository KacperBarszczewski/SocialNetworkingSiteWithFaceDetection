import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument } from './comment.schema';
import { UserDocument } from 'src/user/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    user_id: string,
    text: string,
    post_id: string,
    isVisible: boolean,
  ): Promise<CommentDocument> {
    const newComment = new this.commentModel({
      user_id,
      text,
      post_id,
      isVisible,
    });
    return newComment.save();
  }

  async findAll(): Promise<CommentDocument[]> {
    return this.commentModel.find().populate('user_id', '-password').exec();
  }

  async find(a_id: string): Promise<CommentDocument[]> {
    return await this.commentModel
      .find({ post_id: a_id })
      .populate('user_id', '-password')
      .exec();
  }
}
