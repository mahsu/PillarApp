import * as React from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
// import { Redirect } from 'react-router';
// import { Utils } from '../util';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const jsep = require('jsep');

interface AddVariableState {
    name?: string;
    expression?: string;
    category?: 'expenses' | 'revenue';
    param_min?: string;
    param_max?: string;
    key: number;
}

export default class AddVariable extends React.Component<any, AddVariableState> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            expression: '',
            category: undefined,
            param_min: '',
            param_max: '',
            key: 0
        };
        console.log(this.props.exists);
    }

    handleChange = (event: any) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        // verify validity of expression
        try {
            jsep(this.state.expression);

        } catch (e) {
            return false;
        }
        return this.state.name && this.state.name.length > 0
            && this.state.expression && this.state.expression.length > 0
            && this.state.category && this.state.category.length > 0;
            // && this.state.param_min && this.state.param_min.length > 0
            // && this.state.param_max && this.state.param_max!.length > 0;
    }

    onAdd = () => {
        console.log('Add Complete');
        this.setState({ key: Math.random() });
        // this.props.rerenderer();
        window.location.reload();
    }

    public render() {
        let mutation: any;
        mutation = gql`
            mutation
                createSubmodel(
                    $model_id: ID!, 
                    $category: String!, 
                    $name: String!, 
                    $expression: String!,
                    $param_min: Float!,
                    $param_max: Float!
                    ) 
                {
                createSubmodel(
                    model_id: $model_id,
                    category: $category,
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
            <Mutation mutation={mutation} onCompleted={this.onAdd} >
                {(createSubmodel, { data }) => (
                    <div>
                        <Form
                            onSubmit={e => {
                                e.preventDefault();

                                createSubmodel({
                                    variables: {
                                        model_id: parseInt(this.props.exists, 10),
                                        name: this.state.name,
                                        expression: this.state.expression,
                                        category: this.state.category,
                                        param_min: parseFloat(this.state.param_min!) || 0,
                                        param_max: parseFloat(this.state.param_max!) || 0,
                                    }
                                });
                            }}
                        >
                            <FormGroup>
                                <Input
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)}
                                    name="name"
                                    id="name"
                                    placeholder="Variable name"
                                />
                                <br/>
                                <Input
                                    value={this.state.expression}
                                    onChange={e => this.handleChange(e)}
                                    name="expression"
                                    id="expression"
                                    placeholder="Amount or Equation"
                                />
                                <br/>
                                <FormGroup>
                                    <Label className="indent">
                                        <Input
                                            type="radio"
                                            name="category"
                                            id="category"
                                            value="revenue"
                                            checked={this.state.category === 'revenue'}
                                            onChange={e => this.handleChange(e)}
                                        />{' '}
                                        Revenue
                                    </Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="indent">
                                        <Input
                                            type="radio"
                                            name="category"
                                            id="category"
                                            value="expenses"
                                            checked={this.state.category === 'expenses'}
                                            onChange={e => this.handleChange(e)}
                                        />{' '}
                                        Expense
                                    </Label>
                                </FormGroup>
                                <br />
                                <h6>
                                    Simulations
                                </h6>
                                <Input
                                    value={this.state.param_min}
                                    onChange={e => this.handleChange(e)}
                                    name="param_min"
                                    id="param_min"
                                    placeholder="Lower Limit"
                                />
                                <br />
                                <Input
                                    value={this.state.param_max}
                                    onChange={e => this.handleChange(e)}
                                    name="param_max"
                                    id="param_max"
                                    placeholder="Upper Limit"
                                />
                                <br />
                                <Button disabled={!this.validateForm()}>
                                    {!this.props.editing ? 'Add New Variable' : 'Update Variable'}
                                </Button>
                            </FormGroup>

                        </Form>
                    </div>
                )}
            </Mutation>
        );
    }
}
