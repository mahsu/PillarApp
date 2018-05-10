/// <reference path="../../interfaces.d.ts"/>

import * as React from 'react';
// import { gql } from 'apollo-boost';
// import { Query } from 'react-apollo';
import AuthenticatedComponent from '../../containers/AuthenticatedComponent';
import { Table, Container, Row, Col } from 'reactstrap';
// import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import ModelExprResolver from '../../ModelExprResolver';
import Query from 'react-apollo/Query';
// import {ReactHighcharts} from 'react-highcharts'; // Expects that Highcharts was loaded in the code.
const ReactHighcharts = require('react-highcharts');
const queryString = require('query-string');

// TODO fix this once the api exists
// build a query build

// const MODEL_1 = {
//     model: 'bar'
// };

const red = '#7F3400';
const blue = '#240DBE';
const green = '#66BE60';

var configRevenue = {
    title: {
        text: 'Fruit Consumption'
    },
    yAxis: {
        title: {
            text: 'Revenue Changes'
        },
    },
    xAxis: {
        label: 'Simulated Variable Value',
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
        series: {
            color: blue
        }
    },
    series: [{
        name: 'Revenue Trend',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    }]
};

var configExpenses = {
    title: {
        text: 'Expenses'
    },
    yAxis: {
        title: {
            text: 'Expenses Changes'
        },
    },
    xAxis: {
        title: {
            text: 'Simulated Variable Value'
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
        series: {
            color: red
        }
    },
    series: [{
        name: 'Expenses Trend',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    }]
};

var configProfit = {
    title: {
        text: 'Revenue'
    },
    yAxis: {
        title: {
            text: 'Profit Changes'
        },
    },
    xAxis: {
        title: {
            text: 'Simulated Variable Value'
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
        series: {
            color: green
        }
    },
    series: [{
        name: 'Profit Trend',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
    }]
};

class NewModel extends React.Component<any, any> {
    private getSubmodels: any;

    constructor(props: any) {
        super(props);
        console.log('params is', this.props.match.params.id);
        console.log('ShowModel.tsx');

        this.getSubmodels = gql`
        query {
            model(id:${ this.props.match.params.id }){
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

    render() {
        let parsed = queryString.parseUrl(window.location.href);
        return (
            <AuthenticatedComponent {...this.props}>
                <Container>
                    <br />
                    <div>
                    <h2>{parsed.query.modelName}</h2>
                    <Link to={'/models/' + this.props.match.params.id + '/edit?modelName=' + parsed.query.modelName}>
                        Edit
                    </Link>
                    </div>
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

                        // test a sceario
                        try {
                            let experimentVar = '$' + data.model.submodels.filter((x: any) => x.name === 'Sales')[0].id;
                            console.log('experiment var', experimentVar);
                            let results = resolver.testScenario(experimentVar, 12);
                            console.log('experiment results', results);
                            let horiz = results.map((e: any) => e.x.toFixed(2));
                            let rev = results.map((e: any) => e.revenue);
                            let exp = results.map((e: any) => e.expenses);
                            let prof = results.map((e: any) => e.profit);
                            console.log(prof);
                            configRevenue = {
                                title: {
                                    text: 'Simulated Revenue'
                                },
                                yAxis: {
                                    title: {
                                        text: 'Revenue Changes'
                                    },
                                },
                                xAxis: {
                                    label: 'Simulated Variable Value',
                                    categories: horiz
                                },
                                plotOptions: {
                                    series: {
                                        color: blue
                                    }
                                },
                                series: [{
                                    name: 'Revenue Trend',
                                    data: rev
                                }]
                            };
                            configExpenses = {
                                title: {
                                    text: 'Simulated Expenses'
                                },
                                yAxis: {
                                    title: {
                                        text: 'Expenses Changes'
                                    },
                                },
                                xAxis: {
                                    title: {
                                        text: 'Simulated Variable Value'
                                    },
                                    categories: horiz
                                },
                                plotOptions: {
                                    series: {
                                        color: red
                                    }
                                },
                                series: [{
                                    name: 'Expenses Trend',
                                    data: exp
                                }]
                            };
                            configProfit = {
                                title: {
                                    text: 'Simulated Profit'
                                },
                                yAxis: {
                                    title: {
                                        text: 'Profit Changes'
                                    },
                                },
                                xAxis: {
                                    title: {
                                        text: 'Simulated Variable Value'
                                    },
                                    categories: horiz
                                },
                                plotOptions: {
                                    series: {
                                        color: green
                                    }
                                },
                                series: [{
                                    name: 'Profit Trend',
                                    data: prof
                                }]
                            };
                        } catch (e) {
                            console.log('No variable named "Sales"');
                        }
                        return (
                            <div>
                                <Row className="show-grid">
                                    <Col xs={6} md={6}>
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
                                    </Col>
                                </Row>
                                <Row>
                                        <div className="graph"><ReactHighcharts config={configRevenue}/></div>
                                        <div className="graph"><ReactHighcharts config={configExpenses}/></div>
                                        <div className="graph"><ReactHighcharts config={configProfit}/></div>
                                </Row>
                            </div>
                        );
                    }}
                </Query>
                </Container>
            </AuthenticatedComponent>
        );
    }
}

export default NewModel;