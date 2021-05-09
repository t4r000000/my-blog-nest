import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskImplementsAsPrisma } from './task/infrastorucuture/task.prisma';
import { TaskController } from './task/task.controller';
import { PrismaService } from './utils/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskImplementsAsPrisma, PrismaService],
})
export class AppModule {}
