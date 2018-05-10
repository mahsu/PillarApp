/// <reference path="../../interfaces.d.ts"/>

import * as React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import AuthenticatedComponent from '../../containers/AuthenticatedComponent';
// import {withRouter} from 'react-router-dom';
// this also works with react-router-native
// import ModelCard from '../../components/ModelCard';
import { Link } from 'react-router-dom';
import { Table, Container, Form, Button, Input } from 'reactstrap';
import { Mutation } from 'react-apollo';
// import { object } from 'prop-types';

// TODO fix this once the api exists

interface Model {
    id: number;
    name: string;
    description: string;
}

let getModels: any;

class MyModels extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        console.log('MyModel.tsx');

        getModels = gql`
            query {
                user{
                      models{
                              id
                              name
                              description
                      }
                }
            }
        `;

        this.state = {name: '', description: '', user: '1'};
    }
    onAdd = (data: any ) => {
        console.log('returned data: ', data);
        let modelId = data.createModel.id;
        this.props.history.push('/models/' + modelId + '/edit?modelName=' + data.createModel.name);
    }

    handleChange = (event: any) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        return true;
    }

    render() {
        // createModel(name: String, description: String, user: ID): Model
        let inputName: any;
        let inputDesc: any;
        let inputUser: any;
        let mutation: any;
        mutation = gql`
            mutation
                createModel(
                    $name: String!,
                    $description: String!,  
                    ) 
                {
                createModel(
                    name: $name,
                    description: $description,
                    )
                {
                    id
                    name
                }
            }`;
        return (
            <Container>
                <br />
                <AuthenticatedComponent {...this.props}>
                    <h2>Add A Model</h2>
                    <Mutation mutation={mutation} onCompleted={this.onAdd}>
                        {(createModel, { data }) => (
                            <div>
                                {console.log(data)}
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        createModel({
                                            variables: {
                                                user: 1,
                                                name: inputName.value,
                                                description: inputDesc.value,
                                            }
                                        });
                                        inputName.value = '';
                                        inputDesc.value = '';
                                        inputUser.value = '';
                                    }}
                                >
                                        <Input
                                            value={this.state.name}
                                            onChange={e => this.handleChange(e)}
                                            name="name"
                                            id="name"
                                            placeholder="Model name"
                                            innerRef={node => {inputName = node; }}
                                        />
                                        <br/>
                                        <Input
                                            value={this.state.description}
                                            onChange={e => this.handleChange(e)}
                                            name="description"
                                            id="description"
                                            placeholder="Model description"
                                            innerRef={node => {inputDesc = node; }}
                                        />
                                        <br/>
                                        <Input
                                            value={1}
                                            onChange={e => this.handleChange(e)}
                                            name="user"
                                            id="user"
                                            type={'hidden'}
                                            placeholder="user"
                                            innerRef={node => {inputUser = node; }}
                                        />
                                        <Button disabled={!this.validateForm()}>
                                            Create New Model
                                        </Button>
                                </Form>
                            </div>
                            )}
                    </Mutation>
                    <br />
                    <h2>My Models</h2>
                    <Query query={getModels}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return (<div>Loading...</div>);
                            }
                            if (error) {
                                return (<div>Error :(</div>);
                            }
                            console.log(data.user.models);

                            return <Table hover={true}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    data.user.models.map((obj: Model, i: number) => {
                                        return <tr key={i}>
                                            <td>{obj.id}</td>
                                            <td>
                                                <Link to={'/models/' + obj.id + '?modelName=' + obj.name}>
                                                    {obj.name}
                                                    </Link>
                                            </td>
                                            <td>{obj.description}</td>
                                            </tr>
                                            ;
                                    })
                                }
                                </tbody>
                            </Table>;
                        }}
                    </Query>
                </AuthenticatedComponent>
            </Container>
        );
    }
}

export default MyModels;
