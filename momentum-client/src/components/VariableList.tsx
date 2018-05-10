/// <reference path="../interfaces.d.ts"/>

import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
// import ModelCard from '../../components/ModelCard';
import { Badge } from 'reactstrap';
import ModelExprResolver from '../ModelExprResolver';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Col from 'reactstrap/lib/Col';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';

let getSubmodels: any;

interface Variable {
    category: string;
    expression: string;
    id: number;
    name: string;
    param_min: number;
    param_max: number;
}

class VariableList extends React.Component<any, any> { // first props, second is state

    constructor(props: any) {
        super(props);
        console.log('VariableList');
        console.log('this.props.match', this.props.match);
        console.log('paramId', this.props.paramId);
        let retrieveId = this.props.paramId;

        this.state = {
            submodels: {},
            variableNames: []
        };

        // if (this.props.match === undefined) {
        //     retrieveId = 1;
        // } else {
        //     retrieveId = this.props.match.params.id;
        // }
        console.log('sending gql');
        getSubmodels = gql`
        query {
            model(id:${ retrieveId }){
                    submodels{
                        category
                        expression
                        id
                        name
                        param_min
                        param_max
                }
            }
        }
        `;
    }

    public render() {
        return (
            <div>
                <Query query={getSubmodels}>
                    {({ loading, error, data }) => {
                        if (loading) {
                            return (<div>Loading...</div>);
                        }
                        if (error) {
                            return (<div>Error :(</div>);
                        }
                        console.log(data.model.submodels);

                        let vars = data.model.submodels.map((e: any) => {
                            return {
                                'name': e.name,
                                'variable': '$' + e.id
                            };
                        });

                        if (this.state.submodels.length !== data.model.submodels.length) {
                            this.setState( {
                                submodels: data.model.submodels,
                                variableNames: vars
                            });
                        }
                        let resolver = new ModelExprResolver(data.model.submodels);
                        console.log('Valid: ', resolver.isConstraintValid());
                        console.log('Variables: ', resolver.getVariables());
                        console.log('Evaluated: ', resolver.getEvaluatedSubmodels());
                        return data.model.submodels.map((obj: Variable, i: number) => {
                                console.log(obj);
                                // TODO check if parsed as expression or constant
                                if (obj.category === 'expenses') {
                                    return <div key={i}>
                                        <div>
                                            <Badge color="danger" onClick={() => { this.props.editVariable(obj); }}>
                                                {obj.name}
                                                <Badge
                                                    color="primary"
                                                    onClick={() => { this.props.editVariable(obj); }}
                                                >
                                                    Reference {'$' + obj.id}
                                                </Badge>
                                            </Badge>

                                        </div>
                                    </div>;
                                } else {
                                    return <div key={i}>
                                        <div>
                                            <Badge
                                                color="success"
                                                onClick={() => { this.props.editVariable(obj); }}
                                            >
                                                {obj.name}
                                                <Badge
                                                    color="primary"
                                                    onClick={() => { this.props.editVariable(obj); }}
                                                >
                                                    Reference {'$' + obj.id}
                                                </Badge>
                                            </Badge>

                                        </div>
                                    </div>;
                                }
                            });
                    }}
                </Query>
                <Form>
                    <FormGroup>
                    <Label for="exampleSelect" sm={12}>Select Simulation Field</Label>
                    <Col sm={12}>
                    <Input type="select" name="select" id="exampleSelect" >
                        {console.log(this.state.variableNames)}
                        <option>Select...</option>
                        <option>Sales</option>
                        <option>Misc</option>
                        <option>Salary</option>
                    {
                        this.state.variableNames.forEach((e: any) => {
                        console.log(e);
                        return (<option value={e.variable}>e.name</option>);
                    })}
                    </Input>
                    </Col>
                    </FormGroup>
                    </Form>
            </div>
        );
    }
}

export default VariableList;