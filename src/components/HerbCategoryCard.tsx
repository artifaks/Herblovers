import React from 'react';
import { Heart, Leaf, UserRound, User, Brain, Coffee } from 'lucide-react';
import { HerbCategory } from '@/data/herbs';

interface HerbCategoryCardProps {
  category: HerbCategory;
}

const iconMap: Record<string, React.ReactNode> = {
  "❤️": <Heart className="h-5 w-5" />,
  "🌿": <Leaf className="h-5 w-5" />,
  "♂️": <UserRound className="h-5 w-5" />,
  "♀️": <User className="h-5 w-5" />,
  "🧠": <Brain className="h-5 w-5" />,
  "🫖": <Coffee className="h-5 w-5" />,
  "⚡️": <span className="text-lg">⚡️</span>,
  "🛡️": <span className="text-lg">🛡️</span>,
  "🌙": <span className="text-lg">🌙</span>,
  "🌺": <span className="text-lg">🌺</span>,
  "🫁": <span className="text-lg">🫁</span>,
  "🌸": <span className="text-lg">🌸</span>,
  "✨": <span className="text-lg">✨</span>,
  "🦴": <span className="text-lg">🦴</span>,
  "👁️": <span className="text-lg">👁️</span>
};

const getColorClasses = (color: string) => {
  // If it's a hex color, create dynamic classes
  if (color.startsWith('#')) {
    return {
      bg: `bg-[${color}]`,
      bgOpacity: 'bg-opacity-15',
      border: `border-[${color}]`,
      text: `text-[${color}]`
    };
  }

  // Fallback for old color names
  switch (color) {
    case 'herb-heart':
      return {
        bg: 'bg-[#EF4444]',
        bgOpacity: 'bg-opacity-15',
        border: 'border-[#EF4444]',
        text: 'text-[#EF4444]'
      };
    case 'herb-digestive':
      return {
        bg: 'bg-[#10B981]',
        bgOpacity: 'bg-opacity-15',
        border: 'border-[#10B981]',
        text: 'text-[#10B981]'
      };
    case 'herb-mens':
      return {
        bg: 'bg-[#3B82F6]',
        bgOpacity: 'bg-opacity-15',
        border: 'border-[#3B82F6]',
        text: 'text-[#3B82F6]'
      };
    case 'herb-womens':
      return {
        bg: 'bg-[#EC4899]',
        bgOpacity: 'bg-opacity-15',
        border: 'border-[#EC4899]',
        text: 'text-[#EC4899]'
      };
    case 'herb-cognitive':
      return {
        bg: 'bg-[#8B5CF6]',
        bgOpacity: 'bg-opacity-15',
        border: 'border-[#8B5CF6]',
        text: 'text-[#8B5CF6]'
      };
    case 'herb-tea':
      return {
        bg: 'bg-[#059669]',
        bgOpacity: 'bg-opacity-15',
        border: 'border-[#059669]',
        text: 'text-[#059669]'
      };
    default:
      return {
        bg: 'bg-gray-200',
        bgOpacity: 'bg-opacity-15',
        border: 'border-gray-300',
        text: 'text-gray-700'
      };
  }
};

const HerbCategoryCard: React.FC<HerbCategoryCardProps> = ({ category }) => {
  const colorClasses = getColorClasses(category.color);
  
  return (
    <div className={`flex items-center space-x-2 p-3 rounded-md ${colorClasses.bg} ${colorClasses.bgOpacity} border-l-4 ${colorClasses.border} transition-all duration-200 hover:shadow-md hover:scale-105`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${colorClasses.bg} text-white`}>
        {iconMap[category.icon]}
      </div>
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full ${colorClasses.bg} mr-2`}></span>
        <span className={`text-sm font-medium ${colorClasses.text}`}>{category.description}</span>
      </div>
    </div>
  );
};

export default HerbCategoryCard;
