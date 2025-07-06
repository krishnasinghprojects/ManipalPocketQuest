export interface PokemonCard {
  id: number;
  name: string;
  imageUrl: string;
  type: string[];
  hp: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  attack: number;
  defense: number;
  speed: number;
  description: string;
} 