import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { HobbiesModule } from './hobbies/hobbies.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config:{
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
          filename: "./db.sqlite"
        }
      }
    }),
    UsersModule,
    HobbiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
