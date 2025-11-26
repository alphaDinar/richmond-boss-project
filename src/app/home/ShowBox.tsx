import Link from 'next/link';
import { cedi } from '@/external/assets';
import { Button } from '@nextui-org/button';

const ShowBox = () => {
  type Show = {
    tag: string;
    con: string;
    img: string;
    price: number;
    target: string;
  }

  const showList: Show[] = [
    {
      tag: 'Perfume',
      con: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      img: "https://hips.hearstapps.com/hmg-prod/images/10-4-26-best-perfumes-and-fragrances-of-all-time-1-664fbb22cfa27.jpg?crop=0.6697674418604651xw:1xh;center,top&resize=1200:*",
      price: 60,
      target: '/products?category=fragrance'
    },
    {
      tag: 'High Speed Cameras',
      con: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      img: 'https://cdn.thewirecutter.com/wp-content/media/2024/05/runningshoesforyou-2048px-2251.jpg?auto=webp&quality=75&width=1024',
      price: 120,
      target: '/'
    },
    {
      tag: 'Top Fashion',
      con: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      img: "https://img.freepik.com/free-photo/urban-young-african-american-woman-pink-top-afro-fashion-chic-women-with-ring-piercing-nose_627829-11876.jpg?t=st=1727701544~exp=1727705144~hmac=0d30bde57ccdc9c80f943206e89cd20b0c5e115a5c5adcc46bc15a20f71f5916&w=740",
      price: 80,
      target: '/'
    },
  ]

  const box = (show: Show, index: number) => {
    return (
      <Link href={show.target} style={{ backgroundImage: `url(${show.img})` }} key={index}
        className="relative bg-center bg-cover p-5 flex flex-col justify-end h-80 sm-screen:h-60 sm-screen:p-3 sm-screen:rounded-[10px] sm-screen:overflow-hidden">
        <section className="absolute w-full h-full bg-black opacity-[0.3] top-0 left-0" ></section>
        <section className="text-white z-20 relative flex flex-col gap-3">
          <strong className='text-2xl sm-screen:text-xl text-transparent'>{show.tag}</strong>
          <article className='flex flex-col gap-1'>
            <Button className='w-max bg-transparent text-white border border-white' radius='none'>Shop Now</Button>
          </article>
        </section>
      </Link>
    )
  }

  return (
    <section className="grid grid-cols-2 gap-4 md-screen:grid-cols-1" id='hor'>
      <section className='grid grid-cols-2 gap-4'>
        {showList.slice(0, 2).map((show, i) => (
          box(show, i)
        ))}
      </section>
      {showList.slice(2).map((show, i) => (
        box(show, i)
      ))}
    </section>
  );
}

export default ShowBox;