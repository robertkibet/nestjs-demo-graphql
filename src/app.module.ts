import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path/posix';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), //
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite', // using sqlite database
      database: ':memory:', // run database in memory, any restart is a fresh database
      entities: ['dist/**/*.entity{.ts,.js}'], // searches for entities within dist
      synchronize: true, // auto sync and update schema to match database, always use migrations for production level code
    }),
    PetsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
