import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Date, Model } from 'mongoose';
import { PostDocument } from './post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostDocument>,
  ) {}

  async create(
    title: string,
    description: string,
    ingredients: string[],
    isVisible: boolean,
    image: string,
  ): Promise<PostDocument> {
    const newPost = new this.postModel({
      title,
      description,
      ingredients,
      isVisible,
      image,
    });
    return newPost.save();
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel.find().exec();
  }

  async find(id: string): Promise<PostDocument> {
    return this.postModel.findById(id).exec();
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
