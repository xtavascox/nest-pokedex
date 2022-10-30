import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { IPokeapiResponse } from "./interfaces/poke-response.interface";


@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<IPokeapiResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");
    data.results.forEach(({ name, url }) => {
      const segments = url.split("/");
      const pokemonNumber = Number(segments[segments.length - 2]);

      console.log({ name, pokemonNumber });
    });
    return data.results;
  }

}
