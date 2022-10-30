import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { PokemonModule } from "../pokemon/pokemon.module";
import { CommonsModule } from "../commons/commons.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PokemonModule, CommonsModule]
})
export class SeedModule {
}
