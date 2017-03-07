import Section from '../components/test/Section';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return { ...state };
}

export default connect(mapStateToProps, actionCreators)(Section);