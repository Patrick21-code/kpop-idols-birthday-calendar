'use client'

import { useAppStore } from '@/lib/store/useAppStore'
import { getCountdownParts, getDaysUntilBirthday, isBirthdayToday, getAge} from '@/lib/utils/dateUtils'
import { getGroupColor } from '@/lib/utils/groupUtils'
import { getInitials } from '@/lib/utils/imageUtils'


export default function Home() {
  const { activeGroups, filterType, currentMonth } = useAppStore()
  const jennie = '1996-01-16'
  const nayeon = '1995-09-22'
  const parts = getCountdownParts(jennie)

  return (
    <main style={{padding: '2rem', fontFamily: 'monospace'}}>
      <p>Active groups: {activeGroups.join(', ')}</p>
      <p>Filter: {filterType}</p>
      <p>Month: {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
      <p>Jennie days until birthday: {getDaysUntilBirthday(jennie)}</p>
      <p>Jennie age next birthday: {getAge(jennie)}</p>
      <p>Jennie birthday today: {isBirthdayToday(jennie) ? 'YES 🎉' : 'no'}</p>
      <p>Jennie countdown: {parts.days}d {parts.hours}h {parts.minutes}m {parts.seconds}s</p>
      <p>Nayeon days until birthday: {getDaysUntilBirthday(nayeon)}</p>
      <br />
      <p>BLACKPINK color: {getGroupColor('BLACKPINK')}</p>
      <p>Unknown group color: {getGroupColor('XYZ')}</p>
      <br />
      <p>Initials of "Kim Jennie": {getInitials('Kim Jennie')}</p>
      <p>Initials of "Lisa": {getInitials('Lisa')}</p>
      <p>Initials of "RM": {getInitials('RM')}</p>
    </main>
  );
}


//toLocaleString converts a Date object into a string
