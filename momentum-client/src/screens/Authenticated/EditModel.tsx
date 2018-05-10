/// <reference path="../../interfaces.d.ts"/>

import * as React from 'react';
// import { gql } from 'apollo-boost';
// import { Query } from 'react-apollo';
import AuthenticatedComponent from '../../containers/AuthenticatedComponent';
import VariableList from 'src/components/VariableList';
// import ModelCard from '../../components/ModelCard';
import { Container, Row, Col, Button } from 'reactstrap';
import AddVariable from '../../components/AddVariable';
import UpdateVariable from '../../components/UpdateVariable';
import EditPageTable from '../../components/EditPageTable';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import '../../styles/EditModel.css';
const queryString = require('query-string');
import { Link } from 'react-router-dom';

interface FooComponentProps extends State {
    location?: any;
    children?: React.ReactNode;
    match: any;
}

let paramId: string;

// const updateVariable = (tmpId: any, curSubmodel: any ) => {
//     return <UpdateVariable exists={tmpId} curSubmodel={curSubmodel}/>;
// };
class EditModel extends React.Component<FooComponentProps, any> { // first props, second is state

    constructor(props: FooComponentProps) {
        super(props);
        // let isNewModel = this.props.match.params.id;
        paramId = this.props.match.params.id;
        console.log('params is', paramId); // if this is undefined, it's most likely a new model
        console.log('EditModel.tsx');
        this.state = {isEditing: false };
    }

    setFoo = () => {
        this.setState({foo: 'bar'});
    }

    editVariable = (obj: any) => {
        console.log('editVariable');
        if (!this.state.isEditing) {
            this.setState({isEditing: true});
        }
        this.setState({curSubmodel: obj});
        // had to use a random generator to force set a new key to cause it to rerender
        // stackoverflow.com/questions/30626030/can-you-force-a-react-component-to-rerender-without-calling-setstate
        this.setState({ key: Math.random() });
    }

    resetInputs = () => {
        console.log('reset inputs');
        this.setState({isEditing: false});
    }

    rerenderer = () => {
        this.setState({ key: Math.random() });
    }

    public render() {
        let parsed = queryString.parseUrl(window.location.href);
        const button = <Button onClick={() => { this.resetInputs(); }}>Add New Variable</Button>;
        return (
            <Container>
                <AuthenticatedComponent {...this.props}>
                    <br />
                    <h2>Edit: {parsed.query.modelName}</h2>
                    <Link to={'/models/' + this.props.match.params.id + '?modelName=' + parsed.query.modelName}>
                        Show
                    </Link>
                    <Container>
                        <Row className="show-grid">
                            <Col xs={6} md={4} className="modelTable">
                                <h5>Model Overview</h5>
                                <EditPageTable modelID={this.props.match.params.id}/>
                            </Col>
                            <Col md={4} key={this.state.key} className="submodelEdit">
                                <h5>
                                    Edit Variable
                                </h5>
                                {!this.state.isEditing ?
                                    <AddVariable exists={paramId} rerenderer={this.rerenderer}/> :
                                    <UpdateVariable
                                        exists={paramId}
                                        curSubmodel={this.state.curSubmodel}
                                        rerenderer={this.rerenderer}
                                    /> }
                            </Col>
                            <Col md={4} className="variableList">
                                <h5>
                                Variables List
                                </h5>
                                {this.state.isEditing ? button : <div />}
                                <VariableList
                                    data={[]}
                                    editVariable={this.editVariable}
                                    paramId={this.props.match.params.id}
                                />
                            </Col>
                        </Row>
                    </Container>
                </AuthenticatedComponent>
            </Container>
        );
    }
}

// export default EditModel;
const mapStateToProps = (state: State) => ({
    foo: state.foo
});

// interface DispatchFromProps {
//     setIsAuthenticated: (isLogin: boolean) => void;
// }

// const mapDispatchToProps = (dispatch: Dispatch ) => ({
//      setFoo: (foo: boolean) => dispatch(setFoo(foo))
// });

export default connect<any, any, {}>(
    mapStateToProps,
    null
)(EditModel);
