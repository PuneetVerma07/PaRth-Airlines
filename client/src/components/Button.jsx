import React from "react";

const Button = ({
	text,
	icon: Icon,
	onClick,
	type = "button",
	variant = "primary",
	className = "",
}) => {
	// Variants define karna taaki ek hi component multiple roles play kare
	const variants = {
		primary:
			"bg-black text-white hover:bg-sky-600 shadow-md shadow-sky-200",
		outline:
			"border-2 border-primary text-primary hover:bg-primary hover:text-white",
		danger: "bg-red-500 text-white hover:bg-red-600",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 w-full md:w-auto ${variants[variant]} ${className}`}
		>
			{Icon && <Icon size={20} />}
			<span>{text}</span>
		</button>
	);
};

export default Button;
