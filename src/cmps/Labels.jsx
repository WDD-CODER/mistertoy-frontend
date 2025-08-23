import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addToyLabels, removeLabel } from "../store/actions/toy.actions"

export function Labels({ toy }) {
    
    const curToy = useSelector(state => state.toyModule.toys.find(t => t._id === toy._id))

    function onRemoveLabel(label) {
        removeLabel(curToy, label)
            .then(() => showSuccessMsg('removed Toy labels'))
            .catch(() => showErrorMsg('problem removing toy label'))
    }

    function onAddLabel(ev) {
        addToyLabels(curToy, ev)
            .then(() => showSuccessMsg('add Toy labels'))
            .catch(() => showErrorMsg('toy label not add'))
    }


    return (
        <section className="labels-btn">
            <h4>labels</h4>
            <label className="actions" htmlFor="labels" onChange={ev => onAddLabel(ev)}>
                Label:
                <select name="labels" id="labels">
                    <option value="" disabled >Choose Label</option>
                    <option value="on-wheels">On Wheels</option>
                    <option value="box-game">Box Game</option>
                    <option value="art">Art</option>
                    <option value="baby">Baby</option>
                    <option value="doll">Doll</option>
                    <option value="puzzle">Puzzle</option>
                    <option value="out-door">Out Door</option>
                    <option value="battery-powered">Battery Powered</option>
                </select>
            </label>
            {curToy.labels.length > 0 &&
                <div>
                    {curToy.labels.map(label => <button key={label} onClick={() => onRemoveLabel(label)}>{label}</button>)}
                </div>}
        </section>
    )
}