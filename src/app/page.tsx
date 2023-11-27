import BarList from "./components/BarList";
import { getDataFromApi } from "./utils/getDataFromApi";
import { DataFromApi } from "./utils/type";

export default async function Home() {
  const datas: DataFromApi = await getDataFromApi();

  return (
    <main className=" container px-14">
      <h1>brest bar app</h1>
      <BarList {...datas} />
    </main>
  );
}
