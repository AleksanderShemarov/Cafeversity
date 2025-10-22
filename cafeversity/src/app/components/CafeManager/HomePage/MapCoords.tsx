"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { IconTargetArrow } from "@tabler/icons-react";


L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


export default function MapCoords({ latitude, longitude, name = "Ваша Сталоўка" }: { latitude: string, longitude: string, name?: string }) {
    return (
        <MapContainer
            bounds={[[Number(latitude), Number(longitude)]]}
            style={{ height: "100%", width: "100%" }}
            attributionControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[Number(latitude), Number(longitude)]}>
                <Popup>
                    <p className="text-[1.5rem] font-semibold">{name}</p>
                </Popup>
            </Marker>
            <MapCentration latitude={Number(latitude)} longitude={Number(longitude)} />
        </MapContainer>
    );
}


function MapCentration({ latitude, longitude }: { latitude: number, longitude: number }) {

    const map = useMap();

    const comeBack = () => {
        map.setView([latitude, longitude], 18);
    };

    return (
        <div className="leaflet-top leaflet-right">
            <div className="leaflet-control">
                <button 
                    onClick={comeBack}
                    className="h-[3.5rem] w-[3.5rem] flex items-center justify-center bg-white rounded shadow-md hover:bg-gray-100 border"
                    title="Да Сталоўкі"
                >
                    <IconTargetArrow className="h-[2.5rem] w-[2.5rem]" />
                </button>
            </div>
        </div>
    );
}
