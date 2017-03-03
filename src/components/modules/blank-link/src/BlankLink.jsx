import React from 'react';

export const BlankLink = ({ children, hash, ...props }) => {
	const handleClick = (e) => {
		if (!hash){
			e.preventDefault();
			return;
		}
		
		if (e.button !== 0){
			e.preventDefault();
		}
		if (e.ctrlKey){
			e.preventDefault();
			window.open(hash);
		}
	};
	
	return (
		<a onClick={handleClick} href={hash || '#'} {...props}>
			{children}
		</a>
	);
};

BlankLink.propTypes = {
	children: React.PropTypes.element,
	hash: React.PropTypes.string
};