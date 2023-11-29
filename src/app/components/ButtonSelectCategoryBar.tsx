import { useState } from "react";
import { CATEGORY_LIST } from "../utils/constantes";

export function ButtonSelectCategoryBar({ handleClick }: any) {
  const [idSelected, setIdSelected] = useState<number>(0);

  function handleSelectCategory(numberOfCategory: number) {
    setIdSelected(numberOfCategory);
    handleClick(numberOfCategory);
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Où boire à Brest ?</h2>
        <button
          onClick={() => handleSelectCategory(0)}
          className={`font-bold ${
            idSelected === 0 ? `bg-gradient bg-clip-text text-transparent` : " "
          }`}
          aria-label="tout"
        >
          Tout afficher
        </button>
      </div>

      <div className="flex items-center gap-8">
        {CATEGORY_LIST.map((item) => (
          <ButtonCategory
            key={item.id}
            icon={item.icon}
            text={item.text}
            id={item.id}
            handleClick={handleSelectCategory}
            isSelected={idSelected}
          />
        ))}
      </div>
    </div>
  );
}

const ButtonCategory = ({
  icon,
  text,
  id,
  handleClick,
  isSelected,
}: {
  icon: string;
  text: string;
  id: number;
  isSelected: number;
  handleClick: any;
}) => {
  return (
    <button
      type="button"
      aria-label={text}
      className={`flex w-1/3 flex-col items-center gap-2 font-medium `}
      onClick={() => handleClick(id)}
    >
      <div
        className={`flex aspect-square w-full items-center justify-center rounded-lg bg-bg text-4xl ${
          isSelected === id ? " bg-gradient" : " "
        }`}
      >
        {icon}
      </div>
      <p className="transition-colors">{text}</p>
    </button>
  );
};
