import { useState } from 'react'

export function ImgCmp({ imgSrc ,imgTitle }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoaded() {
        setImgLoading(false)
    }

    return (
        <div className="img-container">
            {isImgLoading && <div className="skeleton-loader"></div>}
            <img
                src={imgSrc}
                alt={imgTitle}
                title={imgTitle}
                onLoad={handleImageLoaded}
                className={isImgLoading ? '' : 'loaded'}
            />
        </div>
    )
}
