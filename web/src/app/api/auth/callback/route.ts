import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectUrl = new URL('/', request.url)

  // 60 seconds == 1 minte * 60 minutes == 1 hour * 24 hours == 1 day * 30 days == 1 month
  const cookiesExpiresOnSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-cookie': `token=${token}; Path=/; max-age=${cookiesExpiresOnSeconds};`,
    },
  })
}
