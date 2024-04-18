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
  types: any[] = []; // Lista de tipos de Pokémon
  selectedType: string = ''; // Tipo de Pokémon seleccionado para filtrar

  constructor(private router: Router, private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.getTypes();
    // Generar una lista de IDs de Pokémon del 1 a cualquier rango deseado)
    const pokeIds = Array.from({ length: 1302 }, (_, index) => index + 1);

    // Hacer solicitudes para obtener los datos de cada Pokémon en el orden de la lista de IDs
    pokeIds.forEach(id => {
      this.getPokemonById(id);
    });
  }

    // Método para filtrar los Pokémon según el nombre por la barra de busqueda
    get filteredPokeIds(): number[] {
      return this.pokeIds.filter(pokeId =>
        this.pokes[pokeId].name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    filterByType(): void {
      // Filtrar los IDs de los Pokémon según el tipo seleccionado
      if (this.selectedType) {
          this.pokeIds = this.pokeIds.filter(pokeId =>
              this.pokes[pokeId].types.some((type: any) => type.type.name === this.selectedType)
          );
      } else {
          // Si no se seleccionó ningún tipo, restablecer para mostrar todos los Pokémon
          this.pokeIds = Array.from({ length: 1302 }, (_, index) => index + 1);
      }
  }

    getTypes(): void {
      this.pokedexService.getTypes().subscribe((types: any) => {
        this.types = types.results.map((type: any) => type.name);
      });
    }

  getPokemonById(id: number): void {
    this.pokedexService.getPokemon(id).subscribe((data: any) => {
      this.pokes[id] = data;
      this.pokeIds.push(id);
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
