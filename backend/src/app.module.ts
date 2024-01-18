import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/data'),
    PostModule,
    UserModule,
    AuthModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
