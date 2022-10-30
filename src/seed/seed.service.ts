import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPokeapiResponse } from "./interfaces/poke-response.interface";
import { Pokemon } from "../pokemon/entities/pokemon.entity";
import { AxiosAdapter } from "../commons/adapters/axios.adapter";


@Injectable()
export class SeedService {

  constructor(@InjectModel(Pokemon.name)
              private readonly pokemonModel: Model<Pokemon>,
              private readonly http: AxiosAdapter
  ) {
  }

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<IPokeapiResponse>("https://pokeapi.co/api/v2/pokemon?limit=500");

    // const insertPromisesArray = [];
    //
    // data.results.forEach(({ name, url }) => {
    //   const segments = url.split("/");
    //   const pokemonNumber = Number(segments[segments.length - 2]);
    //
    //   // const pokemon = this.pokemonModel.create({ name, pokemonNumber });
    //   insertPromisesArray.push(this.pokemonModel.create({ name, pokemonNumber }));
    // });
    //
    // await Promise.all(insertPromisesArray);

    const pokemonToInsert: { name: string, pokemonNumber: number }[] = [];
    data.results.forEach(({ name, url }) => {
      const segments = url.split("/");
      const pokemonNumber = Number(segments[segments.length - 2]);
      pokemonToInsert.push({ name, pokemonNumber });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return "Seed executed";
  }

}
