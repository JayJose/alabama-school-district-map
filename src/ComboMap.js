import { useState } from "react";

import Map from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDl6emR0cGEwMGZ5M3BtanZsbzM1N3hxIn0.KgRldqFyIoPtotLMct1U9w";
const polySource =
  "https://raw.githubusercontent.com/JayJose/needs-more-polygons/main/data/NcesAndCensusAlabamaSchoolDistricts.json";

export function MyComboMap() {
  const [viewState, setViewState] = useState({
    latitude: 33.182971,
    longitude: -86.645875,
    zoom: 6,
    bearing: 0,
    pitch: 20
  });

  const updateViewState = ({ viewState }) => {
    setViewState(viewState);
  };

  const onClick = (info) => {
    if (info.object) {
      let name = info.object.properties.NAME.toLowerCase();
      alert(`You have selected ${name}`);
    }
  };

  return (
    <>
      <DeckGL
        controller={true}
        initialViewState={viewState}
        onViewStateChange={updateViewState}
        getTooltip={({ object }) =>
          object && {
            html: `${object.properties.NAME.toLowerCase()}`
          }
        }
      >
        <GeoJsonLayer
          id="json-data"
          data={polySource}
          filled={true}
          stroked={true}
          getFillColor={[34, 139, 34, 244]}
          getLineColor={[0, 0, 0, 255]}
          getLineWidth={150}
          pickable={true}
          autoHighlight={true}
          highlightColor={[255, 215, 0, 255]}
          onClick={onClick}
        />
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={"mapbox://styles/mapbox/light-v10"}
        />
      </DeckGL>
    </>
  );
}
