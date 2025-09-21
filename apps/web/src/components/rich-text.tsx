import { RichText as CMSRichText } from '@graphcms/rich-text-react-renderer'
import { ComponentProps } from 'react'

type RichTextProps = ComponentProps<typeof CMSRichText>

export const RichText = ({ ...props }: RichTextProps) => {
  return (
    <CMSRichText
      {...props}
      renderers={{
        bold: ({ children }) => (
          <b className="font-medium text-gray-50">{children}</b>
        ),
        ul: ({ children }) => (
          <ul className="flex list-inside list-disc flex-col gap-1 pl-2">
            {children}
          </ul>
        ),
        a: ({ children, ...props }) => (
          <a
            {...props}
            className="underline transition-colors hover:text-emerald-500"
          >
            {children}
          </a>
        ),
        h3: ({ children }) => (
          <h3 className="mt-20 text-center text-2xl font-medium uppercase text-gray-100 lg:text-3xl">
            {children}
          </h3>
        ),
        h2: ({ children }) => (
          <h2 className="lg:text-1xl mt-4 text-center text-xl font-medium uppercase text-gray-100">
            {children}
          </h2>
        ),
        h1: ({ children }) => (
          <h1 className="text-xl font-semibold text-gray-50">{children}</h1>
        ),
        p: ({ children }) => (
          <p className="mt-10 mt-4 text-gray-400">{children}</p>
        ),
      }}
    />
  )
}
