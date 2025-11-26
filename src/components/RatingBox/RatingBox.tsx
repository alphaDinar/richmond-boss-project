import { getRatingAverage } from "@/external/math";
import { Review } from "@/types/product";
import { FC } from "react";
import { MdStar } from "react-icons/md";

type RatingBoxProps = {
  reviews: Review[]
};
const RatingBox: FC<RatingBoxProps> = ({ reviews }) => {


  return (
    <legend className="flex">
      {Array(5).fill(null).map((el, i) => (
        <MdStar
          key={i}
          style={{
            color: getRatingAverage(reviews) > i ? 'var(--pass)' : 'lightgrey'
          }}
        />
      ))}
    </legend>
  );
}

export default RatingBox;