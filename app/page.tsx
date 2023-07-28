import Image from 'next/image';
import Blob from '../public/blobanimation.svg'

export default function Home() {
  return (
    <main className="flex items-middle justify-center">
      <div className='relative'>
      <div className="absolute md:top-[250px] top-[150px]">
        <p className="text-6xl">Welcome to</p>
        <h1 className="text-8xl font-extrabold">EVNT TRCKR</h1>
        <p className="text-6xl">never miss out on an event</p>
      </div>
      <Image
      priority
      src={Blob}
      alt="Follow us on Twitter "
      width={800}
      className='pt-20 md:pt-0'
      />
      </div>
    </main>
  );
}
