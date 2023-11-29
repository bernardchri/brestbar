import BarList from "./components/BarList";
import { getDataFromApi } from "./utils/getDataFromApi";
import { DataFromApi } from "./utils/type";

export default async function Home() {
  const datas: DataFromApi = await getDataFromApi();

  return (
    <main className="flex max-h-screen min-h-screen flex-col overflow-hidden">
      <div className="z-20 flex w-full flex-col items-start gap-4 bg-bg p-4 text-[28px] shadow-md transition-colors lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-white">
          <span className="pr-2">🍻</span> brest bar app
        </h1>
      </div>
      <BarList {...datas} />
      <div className="flex flex-col"></div>
    </main>
  );
}
