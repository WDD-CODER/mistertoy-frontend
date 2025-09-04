import { useMap } from '@vis.gl/react-google-maps';
import { useEffect } from 'react';


const MapController = ({ branch ,setPosition}) => {
    const map = useMap();

    useEffect(() => {
                if (map && branch && branch.location) {
            map.panTo(branch.location)
            setPosition(branch.location)
        }
    }, [map, branch]);

    return null;
};

export default MapController;
