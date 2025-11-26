
import Link from 'next/link';
import { cedi } from '@/external/assets';
import { Button } from '@nextui-org/button';

const HeadBox = () => {
  const bgA = "https://media.burford.co.uk/images/SNY04089.jpg_edit.width-640_ln7jm6QxYVkHFHaT.jpg";
  const bgB = "https://www.tomjames.com/localpics/MEN-LOOKING-FOR-A-PROFESSIONAL-WARDROBE.jpg"
  const bgC = "https://images.squarespace-cdn.com/content/v1/5585a9bae4b08677430390e7/edc9591c-f377-4011-8ad1-04d528a3b119/my+closet.jpg"
  const vid = "https://res.cloudinary.com/dvnemzw0z/video/upload/v1725621120/Testers/AirPods_Max___Commercial_Reimagined_duy0lx.mp4";

  const sheet = <section className='absolute top-0 left-0 bg-black w-full h-full opacity-[0.4] text-white z-10'></section>


  return (
    <section className="grid grid-cols-2 gap-4 half-screen:grid-cols-1 half-screen:gap-2" id='hor'>
      <section
        style={{ backgroundImage: `url(${bgA})`, backgroundSize: 'cover' }}
        className="h-full relative overflow-hidden flex items-end half-screen:h-96 half-screen:rounded-[20px]">
        {sheet}
        <section className="z-20 text-white flex flex-col p-20 text-center gap-3 half-screen:p-10">
          {/* <strong className='text-2xl'>Smart Watches</strong> */}
          {/* <small className='text-gray-300'>
            Elevate your lifestyle
          </small> */}

          <article className='flex flex-col items-center gap-1'>
            <Button as={Link} href={'/products?category=smart watches'}
              className='w-max rounded-none bg-transparent border border-gray-400 text-white hover:border-gray-100'
            >Shop Now</Button>
          </article>
        </section>

      </section>
      <section className="grid grid-rows-2 gap-4 half-screen:gap-2">
        <section className="grid grid-cols-[1.4fr_2fr] gap-4 flex-1  half-screen:gap-2">
          <section className="relative overflow-hidden half-screen:rounded-[10px]"
            style={{ backgroundImage: `url(${bgA})`, backgroundSize: 'cover' }}
          >
            {/* <video src={vid} muted loop autoPlay className='object-cover absolute w-full h-full'></video> */}
          </section>

          <section className="relative flex items-end overflow-hidden half-screen:rounded-[10px]"
            style={{ backgroundImage: `url(${bgC})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>

            {sheet}
            <section className="text-white p-10 z-20 grid gap-2 half-screen:p-5">
              {/* <strong className='text-2xl'>Fragrance</strong> */}
              <article className='flex flex-col gap-1'>
                <Button as={Link} href={'/products?category=fragrance'}
                  className='w-max rounded-none bg-transparent border border-gray-400 text-white hover:border-gray-100'
                >Shop Now</Button>
              </article>
            </section>
          </section>
        </section>

        <section className='relative flex items-end overflow-hidden half-screen:rounded-[10px]'
          style={{ backgroundImage: `url(${bgB})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
          {sheet}
          <section className="z-20 text-white flex flex-col p-10 gap-3 half-screen:p-5">
            {/* <strong className='text-2xl'>Phones</strong> */}
            <small className='text-transparent w-64'>Discover unbeatable deals on top-of-the-line smartphones featuring cutting-edge technology, stunning displays, and powerful cameras. </small>

            <article className='flex flex-col gap-1'>
              <Button as={Link} href={'/products?category=phones'}
                className='w-max rounded-none bg-transparent border border-gray-400 text-white hover:border-gray-100'
              >Shop Now</Button>
            </article>
          </section>
        </section>
      </section>
    </section>
  );
}

export default HeadBox;