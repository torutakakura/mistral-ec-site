'use client'

import { useContext } from 'react'
import { AddressContext, AddressContextType } from '../providers/addressProvider'

// チェックボックスの料金設定を保持
export const useAddress = (): AddressContextType => useContext(AddressContext)
