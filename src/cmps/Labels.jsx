// import { useEffect, useState } from "react"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
// import { updateToy } from "../store/actions/toy.actions"
// import { useEffectOnUpdate } from "../hooks/useEffectOnUpdateOnly"

// export function Labels({ toy }) {
//    const demoLabels = [
//   "on-wheels",
//   "box-game",
//   "art",
//   "baby",
//   "doll",
//   "puzzle",
//   "out-door",
//   "battery-powered"
// ]


//     const [labels, setLabels] = useState(toy.labels)

//     useEffectOnUpdate(onUpdateToy, labels)

//     function onRemoveLabel(label) {
//         setLabels(labels.filter(curLabel => curLabel !== label))
//     }

//     function onAddLabel({ target }) {
//         const labelsToAdd = [target.value]
//         if (labels.includes(target.value)) return showErrorMsg('toy label exist already')
//         setLabels(prevLabels => [...prevLabels, ...labelsToAdd])
//     }

//     function onUpdateToy() {
//         const updatedToy = { ...toy, labels: labels }
//         updateToy(updatedToy)
//             .then(() => showSuccessMsg('Updated Toy Labels'))
//             .catch(err => {
//                 console.log(`Couldn't add label`, err)
//                 showErrorMsg('toy label not add'), err
//             })
//     }

//     return (
//         <section className="labels-btn">
//             <h4>labels</h4>
//             <label className="actions" htmlFor="labels">
//                 Label:
//                 <select multiple={true} size="3" value={labels} name="labels" id="labels" onChange={onAddLabel}>
//                     <option disabled >Add Label</option>
//                     {demoLabels.map(label => {
//                         return <option key={label}>{label}</option>
//                     })}

//                 </select>
//             </label>
//             {labels.length > 0 &&
//                 <div>
//                     {labels.map(label => <button key={label} onClick={() => onRemoveLabel(label)}>{label}</button>)}
//                 </div>}
//         </section>
//     )
// }

