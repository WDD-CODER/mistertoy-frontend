import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addToyLabels, removeLabel } from "../store/actions/toy.actions"

export function Labels({ toy }) {
    //יש לי בעיה מוזרה שעולה לפעמים שתוך כדי עבודה בפרטים של המוצר אני עושה שינויים ואז הוא פתאו לא יכול לקרוא את הלייבלים של המוצר ואני צריך לרענן את הדף.
    const [labels, setLabels] = useState([])

    const handleLabelChange = (event) => {
        const { options } = event.target;
        const values = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) values.push(options[i].value)
        }
        setLabels(prevLabels => [...prevLabels, ...values])
    }

    function onRemoveLabel(label) {
        removeLabel(toy, label)
            .then(() => showSuccessMsg('removed Toy labels'))
            .catch(err => {
                console.log('problem removing toy label', err)
                showErrorMsg('Label was not removed')
            })
    }

    function onAddLabel() {
        addToyLabels(toy, labels)
            .then(() => {
                setLabels([])
                showSuccessMsg('add Toy labels')
            })
            .catch(err => {
                console.log(`Couldn't add label`, err)
                showErrorMsg('toy label not add'), err

            })
    }

    return (
        <section className="labels-btn">
            <h4>labels</h4>
            <label className="actions" htmlFor="labels">
                Label:
                <select multiple={true} size="3" value={labels} name="labels" id="labels" onBlur={() => onAddLabel()} onChange={ev => handleLabelChange(ev)}>
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
            {toy.labels.length > 0 &&
                <div>
                    {toy.labels.map(label => <button key={label} onClick={() => onRemoveLabel(label)}>{label}</button>)}
                </div>}
        </section>
    )
}

