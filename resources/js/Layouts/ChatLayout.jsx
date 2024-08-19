import { usePage } from "@inertiajs/react";

import { useEffect, useState } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState({});
    const isUserOnline = (userId)=>{};
    console.log("conversations", conversations);
    console.log("selectedConversation", selectedConversation);
    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUserObject = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUserObject };
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            })
            .error((error) => {
                console.error("error", error);
            });
        return Echo.leave("online");
    }, []);
    return (
        <>
            ChatLayout
            <div>{children}</div>
        </>
    );
};
export default ChatLayout;
