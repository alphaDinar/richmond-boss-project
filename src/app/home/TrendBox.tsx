import { Button } from "@nextui-org/button";
import Link from "next/link";
import { MdEast, MdNorthEast } from "react-icons/md";

const TrendBox = () => {
  const set = [
    { id: "", tag: "", url: "https://res.cloudinary.com/dvnemzw0z/video/upload/v1729528192/maqete/videoplayback_ahfc6v.mp4" },
    { id: "", tag: "", url: "https://res.cloudinary.com/dvnemzw0z/video/upload/v1729528618/maqete/videoplayback_1_dfyzux.mp4" },
    { id: "", tag: "", url: "https://res.cloudinary.com/dvnemzw0z/video/upload/v1729514369/maqete/nike_log_kdo8co.mp4" },
  ]

  const bg = "https://img.freepik.com/free-vector/vintage-style-round-shape-geometric-background-with-halftone-effect_1017-54881.jpg?t=st=1727830530~exp=1727834130~hmac=8ebf9007e74551f17805f1d7323120ec1dbc5462a36234c6e72dc3a0acb24da4&w=740";

  const videoBox = (vid: string, target: string, name: string) => {
    return (
      <section className="bg-black rounded-3xl relative overflow-hidden p-5 flex items-end flex-1 h-[420px] sm-screen:h-80">
        <Button as={Link} href={target} className="z-20 relative font-semibold bg-white opacity-[0.5]" endContent={<MdNorthEast />}>
          {name}
        </Button>
        <video src={vid} autoPlay muted loop className="absolute w-full h-full top-0 left-0 object-cover"></video>
      </section>
    )
  }

  return (
    <section id="hor" className="grid gap-2  pt-20 pb-16
    bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:30px_30px]
    sm-screen:bg-[length:50px_50px]
    "
    // style={{ backgroundSize: 'contain', backgroundAttachment: 'fixed', backgroundPosition: 'bottom', backgroundImage: `url(${bg})` }}
    >
      {/* <Link href={'/'} className="font-semibold flex gap-1 items-center justify-end w-full">Blog <MdEast /></Link> */}
      <section className="bg grid grid-cols-[1fr_2fr_1fr] gap-3 md-screen:grid-cols-1">
        {videoBox(set[0].url, "/viewProduct?id=Berries+Weekend", "Berries Weekend")}
        <section className=" grid  gap-3">
          {videoBox(set[1].url, "/viewProduct?id=Itel+S24", "Itel S24")}
        </section>
        <section className="grid gap-2">
          {videoBox(set[2].url, "/viewProduct?id=New+I9+Pro+Max+Original+SmartWatch+for+Men+Series+9+Phone+Call+Custom+Smart+Watch+Face+Sport+Waterproof+Women+Man+Wearable", "i9 series watch")}
          <Button className="p-6 text-xl
          px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xlg shadow-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-300 backdrop-blur-md
          ">
            <span>Blog</span>
            <MdNorthEast />
          </Button>
        </section>
      </section>
    </section>
  );
}

export default TrendBox;