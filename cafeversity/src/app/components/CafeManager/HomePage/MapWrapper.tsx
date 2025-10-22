import dynamic from "next/dynamic";


const MapCoords = dynamic(
    () => import("@/app/components/CafeManager/HomePage/MapCoords"),
    {
        ssr: false,
        loading: () =>
            <div className="h-[100%] content-center">
                <p className="text-[2rem] font-semibold text-center">Загрузка...</p>
            </div>
    }
);


export default function MapWrapper({ latitude, longitude, name }: { latitude: string, longitude: string, name?: string }) {
    return (
        <MapCoords latitude={latitude} longitude={longitude} name={name} />
    );
}
