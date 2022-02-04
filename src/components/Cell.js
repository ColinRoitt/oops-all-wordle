import { useDispatch, useSelector } from "react-redux";

export default ({ letter = "", color }) => {
	return (
		<div className={`cell ${color}`}>
			<div className={`cell-content`}>
				<p>{letter}</p>
			</div>
		</div>
	);
};
