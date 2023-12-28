'use client'
import React from 'react'
import EditWraper from '../edit/components/edit-wraper'
import evaluationTemplate from 'src/utils/delta/templates/evaluation'
import { File } from '@prisma/client'

export default function EvaluationEditor({data, id}:{data: File, id: string}) {
  let file;
  if (data?.content)
  file = {
    ...data,
    content: { ...JSON.parse(data.content) },
  };
  return (
    <EditWraper document={file} id={id} getTemplate={evaluationTemplate} />
  )
}
