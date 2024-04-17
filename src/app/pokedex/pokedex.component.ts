import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokedexService } from './services/pokedex.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  pokeIds: number[] = [];
  pokes: { [key: number]: any } = {};
  searchTerm: string = '';
  constructor(private router: Router, private pokedexService: PokedexService) {}

  ngOnInit(): void {
    // Generar una lista de IDs de Pokémon del 1 al 20 (o cualquier rango deseado)
    const pokeIds = Array.from({ length: 62 }, (_, index) => index + 1);

    // Hacer solicitudes para obtener los datos de cada Pokémon en el orden de la lista de IDs
    pokeIds.forEach(id => {
      this.getPokemonById(id);
    });
  }

    // Método para filtrar los Pokémon según el término de búsqueda
    get filteredPokeIds(): number[] {
      return this.pokeIds.filter(pokeId =>
        this.pokes[pokeId].name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

  getPokemonById(id: number): void {
    this.pokedexService.getPokemon(id).subscribe((data: any) => {
      this.pokes[id] = data;
      this.pokeIds.push(id); // Adding the ID to the list
    });
  }

  getPokemonImage(pokemon: any): any {
    return {
      front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      front_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`,
      back_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`,
      back_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`
    };
  }

  onViewDetail(pokeId: number) {
    this.router.navigate(['/pokedex', pokeId]);
  }
}
