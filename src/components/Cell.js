import { useDispatch, useSelector } from "react-redux";

export default ({ letter = "", color, reveal, positionIndex }) => {
	const transitionDelay = {
		transitionDelay: `${positionIndex * 0.4}s`,
	};
	return (
		<div className="cell-scene">
			<div
				className={`cell-cont ${reveal ? "is-flipped" : ""}`}
				style={transitionDelay}
			>
				<div className={`cell cell--front`}>
					<div className={`cell-content`}>
						<p>{letter}</p>
					</div>
				</div>
				<div className={`cell cell--back past ${color}`}>
					<div className={`cell-content`}>
						<p>{letter}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
