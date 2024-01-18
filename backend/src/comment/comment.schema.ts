import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  })
  post_id: string;

  @Prop({ type: Boolean, default: true })
  isVisible: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
