'use server'

import { redirect } from 'next/navigation'

import { env } from '@saas/env'

export async function signInWithGoogleOAuth() {
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')

  googleAuthUrl.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
  googleAuthUrl.searchParams.set(
    'redirect_uri',
    env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI
  )
  googleAuthUrl.searchParams.set('response_type', 'code')
  googleAuthUrl.searchParams.set('scope', 'openid email profile')

  redirect(googleAuthUrl.toString())
}
