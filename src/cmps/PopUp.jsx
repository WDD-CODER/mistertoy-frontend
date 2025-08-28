import { useEffect, useState } from "react"

export function PopUp({ children, header, footer, isOpen = false, onClose = () => { } }) {

    const [isOpenPopUp, setIsOpenPopUp] = useState(isOpen)


    useEffect(() => {
        const EscapePress = window.addEventListener("keydown", onKey)

        return () => window.removeEventListener("keydown", onKey)

    }, [])

    function onKey(ev) {
        if (ev.key == 'Escape') onClosePopUp()
    }
    useEffect(() => {
        setIsOpenPopUp(isOpen)
    }, [isOpen])

    function onClosePopUp() {
        setIsOpenPopUp(false)
        onClose()
    }

    if (!isOpenPopUp) return null
    return (
        <div onClick={onClosePopUp} className="popup-backdrop">
            <div onClick={ev => ev.stopPropagation()} className="popup-container">
                {header && <header className="popup-header">{header}</header>}
                <main className="popup-main">
                    {children}
                </main>
                {footer && <footer className="popup-footer">{footer}</footer>}
            </div>
        </div>
    )
}