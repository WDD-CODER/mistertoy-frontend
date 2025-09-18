import { Button, Card, Container } from "@mui/material";
import { ReusableForm } from "./ReusableForm";
import { useSelector } from "react-redux";
import { useState } from "react";
import { onSaveToyMsg, updateToy } from "../store/actions/toy.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { utilService } from "../services/util.service";

export function AddMsg({ item, setItem }) {
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    const userMsg = {
        id: utilService.makeId(),
        by: {
            _id: loggedinUser?._id,
            fullname: loggedinUser.fullname
        }
    }

    async function onSaveMsgToItem(msgToSave) {
        onSaveToyMsg(item._id, msgToSave)
    }

    const fieldsConfig = [
        { name: 'txt', label: 'Type You massage ', type: 'string', required: true, min: 2, max: 50 },
    ]

    return (
        <ReusableForm
            item={userMsg}
            // setItem={setMsg}
            fieldsConfig={fieldsConfig}
            onSave={onSaveMsgToItem}
        />
    )
}