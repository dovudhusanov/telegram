import React, {useState} from 'react';
import {Channel, MessageText, useChatContext, MessageTeam} from "stream-chat-react";

import {ChannelInner, CreateChannel, EditChannel} from "./"

function ChannelContainer({isCreating, isEditing, setIsCreating, setIsEditing, createType}) {
    const {channel} = useChatContext()

    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel crateType={createType} setIsCreating={setIsCreating}/>
            </div>
        )
    }

    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">This is begging of your chat history.</p>
            <p className="channel-empty__second">Send messages, attachment, links, emojis, and more!</p>
        </div>
    )
    return (
        <div className="channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps}/>}
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    );
}

export default ChannelContainer;