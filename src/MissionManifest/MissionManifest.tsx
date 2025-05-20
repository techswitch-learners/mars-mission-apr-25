import {useState} from 'react';
import {useEffect} from 'react';
import { config } from 'dotenv';
import { json } from 'stream/consumers';
import "./MissionManifest.scss";

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

function MissionManifest(props: RoverType) {
    const apiKey = process.env.REACT_APP_API_KEY;
    const [manifestData, setManifestData] = useState({} as manifestData);

    useEffect(() => {
        fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${props.roverName}?api_key=${apiKey}`).then(response => response.json()).then((response) => {
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
        });
    }, [props.roverName]);


    if (!manifestData) {
        return <p>Loading...</p>
    } else {
    return (
        <div id='mission-manifest-container'>
            <h2>MISSION MANIFEST</h2>
            <div id='rover-mission-info-container'>
                <p className='manifest-fieldname'>Rover Name: </p>
                <p>{manifestData.name}</p>
                <p className='manifest-fieldname'>Landing Date: </p>
                <p>{manifestData.landingDate}</p>
                <p className='manifest-fieldname'>Launch Date: </p>
                <p>{manifestData.launchDate}</p>
                <p className='manifest-fieldname'>Status: </p>
                <p>{manifestData.status}</p>
                <p className='manifest-fieldname'>Max Sol: </p>
                <p>{manifestData.maxSol}</p>
                <p className='manifest-fieldname'>Max Date: </p>
                <p>{manifestData.maxDate}</p>
                <p className='manifest-fieldname'>Total photos: </p>
                <p>{manifestData.totalPhotos}</p>
            </div>
        </div>
    )
}
}

export default MissionManifest; 
