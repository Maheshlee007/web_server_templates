import  { type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export const  cn=(...inputs:ClassValue[])=>{
    return twMerge(clsx(inputs));
}
//knowledge note:
// there is no default abbrivation for cn it's a custom util function in short className
// Default export - always imported
//import cn from './utilCN';  // cn is always bundled

// Named export - can be tree-shaken if unused
//import { cn } from './utilCN';  // Only bundled if actually used