
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Box, Container, List, ListItemButton, ListItemIcon, ListItemText, Rating, Button, Typography } from '@mui/material'
import { InfoWindow, AdvancedMarker, APIProvider, Map, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'
import MapController from './MapController'
import { toyService } from "../services/toy"
import { useSelector } from 'react-redux'
import { setUpdatedBranches } from '../store/actions/toy.actions'

function MyMap() {
    const API_KEY = 'AIzaSyD2Kd_xOK37FqjaQVKLW3uIiIcw-Xi8tPg'
    const [position, setPosition] = useState({ lat: 32.0853, lng: 34.7818 })
    const branches = useSelector(state => state.toyModule.branches)
    const [branch, setBranch] = useState(branches[0])
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



    return (

        <APIProvider apiKey={API_KEY}>
            <Container sx={{width: '70vw', textAlign: 'center', placeItems: 'center', }}>
                <Typography variant='h5' > Shope branch Map </Typography>
                <Box sx={{  width: '70vw',maxHeight:'60vh', aspectRatio: '1 / 1', margin: 1 }}>
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
                                    {/* //FIXME  אני לא מצליח לגרום לכוכבים להופיע כמו שצריך בלחיצה ללא ההזת העכבר! */}
                                    <Rating
                                        onChange={(_, newValue) => onSetRating(newValue)}
                                        value={branch.rating}
                                        size='large' />
                                </div>
                            </InfoWindow>
                        )}
                        <MapController branch={branch} setPosition={setPosition} isOpen={isOpen} />
                    </Map>
                </Box>
                <List component="nav" sx={{ display: 'flex',flexWrap:'wrap' ,  gap: 1, marginBottom: '.25em', maxWidth: '90vw', placeContent:'center' }}>
                    {branches && branches.map(branch => {
                        return <Button
                            color="secondary"
                            key={branch.name}
                            onClick={() => onSelectBranch(branch)}
                            sx={{ placeItems: 'center', border: 1, borderRadius: 2, }}
                        >
                            {branch.name}
                        </Button>
                    })}
                </List>
            </Container>
        </APIProvider>
    );
}

export default MyMap;