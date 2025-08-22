import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={
        'shadow-button flex w-max items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-gray-50 transition-all hover:bg-emerald-500 disabled:opacity-50'
      }
      {...props}
    >
      {children}
    </button>
  )
}
