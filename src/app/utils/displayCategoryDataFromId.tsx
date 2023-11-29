import { CATEGORY_LIST } from "./constantes";

type TypeCategory = {
  icon : string;
  text: string;
};

export function getCategoryDataFromId(
  categoryNumberList: number[] | string[]
): TypeCategory[] {
  let text = "";
  let data: any = [];

  categoryNumberList.forEach((numb) => {
    data.push(CATEGORY_LIST.find((item) => item.id === numb));
  });

  return data;
}
