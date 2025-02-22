"use client"
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Icon, LatLng, LatLngExpression, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect, useMemo, useState } from 'react';

import Image  from 'next/image';

import { CommonModal } from '../modal/CommonModal';
import L from "leaflet";

// import { useGeoLocation} from "@/hooks/useGeoLocation";
import {useMapEvents} from 'react-leaflet/hooks';
//mapに関するcssを管理
// import './general-map.css';

import Detail from './Detail';

import {ImageOutput} from '@/schema/outputTypeSchema/ImageOutputSchema';
import { createRoot } from "react-dom/client";

const MapCompoent = ({setImages}: { setImages: React.Dispatch<React.SetStateAction<ImageOutput[]>> }) => {
    const fetchImage = async () => {
      try{
        const latlangBounds = map.getBounds();
        const minLatitude = latlangBounds.getSouthWest().lat;
        const maxLatitude = latlangBounds.getNorthEast().lat;
        const minLongitude = latlangBounds.getSouthWest().lng;
        const maxLongitude = latlangBounds.getNorthEast().lng;
        const zoom = map.getZoom();
        console.log(minLatitude, maxLatitude, minLongitude, maxLongitude, zoom);
        fetch('/api/map/getSquareMapImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            minLatitude,
            maxLatitude,
            minLongitude,
            maxLongitude,
            zoom,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setImages(data);
          });
      }catch(error){
        console.log(error);

      } 
    }

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
        fetchImage();
      },
      zoomend: () => {
        console.log("zoomend");
        fetchImage();
        
      }
      
    })
    return null;
  }

  type ImageMarkerProps = {
    image: ImageOutput;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedImage: React.Dispatch<React.SetStateAction<ImageOutput | null>>;
  };
  const ImageMarker2: React.FC<ImageMarkerProps> = ({ image, setShow, setSelectedImage }) => {
    const handleClicked = () => {
      setShow(true);
      setSelectedImage(image);
    }
    
    const customIcon = useMemo(() => {
      const div = document.createElement("div");
      div.className = "relative w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg border border-violet-950";
  
      const root = createRoot(div);
      root.render(
        <Image
          src={image.generatedUrl}
          alt={image.description ?? "Image"}
          width={30}
          height={30}
          className="object-cover w-full h-full"
          onClick={handleClicked}
        />
      );
  
      return L.divIcon({
        html: div,
        // iconSize: [100, 30],
        iconAnchor: [0, 0],
      });
    }, [image.generatedUrl]);
  
    return <Marker position={[image.latitude, image.longitude]} icon={customIcon} />;
  };
  const CustomIcon = (url: string)  => new Icon({
    iconUrl: url, 
    iconSize: [48, 48], // アイコンのサイズ
    iconAnchor: [16, 32], // アイコンの基準点
    popupAnchor: [0, -32], // ポップアップの基準点
  });
  const ImageMarker = ({ image }: { image: ImageOutput }) => {
    return (
      <Marker key={`${image.latitude}-${image.longitude}`} position={[image.latitude, image.longitude]} icon={CustomIcon(image.generatedUrl)}>
        {/* <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden shadow-lg border border-white">
          <Image
            src={image.generatedUrl}
            alt={image.description ?? "Map Image"}
            fill
            className="object-cover relative"
            layout="fill"
          />
        </div> */}
      </Marker>
    );
  };


const GeneralMap = () => {
    const [show, setShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState<ImageOutput | null>(null);
    // 初期マップズームレベル
    const [zoom, setZoom] = useState<number>(13);
    // const {location, error} = useGeoLocation();
    const [position, setPosition] = useState<LatLngTuple>([35.681236, 139.767125]);
    const handleReset = () =>{
        setPosition([35.681236, 139.767125]);
    }
    const [images, setImages] = useState<ImageOutput[]>([]);

    

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
                
                <MapCompoent setImages={setImages}/>
                <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                          />
                {/* <Popup
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
                </Popup>  */}

                  {images.map((image: ImageOutput) => (
                    <ImageMarker2 image={image} setShow={setShow} setSelectedImage={setSelectedImage}/>
                  ))}


                <CommonModal
                    isOpen={show}
                    closeModal={() => setShow(false)}
                    elem={
                        selectedImage ? <Detail
                       image={selectedImage}
                    /> : <></>
                        
                    }
                    /> 
            </MapContainer>
        </div>
                    </>
    );
};

export default GeneralMap;
