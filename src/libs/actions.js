'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=error')
  }

  console.log(data)
  redirect('/login?message=success')

  // revalidatePath('/', 'layout')  
  // redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        name: formData.get('name'),
        role: 'apoteker', 
      },
    }
  }
  console.log(data) 

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error)
    redirect('/signup?message=error')
  }


  // revalidatePath('/', 'layout')
  redirect('/signup?message=success')
}

export const loginWithGoogle = async () => {
  const supabase = await createClient()
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:'https://obat-pedia.vercel.app/auth/callback',
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
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }
  console.log('user logOut')
  revalidatePath('/', 'layout')  
  redirect('/login')
}

export const getUser = async () => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
      return null;
    }
    return data?.user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const handleOauth = async () => {
   const supabase = await createClient();
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