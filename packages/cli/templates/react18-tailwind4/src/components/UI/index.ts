// Export all UI components from their respective files
// export { default as Button } from './Buttons/Button';
// filepath: d:\web_server_templates\packages\templates\react18-tailwind4\src\components\UI\Button\index.ts
export { Button, buttonStyles,
    //  type ButtonProps 
    } from './Buttons/Button';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardStyles,
//   type CardProps,
} from './Card';

export { Input } from './Input';
export { Drawer } from './Drawer';
export { Carousel } from './Carousel';


// You can also export types if needed
export type { ButtonProps } from './Buttons/Button';
export type { CardProps } from './Card';
export type { InputProps } from './Input';
export type { DrawerSize, DrawerPosition } from './Drawer';
export type { CarouselVariant } from './Carousel';
