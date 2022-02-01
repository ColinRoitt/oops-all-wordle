export default ({ letter = " ", positionIndex = -1 }) => {
	return (
		<div className="cell">
			<div className="cell-content">
				<p>{letter}</p>
			</div>
		</div>
	);
};
