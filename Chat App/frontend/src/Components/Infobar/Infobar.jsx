import React from "react";

import onlineIcon from "../../Assets/onlineIcon.png";
import closeIcon from "../../Assets/closeIcon.png";

const InfoBar = ({ room }) => (
	<div className="infobar__infoBar">
		<div className="infobar__leftInnerContainer">
			<img className="infobar__onlineIcon" src={onlineIcon} alt="online icon" />
			<h3>{room}</h3>
		</div>
		<div className="infobar__rightInnerContainer">
			<a href="/">
				<img src={closeIcon} alt="close icon" />
			</a>
		</div>
	</div>
);

export default InfoBar;
