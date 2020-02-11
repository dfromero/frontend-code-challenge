import { Component } from "@angular/core";
import {PokemonServiceService} from "./pokemon-service.service";
import {Observable} from "rxjs";
import {finalize, shareReplay} from "rxjs/operators";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "frontend-code-challenge";
  pokemons$: Observable<any>;
  loading = false;
  searchTerm = '';
  constructor(private pokemonService: PokemonServiceService) {
  }

  getPokemons(searchTerm) {
    this.loading = true;
    this.pokemons$ = this.pokemonService.searchPokemon(searchTerm)
      .pipe(
        shareReplay(),
        finalize(() => {
          this.loading = false;
        })
      );
  }

  onInputChange(event) {
    this.searchTerm = event.target.value;
    this.getPokemons(this.searchTerm);
  }

  onMaxCPChange(event) {
    console.log('max cp toggled', event);
  }

  getPokemonTypeClass(type: string) {
    return type.toLowerCase();
  }

  highlightName(name: string) {
    const searchTerm = this.searchTerm.toLowerCase();
    const startIndex = name.toLowerCase().indexOf(searchTerm.toLowerCase());
    let highlLightName = '';
    if(startIndex > -1) {
      const endIndex = startIndex + searchTerm.length;
      const startName = name.split('').slice(0, startIndex).join('');
      const endName = name.split('').slice(endIndex, name.length).join('');
      const highlLight = name.split('').slice(startIndex, endIndex).join('');
      highlLightName = `${startName}<span class="hl">${highlLight}</span>${endName}`;
    } else {
      highlLightName = name;
    }

    return highlLightName;
  }
}
