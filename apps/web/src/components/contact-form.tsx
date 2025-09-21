'use client'

import { z } from 'zod'
import { SectionTitle } from './section-title'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { Textarea } from './ui/textarea'
// import { SectionTitle } from '../section-title'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '../button'
// import { HiArrowNarrowRight } from 'react-icons/hi'
import { motion } from 'framer-motion'
import { fadeUpAnimation } from '@/lib/animations'
// import axios from 'axios'
// import { toast } from 'react-hot-toast'
// import { fadeUpAnimation } from '@/app/lib/animations'

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export const ContactForm = () => {
  // const {
  //   handleSubmit,
  //   register,
  //   reset,
  //   formState: { isSubmitting },
  // } = useForm<ContactFormData>({
  //   resolver: zodResolver(contactFormSchema),
  // })

  // const onSubmit = async (data: ContactFormData) => {
  //   try {
  //     await axios.post('/api/contact', data)
  //     toast.success('Mensagem enviada com sucesso!')
  //     reset()
  //   } catch (error) {
  //     toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
  //   }
  // }

  return (
    <section
      className="flex items-center justify-center bg-gray-950 py-10"
      id="contact"
    >
      <div className="mx-auto w-full max-w-[420px] px-4">
        {/* <motion.form
          className="mt-12 flex w-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
          {...fadeUpAnimation}
        >
          <input
            placeholder="Nome"
            className="h-14 w-full rounded-lg bg-gray-800 p-4 text-gray-50 ring-emerald-600 placeholder:text-gray-400 focus:outline-none focus:ring-2"
            {...register('name')}
          />
          <input
            placeholder="E-mail"
            type="email"
            className="h-14 w-full rounded-lg bg-gray-800 p-4 text-gray-50 ring-emerald-600 placeholder:text-gray-400 focus:outline-none focus:ring-2"
            {...register('email')}
          />
          <textarea
            placeholder="Mensagem"
            className="h-[138px] w-full resize-none rounded-lg bg-gray-800 p-4 text-gray-50 ring-emerald-600 placeholder:text-gray-400 focus:outline-none focus:ring-2"
            {...register('message')}
            maxLength={500}
          />

          <div className="relative mx-auto mt-6 w-max">
            <Button className="relative z-[2]" disabled={isSubmitting}>
              Enviar mensagem
              <HiArrowNarrowRight size={18} />
            </Button>
            <div className="absolute inset-0 bg-emerald-600 opacity-20 blur-2xl" />
          </div>
        </motion.form> */}
        <motion.form action="" className="space-y-4" {...fadeUpAnimation}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input name="name" id="name" />

            {/* {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )} */}
          </div>
          <div className="space-y-1">
            <Label htmlFor="telefone">Telefone</Label>
            <Input name="telefone" id="telefone" />

            {/* {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )} */}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" id="email" />

            {/* {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )} */}
          </div>

          <div className="space-y-1">
            <Label htmlFor="Mensagem">Mensagem</Label>
            <Textarea name="Mensagem" id="Mensagem" />

            {/* {errors?.Mensagem && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.Mensagem[0]}
            </p>
          )} */}
          </div>

          <Button className="w-full" type="submit">
            Enviar mensagem
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
