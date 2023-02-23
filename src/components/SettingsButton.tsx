import { useLocation } from 'wouter'
import Button from './Button'

export default function SettingsButton() {
  const [, setLocation] = useLocation()
  return (
    <Button
      onClick={() => setLocation('/settings')}
      className='bg-slate-500 shadow-slate-600 absolute top-10 right-10'
    >
      Settings
    </Button>
  )
}
