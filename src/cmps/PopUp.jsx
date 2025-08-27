export function PopUp({ children, header, footer, isOpen(){ () => { } }) {

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