import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

const URL_PATH =
  "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  constructor(private http: HttpClient) { }

  searchPokemon(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    return this.http.get(URL_PATH).pipe(
      map(results => {
        const foundPokemons = [];
        for (let i = 0; i < results.length; i++) {
          const pokemon = results[i];
          const pokeName = pokemon.Name.toLowerCase();
          const types = pokemon.Types.map(type => type.toLowerCase());
          if (pokeName.includes(searchTerm)) {
            foundPokemons.unshift(pokemon);
          }
          if (types.indexOf(searchTerm) > -1) {
            foundPokemons.push(pokemon);
          }
        }
        return foundPokemons.slice(0, 4);
      })
    );
  }
}
