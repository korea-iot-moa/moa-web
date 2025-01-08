import React, { useEffect, useState } from 'react';

type Point = {
  lat: number;
  lng: number;
}

type Address = {
  address: string;
}

const apiKey = process.env.REACT_APP_NAVER_API;

const NaverMapComponent: React.FC<Address> = ({ address }) => {
  const [addressMessage, setAddressMessage] = useState<string>("");
  const [latLng, setLatLng] = useState<Point | null>(null);
  const [map, setMap] = useState<any>(null); 

  useEffect(() => {
    if (!address) {
      setAddressMessage("주소가 존재하지 않습니다.");
      setLatLng(null); 
      if (map) {
        map.setCenter(new window.naver.maps.LatLng(37.5665, 126.9784)); 
      }
      return;
    }

    if (!apiKey) {
      console.error("API 키 에러");
      return;
    }

    window.naver.maps.Service.geocode(
      { query: `${address}` },
      function(status, response) {
        if (status !== window.naver.maps.Service.Status.OK) {
          console.log(status);
          setAddressMessage("주소 변환 실패");
          return;
        }
        const result = response.v2.addresses[0];
        if (result) {
          setLatLng({
            lat: parseFloat(result.y),
            lng: parseFloat(result.x),
          });
        } else {
          setAddressMessage("주소 결과를 찾을 수 없습니다.");
        }
      }
    );
  }, [address, map]);

  useEffect(() => {
    if (!latLng) return; 

    if (map) {
      map.setCenter(new window.naver.maps.LatLng(latLng.lat, latLng.lng));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
    script.onload = () => {
      if (!window.naver || !window.naver.maps) {
        console.error("네이버 지도 에러");
        return;
      }

      const newMap = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 16,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
        map: newMap,
      });

      setMap(newMap); 
    };
    script.onerror = () => {
      console.error("지도 로드 실패");
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latLng, apiKey, map]);

  return (
    <>
      {address ? (
        <div id="map" style={{ width: "100%", height: "100%", borderRadius: "5px" }} />
      ) : (
        <p>{addressMessage}</p>
      )}
    </>
  );
};

export default NaverMapComponent;