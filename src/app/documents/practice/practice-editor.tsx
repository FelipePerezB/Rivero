'use client'
import React from 'react'
import EditWraper from '../edit/components/edit-wraper'
import practiceTemplate from 'src/utils/delta/templates/practice'
import { File } from '@prisma/client'

export default function PracticeEditor({data, id}:{data: File, id: string}) {
  let file;
  if (data?.content)
  file = {
    ...data,
    content: { ...JSON.parse(data.content) },
  };
  return (
    <EditWraper document={file} id={id} getTemplate={practiceTemplate} />
  )
}
