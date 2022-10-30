import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { PokemonModule } from "./pokemon/pokemon.module";
import { MongooseModule } from "@nestjs/mongoose";
import { CommonsModule } from "./commons/commons.module";
import { ConfigModule } from "@nestjs/config";
import { SeedModule } from "./seed/seed.module";
import { EnvConfiguration } from "./config/env.config";
import { JoiValidationSchema } from "./config/joi.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema:JoiValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonsModule,
    SeedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor() {
  }
}
