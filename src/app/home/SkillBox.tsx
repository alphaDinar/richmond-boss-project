import { MdBolt, MdOutlineSupportAgent } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoRocketOutline } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";

const SkillBox = () => {
  const skillList = [
    { tag: 'Cash On Delivery Option', text: 'option', iconEl: <GiTakeMyMoney /> },
    { tag: '24 HR Delivery', text: 'Fast Delivery', iconEl: <IoRocketOutline /> },
    { tag: "Return policies", text: 'Under right conditions', iconEl: <TbTruckReturn /> },
    { tag: '24/7 Support', text: 'Dedicated Support', iconEl: <MdOutlineSupportAgent /> }
  ]

  return (
    <section id="hor">
      <section id="items250" className="gap-3 sm-screen:text-center">
        {skillList.map((skill, i) => (
          <article className="flex gap-3 items-center sm-screen:flex-col" key={i}>
            <legend className="text-3xl text-[var(--theme)]">{skill.iconEl}</legend>
            <p className="flex flex-col">
              <strong>{skill.tag}</strong>
              <small>{skill.text}</small>
            </p>
          </article>
        ))}
      </section>
    </section>
  );
}

export default SkillBox;