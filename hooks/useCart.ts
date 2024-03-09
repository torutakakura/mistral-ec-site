'use client'

import { useContext } from 'react'
import { CartContext, CartContextType } from '../providers/cartProvider'

// セレクトボックスの寸法・ランクを保持
export const useCart = (): CartContextType => useContext(CartContext)
