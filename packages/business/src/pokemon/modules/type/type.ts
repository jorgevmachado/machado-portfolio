import type { TypeColor, TypeEntity } from './interface';
import type { PokemonTypeInformationExternalResponse } from '../../../api/external/pokemon/modules';

export class Type implements TypeEntity {
  id: string;
  url: string;
  name: string;
  order: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  text_color: string;
  background_color: string;

  private typeColors: Array<TypeColor> = [
    { id: 1, name: 'ice', textColor: '#fff', backgroundColor: '#51c4e7' },
    { id: 2, name: 'bug', textColor: '#b5d7a7', backgroundColor: '#482d53' },
    { id: 3, name: 'fire', textColor: '#fff', backgroundColor: '#ff2400' },
    { id: 4, name: 'rock', textColor: '#fff', backgroundColor: '#a38c21' },
    { id: 5, name: 'dark', textColor: '#fff', backgroundColor: '#707070' },
    { id: 6, name: 'steel', textColor: '#fff', backgroundColor: '#9eb7b8' },
    { id: 7, name: 'ghost', textColor: '#fff', backgroundColor: '#7b62a3' },
    { id: 8, name: 'fairy', textColor: '#cb3fa0', backgroundColor: '#c8a2c8' },
    { id: 9, name: 'water', textColor: '#fff', backgroundColor: '#72c8dd' },
    { id: 10, name: 'grass', textColor: '#8b4513', backgroundColor: '#b9cc50' },
    { id: 11, name: 'normal', textColor: '#000', backgroundColor: '#fff' },
    { id: 12, name: 'dragon', textColor: '#fff', backgroundColor: '#FF8C00' },
    {
      id: 13,
      name: 'poison',
      textColor: '#f5f5f5',
      backgroundColor: '#8b008b',
    },
    {
      id: 14,
      name: 'flying',
      textColor: '#424242',
      backgroundColor: '#3dc7ef',
    },
    {
      id: 15,
      name: 'ground',
      textColor: '#f5f5f5',
      backgroundColor: '#bc5e00',
    },
    { id: 16, name: 'psychic', textColor: '#fff', backgroundColor: '#f366b9' },
    {
      id: 17,
      name: 'electric',
      textColor: '#0000ff',
      backgroundColor: '#ffff40',
    },
    { id: 18, name: 'fighting', textColor: '#fff', backgroundColor: '#d56723' },
  ];

  constructor(
    response?: PokemonTypeInformationExternalResponse,
    order?: number,
  ) {
    const typeColor = this.typeColors.find(
      (color) => color.name === response?.type?.name,
    );
    this.url = response?.type?.url ?? this.url;
    this.name = response?.type?.name ?? this.name;
    this.order = order ?? this.order;
    this.text_color = !typeColor ? '#FFF' : typeColor.textColor;
    this.background_color = !typeColor ? '#000' : typeColor.backgroundColor;
  }
}
