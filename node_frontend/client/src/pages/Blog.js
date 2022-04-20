import React, { useCallback } from 'react';
import { LinearInterpolator } from '@deck.gl/core';

// material
import { Container, Stack, Typography } from '@mui/material';

// components
import Page from '../components/Page';

import Map from '../map/Map';

const INITIAL_VIEW_STATE = {
  latitude: 30.3753,
  longitude: 69.3451,
  zoom: 5,
  pitch: 60,
  bearing: 0
};

const data = [
  {
    id: 0,
    state: 'Lincoln Park',
    coordinates: [67.0104, 24.8608]
  },
  {
    id: 1,
    state: 'Burnham Park',
    coordinates: [74.35071, 31.558]
  },
  {
    id: 2,
    state: 'Millennium Park',
    coordinates: [73.08969, 31.41554]
  },
  {
    id: 3,
    state: 'Grant Park',
    coordinates: [73.0479, 33.59733]
  },
  {
    id: 4,
    state: 'Humboldt Park',
    coordinates: [71.47824, 30.19679]
  },
  {
    id: 5,
    state: 'Delhi',
    coordinates: [77.1025, 28.7041]
  }
];

export default function Blog() {
  const [viewState, setViewState] = React.useState(INITIAL_VIEW_STATE);
  const handleChangeViewState = ({ viewState }) => setViewState(viewState);

  const transitionInterpolator = new LinearInterpolator();
  const rotateCamera = useCallback(() => {
    setViewState((viewState) => ({
      ...viewState,
      bearing: viewState.bearing + 360,
      transitionDuration: 50000,
      transitionInterpolator,
      onTransitionEnd: rotateCamera
    }));
  }, []);

  return (
    <>
      <Page title="Dashboard: Blog | Minimal-UI">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Track Beacons
            </Typography>
          </Stack>
          <div>
            <Map
              width="77vw"
              height="70vh"
              viewState={viewState}
              onViewStateChange={handleChangeViewState}
              libraries={data}
              rotateCamera={rotateCamera}
            />
          </div>
        </Container>
      </Page>
    </>
  );
}
