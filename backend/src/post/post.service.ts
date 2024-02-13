import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model, isValidObjectId } from 'mongoose';
import { PostDocument } from './post.schema';
import { UserDocument } from '../user/user.schema';
import { CommentDocument } from 'src/comment/comment.schema';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @InjectModel('Comment')
    private readonly commentModel: Model<CommentDocument>,
    private readonly httpService: HttpService,
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

    try {
      const formData = {
        image: newPost.image,
      };
      const response = await this.httpService
        .post('http://localhost:5000/upload', formData)
        .pipe(map((response) => response.data))
        .toPromise();
      const result = response;
      console.log('result:', result);
      newPost.save();
      return result;
    } catch (error) {
      console.error('Błąd podczas analizy obrazu:', error);
      throw new HttpException(
        'Konto z tym e-mailem już istniej',
        HttpStatus.CONFLICT,
      );
    }

    return newPost.save();
  }

  async findAll(): Promise<PostDocument[]> {
    const posts = await this.postModel
      .find()
      .populate('user_id', '-password')
      .exec();

    for (const post of posts) {
      post.comments = await this.commentModel
        .find({ post_id: post._id })
        .populate('user_id', '-password');
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

    post.comments = await this.commentModel
      .find({ post_id: id })
      .populate('user_id', '-password');

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

  async delete(id: string) {
    return this.postModel.deleteOne({ _id: id }).exec();
  }
}
