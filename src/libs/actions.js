'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')  
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        name: formData.get('name'),
        role: 'user',
      },
    }
  }
  console.log(data) 

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect('/error?error='+error)
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export const loginWithGoogle = async () => {
  const supabase = createClient()
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:'http://localhost:3000/auth/callback',
      data: {
        role: 'user',
      }
    },
  })
  if (error) {
    console.log(error)
  }
  if (data.url) {
    redirect(data.url)
  }
}

export const logOut = async () => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }
  revalidatePath('/', 'layout')  
  redirect('/login')
}

export const getUser = async()=>{
  const supabase = createClient()
  try {
    
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch {
    console.log('error')
  }
}

export const handleOauth = async () => {
   const supabase = createClient();
   const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://obat-pedia.vercel.app/auth/callback',
    },
  })
  
  if (data.url) {
    redirect(data.url)
  }
}