'use server'

import { createClient } from '@/lib/supabase/server'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key-change-in-production')

export interface SessionUser {
  id: string
  email: string
  role: 'super_admin' | 'school_admin' | 'teacher' | 'parent'
  schoolId: string | null
  status: 'active' | 'suspended'
}

export async function createSession(user: SessionUser) {
  try {
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId,
      status: user.status,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return { success: true }
  } catch (error) {
    console.error('Session creation error:', error)
    return { success: false, error: 'Failed to create session' }
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as SessionUser
  } catch (error) {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

export async function loginUser(email: string, password: string) {
  // Demo accounts are intentionally handled locally in preview mode so a temporary
  // Supabase connection or RLS issue cannot leave the demo login spinning forever.
  // Keep the documented demo accounts available in preview even if the local
  // env file is reloaded without DEMO_MODE. Set DEMO_MODE=false to disable them.
  if (process.env.DEMO_MODE !== 'false') {
    const demoUsers: Record<string, SessionUser & { password: string }> = {
      'admin@vidyalaya.edu': {
        id: '00000000-0000-4000-8000-000000000001',
        email: 'admin@vidyalaya.edu',
        password: 'AdminPass123',
        role: 'super_admin',
        schoolId: null,
        status: 'active',
      },
      'schooladmin@shiningstars.edu.np': {
        id: '00000000-0000-4000-8000-000000000002',
        email: 'schooladmin@shiningstars.edu.np',
        password: 'SchoolAdmin@123',
        role: 'school_admin',
        schoolId: '00000000-0000-4000-8000-000000000010',
        status: 'active',
      },
      'teacher@shiningstars.edu.np': {
        id: '00000000-0000-4000-8000-000000000003',
        email: 'teacher@shiningstars.edu.np',
        password: 'Teacher@123',
        role: 'teacher',
        schoolId: '00000000-0000-4000-8000-000000000010',
        status: 'active',
      },
      'parent@shiningstars.edu.np': {
        id: '00000000-0000-4000-8000-000000000004',
        email: 'parent@shiningstars.edu.np',
        password: 'Parent@123',
        role: 'parent',
        schoolId: '00000000-0000-4000-8000-000000000010',
        status: 'active',
      },
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedPassword = password.trim()
    const demoUser = demoUsers[normalizedEmail]
    if (!demoUser || demoUser.password !== normalizedPassword) {
      return { success: false, error: 'Invalid email or password' }
    }

    const { password: _password, ...sessionUser } = demoUser
    const sessionResult = await createSession(sessionUser)
    return sessionResult.success
      ? { success: true, user: sessionUser }
      : { success: false, error: 'Failed to create session' }
  }

  const supabase = await createClient()
  
  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, password_hash, role, school_id, status')
      .eq('email', email)
      .single()

    if (userError || !user) {
      return { success: false, error: 'Invalid credentials' }
    }

    if (user.status !== 'active') {
      return { success: false, error: 'Account is suspended' }
    }

    const passwordValid = await bcrypt.compare(password, user.password_hash)
    if (!passwordValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      schoolId: user.school_id,
      status: user.status,
    }

    const sessionResult = await createSession(sessionUser)
    if (!sessionResult.success) {
      return { success: false, error: 'Failed to create session' }
    }

    return {
      success: true,
      user: sessionUser,
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function requestSchoolRegistration(
  schoolName: string,
  address: string,
  contactPerson: string,
  phone: string,
  email: string
) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('school_registration_requests')
      .insert([
        {
          school_name: schoolName,
          address,
          contact_person: contactPerson,
          phone,
          email,
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      console.error('Registration request error:', error)
      return { success: false, error: 'Failed to submit registration request' }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Registration request error:', error)
    return { success: false, error: 'An error occurred' }
  }
}
