import { Food } from '@/types/food';

export const foods: Food[] = [
  {
    id: 'crimson-coil',
    name: 'Crimson Coil Drink',
    type: 'Hydra Moon Planet',
    videoPath: '/videos/pinkdrink.mp4',
    description: '💥 A red glowing drink with soft tentacles inside, chilled from deep space. It\'s strong, a bit bitter, and cool.',
    attributes: {
      taste: 2,
      temperature: 3,
      rarity: 1
    }
  },
  {
    id: 'blue-tangler',
    name: 'Blue Tangler Juice',
    type: 'Gas Giant Planet',
    videoPath: '/videos/bluedrink.mp4',
    description: '🧊 A bright blue drink with a floating space octopus. Cold, fizzy, with a strange sweet-bitter twist.',
    attributes: {
      taste: 3,
      temperature: 4,
      rarity: 2
    }
  },
  {
    id: 'frosted-aurora',
    name: 'Frosted Aurora Cauldron',
    type: 'Triton Mist Planet',
    videoPath: '/videos/blueplate.mp4',
    description: '❄️ A glowing, icy mist swirling in a black dish, like a frozen portal to another world. Airy taste that feels like catching snowflakes on your tongue.',
    attributes: {
      taste: 1,
      temperature: 1,
      rarity: 5
    }
  },
  {
    id: 'emberstorm',
    name: 'Emberstorm Skillet',
    type: 'Oblivion Reef Planet',
    videoPath: '/videos/food.mp4',
    description: '🔥 Spicy, bold, and tangy, every bite sparks heat and delivers a warmth that hits you straight in the soul.',
    attributes: {
      taste: 2,
      temperature: 5,
      rarity: 3
    }
  }
]; 