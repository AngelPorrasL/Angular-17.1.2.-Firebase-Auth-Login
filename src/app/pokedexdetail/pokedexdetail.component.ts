import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokedexService } from '../pokedex/services/pokedex.service';

@Component({
  selector: 'app-pokedexdetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedexdetail.component.html',
  styleUrl: './pokedexdetail.component.css'
})
export class PokedexdetailComponent {

  pokemonDetails: any;
  pokemonDescriptions: any;
  pokemonWeaks: any;
  pokemonId!: number;

  constructor(private route: ActivatedRoute, private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = params['id'];
      this.getPokemonDetail(this.pokemonId);
      this.getPokemonWeak(this.pokemonId);
      this.getPokemonDescription(this.pokemonId);
    });
  }

  getPokemonDetail(pokemonId: number): void {
    this.pokedexService.getPokemon(pokemonId)
      .subscribe(
        (data: any) => {
          this.pokemonDetails = data;
        }
      );
  }

  getPokemonWeak(pokemonId: number): void {
    this.pokedexService.getType(pokemonId)
      .subscribe(
        (data: any) => {
          this.pokemonWeaks = data.damage_relations.double_damage_from;
        }
      );
  }

  getPokemonDescription(pokemonId: number): void {
    this.pokedexService.getPokemonSpecies(pokemonId)
      .subscribe(
        (data: any) => {
          const descriptionEntry = data.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
          this.pokemonDescriptions = descriptionEntry ? descriptionEntry.flavor_text : '';
        }
      );
  }

  playCry(pokemon: any): void {
    const audio = new Audio(pokemon.cries.latest);
    audio.play();
  }
}
