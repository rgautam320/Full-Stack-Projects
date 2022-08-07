import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import InfoBar from "../Components/Infobar/Infobar";
import Messages from "../Components/Messages/Messages";
import Users from "../Components/Users/Users";

let socket;

const Chat = ({ location }) => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState();
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const ENDPOINT = `${process.env.REACT_APP_API}`;
	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		setName(name);
		setRoom(room);
		if (!name && !room) {
			history.push("/");
		} else {
			socket = io(ENDPOINT);

			socket.emit("join", { name, room }, () => {});
			return () => {
				socket.disconnect();
				socket.off();
			};
		}
	}, [location.search, ENDPOINT, history]);

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		if (name && room) {
			socket.on("message", (message) => {
				setMessages([...messages, message]);
			});
		}
		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	}, [messages, location.search]);

	const sendMessage = (event) => {
		event.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
		}
	};

	return (
		<>
			<Helmet>
				<title>Awesome React App - Chat </title>
				<meta name="description" content="Awesome Chat App - Chat Page" />
			</Helmet>
			<center>
				<div className="container px-2">
					<div className="row">
						<div className="col-md-7 col-12">
							<div className="chat__chat">
								<h1 className="chat__title">Chat</h1>
								<div className="card chat__chatbox">
									<InfoBar room={room} />
									<Messages messages={messages} name={name} />
									<div className="chat__sendbox">
										<input className="chat__input" type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)} />
										<button className="chat__sendButton" onClick={(e) => sendMessage(e)}>
											Send
										</button>
									</div>
								</div>
							</div>
						</div>
						<Users users={users} room={room} />
					</div>
				</div>
			</center>
		</>
	);
};

export default Chat;
