import './globals.css'
import { redcollar } from './fonts'

export const metadata = {
  title: 'Planner event',
  description: 'Planner event',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel='icon' type='image/svg' sizes='32x32' href='/logo.svg'/>
      <body className={redcollar.className}>{children}</body>
    </html>
  )
}
