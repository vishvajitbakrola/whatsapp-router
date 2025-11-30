'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [links, setLinks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  // New Link State
  const [agents, setAgents] = useState([{ name: 'Agent 1', phone: '' }])
  const [msg, setMsg] = useState('')
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    getLinks()
  }, [])

  const getLinks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return router.push('/login')

    const { data } = await supabase
      .from('links')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setLinks(data)
  }

  const createLink = async () => {
    const short_code = Math.random().toString(36).substring(2, 8)
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('links').insert({
      user_id: user.id,
      short_code,
      message: msg,
      agents: agents
    })

    if (error) alert(error.message)
    else {
      setIsModalOpen(false)
      getLinks() // Refresh list
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Links</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-green-700">
            + Create New
          </button>
        </div>

        {/* Link List */}
        <div className="grid gap-4">
          {links.map((link) => (
            <div key={link.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <a href={`/${link.short_code}`} target="_blank" className="text-xl font-bold text-blue-600 hover:underline">
                  /{link.short_code}
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  {link.agents.length} Agents • {link.clicks} Clicks
                </p>
              </div>
              <div className="flex gap-3">
                 <button className="text-sm border px-3 py-1 rounded hover:bg-gray-50" onClick={() => navigator.clipboard.writeText(`${location.origin}/${link.short_code}`)}>Copy</button>
                 <button className="text-sm text-red-500 border border-red-200 px-3 py-1 rounded hover:bg-red-50" onClick={async () => {
                   await supabase.from('links').delete().eq('id', link.id)
                   getLinks()
                 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">New WhatsApp Router</h2>
              
              {agents.map((agent, i) => (
                <div key={i} className="mb-3">
                  <input 
                    placeholder="Phone (e.g., 919876543210)" 
                    className="w-full p-2 border rounded"
                    value={agent.phone}
                    onChange={(e) => {
                      const newAgents = [...agents]
                      newAgents[i].phone = e.target.value
                      setAgents(newAgents)
                    }}
                  />
                </div>
              ))}
              <button onClick={() => setAgents([...agents, {name: 'New', phone: ''}])} className="text-xs text-blue-600 font-bold mb-4">+ Add Agent</button>
              
              <textarea 
                placeholder="Pre-filled Message" 
                className="w-full p-2 border rounded mb-4"
                onChange={(e) => setMsg(e.target.value)}
              />
              
              <div className="flex gap-2">
                <button onClick={createLink} className="flex-1 bg-green-600 text-white py-2 rounded font-bold">Save</button>
                <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 py-2 rounded font-bold">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}