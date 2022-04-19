import React from 'react';
import MapGL from 'react-map-gl';
import { DeckGL, ScatterplotLayer } from 'deck.gl';
import { Spring } from 'react-spring/renderprops';
// import Goo from "./goodies/Goo";
// import { easeBackOut, pairs, shuffle, easeBackInOut } from 'd3';
// import { lineString } from "@turf/helpers";
import { IconLayer } from '@deck.gl/layers';
// import ReactFloaterJs from "react-floaterjs";
import ArcBrushingLayer from './goodies/ArcBrushingLayer';
// import marker_svg from './assests/marker.png';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiaGVsbG8xMjMwMDAwIiwiYSI6ImNsMTY5enExbDE1MDQzaW10aXNldHppbm0ifQ.AMRrzL3F4vjcev9lVoXjBw';

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 350, height: 350, mask: true }
};

export default function Map({
  width,
  height,
  viewState,
  onViewStateChange,
  libraries,
  radius,
  rotateCamera
}) {
  return (
    <MapGL
      mapStyle="mapbox://styles/mapbox/dark-v10"
      width={width}
      height={height}
      onLoad={rotateCamera}
      viewState={viewState}
      onViewStateChange={onViewStateChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {/*
    You need to add movement in arc via variation in color to show the movement of the attacks
*/}
      <Spring
        from={{ arcCoef: 1e-10 }}
        to={{ arcCoef: 1 }}
        config={{ duration: 5000 }}
        delay={7000}
      >
        {(springProps) => {
          const layers = [
            new ScatterplotLayer({
              id: 'scatterplot-layer',
              data: libraries,
              getPosition: (d) => d.coordinates,
              getRadius: 500 * radius,
              radiusMaxPixels: 15,
              getFillColor: [255, 99, 71],
              transitions: {
                getRadius: {
                  duration: 1000
                  // easing: easeBackInOut
                }
              },
              pickable: true,
              autoHighlight: true
            }),
            new ArcBrushingLayer({
              id: 'arc-layer',
              data: libraries,
              getSourcePosition: (d) => d.coordinates,
              getTargetPosition: (d) => [73.135, 31.4504],
              getSourceColor: [255, 0, 128],
              getTargetColor: [0, 200, 255],
              getWidth: 6,
              visible: springProps.arcCoef > 1e-6,
              coef: springProps.arcCoef
            }),
            new IconLayer({
              id: 'icon-layer',
              data: libraries,
              pickable: true,
              // iconAtlas and iconMapping are required
              // getIcon: return a string
              iconAtlas: 'https://img.icons8.com/ios/344/marker--v1.png',
              iconMapping: ICON_MAPPING,
              getIcon: (d) => 'marker',
              sizeScale: 14,
              getKey: (d) => d.id,
              getPosition: (d) => d.coordinates,
              getSize: (d) => 3,
              getColor: (d) => [255, 0, 0]
            })
          ];

          return <DeckGL layers={layers} viewState={viewState} />;
        }}
      </Spring>
    </MapGL>
  );
}
