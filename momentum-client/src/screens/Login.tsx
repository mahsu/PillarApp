import * as React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Container from 'reactstrap/lib/Container';
import Col from 'reactstrap/lib/Col';
import { Redirect } from 'react-router';
import { Utils } from '../util';
import { SESSION_JWT_EXP, SESSION_JWT_TOKEN } from '../constants';

interface LoginState {
    email: string;
    password: string;
    redirectToReferrer: boolean;
}

interface LoginProps {
    location: any; // injected property from react-router
}

interface JwtResponse {
    expire: string;
    token: string;
}

export default class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: any) {
        super(props);
        this.state = {email: '', password: '', redirectToReferrer: false};
    }

    handleChange = (event: any) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let response: Response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        });

        if (response.status === 401) {
            console.log('Invalid Username/Password');
        } else if (response.status === 200 ) {
            let jwtbody: JwtResponse = await response.json();
            console.log(jwtbody);
            localStorage.setItem(SESSION_JWT_TOKEN, jwtbody.token);
            localStorage.setItem(SESSION_JWT_EXP, jwtbody.expire);
            await Utils.setStateAsync(this, {
                redirectToReferrer: true,
                password: ''
            });
            return;
        }

        await Utils.setStateAsync(this, {
            password: ''
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/models' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                    name="email"
                                    id="email"
                                    placeholder="name@mycompany.com"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange(e)}
                                    name="password"
                                    id="password"
                                    placeholder=""
                                />
                            </FormGroup>
                            <Button disabled={!this.validateForm()}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}