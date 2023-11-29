import { getCategoryDataFromId } from "../utils/displayCategoryDataFromId";
import { Bar } from "../utils/type";
import { SectionDataOpeningHours } from "./SectionDataOpeningHours";

export default function CardBarDetails({ datas }: { datas: Bar }) {
  const horaires = JSON.parse(datas.opening_hours);

  const category = getCategoryDataFromId(datas.category);
  console.log(category);

  return (
    <div className="bg-gray-800 rounded-lg p-4 m-4">
      <h3 className="text-3xl">{datas?.name}</h3>
      <SectionDataString title="addresse" data={datas?.address} />

      {datas.type && <SectionDataArrayString title="Type" data={datas?.type} />}
      {datas?.category && (
        <div>
          <div className="mt-4 text-sm uppercase text-gray-400">Catégorie</div>
          {category.map((item, index) => (
            <span key={index}>
              {item.icon} {item.text} {index !== category.length - 1 && ","}{" "}
            </span>
          ))}{" "}
          {}
        </div>
      )}
      <SectionDataString
        title="Téléphone"
        data={datas?.formatted_phone_number}
      />
      {datas?.website && (
        <SectionDataWebSite title="site internet" data={datas?.website} />
      )}
      {horaires !== null && (
        <SectionDataOpeningHours title="horaires" data={horaires} />
      )}
    </div>
  );
}

const SectionDataString = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => (
  <div>
    <div className="mt-4 text-sm uppercase text-gray-400">{title} </div>
    <div> {data} </div>
  </div>
);

const SectionDataArrayString = ({
  title,
  data,
}: {
  title: string;
  data: string[];
}) => (
  <div>
    <div className="mt-4 text-sm uppercase text-gray-400">{title} </div>
    <ul>
      {data.map((items, i) => (
        <li key={i}>{items}</li>
      ))}
    </ul>
  </div>
);

const SectionDataWebSite = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => (
  <div>
    <div className="mt-4 text-sm uppercase text-gray-400">{title} </div>
    <a href={data} target="_blank" className="text-bleu underline">
      Aller sur site web
    </a>
  </div>
);
