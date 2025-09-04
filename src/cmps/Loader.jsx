import { useSelector } from "react-redux"

export function Loader({ text = 'Loading, please wait...' }) {

    const isLoading = useSelector(state => state.toyModule.isLoading)

    return (
        <>
            {isLoading &&
                <section className="loader-container">
                    <div className="animation">
                        <span></span>
                        <span className="dot2"></span>
                        <span></span>
                    </div>
                    <p>{text}</p>
                </section>}
        </>
    )
}
