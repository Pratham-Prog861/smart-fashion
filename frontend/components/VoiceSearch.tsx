'use client'

import { useState, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function VoiceSearch() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  }, [])

  const startListening = () => {
    if (!isSupported) return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      router.push(`/products?search=${encodeURIComponent(text)}`)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  if (!isSupported) return null

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
          isListening
            ? 'bg-red-500 animate-pulse'
            : 'bg-primary-600 hover:bg-primary-700'
        } text-white`}
        aria-label="Voice search"
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      {transcript && (
        <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
          {transcript}
        </div>
      )}
    </div>
  )
}
