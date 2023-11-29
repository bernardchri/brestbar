import { getCategoryDataFromId } from "../utils/displayCategoryDataFromId";
import { Bar } from "../utils/type";

export default function CardBar({
  datas,
  handleClick,
}: {
  datas: Bar;
  handleClick: any;
}) {
  const nameOfcat = getCategoryDataFromId(datas.category);

  return (
    <li className=" flex bg-gray-800 p-4 rounded-md my-4 w-full justify-between items-center">
      <div className="">
        <div className="font-bold uppercase text-bleu ">
          {nameOfcat.length !== 0 ? (
            nameOfcat.map((item, index) => (
              <span key={index}>
                {item.text}
                {index < nameOfcat.length - 1 && (
                  <span className="text-gradient"> / </span>
                )}
              </span>
            ))
          ) : (
            <span>Pas définie</span>
          )}
        </div>
        <h2 className="text-2xl font-bold">{datas.name} </h2>
        <div className="text-sm  text-gray-400">{datas.address} </div>
        {/* <div className="text-sm text-gray-400">
          location {datas.location.coordinates[0]}{" "}
        </div> */}
        <div className="text-sm text-gray-400">
          nombre d’avis : {datas.user_ratings_total}{" "}
        </div>
      </div>
      <button
        onClick={() => handleClick(datas)}
        type="button"
        aria-label="show on map"
        className="aspect-square rounded-full bg-gradient p-4"
      >
        👁️
      </button>
    </li>
  );
}
