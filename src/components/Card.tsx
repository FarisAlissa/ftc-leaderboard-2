import "./Card.css";

const Card = ({
  position,
  name,
  points,
  icon,
}: {
  position: number;
  name: string;
  points: number | null;
  icon: string;
}) => {

    let rounded = ''

    if (position === 1){
        rounded = 'rounded-t-3xl'
    }else if (position === 10) {
        rounded = 'rounded-b-3xl'
    }
  return (
    <div className={`flex flex-row justify-between mx-auto w-10/12 border h-28 bg-slate-200 ${rounded}`}>
      <div className="flex">
        <p className="font-[Minecraft2] text-5xl my-auto ms-6 w-24">{position}.</p>
        <p className="font-[Arapix] text-7xl my-auto mx-6">{name}</p>
      </div>
      <div className="flex gap-14">
        <img src={icon} alt={icon} className="my-auto h-[80%]" />
        <p className="font-[Minecraft2] flex justify-end text-5xl my-auto me-12">
          {points}
        </p>
      </div>
    </div>
  );
};

export default Card;
