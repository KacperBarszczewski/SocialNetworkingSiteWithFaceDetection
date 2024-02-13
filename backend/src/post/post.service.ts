import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model, isValidObjectId } from 'mongoose';
import { PostDocument } from './post.schema';
import { UserDocument } from '../user/user.schema';
import { CommentDocument } from 'src/comment/comment.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(
    user_id: string,
    description: string,
    image: string,
    isVisible: boolean,
  ): Promise<PostDocument> {
    const newPost = new this.postModel({
      user_id,
      description,
      image,
      isVisible,
    });
    return newPost.save();
  }

  async findAll(): Promise<PostDocument[]> {
    const posts = await this.postModel
      .find()
      .populate('user_id', '-password')
      .exec();

    for (const post of posts) {
      post.comments = await this.commentModel.find({ post_id: post._id });
    }
    return posts;
  }

  async find(id: string): Promise<PostDocument> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('Nieprawidłowy identyfikator postu');
    }

    const post = await this.postModel
      .findById(id)
      .populate('user_id', '-password')
      .exec();

    post.comments = await this.commentModel.find({ post_id: id });

    return post;
  }

  async update(
    id: string,
    newDescription: string,
    newImage: string,
    newIsVisible: boolean,
    newDate: Date,
  ): Promise<PostDocument> {
    const existingPost = await this.find(id);
    existingPost.description = newDescription ?? existingPost.description;
    existingPost.image = newImage ?? existingPost.image;
    existingPost.isVisible = newIsVisible ?? existingPost.isVisible;
    existingPost.date = newDate;

    return existingPost.save();
  }

  async delate(id: string) {
    return this.postModel.deleteOne({ _id: id }).exec();
  }
}
