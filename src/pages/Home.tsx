import logo from '@/assets/images/full-logo.webp'

function Home() {
  return (
    <div className="h-full w-full flex p-2">
      <div className="picture flex items-center justify-center flex-1 h-full rounded bg-background-image bg-no-repeat bg-cover bg-center">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="Logo do ReadiFy" className='scale-150' />
        </div>
      </div>
    </div>
  )
}

export default Home