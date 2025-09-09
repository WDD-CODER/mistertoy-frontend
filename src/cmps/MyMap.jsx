
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Container, List, ListItemButton, ListItemIcon, ListItemText, Rating, Typography } from '@mui/material'
import { InfoWindow, AdvancedMarker, APIProvider, Map, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'
import MapController from './MapController'
import { toyService } from '../services/toy.service'
import { ImgCmp } from './ImgCmp'
import { useSelector } from 'react-redux'
import { setUpdatedBranches } from '../store/actions/toy.actions'
import { AppFooter } from './AppFooter'

function MyMap() {
    const API_KEY = 'AIzaSyD2Kd_xOK37FqjaQVKLW3uIiIcw-Xi8tPg'
    const [position, setPosition] = useState({ lat: 32.0853, lng: 34.7818 })
    const branches = useSelector(state => state.toyModule.branches)
    console.log("🚀 ~ MyMap ~ branches:", branches)
    const [branch, setBranch] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [markerColor, setMarkerColor] = useState();
    const curBranchIdx = useRef()

    useEffect(() => {
        if (!branches) {
            setUpdatedBranches(toyService.createBranches())
        }
    }, [branches])

    const [markerRef, marker] = useAdvancedMarkerRef();

    function handleChange(ev) {
        const { lat, lng } = ev.detail.latLng
        ev.map.panTo({ lat, lng })
        setPosition({ lat, lng })
        if (ev.detail.latLng !== branch?.location) {
            setIsOpen(false)
            setBranch(null)
            setMarkerColor('black')
        }
    }

    function onSelectBranch(selectedBranch) {
        setIsOpen(false)
        curBranchIdx.current = branches.findIndex(branch => branch._id === selectedBranch._id)
        setBranch(selectedBranch)
        setPosition(selectedBranch.location)
        setMarkerColor(selectedBranch.color)
    }

    function onSetRating(newValue) {
        if (newValue === null && branch.rating !== 1) return
        event.stopPropagation()
        const newBranch = ({ ...branch, rating: newValue })
        setBranch(newBranch)
        const updatedBranches = branches.map(branch => branch._id === newBranch._id ? newBranch : branch)
        setUpdatedBranches(updatedBranches)
    }

    function onClickMarker() {
        if (position === branch?.location) setIsOpen(true)
    }



    // משהו מוזר קרה. בשלב מסויים גיליתי שכשאני לוחץ על המרקר הוא פותח את החלון באיטיות אבל הוא לא דואג למרכז אותי כשהוא נפתח. זה מוסתר
    return (

        <APIProvider apiKey={API_KEY}>
            <Container sx={{ height: '70vh', textAlign: 'center' }}>
                <Typography > Shope branch Map </Typography>
                <Map
                    defaultCenter={position}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                    onClick={handleChange}
                >
                    <AdvancedMarker
                        ref={markerRef}
                        position={position}
                        onClick={onClickMarker}
                    >
                        <Pin background={markerColor} borderColor={'#e6e6e6ff'} glyphColor={'#cf8f8fff'} />
                    </AdvancedMarker>
                    {isOpen && marker && branch && (
                        <InfoWindow
                            anchor={marker}
                            onCloseClick={() => setIsOpen(false)}
                        >
                            <div style={{ padding: '10px', placeItems: 'anchor-center' }}>
                                <h4>welcome to {branch.name} Branch </h4>
                                <p> Would love to see you over at our branch here at  {branch.name}
                                    <br />
                                    Please rate. Our branch to your liking
                                </p>
                                {/* <ImgCmp imgSrc={branch.src} imgTitle={'Branch Img'} /> */}
                                {/* //אני לא מצליח לגרום לכוכבים להופיע כמו שצריך בלחיצה ללא ההזת העכבר! */}
                                <Rating
                                    onChange={(_, newValue) => onSetRating(newValue)}
                                    value={branch.rating}
                                    size='large' />
                            </div>
                        </InfoWindow>
                    )}
                    <MapController branch={branch} setPosition={setPosition} isOpen={isOpen} />
                </Map>
                <List  component="nav" sx={{ display: 'flex' , margin:'1em'}}>
                    {branches && branches.map(branch => {
                        return <ListItemButton
                            key={branch.name}
                            // selected={isSelected}
                            onClick={() => onSelectBranch(branch)}
                            disableRipple={false}
                        // divider={true}
                        >
                            <ListItemIcon>
                                <LocationOnIcon sx={{ color: branch.color }} />
                            </ListItemIcon>
                            <ListItemText primary={branch.name} secondary="Click to view on map" />
                        </ListItemButton>

                    })}
                </List>
            </Container>
        </APIProvider>
    );
}

export default MyMap;