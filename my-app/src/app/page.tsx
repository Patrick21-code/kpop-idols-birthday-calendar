'use client'

import { useAppStore } from '@/lib/store/useAppStore'

export default function Home() {
  const { activeGroups, filterType, currentMonth } = useAppStore()

  return (
    <main>
      <p>Active groups: {activeGroups.join(', ')}</p>
      <p>Filter: {filterType}</p>
      <p>Month: {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
    </main>
  );
}


//toLocaleString converts a Date object into a string
