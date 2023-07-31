import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MeetingmapModule } from './meetingmap/meetingmap.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URI ?? 'mongodb://127.0.0.1:27017/meetingmapper',
      {
        connectionFactory: (connection) => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      },
    ),
    AuthModule,
    UsersModule,
    MeetingmapModule,
  ],
})
export class AppModule {}
