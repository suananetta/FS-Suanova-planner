import { ttcomons } from './fonts'
import Header from '@/components/header/Header'
import Calendar from '@/components/calendar/Calendar'

export default function Home() {
  return (
    <>
      <Header/>
      <main className={ttcomons.className}>
        <Calendar/>
      </main>
    </>
  )
}
