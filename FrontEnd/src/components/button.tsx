import  { ComponentProps, ReactNode } from "react"; // esse tipo de função dentro do react permite dividir diversos componentes menores e que irão se repetir 
import { tv, VariantProps } from "tailwind-variants";
// basta atualizar os childrens

const buttonVariants = tv({
  base:'rounded-lg px-5 font-medium flex items-center justify-center gap-2',

  variants:{
    variant: {
      primary: 'bg-amber-600 text-zinc-950 hover:bg-amber-700',
      secondary: 'bg-amber-950 text-amber-600 hover:bg-amber-900',
      terciary: 'bg-amber-700 text-zinc-950 hover:bg-amber-800',
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11',
      fit: 'flex w-fit h-11 py-2 items-center justify-center whitespace-nowrap',
    }
  }, 

  defaultVariants:{
    variant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{ 
  children: ReactNode 
}

export function Button({ children, variant, size, ...props } : ButtonProps){ 
  return (
    <button {...props} className={buttonVariants({variant, size})}> 
      {children}
    </button>
  )
}