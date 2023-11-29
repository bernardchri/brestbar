
export const SectionDataOpeningHours = ({
  title,
  data,
}: {
  title: string;
  data: string[];
}) => {
  let hours = { ...data };

  let newhours: any = {
    lundi: formatHours(hours[0].replace(/lundi: /, "")),
    mardi: formatHours(hours[1].replace(/mardi: /, "")),
    mercredi: formatHours(hours[2].replace(/mercredi: /, "")),
    jeudi: formatHours(hours[3].replace(/jeudi: /, "")),
    vendredi: formatHours(hours[4].replace(/vendredi: /, "")),
    samedi: formatHours(hours[5].replace(/samedi: /, "")),
    dimanche: formatHours(hours[6].replace(/dimanche: /, "")),
  };

  return (
    <div>
      <div className="mt-4 text-sm uppercase text-gray-400">{title} </div>
      {hours ? (
        <div className="bg-gray-900 rounded-xl p-4 my-2">
          {Object.keys(newhours).map((key, value) => (
            <OpenningHours key={value} jours={key} hours={newhours[key]} />
          ))}
        </div>
      ) : (
        <div>pas d’horaires</div>
      )}
    </div>
  );
};


function formatHours(caract: string) {
  if (caract.match(/Fermé/g)) {
    return [];
  } else {
    let ouverture = caract.split(" ")[0];
    let fermeture = caract.split(" ")[2];
    return [ouverture, fermeture];
  }
}

const OpenningHours = ({
  jours,
  hours,
}: {
  jours: string;
  hours: string[] | undefined[];
}) => {
  return (
    <div className="flex items-center text-xl">
      <span className="">{jours}&nbsp; : </span>
      {hours.length === 0 ? (
        <span className="flex items-center">&nbsp;😭</span>
      ) : (
        <span>
          &nbsp; {hours[0]} - {hours[1]}
        </span>
      )}
    </div>
  );
};
