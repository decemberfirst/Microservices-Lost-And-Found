/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { useSearchParams } from 'react-router-dom';

const InteractiveMap = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat') || 27.6588144;
  const lng = searchParams.get('lng') || 83.570964;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={10} // Increased initial zoom level
      style={{
        height: '400px',
        width: '100%',
        margin: 'auto',
        backgroundColor: 'lightgreen', // Set a light green background color
        border: '2px solid #4CAF50', // Add a green border
        borderRadius: '10px', // Add border-radius for a rounded appearance
      }}
      maxBounds={[
        [26.347, 80.058], // Southwest bounds
        [30.447, 88.201], // Northeast bounds
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      />
      <Marker position={[lat, lng]}>
        <Popup>Your item will be registered with this location tag</Popup>
      </Marker>
      <ChangeCenter position={[lat, lng]} />
      <DetectClick />
    </MapContainer>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const [, setSearch] = useSearchParams();

  useMapEvents({
    click: (e) => {
      setSearch({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
}

export default InteractiveMap;
