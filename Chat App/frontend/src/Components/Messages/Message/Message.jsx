import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
	let isSentByCurrentUser = false;

	const trimmedName = name.trim().toLowerCase();

	if (user === trimmedName) {
		isSentByCurrentUser = true;
	}

	return isSentByCurrentUser ? (
		<div className="message__messageContainer message__justifyEnd">
			<p className="message__sentText message__pr-10">{trimmedName}</p>
			<div className="message__messageBox message__backgroundBlue">
				<p className="message__messageText message__colorWhite">{ReactEmoji.emojify(text)}</p>
			</div>
		</div>
	) : (
		<div className="message__messageContainer message__justifyStart">
			<div className="message__messageBox message__backgroundLight">
				<p className="message__messageText message__colorDark">{ReactEmoji.emojify(text)}</p>
			</div>
			<p className="message__sentText message__pl-10 ">{user}</p>
		</div>
	);
};

export default Message;
