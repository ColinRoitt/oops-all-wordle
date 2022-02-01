export default ({ letter, type }) => {
	return (
		<div className="keyboard-key" onClick={() => type(letter)}>
			{letter}
		</div>
	);
};
