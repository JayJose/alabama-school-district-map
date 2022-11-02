import { useState } from "react";

import Map from "react-map-gl";
import { BASEMAP } from "@deck.gl/carto";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";

export function MyMap() {
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
      let name = info.object.properties.LEA_NAME.toLowerCase();
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
            html: `${object.properties.LEA_NAME.toLowerCase()}`
          }
        }
      >
        <GeoJsonLayer
          id="json-data"
          data={
            "https://raw.githubusercontent.com/JayJose/needs-more-polygons/main/data/alabamaSchoolDistricts.json"
          }
          filled={true}
          stroked={true}
          getFillColor={[192, 192, 192, 220]}
          getLineColor={[0, 0, 0, 255]}
          getLineWidth={150}
          pickable={true}
          autoHighlight={true}
          highlightColor={[0, 0, 176, 150]}
          onClick={onClick}
        />
        <Map
          mapboxAccessToken={
            "pk.eyJ1IjoiamF5am9zZSIsImEiOiJjbDhzczVoeW4wMGdlM3BuemU0aTh1cXF6In0.P6rxnD9XAxmufeHZRMwGOw"
          }
          mapStyle={BASEMAP.POSITRON}
        />
      </DeckGL>
    </>
  );
}
