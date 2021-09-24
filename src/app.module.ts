import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { HobbiesModule } from './hobbies/hobbies.module';

const db_config = {
  test: {
    config: {
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './db.sqlite',
      },
    },
  },
  production: {
    config: {
      client: 'pg',
      connection: {
        host: 'db',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
      },
    },
  },
};

@Module({
  imports: [
    KnexModule.forRoot(db_config[process.env.NODE_ENV]),
    UsersModule,
    HobbiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
