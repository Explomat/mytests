import Section from '../components/test/Section';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	const { openedTestSections } = state.app;
	return { openedTestSections };
}

export default connect(mapStateToProps, actionCreators)(Section);