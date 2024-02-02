import React from 'react'
import Card from './Card'
import LargeSkeleton from '@components/layout/loading-skeleton/large-skeleton/large-skeleton'

export default function CardSkeleton() {
  return (
    <Card>
    <LargeSkeleton />
  </Card>

  )
}
