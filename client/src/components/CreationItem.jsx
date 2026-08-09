import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { Copy, Check } from 'lucide-react'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  // Fungsi Copy khusus Teks
  const handleCopy = (e) => {
    e.stopPropagation() // Mencegah card tertutup saat tombol copy diklik
    navigator.clipboard.writeText(item.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Fungsi Download khusus Gambar
  const handleDownloadImage = (e) => {
    e.stopPropagation()
    const link = document.createElement('a')
    link.href = item.content
    link.download = `image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div 
      onClick={() => setExpanded(!expanded)} 
      className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer transition-all'
    >
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2>{item.prompt}</h2>
          <p className='text-gray-500'>
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>
          {item.type}
        </button>
      </div>

      {expanded && (
        <div 
          onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam konten menutup card
          className='mt-4 relative bg-gray-50 border border-gray-200 rounded-lg p-4'
        >
          
          {/* Kondisi Tombol: Download untuk Gambar, Copy untuk Teks */}
          <div className='absolute top-3 right-3'>
            {item.type === 'image' ? (
              <button
                onClick={handleDownloadImage}
                className='p-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition flex items-center gap-1.5 text-xs font-medium shadow-sm'
                title="Download Image"
              >
                <Download className='w-4 h-4' />
                <span>Download</span>
              </button>
            ) : (
              <button
                onClick={handleCopy}
                className='p-1.5 rounded-md bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition flex items-center gap-1.5 text-xs font-medium shadow-sm'
                title="Copy Text"
              >
                {copied ? (
                  <>
                    <Check className='w-4 h-4 text-green-600' />
                    <span className='text-green-600'>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className='w-4 h-4' />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Container Konten */}
          <div className='pt-4'>
            {item.type === 'image' ? (
              <div>
                <img src={item.content} alt="image" className='w-full max-w-md rounded-md' />
              </div>
            ) : (
              <div className='max-h-96 overflow-y-auto text-sm text-slate-700 pr-2'>
                <div className='reset-tw'>
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CreationItem