import React, { Component } from 'react';
import { ButtonDefault, ButtonPrimary } from '../../button';
import { Panel, PanelHeader, PanelBody, PanelFooter, PanelTitle } from '../../panel';
import cx from 'classnames';

import './style/confirm.scss';

class Confirm extends Component {
	
	constructor(props){
		super(props);
		
		this.handleConfirm = this.handleConfirm.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	
	handleConfirm(){
		this.props.onConfirm(true);
	}
	
	handleCancel(){
		this.props.onConfirm(false);
	}
	
	render(){
		const { headerText, text, className } = this.props;
		const classes = cx('confirm', className);
		return (
			<div className={classes}>
				<div className='confirm-dialog'>
					<button type='button' className='close-button' onClick={this.props.onClose}>&times;</button>
					<Panel>
						<PanelHeader>
							<PanelTitle>
								{headerText}
							</PanelTitle>
						</PanelHeader>
						<PanelBody>{text}</PanelBody>
						<PanelFooter>
							<ButtonPrimary
								text='Да'
								className='confirm-dialog__confirm'
								onClick={this.handleConfirm}
							/>
							<ButtonDefault
								text='Отмена'
								className='confirm-dialog__cancel'
								onClick={this.handleCancel}
							/>
						</PanelFooter>
					</Panel>
				</div>
			</div>
		);
	}
}

Confirm.defaultProps = {
	headerText: 'Подтвердите действие'
};

Confirm.propTypes = {
	headerText: React.PropTypes.string,
	text: React.PropTypes.string.isRequired,
	className: React.PropTypes.string,
	onConfirm: React.PropTypes.func.isRequired,
	onClose: React.PropTypes.func.isRequired
};

export default Confirm;