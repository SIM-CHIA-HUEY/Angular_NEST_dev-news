import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tagUsersController } from './tagUsers.controller';
import { tagUsersService } from './tagUsers.service';
import { TagUsers } from "./tagUsers.entity"; 

@Module({

  imports: [TypeOrmModule.forFeature([TagUsers])],
  controllers: [tagUsersController],
  providers: [tagUsersService],
  exports: [tagUsersService]
})
export class tagUsersModule { }