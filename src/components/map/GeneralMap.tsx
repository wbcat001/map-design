"use client"
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import { LatLng, LatLngExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { CommonModal } from '../modal/CommonModal';

// import { useGeoLocation} from "@/hooks/useGeoLocation";
import {useMapEvents} from 'react-leaflet/hooks';
//mapに関するcssを管理
// import './general-map.css';

import Detail from './Detail';


const MapCompoent = () => {
    const map  = useMapEvents({
      click: () => {
        map.locate()
        console.log(map.getCenter());
        // get lat and long of square
        const latlangBounds = map.getBounds();
        console.log(latlangBounds.getNorthWest());
        console.log(latlangBounds.getNorthEast());
  
      },
      dragend: () => {
        console.log("dragend");
        console.log(map.getCenter());
      },
      zoomend: () => {
        console.log("zoomend");
        console.log(map.getCenter());
      }
      
    })
    return null;
  }

const GeneralMap = () => {
    const [show, setShow] = useState(false);
    
    // 初期マップズームレベル
    const [zoom, setZoom] = useState<number>(13);
    // const {location, error} = useGeoLocation();
    const [position, setPosition] = useState<LatLngTuple>([35.681236, 139.767125]);
    const handleReset = () =>{
        setPosition([35.681236, 139.767125]);
    }

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         console.log("location found");
    //       navigator.geolocation.getCurrentPosition((pos) => {
    //         setPosition([pos.coords.latitude, pos.coords.longitude]);
    //       });
    //     }else{
    //         console.log("location not found");
    //     }
    // }, []);
    
    // useEffect(() =>{
    //     const addPositionX = (x: number) => {
    //       setPosition((prev) => {
    //         if (prev) {
    //           return [prev[0] + x, prev[1]];
    //         }
    //         return prev;
    //       })
    //     }
    //     const interval = setInterval(() => {
    //       addPositionX(0.001);
    //     }, 5000);
    //     return ()=> clearInterval(interval);
    //   },[]);

    return (<>
        <div className="w-full h-screen z-0">
        {/* <button onClick={handleReset} className="absolute top-30 left-30 bg-white p-2 rounded-full shadow-md">Reset</button> */}
            <MapContainer center={position} zoom={zoom} className="w-full h-full z-0">
                
                <MapCompoent />
                <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          />
                <Popup
                    position={position}
                    closeButton={false}
                    closeOnClick={false}
                    closeOnEscapeKey={false}
                    >
                    <Image
                    src={'/map.png'}
                    width={300}
                    height={300}
                    alt="Map"
                    layout="responsive"
                    objectFit="cover"
                    onClick={() => setShow(!show)}
                    />
                </Popup> 

                <CommonModal
                    isOpen={show}
                    closeModal={() => setShow(false)}
                    elem={
                        <Detail
                        map={'/map.png'}
                        title="title"
                        author="author"
                        address="address"
                        date="2025/01/01"
                        comment="comment"
                        />
                    }
                    /> 
            </MapContainer>
        </div>
                    </>
    );
};

export default GeneralMap;
