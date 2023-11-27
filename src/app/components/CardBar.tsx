import { Bar } from "../utils/type";

export default function CardBar(props: Bar) {
  return (
    <li className="border border-gray p-4 rounded-md block my-2 w-full">
      <h2 className="text-xl">{props.name} </h2>
      <div className="text-sm">{props.address} </div>
      <div className="text-sm">{props.user_ratings_total} </div>
    </li>
  );
}
