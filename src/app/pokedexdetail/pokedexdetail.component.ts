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
  pokemonId!: number;

  constructor(private route: ActivatedRoute, private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = params['id'];
      this.getPokemonDetail(this.pokemonId);
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

  playCry(pokemon: any): void {
    const audio = new Audio(pokemon.cries.latest);
    audio.play();
  }
}
