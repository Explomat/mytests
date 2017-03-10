import React, { Component, PropTypes } from 'react';
import { AlertDanger, AlertInfo } from '../components/modules/alert';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import cx from 'classnames';

class AppContainer extends Component {
	
	constructor(props){
		super(props);
		this.handleBack = this.handleBack.bind(this);
	}
	
	handleBack(e){
		e.preventDefault();
		if (!this._isRootHash()) {
			this.props.router.goBack();
		}
	}
	
	_isRootHash(){
		return window.location.hash === '#/';
	}
	
	render(){
		const { title, isFetching, access, errorMessage, infoMessage, children } = this.props;
		const isRootHash = this._isRootHash();
		const iconClasses = cx({
			'app-container__back': true,
			'icon-left-open-big': !isRootHash,
			'app-container__root-icon': isRootHash
		});
		return (
			<div className='app-container'>
				<div className='app-container__header'>
					<a onClick={this.handleBack} href='#' className={iconClasses} />
					<h3 className='app-container__title'>{title}</h3>
					{errorMessage &&
						<AlertDanger
							text={errorMessage}
							onClose={this.props.error.bind(this, null)}
							className='app-container__error'
						/>
					}
					{infoMessage &&
						<AlertInfo
							text={infoMessage}
							onClose={this.props.info.bind(this, null)}
							className='app-container__error'
						/>
					}
				</div>
				<div className='app-container__body'>
					{isFetching ? <h2>Запрос доступа...</h2> : access ? children : <h1>Доступ запрещен</h1>}
				</div>
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: PropTypes.node,
	isFetching: PropTypes.bool,
	errorMessage: PropTypes.string,
	infoMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { ...state.app };
}

export default connect(mapStateToProps, actionCreators)(AppContainer);