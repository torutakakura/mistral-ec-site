'use client'

import { useContext } from 'react'
import { StripeContext, StripeTokenContextType } from '../providers/stripeTokenProvider'

// チェックボックスの料金設定を保持
export const useStripeToken = (): StripeTokenContextType => useContext(StripeContext)
