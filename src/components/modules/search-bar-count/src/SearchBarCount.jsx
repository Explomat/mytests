import React from 'react';
import SearchBar from '../../search-bar';
import './style/search-bar-count.scss';

const SearchBarCount = ({ firstValue, secondValue, ...props }) => {
	return (
		<SearchBar {...props}>
			{
				(firstValue && secondValue) ?
					<span className='search-box__count'>{firstValue} / {secondValue}</span>
				: (firstValue && !secondValue) ?
					<span className='search-box__count'>{firstValue}</span>
				: null
			}
		</SearchBar>
	);
};

SearchBarCount.propTypes = {
	firstValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	secondValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])
};

export default SearchBarCount;