import './App.css'
import LogOut from './components/LogOut'
import Menu from './components/Menu'
import SocialButtons from './components/SocialButtons'
function Index() {
  return (
    <div className='App '>
      <div className='Container relative gap-8 '>
        <LogOut />
        <h1 className='text-3xl md:text-5xl'>ElJolinJuego</h1>
        <div className='flex flex-col  gap-10 p-5'>
          <SocialButtons />
          <Menu />
        </div>
      </div>
    </div>
  )
}

export default Index
