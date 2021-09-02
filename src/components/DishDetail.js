import React, { Component } from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Buttonx,Row, Col,Label,Button,ModalHeader,ModalBody,Modal  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { postComment } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../components/shared/baseurl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


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
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.name,values.comment)
        
        
        
     
       

    }


    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm  onSubmit={(values) => this.handleSubmit(values)}>
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
                                    <Button  color="primary">
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

class DishDetail extends Component {
    constructor(props) {
        super(props);

    }
    
    renderDish(dish) {
        if (dish != null) {
            return (
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody >
                        <CardTitle><h5>{dish.name}</h5></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
    renderComment(comments) {
        let commentslist = comments.map((comment) => {
            return (
                <div>
                    <Stagger in>
                    <Fade in>
                    <h5>{comment.comment}</h5>
                    <h5>--{comment.author},
                        {new Intl.DateTimeFormat('en-US',
                            { year: 'numeric', month: 'short', day: '2-digit' }).
                            format(new Date(Date.parse(comment.date)))}</h5>
                             </Fade>
                            </Stagger>
                               
                            
                           
                </div>
              

            )

        })
   
        return commentslist


    }
    render() {
        const dish = this.props.dish;
        const comments = this.props.comments;
        var postComment=this.props.postComment;
      
        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
      
        else if (dish != null) {
            return (

                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>  
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComment(comments)}
                            
                           
                            <CommentForm postComment={postComment} dishId={dish.id} />
                          
                            
                            
                     

                           
                        </div>

                        
                        
                    </div>
                    

                </div>

            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default DishDetail