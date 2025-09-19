import { ReusableForm } from "./ReusableForm";

export function AddMsg({ msg, onSaveMsg }) {

    const fieldsConfig = [
        { name: 'txt', label: 'Type You massage ', type: 'string', min: 2, max: 50 },
    ]

    return (
        <ReusableForm
            item={msg}
            onSaveItem={onSaveMsg}
            fieldsConfig={fieldsConfig}
        />
    )
}