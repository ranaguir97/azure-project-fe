import Image from 'next/image';
import Blob from '../public/blobanimation.svg'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='relative'>

      <div className="absolute top-[20vh]">
        <p className="text-6xl">Bienvenido a</p>
        <h1 className="text-8xl font-extrabold">EVNT TRCKR</h1>
        <p className="text-6xl">nunca te pierdas un evento</p>
      </div>
      <Image
      priority
      src={Blob}
      alt="Follow us on Twitter "
      width={800}
      />
      </div>
    </main>
  );
}
