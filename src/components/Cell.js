import { useDispatch, useSelector } from "react-redux";

export default ({ letter = "", color, reveal }) => {
	return (
		<div className={`cell ${color} ${reveal ? "past" : ""}`}>
			<div className={`cell-content`}>
				<p>{letter}</p>
			</div>
		</div>
	);
};
