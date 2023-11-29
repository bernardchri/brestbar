export function FilterByRanking({
  rating,
  handleRating,
}: {
  rating: number;
  handleRating: any;
}) {
  {
    /* <button className="w-full border rounded-full p-4 my-4 flex align-middle items-center justify-center font-bold text-xl">
                    Je ne veux que le meilleur !
                    <span className="text-3xl">🍺</span>
                  </button> */
  }

  return (
    <div className=" my-5 p-4">
      <label className="mr-1 bloc w-full">Filtrer par note </label>
      <div className="flex">
        <input
          type="range"
          className="w-full mr-10"
          onChange={handleRating}
          min="1"
          max="5"
          step="0.1"
        />
        <div className="text-xs">
          supérieur à {rating}
          <span style={{ fontSize: `${Math.round(rating * 12)}px` }}>🍺</span>
        </div>
      </div>
    </div>
  );
}
