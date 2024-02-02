import SmallTitle from '@components/common/titles/small-title'
import Item from '@components/dashboard/item'
import ChartSkeleton from '@components/layout/loading-skeleton/chart-skeleton'
import XsSkeleton from '@components/layout/loading-skeleton/xs-skeleton'
import React from 'react'

export default function HomeStatsSkeleton() {
  return (
    <>
    <div className="flex flex-col md:w-1/2 w-full">
      <SmallTitle>Resumen semanal</SmallTitle>
      <ChartSkeleton />
    </div>
    <div className="hidden md:flex flex-col gap-sm justify-center mx-auto">
      <div className="w-full flex gap-2 justify-between items-start">
        <Item subtitle="Lecciones hoy" title={<XsSkeleton />} />
        <Item
          subtitle="Lecciones esta semana"
          title={<XsSkeleton />}
        />
        <Item
          subtitle="Lecciones este mes"
          title={<XsSkeleton />}
        />
      </div>
      <div className="w-full flex gap-2 justify-between">
        <Item subtitle="Prácticas" title={<XsSkeleton />} />
        <Item subtitle="Puntajes" title={<XsSkeleton />} />
        <Item
          subtitle="Último puntaje"
          title={<XsSkeleton />}
        />
      </div>
    </div>
  </>
  )
}
