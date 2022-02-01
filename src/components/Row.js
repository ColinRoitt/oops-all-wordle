import Cell from "./Cell";

export default ({ word = "     " }) => {
	return (
		<div className="row">
			{word.split("").map((letter, index) => {
				return <Cell letter={letter} positionIndex={index} />;
			})}
		</div>
	);
};
