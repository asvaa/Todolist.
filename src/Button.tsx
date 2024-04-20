type ButtonPropsType = {
	title: string;
	onClickHandler?: () => void;
	isDisabled?: boolean;
	classes?: string;
};

export const Button = ({
	title,
	isDisabled,
	classes,
	onClickHandler,
}: ButtonPropsType) => {
	return (
		<button className={classes} disabled={isDisabled} onClick={onClickHandler}>
			{title}
		</button>
	);
};
