'use client'
import Image from 'next/image'
import SetaInfo from '@/assets/seta-info.svg'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function TrialClass() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            // variant="outline"
            className="shadow-button  inline-flex w-full flex-shrink-0  cursor-pointer  items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-[#8234e9] bg-transparent px-5 py-1 text-gray-950 transition-all hover:bg-[#8234e9] disabled:opacity-50 dark:text-white"
          >
            Agende uma aula gratuita
            <Image
              src={SetaInfo}
              className="size-4 dark:invert"
              alt="Agende uma aula gratuita"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agende sua Aula Experimental</DialogTitle>
            <DialogDescription className="text-sm text-gray-300">
              Sua primeira aula é por nossa conta! Agende com 24h de
              antecedência e confirmaremos pelo WhatsApp ou e-mail.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nome Completo</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Digite seu nome completo"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" placeholder="Digite seu email" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone-1">Telefone / WhatsApp</Label>
              <Input
                id="phone-1"
                name="phone"
                placeholder="Digite seu telefone"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="age-1">Idade</Label>
              <Input id="age-1" name="age" placeholder="Digite sua idade" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="age-1">Nível de experiência</Label>
              <Select>
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Selecione um nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Nível de experiência</SelectLabel>
                    <SelectItem value="none">Nunca treinei</SelectItem>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="age-1">Objetivo principal</Label>
              <Select>
                <SelectTrigger className="w-auto">
                  <SelectValue placeholder="Selecione um objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Objetivo principal</SelectLabel>
                    <SelectItem value="fitness">
                      Melhorar forma física
                    </SelectItem>
                    <SelectItem value="defense">Defesa pessoal</SelectItem>
                    <SelectItem value="competition">Competição</SelectItem>
                    <SelectItem value="lifestyle">Qualidade de vida</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Agendar Aula</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
