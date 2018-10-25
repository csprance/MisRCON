import * as L from 'leaflet';
import * as React from 'react';
import {
  FeatureGroup,
  LayersControl,
  Map as LeafletMap,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';
import { connect } from 'react-redux';

import { MAP_BOUNDS } from '../constants/map-constants';
import {
  misMapActions,
  misMapSelectors,
  MisMapTypes,
  misMapUtils
} from '../redux/mismap';
import { Dispatch, RootState } from '../redux/redux-types';

type Props = {
  dispatch: Dispatch;
  layers: MisMapTypes.MisMapMarkersByLayer;
  addMarker: (marker: any) => void;
  showing?: boolean;
};
class Map extends React.Component<Props> {
  mapRef: any;
  public state = {
    map: {
      tileLayer: {
        url: {
          islands_sat: '../src/resources/maps/islands_sat/{z}/{x}/{y}.png'
        },
        crs: L.CRS.Simple,
        noWrap: true,
        bounds: MAP_BOUNDS,
        tms: true,
        attributionControl: false,
        trackResize: true,
        renderer: L.Canvas,
        center: { lat: -47, lng: -23 }
      },
      options: {
        center: { lat: -47, lng: -23 },
        zoom: 3,
        minZoom: 0,
        maxZoom: 6,
        maxBounds: MAP_BOUNDS
      }
    },
    e: {}, // event data from the left click sent to context menu
    contextMenuOpen: false,
    contextMenuAnchor: {
      x: 900,
      y: 900
    }
  };

  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps() {
    this.mapRef.leafletElement.invalidateSize();
  }

  onClick = (e: L.LeafletMouseEvent) => {
    const { x, y } = misMapUtils.convertLatLngToVec2(
      e.latlng.lat,
      e.latlng.lng,
      this.mapRef.leafletElement
    );
    this.props.addMarker({
      id: Math.random(),
      layer: 'Click Layer',
      posX: e.latlng.lat,
      posY: e.latlng.lng,
      content: `X:${x} Y:${y} `
    });
  };

  public render() {
    const { layers } = this.props;
    return (
      <LeafletMap
        ref={(ref: any) => (this.mapRef = ref)}
        onClick={this.onClick}
        {...this.state.map.options}
        style={{ height: '100%', width: '100%', background: 'transparent' }}
      >
        <LayersControl position="bottomleft">
          <TileLayer
            {...this.state.map.tileLayer}
            url={this.state.map.tileLayer.url.islands_sat}
          />
          {layers.map(([layerName, markers]) => (
            <LayersControl.Overlay name={layerName} key={layerName} checked>
              <FeatureGroup>
                {markers.map(({ id, posX, posY, content }) => (
                  <Marker key={id} position={[posX, posY]}>
                    <Popup>{content}</Popup>
                  </Marker>
                ))}
              </FeatureGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
      </LeafletMap>
    );
  }
}

export const mapStateToProps = (state: RootState) => ({
  layers: misMapSelectors.markersByLayerNameSelector(state)
});
export const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMarker: (marker: any) => dispatch(misMapActions.addMarker(marker))
});
export default connect(mapStateToProps, mapDispatchToProps)(Map);
