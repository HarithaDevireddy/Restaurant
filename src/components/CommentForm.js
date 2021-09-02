
import React, { Component } from 'react';
import { Button, ModalBody, Modal, Form, FormGroup, Label, Input, ModalHeader, Row, Col } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';

const required = (val) => val && val.length
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModelOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        })
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));

    }


    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={10}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option >3</option>
                                        <option >4</option>
                                        <option >5</option>

                                    </Control.select>
                               </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={10}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        className="form-control" validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} />

                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={10}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="commet" name="comment"
                                        className="form-control"

                                        validators={{
                                            required
                                        }}

                                    />

                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required',

                                        }}
                                    />

                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={2}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>


                            </Row>

                        </LocalForm>

                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default CommentForm;

