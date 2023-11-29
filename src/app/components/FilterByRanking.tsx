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
    <div className=" p-4">
      <label className="mr-1 bloc w-full font-bold">Filtrer par note </label>
      <div className="flex">
        <input
          type="range"
          className="w-full mr-4"
          onChange={handleRating}
          min="1"
          max="5"
          step="0.1"
        />
        <div className="text-xs text-center">
          <div
            style={{
              fontSize: `${Math.round(rating * 12)}px`,
              lineHeight: `${Math.round(rating * 12)}px`,
            }}
            className="block"
          >
            🍺
          </div>
          <div className="mt-2">{rating}</div>
        </div>
      </div>
    </div>
  );
}
