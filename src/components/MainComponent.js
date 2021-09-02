import React, { Component } from 'react';
import Contact from './Contact';

import Menu from './Menu';
import DishDetail from './DishDetail';

import Header from './Header';
import About from './About';

import Footer from './Footer';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';
import CommentForm from './CommentForm';
import {  postComment, fetchDishes,fetchComments, fetchPromos,fetchLeaders,postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps=state=>{
    return{
        dishes:state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders

    }
}

const mapDispatchToProps = dispatch => ({
  
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    
        fetchDishes: () => { dispatch(fetchDishes())},
        resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
        fetchComments: () => dispatch(fetchComments()),
        fetchPromos: () => dispatch(fetchPromos()),
        fetchLeaders: () => dispatch(fetchLeaders()),
        postFeedback: (firstname,lastname,telnum,email,agree,contactType,message)=> dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message))
  
  });
  

class MainComponent extends Component {

    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }
    
    render() {
        const Homepage=()=>{
            return (
                <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
               leaderErrMess={this.props.leaders.errMess}
          />
            )
            

        }
        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}
               
              />
            );
          };
        return (
            <div>
                <Header />
                <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                    <Route path="/home" component={Homepage}/>
                    <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/> }/>
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}  postFeedback={this.props.postFeedback} />} />
                    <Route exact path="/aboutus" component={()=> <About leaders={this.props.leaders.leaders}/> }/>
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route path="/comment"><CommentForm/></Route>
                    
                
               

                </Switch>
                </CSSTransition>
                </TransitionGroup>

                <Footer />
                
               

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
