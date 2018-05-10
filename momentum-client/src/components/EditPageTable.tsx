/// <reference path="../interfaces.d.ts"/>

import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
// import ModelCard from '../../components/ModelCard';
import { Table } from 'reactstrap';
import ModelExprResolver from '../ModelExprResolver';

interface EditPageTableProps {
    modelID: number;
}

class EditPageTable extends React.Component<EditPageTableProps, any> { // first props, second is state
    private getSubmodels: any;

    constructor(props: EditPageTableProps) {
        super(props);
        console.log(props.modelID);
        this.getSubmodels = gql`
   query {
        model(id:${ props.modelID }){
                submodels{
                    category
                    expression
                    id
                    name
                    category
                    param_min
                    param_max
            }
        }
    }
`;
    }

    public render() {
        return (
            <Query query={this.getSubmodels}>
            {({ loading, error, data }) => {
                if (loading) {
                    return (<div>Loading...</div>);
                }
                if (error) {
                    return (<div>Error :(</div>);
                }
                console.log(data.model.submodels);
                let resolver = new ModelExprResolver(data.model.submodels);
                console.log('Valid: ', resolver.isConstraintValid());
                console.log('Variables: ', resolver.getVariables());
                console.log('Evaluated: ', resolver.getEvaluatedSubmodels());
                let allEval = {...resolver.getEvaluatedSubmodels()}; // exclude base variables
                console.log(allEval);
                let totalRevenue = 0;
                let totalExpense = 0;
                data.model.submodels.forEach((submodel: any) => {
                    let key = '$' + submodel.id;
                    if (key in allEval) {
                        switch (submodel.category) {
                            case 'revenue':
                                totalRevenue += allEval[key];
                                break;
                            case 'expenses':
                                totalExpense += allEval[key];
                                break;
                            default:
                                console.log('Unknown category');
                                break;
                        }
                    }
                });
                return (
            <Table bordered={true}>
                <tbody>
                <tr>
                    <th scope="row">Revenue</th>
                    <td />
                </tr>
                <tr>
                    <th scope="row">Total Revenue</th>
                    <td>${totalRevenue.toFixed(2)}</td>
                </tr>
                <tr>
                    <th />
                    <td />
                </tr>
                <tr>
                    <th scope="row">Expense</th>
                    <td />
                </tr>
                <tr>
                    <th scope="row">Total Expense</th>
                    <td>${totalExpense.toFixed(2)}</td>
                </tr>
                <tr>
                    <th />
                    <td />
                </tr>
                <tr>
                    <th scope="row">Profit</th>
                    <td>${(totalRevenue - totalExpense).toFixed(2)}</td>
                </tr>
                </tbody>
            </Table>
        );
            }}
        </Query>
        );
    }
}

export default EditPageTable;