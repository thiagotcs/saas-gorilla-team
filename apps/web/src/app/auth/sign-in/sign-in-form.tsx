'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import googleIcon from '@/assets/icons8-google.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/navigation'
import { signInWithGoogleOAuth } from '../actions'

export default function SignInForm() {
  const router = useRouter()
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      router.push('/')
    }
  )

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input name="email" type="text" id="email" />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}

          <Link
            href="/auth/forgot-password"
            className="text-foreground text-xs font-medium hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              Sign in with e-mail
              <Loader2 className="ml-2 size-4 animate-spin" />
            </>
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>

        <Separator />
      </form>
      <form action={signInWithGoogleOAuth}>
        <Button type="submit" className="w-full" variant="outline">
          <Image src={googleIcon} alt="" className="mr-2 size-4" />
          Sign in with Google
        </Button>
      </form>
    </>
  )
}
