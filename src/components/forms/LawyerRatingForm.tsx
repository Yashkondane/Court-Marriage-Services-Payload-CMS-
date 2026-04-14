'use client'

import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

type RatingFormProps = {
  lawyerId: string
}

export default function LawyerRatingForm({ lawyerId }: RatingFormProps) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    
    setLoading(true)
    try {
      const res = await fetch('/api/lawyer/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lawyerId, rating }),
      })
      
      if (res.ok) {
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Failed to submit rating:', err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100 animate-fade-in-up">
        <div className="text-green-600 font-black mb-2">Thank you!</div>
        <div className="text-green-800 text-sm">Your rating has been submitted successfully.</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <h4 className="text-gray-900 font-black mb-1 uppercase tracking-wider text-xs">Rate your experience</h4>
      <p className="text-gray-500 text-xs mb-4">Click a star to submit your rating</p>

      <div className="flex flex-col gap-4">
        {/* Vertical alignment as requested */}
        <div className="flex justify-between items-center py-2 border-y border-gray-50">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl transition-all duration-200 ${
                  (hover || rating) >= star ? 'text-orange-400 scale-110' : 'text-gray-200'
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-gray-400">
            {rating > 0 ? `${rating} / 5` : 'Select'}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0 || loading}
          className={`w-full py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
            rating > 0 && !loading
              ? 'bg-gold text-black shadow-lg shadow-gold/20 hover:brightness-110'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Rating'}
        </button>
      </div>
    </div>
  )
}
