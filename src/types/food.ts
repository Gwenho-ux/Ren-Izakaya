export interface FoodAttributes {
  taste: number;
  temperature: number;
  rarity: number;
}

export interface Food {
  id: string;
  name: string;
  type: string;
  videoPath: string;
  description: string;
  attributes: FoodAttributes;
} 