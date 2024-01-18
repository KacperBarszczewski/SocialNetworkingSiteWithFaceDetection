import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Boolean, default: true })
  isVisible: boolean;

  @Prop({ type: Date, default: Date.now })
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
