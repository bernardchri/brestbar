import { Bar } from "../utils/type";

export default function CardBarDetails({ datas }: { datas: Bar }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 m-4">
      <h3 className="text-3xl">{datas?.name}</h3>
      <SectionDataString title="addresse" data={datas?.address} />

      {datas.type && <SectionDataArrayString title="Type" data={datas?.type} />}
      {datas?.category && (
        <SectionDataArrayString title="category" data={datas?.category} />
      )}
      <SectionDataString
        title="Téléphone"
        data={datas?.formatted_phone_number}
      />
      {datas?.website && (
        <SectionDataWebSite title="site internet" data={datas?.website} />
      )}
      {datas.opening_hours && (
        <SectionDataOpeningHours title="horaires" data={datas?.opening_hours} />
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

const SectionDataOpeningHours = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => {
  let hours = { ...JSON.parse(data) };

  let newhours: any = {
    lundi: formatHours(hours[0].replace(/lundi: /, "")),
    mardi: formatHours(hours[1].replace(/mardi: /, "")),
    mercredi: formatHours(hours[2].replace(/mercredi: /, "")),
    jeudi: formatHours(hours[3].replace(/jeudi: /, "")),
    vendredi: formatHours(hours[4].replace(/vendredi: /, "")),
    samedi: formatHours(hours[5].replace(/samedi: /, "")),
    dimanche: formatHours(hours[6].replace(/dimanche: /, "")),
  };

  // console.log(newhours);

  return (
    <div>
      <div className="mt-4 text-sm uppercase text-gray-400">{title} </div>
      <div className="bg-gray-900 rounded-xl p-4 my-2">
        {Object.keys(newhours).map((key, value) => (
          <OpenningHours key={value} jours={key} hours={newhours[key]} />
        ))}
      </div>
    </div>
  );
};

const OpenningHours = ({
  jours,
  hours,
}: {
  jours: string;
  hours: string[] | undefined[];
}) => {
  return (
    <div className="flex items-center text-xl">
      <span className="">{jours} : </span>
      {hours.length === 0 ? (
        <span className="flex items-center">😭</span>
      ) : (
        <span>
          {hours[0]}- {hours[1]}
        </span>
      )}
    </div>
  );
};

const SectionDataWebSite = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => (
  <div>
    <div className="mt-4 text-sm uppercase text-gray-400">{title} </div>
    <a href={data} target="_blank">
      {" "}
      {data}{" "}
    </a>
  </div>
);

function formatHours(caract: string) {
  if (caract.match(/Fermé/g)) {
    return [];
  } else {
    let ouverture = caract.split(" ")[0];
    let fermeture = caract.split(" ")[2];
    return [ouverture, fermeture];
  }
}
