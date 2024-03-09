import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from './utils/database.types'

// ミドルウェア
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient<Database>({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 未認証状態で新規投稿画面に遷移した場合は、ログイン画面にリダイレクト
  if (
    !session 
    && (req.nextUrl.pathname.startsWith('/order_form')
    || req.nextUrl.pathname.startsWith('/order_confirm')
    || req.nextUrl.pathname.startsWith('/member_edit')
    || req.nextUrl.pathname.startsWith('/my_page')
    || req.nextUrl.pathname.startsWith('/new_delivery_address'))
  ) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }
  return res
}
