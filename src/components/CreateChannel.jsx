import React, {useState} from 'react';
import {useChatContext} from "stream-chat-react";

import {UserList} from "./";

import {CloseCreateChannel} from "../assets";

const ChannelNameInput = ({channelName, setChannelName}) => {
    const handleChange = (e) => {
        e.preventDefault()

        setChannelName(e.target.value)
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input
                // type="text"
                value={channelName}
                onChange={handleChange}
                placeholder="channel-name"
            />
            <p>Add Members</p>
        </div>
    )
}

function CreateChannel({crateType, setIsCreating}) {
    const {client, setActiveChannel} = useChatContext()
    const [selectedUsers, setUsersSelected] = useState([client.userID || ""])
    const [channelName, setChannelName] = useState("")

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(crateType, channelName, {
                name: channelName, members: selectedUsers
            })

            await newChannel.watch();

            setChannelName("");
            setIsCreating(false);
            setUsersSelected([client.userID]);
            setActiveChannel(newChannel)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{crateType === "team" ? "Create a new Channel" : "Send A Direct Message"}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {crateType === "team" && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setUsersSelected={setUsersSelected}/>
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{crateType === "team" ? "Create Channel" : "Create Group Message"}</p>
            </div>
        </div>
    );
}

export default CreateChannel;