import { Button } from "@nextui-org/react";
import { MdNorthEast } from "react-icons/md";

const TrendBox = () => {
  const place = "https://rr5---sn-ab5sznzk.googlevideo.com/videoplayback?expire=1727850577&ei=8JP8ZrO9O_S1kucP4enQ4QI&ip=66.180.147.205&id=o-AKqedQiIEBqAF3vLd-1RAgQ--KxuqXPiVR5C9h52gbx_&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=ca&mm=31%2C29&mn=sn-ab5sznzk%2Csn-ab5l6nrs&ms=au%2Crdu&mv=m&mvi=5&pl=24&initcwndbps=34673750&bui=AXLXGFR85J4ysE0rXjtsOsrOK4gFE0MqUG99YorXLfNcGfwokVuzbOpZ-tX2ZK_F24jSiB4oPRZLmhA4&spc=54MbxbPQG_QBp-wP0RScFiT7P3_yqsEscVVnvwoimnCk798Rffpy&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Hci5BpbW49ADxDzY-4daJ9wQ&rqh=1&gir=yes&clen=1744871&ratebypass=yes&dur=22.058&lmt=1709200969144254&mt=1727828214&fvip=2&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=6300224&n=1vGcBdN-ml7vCQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgCdp9W13VUpCMPdoCeOnxRmVyXD5-NZb_Bkb7hVa5_GACIBQIJ4T7uYP0WgUfuiBBwdRphpm1MF3UMfa2EpmBrjc5&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIhAKDQgiS4u_AA5g_dHLyjME0dOt7-ljpqA5_gjkloLmmTAiARdHg7ify9US3WSarOzf0hNz92B6HiufB4JYXa7NPCWQ%3D%3D&title=Galaxy%20A15%20vs%20A25%20Samsung"
  // const place = "https://res.cloudinary.com/dvnemzw0z/video/upload/v1727827149/maqete/a_Girl_Holding_a_Mobile_Phone_and_Photographed_the_Miniature_Mountains_zriyfq.mp4";

  const set = [
    { id: "", tag: "", url: "https://rr5---sn-ab5sznzk.googlevideo.com/videoplayback?expire=1727850577&ei=8JP8ZrO9O_S1kucP4enQ4QI&ip=66.180.147.205&id=o-AKqedQiIEBqAF3vLd-1RAgQ--KxuqXPiVR5C9h52gbx_&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=ca&mm=31%2C29&mn=sn-ab5sznzk%2Csn-ab5l6nrs&ms=au%2Crdu&mv=m&mvi=5&pl=24&initcwndbps=34673750&bui=AXLXGFR85J4ysE0rXjtsOsrOK4gFE0MqUG99YorXLfNcGfwokVuzbOpZ-tX2ZK_F24jSiB4oPRZLmhA4&spc=54MbxbPQG_QBp-wP0RScFiT7P3_yqsEscVVnvwoimnCk798Rffpy&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Hci5BpbW49ADxDzY-4daJ9wQ&rqh=1&gir=yes&clen=1744871&ratebypass=yes&dur=22.058&lmt=1709200969144254&mt=1727828214&fvip=2&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=6300224&n=1vGcBdN-ml7vCQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgCdp9W13VUpCMPdoCeOnxRmVyXD5-NZb_Bkb7hVa5_GACIBQIJ4T7uYP0WgUfuiBBwdRphpm1MF3UMfa2EpmBrjc5&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIhAKDQgiS4u_AA5g_dHLyjME0dOt7-ljpqA5_gjkloLmmTAiARdHg7ify9US3WSarOzf0hNz92B6HiufB4JYXa7NPCWQ%3D%3D&title=Galaxy%20A15%20vs%20A25%20Samsung" },
    { url: "https://rr2---sn-2aqu-hoal6.googlevideo.com/videoplayback?expire=1727850988&ei=i5X8ZtvHO4q12roP2e_RmQo&ip=112.209.174.221&id=o-ADzRrwvEv8Ny3p6mfJ4JUZjHwla5N7ApT4OKyfDkMe8m&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Gx&mm=31%2C26&mn=sn-2aqu-hoal6%2Csn-npoe7nlz&ms=au%2Conr&mv=m&mvi=2&pl=21&initcwndbps=881250&bui=AXLXGFQSyezpI8T7IVxmjgbAKIUPumes0HdVZADmfLlmkWV3Ou4o9rr955Dr99xYSXPpZY4VyCzQdwE2&spc=54MbxZw8lR84OXnb3uZcTnRCVyBDBrYiMck3cHHLwvZZrl8UcqGc&vprv=1&svpuc=1&mime=video%2Fmp4&ns=nKqldJZTBhI8pAhNN8XQudMQ&rqh=1&gir=yes&clen=1084594&ratebypass=yes&dur=9.813&lmt=1727369157283163&mt=1727828937&fvip=2&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=6300224&n=u3wp7IENl0esfQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ACJ0pHgwRQIgFyLfCuWHwCD6HrrkvIF-zlCe1XVQkPpjEGbuIjaY-1wCIQDOMql8WdrbkELYtXgcH4tTtMeb7AQ_8j3uzOYNka3V_w%3D%3D&sig=AJfQdSswRQIhAOcKTPx4QoCieeurLA0SKytkTDtTnKbkW3epif--D_-bAiBawX7Ch_E068w1FIR3yHW6N2aBX6TYO-_KSkW57lJu4w%3D%3D&title=So%20good%20phone%20case%20%23iphone" },
    { id: "", tag: "", url: "https://rr3---sn-2aqu-jxcd.googlevideo.com/videoplayback?expire=1727850896&ei=MJX8ZpL6AcGI1d8Pm5-kuQY&ip=124.105.196.115&id=o-AOw8AV0z-HCWmiXvsTI-jZWqTU4lZbWfvxG5iY7zDa4y&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=cA&mm=31%2C29&mn=sn-2aqu-jxcd%2Csn-2aqu-hoall&ms=au%2Crdu&mv=m&mvi=3&pl=23&initcwndbps=435000&bui=AXLXGFTzha_ZBI2C49Q7E8pAXvbEg6mwEEy1EhZ3VOKDp9Aw9ss6AOlQ-Dw7ldEMJDrZEM3H_pvQdJe8&spc=54MbxexWWlxA3Alte2JMuorXm8zvnMJx83qScr6z6bRm_TYAef7K0Pg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=UjkE9N2ynFCz-tRHUk6ols4Q&rqh=1&cnr=14&ratebypass=yes&dur=7.314&lmt=1706225017233455&mt=1727828937&fvip=3&fexp=51299152&c=WEB_CREATOR&sefc=1&txp=5430434&n=UKOvZP8qa7z-Fw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ACJ0pHgwRAIgLG7VvX0hNErFNhPero3cfONhTflDBuicXZexXxC0iwoCIA0PcgawTxc3lOszXokSxSUiiAe1SJS8q3GqN-qesNo5&sig=AJfQdSswRAIgJtLrhCCqlLvJxiAH9G_dnVg45LIRUc0gifLLRBymxqECIBBzvmlcx_MRtf_UziCdwKbMOJtmEnOtMWXrtPdOkaZq&title=Transparent%20Mobile%20%7C%20New%20Transparent%20%20Mobile%20%7C%20Made%20in%20china%20%23shorts" },
    { id: "", tag: "", url: "https://rr5---sn-ipoxu-3iik.googlevideo.com/videoplayback?expire=1727850725&ei=hZT8Zs7cItzs7OsP0pyimA8&ip=218.173.193.106&id=o-ADdDL2dif1j7sVy7ikd_9YWGvWSJZ9_V7dIW6faMFp_2&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=fL&mm=31%2C29&mn=sn-ipoxu-3iik%2Csn-un57sne7&ms=au%2Crdu&mv=m&mvi=5&pl=24&initcwndbps=757500&bui=AXLXGFT23ZZ1CVJgpbhJBHMQXgJX1wM8O8L1K4vkBo5B8kEpQxxB2WGjwV6dOoe4hAUMtfKmm7Qee9sA&spc=54MbxbJtbq31E_5JCdWUibVUuSvhtYnbWmjlkG4KF_DMxAtAHAy-&vprv=1&svpuc=1&mime=video%2Fmp4&ns=BSWb60EPKE69xp170lX6KMYQ&rqh=1&gir=yes&clen=4272259&ratebypass=yes&dur=57.152&lmt=1727307819219623&mt=1727828214&fvip=5&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=5430434&n=TTVPs5fytdCbXw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAJFt6mEavXC1RNQ1CwDG_j1L0X7Hpum9t-eHhWfZRuBrAiEAtf8A2sxKDnUFGV2r14ZnwcsWFMsQ21AoH54_oIAt0b4%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRgIhAJosgGaft7WAlYW8dRzOC1i3rg7mO2O7yavaLGupKKHzAiEA49GINw96cQyn6kRYNjliw0u97H7wpZTEsqk8rgy0ios%3D&title=THE%20IPHONE%2016%20PRO%20MAX%20VS%20THE%20IPHONE%2012%20PRO%20MAX%3F%20twins%3F%F0%9F%93%B1%20%23youtubeshorts%20%23shorts%20%23iphone16" },
    { id: "", tag: "", url: "https://rr5---sn-ab5sznzk.googlevideo.com/videoplayback?expire=1727850577&ei=8JP8ZrO9O_S1kucP4enQ4QI&ip=66.180.147.205&id=o-AKqedQiIEBqAF3vLd-1RAgQ--KxuqXPiVR5C9h52gbx_&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=ca&mm=31%2C29&mn=sn-ab5sznzk%2Csn-ab5l6nrs&ms=au%2Crdu&mv=m&mvi=5&pl=24&initcwndbps=34673750&bui=AXLXGFR85J4ysE0rXjtsOsrOK4gFE0MqUG99YorXLfNcGfwokVuzbOpZ-tX2ZK_F24jSiB4oPRZLmhA4&spc=54MbxbPQG_QBp-wP0RScFiT7P3_yqsEscVVnvwoimnCk798Rffpy&vprv=1&svpuc=1&mime=video%2Fmp4&ns=Hci5BpbW49ADxDzY-4daJ9wQ&rqh=1&gir=yes&clen=1744871&ratebypass=yes&dur=22.058&lmt=1709200969144254&mt=1727828214&fvip=2&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=6300224&n=1vGcBdN-ml7vCQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgCdp9W13VUpCMPdoCeOnxRmVyXD5-NZb_Bkb7hVa5_GACIBQIJ4T7uYP0WgUfuiBBwdRphpm1MF3UMfa2EpmBrjc5&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRQIhAKDQgiS4u_AA5g_dHLyjME0dOt7-ljpqA5_gjkloLmmTAiARdHg7ify9US3WSarOzf0hNz92B6HiufB4JYXa7NPCWQ%3D%3D&title=Galaxy%20A15%20vs%20A25%20Samsung" },
    { id: "", tag: "", url: "https://rr5---sn-ipoxu-3iik.googlevideo.com/videoplayback?expire=1727850725&ei=hZT8Zs7cItzs7OsP0pyimA8&ip=218.173.193.106&id=o-ADdDL2dif1j7sVy7ikd_9YWGvWSJZ9_V7dIW6faMFp_2&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=fL&mm=31%2C29&mn=sn-ipoxu-3iik%2Csn-un57sne7&ms=au%2Crdu&mv=m&mvi=5&pl=24&initcwndbps=757500&bui=AXLXGFT23ZZ1CVJgpbhJBHMQXgJX1wM8O8L1K4vkBo5B8kEpQxxB2WGjwV6dOoe4hAUMtfKmm7Qee9sA&spc=54MbxbJtbq31E_5JCdWUibVUuSvhtYnbWmjlkG4KF_DMxAtAHAy-&vprv=1&svpuc=1&mime=video%2Fmp4&ns=BSWb60EPKE69xp170lX6KMYQ&rqh=1&gir=yes&clen=4272259&ratebypass=yes&dur=57.152&lmt=1727307819219623&mt=1727828214&fvip=5&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=5430434&n=TTVPs5fytdCbXw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAJFt6mEavXC1RNQ1CwDG_j1L0X7Hpum9t-eHhWfZRuBrAiEAtf8A2sxKDnUFGV2r14ZnwcsWFMsQ21AoH54_oIAt0b4%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ABPmVW0wRgIhAJosgGaft7WAlYW8dRzOC1i3rg7mO2O7yavaLGupKKHzAiEA49GINw96cQyn6kRYNjliw0u97H7wpZTEsqk8rgy0ios%3D&title=THE%20IPHONE%2016%20PRO%20MAX%20VS%20THE%20IPHONE%2012%20PRO%20MAX%3F%20twins%3F%F0%9F%93%B1%20%23youtubeshorts%20%23shorts%20%23iphone16" },
  ]

  const list = [1, 2, 3, 4, 5, 6];

  const videoBox = (vid: string, index: number) => {
    return (
      <section className="bg-black rounded-3xl relative overflow-hidden p-5 flex items-end flex-1" key={index}>
        <Button className="z-20 relative font-semibold bg-white opacity-[0.5]" endContent={<MdNorthEast />}>Samsung A15</Button>
        <video src={vid} autoPlay muted loop className="absolute w-full h-full top-0 left-0 object-cover"></video>
      </section>
    )
  }

  return (
    <section id="hor" className="bg-gray-200 py-8
    bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] bg-[length:50px_50px]
    ">
      <section className="bg h-[450px] grid grid-cols-[1fr_2fr_1fr] gap-3 ">
        {videoBox(set[0].url, 0)}
        <section className="bg-red-300 grid gap-3">
          <section className="bg-blue-300 grid grid-cols-[4fr_6fr] gap-3">
            {set.slice(1, 3).map((el, i) => (
              videoBox(el.url, i)
            ))}
          </section>
          <section className="bg-blue-300 grid grid-cols-[6fr_4fr] gap-3">
            {set.slice(3, 5).map((el, i) => (
              videoBox(el.url, i)
            ))}
          </section>
        </section>
        {videoBox(set[5].url, 5)}
      </section>
    </section>
  );
}

export default TrendBox;