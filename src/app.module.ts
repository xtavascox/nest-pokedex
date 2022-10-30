import  {join} from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from "@nestjs/serve-static";
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonsModule } from './commons/commons.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','public')
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule,
    CommonsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
