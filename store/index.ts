// Zustand Reactの状態管理ライブラリ
// https://github.com/pmndrs/zustand
import { create } from 'zustand'

type User = {
  id: string | undefined
  email: string | undefined
  name: string | undefined
  name_kana: string | undefined
  postocde: string | undefined
  prefecture: string | undefined
  city_street_address: string | undefined
  building_apartment: string | undefined
  company_department: string | undefined
  phone_number: string | undefined
  use_postbox: boolean | undefined,  
}

type State = {
  user: User
  setUser: (payload: User) => void
}

const useStore = create<State>((set) => ({
  // 初期値
  user: { 
    id: '',
    email: '', 
    name: '',
    name_kana: '',
    postocde: '',
    prefecture: '',
    city_street_address: '',
    building_apartment: '',
    company_department: '',
    phone_number: '',
    use_postbox: false,  
  },
  // アップデート
  setUser: (payload) => set({ user: payload }),
}))

export default useStore
