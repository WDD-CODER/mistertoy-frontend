import { Box } from '@mui/material'
import { useState } from 'react'

export function ImgCmp({ imgSrc ,imgTitle }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoaded() {
        setImgLoading(false)
    }

    return (
        <Box  className="img-cmp">
            {isImgLoading && <div className="skeleton-loader"></div>}
            <img
                src={imgSrc}
                alt={imgTitle}
                title={imgTitle}
                onLoad={handleImageLoaded}
                className={isImgLoading ? '' : 'loaded'}
            />
        </Box>
    )
}
