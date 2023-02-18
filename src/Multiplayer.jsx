import SocialButtons from './components/SocialButtons'

export default function Multiplayer() {
  return (
    <div className='App'>
      <div className='Container relative gap-8 '>
        <SocialButtons className={'absolute top-10 left-10'} />
        <h1>Multiplayer</h1>
      </div>
    </div>
  )
}
