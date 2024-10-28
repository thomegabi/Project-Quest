import  { ComponentProps, ReactNode } from "react"; // esse tipo de função dentro do react permite dividir diversos componentes menores e que irão se repetir 
import { tv, VariantProps } from "tailwind-variants";
// basta atualizar os childrens

const buttonVariants = tv({
  base:'rounded-lg px-5 font-medium flex items-center justify-center gap-2',

  variants:{
    variant: {
      primary: 'bg-amber-600 text-amber-950 hover:bg-amber-700',
      secondary: 'bg-zinc-800 text-zinc-200  hover:bg-zinc-900',
      terciary: 'bg-rose-600 text-rose-950 hover:bg-rose-800',
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