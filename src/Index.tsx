import './App.css'
import Menu from './components/Menu'
import SettingsButton from './components/SettingsButton'
import SocialButtons from './components/SocialButtons'
function Index() {
  return (
    <>
      <SettingsButton />
      <h1 className='text-3xl md:text-5xl'>ElJolinJuego</h1>
      <div className='flex flex-col  gap-10 p-5'>
        <SocialButtons />
        <Menu />
      </div>
    </>
  )
}

export default Index
