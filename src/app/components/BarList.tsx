"use client";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useRef, useState } from "react";
import type { GeoJSONSource } from "react-map-gl";
import Map, { Layer, MapRef, Marker, Popup, Source } from "react-map-gl";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "../utils/Layers";
import { Bar, DataFromApi } from "../utils/type";
import { ButtonHideSiderBar } from "./ButtonHideSiderBar";
import { ButtonSelectCategoryBar } from "./ButtonSelectCategoryBar";
import CardBar from "./CardBar";
import CardBarDetails from "./CardBarDetails";
import ControlPanel from "./ControlPanel";
import Pin from "./Pin";

const mapToken =
  "pk.eyJ1IjoiYmVyZ2FsbCIsImEiOiJjbHBpaG1ibHQwYzNpMnF0N3hybXJhN2FwIn0.D-0DuHpUtmg4dWSaP-QStw";
export default function BarList(datas: DataFromApi) {
  const originList = datas.data;
  const [list, setList] = useState(datas.data);
  const [rating, setRating] = useState(3);
  const [showList, setShowList] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [dataSelected, setDataSelected] = useState<Bar | null>(null);

  // map
  const mapRef = useRef<MapRef>(null);

  const onClickOnCircles = (event: any) => {
    // event.originalEvent.stopPropagation();
    const feature = event.features[0];
    console.log(feature?.geometry.coordinates);
    const clusterId = feature?.properties.cluster_id;
    const mapboxSource = mapRef.current?.getSource("bars") as GeoJSONSource;

    mapRef?.current?.easeTo({
      center: feature?.geometry.coordinates,
      zoom,
      duration: 750,
    });
  };
  const [lng, setLng] = useState(-4.4834526);
  const [lat, setLat] = useState(48.3831122);
  const [zoom, setZoom] = useState(15);
  const [popupInfo, setPopupInfo] = useState({});

  const pins = useMemo(
    () =>
      list.map((bar, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={bar.location.coordinates[0]}
          latitude={bar.location.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(bar);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  const [viewPort, setViewPort] = useState({
    longitude: lng,
    latitude: lat,
    zoom: zoom,
    pitch: 10,
  });

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: list.map((bar: Bar) => {
      return {
        type: "Feature",
        properties: Layer,
        geometry: {
          type: "Point",
          coordinates: [
            bar.location.coordinates[0],
            bar.location.coordinates[1],
          ],
        },
      };
    }),
  };

  //
  useEffect(() => {
    const newList = [...originList].filter(
      (item) => parseInt(item.rating) >= rating
    );
    setList(newList);
  }, [rating, originList]);

  function changeRating(e: any) {
    setRating(e.target.value);
  }

  function onClickShowMoreDetail(data: Bar) {
    setDataSelected(data);
    setShowList(true);

    mapRef?.current?.easeTo({
      center: [data.location.coordinates[0], data.location.coordinates[1]],
      zoom,
      duration: 750,
    });
  }

  function hidePanel() {
    console.log(showPanel);
    setShowPanel(!showPanel);
  }

  function filterByCategory(numberOfCategory: number) {
    if (numberOfCategory !== 0) {
      let filterByCategory = [...originList].filter((item) =>
        item.category.find((cat) => parseInt(cat) === numberOfCategory)
      );
      setList(filterByCategory);
    } else {
      setList(originList);
    }
  }

  return (
    <>
      <div
        className={`z-10 min-h-full flex-1 origin-left text-white shadow-xl transition-all lg:w-1/3 bg-gray-900 ${
          showPanel ? "w-[4.5rem] overflow-hidden " : "w-4/5 overflow-y-scroll "
        }`}
      >
        <div className="flex w-full justify-end px-4 py-2 lg:hidden">
          <ButtonHideSiderBar handleClick={hidePanel} showPanel={showPanel} />
        </div>
        <div
          className={`${
            showPanel ? "opacity-0" : "opacity-100"
          } transition-opacity`}
        >
          <EnTete />
          <div className="  text-gray-200 overflow-auto max-h-full ">
            {!showList ? (
              <>
                <div className="align-center items-center border-b-0 pt-4 ">
                  <Divider />
                  <ButtonSelectCategoryBar handleClick={filterByCategory} />
                  <Divider />
                  <Divider />
                </div>
                <div className=" flex items-center justify-between p-4">
                  <h2 className="text-2xl font-semibold">Explorer</h2>
                  <button
                    type="button"
                    className="bg-gradient rounded-lg px-4 py-2 font-semibold"
                  >
                    Plus de filtres ✍️
                  </button>
                </div>
                <div className="p-4"> Nombres de resultats : {list.length}</div>
                <div className="p-4">
                  {list.map((item: Bar) => (
                    <CardBar
                      key={item.id}
                      datas={item}
                      handleClick={onClickShowMoreDetail}
                    />
                  ))}
                </div>
              </>
            ) : (
              dataSelected !== null && (
                <div className="">
                  <button
                    onClick={() => setShowList(!showList)}
                    className="button-mini"
                  >
                    retour
                  </button>
                  <CardBarDetails datas={dataSelected} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <section className="absolute outline-dashed bottom-0 left-0 top-0 right-0 w-full bg-gray-200   overflow-hidden">
        <Map
          ref={mapRef}
          mapboxAccessToken={mapToken}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: zoom,
          }}
          onMove={(evt) => setViewPort(evt.viewState)}
          onClick={onClickOnCircles}
          style={{ width: "100vw", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          interactiveLayerIds={[clusterLayer?.id]}
        >
          <Source
            id="bars"
            type="geojson"
            data={geojson}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            {/* <Layer {...unclusteredPointLayer} /> */}
            <Layer {...unclusteredPointLayer}>{pins}</Layer>
          </Source>

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number("0")}
              latitude={Number("0")}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.city}, {popupInfo.state} |{" "}
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width="100%" src={popupInfo.image} />
            </Popup>
          )}
        </Map>
        <ControlPanel />
      </section>
    </>
  );
}

const Divider = () => (
  <div id="divider" className="w-full border border-bg"></div>
);

const EnTete = () => (
  <div className="p-4">
    <h1 className="text-4xl font-bold text-white">
      Trouver le bar qu’il vous faut
      <span className="bg-gradient bg-clip-text text-transparent ">
        , juste le meilleur !
      </span>
    </h1>
  </div>
);
