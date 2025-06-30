import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signInWithGoogle } from '@/http/sign-in-with-google'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('Erro no Google OAuth:', error)
    return NextResponse.redirect(
      new URL('/auth/sign-in?error=google_auth_failed', request.url)
    )
  }
  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/sign-in?error=no_auth_code', request.url)
    )
  }
  try {
    const token = await signInWithGoogle({ code })

    if (token) {
      ;(await cookies()).set('token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })

      return NextResponse.redirect(new URL('/', request.url))
    } else {
      console.error('Nenhum token recebido do backend para Google Auth.')
      return NextResponse.redirect(
        new URL('/auth/sign-in?error=backend_token_failed', request.url)
      )
    }
  } catch (err) {
    console.error('Falha ao fazer login com Google:', err)
    return NextResponse.redirect(
      new URL('/auth/sign-in?error=google_login_failed', request.url)
    )
  }
}
