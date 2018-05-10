
import * as React from 'react';
import { Card, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle } from 'reactstrap';

interface ModelCardProps extends React.HTMLAttributes<HTMLElement> {
    modeldata: any;
}

class ModelCard extends React.Component<ModelCardProps, {}> {

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title
                            and make up the bulk of the card's content.</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ModelCard;