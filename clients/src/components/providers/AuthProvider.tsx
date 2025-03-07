'use client'

import { useEffect } from 'react'
import useAuth from '@/store/useAuth'

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { initialize } = useAuth()

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}
