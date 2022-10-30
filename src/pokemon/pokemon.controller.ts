import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query
  // HttpCode, HttpStatus
} from "@nestjs/common";
import { PokemonService } from "./pokemon.service";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { ParseMongoIdPipe } from "../commons/pipes/parse-mongo-id/parse-mongo-id.pipe";
import { PaginationDto } from "../commons/dto/paginationDto";

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    console.log("body request", createPokemonDto);
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log({ paginationDto });
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(":term")
  findOne(@Param("term") term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(":term")
  update(@Param("term") term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}
