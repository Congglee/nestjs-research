import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreaterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'items_per_page' })
  @ApiQuery({ name: 'search' })
  @Get()
  getAllUser(@Query() query: FilterUserDto): Promise<User[]> {
    console.log(query);
    return this.userService.getAllUser(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() createUserDto: CreaterUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }

  @UseGuards(AuthGuard)
  @Post('upload-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg', '.webp'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log('upload avatar');
    console.log(file);

    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) {
      throw new BadRequestException('File is required');
    }

    this.userService.updateAvatar(
      req.user_data.id,
      file.destination + '/' + file.filename,
    );
  }
}
