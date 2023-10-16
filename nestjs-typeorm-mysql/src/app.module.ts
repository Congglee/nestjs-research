import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // Tích hợp TypeORM với Nestjs
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

@Module({
  // TypeOrmModule.forRoot(dataSourceOptions): khởi tạo kết nối cơ sở dữ liệu bằng cách sử dụng dataSourceOptions được import vào
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    PostModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
