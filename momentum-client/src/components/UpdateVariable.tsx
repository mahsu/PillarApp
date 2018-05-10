import * as React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
// import { Redirect } from 'react-router';
// import { Utils } from '../util';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

export default class AddVariable extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            submodelid: this.props.curSubmodel.id,
            name: this.props.curSubmodel.name,
            expression: this.props.curSubmodel.expression,
            param_min: this.props.curSubmodel.param_min,
            param_max: this.props.curSubmodel.param_max
        };
    }

    handleChange = (event: any) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        return true;
        // return this.state.email.length > 0 && this.state.password.length > 0;
    }

    onUpdate = () => {
        window.location.reload();
    }

    public render() {
        let inputName: any;
        let inputExpr: any;
        let inputParamMin: any;
        let inputParamMax: any;
        let mutation: any;
        mutation = gql`
            mutation
                updateSubmodel(
                    $id: ID!, 
                    $name: String!, 
                    $expression: String!, 
                    $param_min: Float!, 
                    $param_max: Float!
                    ) 
                {
                updateSubmodel(
                    id: $id,
                    name: $name,
                    expression: $expression,
                    param_min: $param_min,
                    param_max: $param_max
                    )
                {
                    name
                }
            }`;
        return (
            <Mutation mutation={mutation} onCompleted={this.onUpdate} >
                {(updateSubmodel, { data }) => (
                    <div>
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                updateSubmodel({
                                    variables: {
                                        id: this.state.submodelid,
                                        name: inputName.value,
                                        expression: inputExpr.value,
                                        param_min: parseFloat(inputParamMin.value),
                                        param_max: parseFloat(inputParamMax.value),
                                    }
                                });
                                inputName.value = '';
                                inputExpr.value = '';
                                inputParamMin.value = '';
                                inputParamMax.value = '';
                            }}
                        >
                            <FormGroup>
                                <Input
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    name="name"
                                    id="name"
                                    placeholder="Variable name"
                                    innerRef={node => {inputName = node; }}
                                />
                                <br/>
                                <Input
                                    value={this.state.expression}
                                    onChange={e => this.handleChange(e)}
                                    name="expression"
                                    id="expression"
                                    placeholder="Amount or Equation"
                                    innerRef={node => {inputExpr = node; }}
                                />
                                <br/>
                                <Input
                                    value={this.state.param_min}
                                    onChange={e => this.handleChange(e)}
                                    name="param_min"
                                    id="param_min"
                                    placeholder="Lower Limit"
                                    innerRef={node => {inputParamMin = node; }}
                                />
                                <br />
                                <Input
                                    value={this.state.param_max}
                                    onChange={e => this.handleChange(e)}
                                    name="param_max"
                                    id="param_max"
                                    placeholder="Upper Limit"
                                    innerRef={node => {inputParamMax = node; }}
                                />
                            </FormGroup>
                            <Button disabled={!this.validateForm()}>Update Variable</Button>
                        </Form>
                    </div>
                )}
            </Mutation>
        );
    }
}
