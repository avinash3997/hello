'use client'

import { useEffect, useRef, useState } from 'react'

export default function LedgerHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 400
    canvas.height = 500

    // Clear canvas
    ctx.fillStyle = '#f7f5f1'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw open ledger book
    const bookSpine = 200
    const pageMargin = 40
    const pageWidth = 150
    const pageHeight = 400

    // Left page
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(pageMargin, 50, pageWidth, pageHeight)
    ctx.strokeStyle = '#e8e6e1'
    ctx.lineWidth = 2
    ctx.strokeRect(pageMargin, 50, pageWidth, pageHeight)

    // Right page
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(bookSpine, 50, pageWidth, pageHeight)
    ctx.strokeStyle = '#e8e6e1'
    ctx.lineWidth = 2
    ctx.strokeRect(bookSpine, 50, pageWidth, pageHeight)

    // Book spine (shadow effect)
    ctx.fillStyle = '#f0ede8'
    ctx.fillRect(195, 50, 10, pageHeight)

    // Draw header text
    ctx.fillStyle = '#22305c'
    ctx.font = 'bold 14px Inter'
    ctx.textAlign = 'left'
    ctx.fillText('Roll', pageMargin + 10, 75)
    ctx.fillText('Grade', pageMargin + 60, 75)
    ctx.fillText('Term', pageMargin + 110, 75)

    ctx.fillText('Roll', bookSpine + 10, 75)
    ctx.fillText('Grade', bookSpine + 60, 75)
    ctx.fillText('Term', bookSpine + 110, 75)

    // Draw grid lines
    ctx.strokeStyle = '#e8e6e1'
    ctx.lineWidth = 1
    for (let i = 1; i < 12; i++) {
      const y = 85 + i * 30
      if (y < 50 + pageHeight - 10) {
        ctx.beginPath()
        ctx.moveTo(pageMargin + 5, y)
        ctx.lineTo(pageMargin + pageWidth - 5, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(bookSpine + 5, y)
        ctx.lineTo(bookSpine + pageWidth - 5, y)
        ctx.stroke()
      }
    }

    // Draw tally marks based on animation progress
    const numRows = 11
    const filledRows = Math.floor(animationProgress * numRows)

    ctx.fillStyle = '#e8a33d'
    ctx.font = '12px "IBM Plex Mono"'

    // Left page tallies
    for (let i = 0; i < filledRows; i++) {
      const y = 92 + i * 30
      const rowData = [
        { roll: `001`, grade: `A+`, term: `1` },
        { roll: `002`, grade: `A`, term: `2` },
        { roll: `003`, grade: `B+`, term: `1` },
        { roll: `004`, grade: `A+`, term: `3` },
        { roll: `005`, grade: `B`, term: `2` },
        { roll: `006`, grade: `A`, term: `1` },
        { roll: `007`, grade: `C+`, term: `2` },
        { roll: `008`, grade: `A+`, term: `3` },
        { roll: `009`, grade: `B+`, term: `1` },
        { roll: `010`, grade: `A`, term: `2` },
        { roll: `011`, grade: `A+`, term: `3` },
      ]

      const data = rowData[i % rowData.length]
      ctx.fillStyle = '#22305c'
      ctx.textAlign = 'left'
      ctx.fillText(data.roll, pageMargin + 12, y)
      ctx.fillText(data.grade, pageMargin + 65, y)
      ctx.fillText(data.term, pageMargin + 115, y)
    }

    // Right page tallies
    for (let i = 0; i < filledRows; i++) {
      const y = 92 + i * 30
      const rowData = [
        { roll: `012`, grade: `B+`, term: `3` },
        { roll: `013`, grade: `A`, term: `1` },
        { roll: `014`, grade: `A+`, term: `2` },
        { roll: `015`, grade: `C+`, term: `1` },
        { roll: `016`, grade: `A`, term: `3` },
        { roll: `017`, grade: `B`, term: `2` },
        { roll: `018`, grade: `A+`, term: `1` },
        { roll: `019`, grade: `B+`, term: `2` },
        { roll: `020`, grade: `A`, term: `3` },
        { roll: `021`, grade: `A+`, term: `1` },
        { roll: `022`, grade: `B`, term: `2` },
      ]

      const data = rowData[i % rowData.length]
      ctx.fillText(data.roll, bookSpine + 12, y)
      ctx.fillText(data.grade, bookSpine + 65, y)
      ctx.fillText(data.term, bookSpine + 115, y)
    }

    // Draw today's date marker (marigold ribbon bookmark)
    const bookmarkX = bookSpine + 5
    const bookmarkY = 90 + filledRows * 30
    ctx.fillStyle = '#e8a33d'
    ctx.fillRect(bookmarkX, bookmarkY - 3, 140, 6)

    // Bookmark ribbon
    ctx.fillStyle = 'rgba(232, 163, 61, 0.3)'
    ctx.fillRect(bookmarkX - 2, bookmarkY + 6, 144, 20)

    // Today's date text
    ctx.fillStyle = '#22305c'
    ctx.font = 'bold 11px Inter'
    ctx.textAlign = 'center'
    const today = new Date()
    const dateStr = `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    ctx.fillText(`Today: ${dateStr}`, bookmarkX + 70, bookmarkY + 16)
  }, [animationProgress])

  // Scroll-based animation
  useEffect(() => {
    const handleScroll = () => {
      const element = canvasRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (!isVisible) return

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        )
      )

      setAnimationProgress(scrollProgress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex justify-center items-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-md h-auto border-8 border-ink rounded-lg shadow-lg"
        style={{ aspectRatio: '4/5' }}
      />
    </div>
  )
}
