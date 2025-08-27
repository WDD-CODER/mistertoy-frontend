export function PopUp({ children,header,footer }) {

    return (
        <div className="pop-up">
            <header>
                {header}
            </header>
            <main>
                {children}
            </main>
            <footer>
                {footer}
            </footer>
        </div>
    )
}