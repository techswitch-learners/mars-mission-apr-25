import {use, useState} from 'react';
import {useEffect} from 'react';
import { config } from 'dotenv';
import { json } from 'stream/consumers';

type RoverType = {
    roverName: string;
} 

type manifestData = {
    name: string;
    landingDate: string;
    launchDate: string;
    status: string;
    maxSol: number;
    maxDate: string;
    totalPhotos: number
}

type solData ={
    sol: number;
    earthDate: string;
    totalPhotos: number;
}

function MissionManifest(props: RoverType) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [manifestData, setManifestData] = useState({} as manifestData);
    const [solData, setSolData] = useState({} as solData);

    useEffect(() => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/Opportunity?api_key=${apiKey}`).then(response => response.json()).then((response) => {
        let data = response.photo_manifest;
        setManifestData({
                name: data.name,
                landingDate: data.landing_date,
                launchDate: data.launch_date,
                status: data.status,
                maxSol: data.max_sol,
                maxDate: data.max_date,
                totalPhotos: data.total_photos
        })
        let photosArrayLength = data.photos.length;
        let photosData = response.photo_manifest.photos[photosArrayLength -1];
        setSolData({
            sol: photosData.sol,
            earthDate: photosData.earth_date,
            totalPhotos: photosData.total_photos
        })
        console.log('solData', solData);

        });
    }, [props.roverName]);


    if (!manifestData) {
        return <p>Loading...</p>
    } else {
    return (
        <div className='rover-mission-info-container'>
            <p>Name: {manifestData.name}</p>
            <p>Landing Date: {manifestData.landingDate}</p>
            <p>Launch Date: {manifestData.launchDate}</p>
            <p>Status: {manifestData.status}</p>
            <p>Max Sol: {manifestData.maxSol}</p>
            <p>Max Date: {manifestData.maxDate}</p>
            <p>Total photos: {manifestData.totalPhotos}</p>

            <p>SOL DATA</p>
            <p>sol {solData.sol}</p>
            <p>earthDate {solData.earthDate}</p>
            <p>totalPhotos {solData.totalPhotos}</p>
        </div>
    )
}
}

export default MissionManifest; 
