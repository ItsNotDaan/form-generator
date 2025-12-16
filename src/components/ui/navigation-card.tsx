import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';
import {Button} from './button';
import {LucideIcon} from 'lucide-react';

interface NavigationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: LucideIcon;
  onClick: () => void;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onClick,
}) => {
  return (
    <Card
      className="transition-shadow duration-200 cursor-pointer hover:shadow-lg group"
      onClick={onClick}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-center w-12 h-12 transition-colors rounded-full bg-primary/10 group-hover:bg-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          size="lg"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
        >
          <ButtonIcon className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
