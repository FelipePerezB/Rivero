import { auth } from '@clerk/nextjs';
import { Group } from '@prisma/client';
import React from 'react'
import api from 'src/app/utils/api';
import capFirst from 'src/utils/capFirst';

export default async function GroupName({organization, group}: {organization: string, group: string}) {
  const { getToken } = auth();
  const token = await getToken();
  const {
    data: { name },
  } = (await api(`groups/${organization}/${group}`, {
    headers: { Authorization: `Bearer ${token}` },
  })) as { data: Group };
  return <h2 className="text-2xl font-semibold">{capFirst(name)}</h2>

}
