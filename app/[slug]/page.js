'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'

export default function RedirectPage({ params }) {
  const [status, setStatus] = useState('Initializing...')
  const supabase = createClient()

  useEffect(() => {
    handleRedirect()
  }, [])

  const handleRedirect = async () => {
    const { slug } = params
    
    // 1. Fetch Link Data
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('short_code', slug)
      .single()

    if (error || !data) {
      setStatus('Link not found')
      return
    }

    // 2. Analytics: Increment Click Count (RPC call recommended for production, simplified here)
    await supabase.from('links').update({ clicks: data.clicks + 1 }).eq('id', data.id)

    // 3. Load Balancing Logic
    const agents = data.agents
    const randomAgent = agents[Math.floor(Math.random() * agents.length)]
    
    setStatus(`Routing to agent...`)
    
    // 4. Redirect
    window.location.href = `https://wa.me/${randomAgent.phone}?text=${encodeURIComponent(data.message || '')}`
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-gray-700">{status}</h2>
    </div>
  )
}