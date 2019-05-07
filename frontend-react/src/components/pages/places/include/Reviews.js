import React, { Component } from 'react';

import  { connect } from 'react-redux';

import {
    Rating,
    Comment,
    Form,
    Button,
    Segment
} from "semantic-ui-react";

import axios from "axios/index";
import ApiList from "../../../../ApiList";

import conf from './../../../../const/conf';

const mapStateToProps = state => ({
    ...state
});

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.updateReviews = this.props.updateReviews;

        this.review = null;
        this.edit = false;

        this.state = {
            formComment: '',
            formRating: 0
        };

    }

    viewOneReview = (review) => {
        if (review.user.id === this.props.userReducer.userData.id) {
            this.review = review;

            return (
                <Comment key={ this.review.id }>
                    {
                        (()=>{
                            if (this.review.user.photo) {
                                return <Comment.Avatar as='a' src={ `${conf.domainServer}${this.review.user.photo}` } />
                            }
                        })()
                    }
                    <Comment.Content>
                        <Comment.Author>{ this.review.user.username } (Это вы)</Comment.Author>
                        <Comment.Metadata>
                            <div><Rating maxRating={5} rating={ this.review.rating } icon='star' disabled/></div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>
                                { this.review.comment }
                            </p>
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                <Button content='Редактировать' labelPosition='left' icon='edit' color={'blue'} compact onClick={this.editReview}/>
                                <Button content='Удалить' labelPosition='left' icon='close' color={'red'} compact onClick={this.removeReview}/>
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            );
        }

        return (
            <Comment key={review.id}>
                {
                    (()=>{
                        if (review.user.photo) {
                            return <Comment.Avatar as='a' src={ `${conf.domainServer}${review.user.photo}` } />
                        }
                    })()
                }
                <Comment.Content>
                    <Comment.Author>{ review.user.username }</Comment.Author>
                    <Comment.Metadata>
                        <div><Rating maxRating={5} rating={review.rating} icon='star' disabled/></div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>
                            { review.comment }
                        </p>
                    </Comment.Text>
                    {
                        (()=>{
                            if (this.props.userReducer.userData.type === 'admin') {
                                return (
                                    <Comment.Actions>
                                        <Comment.Action>
                                            <Button content='Удалить' labelPosition='left' icon='close' color={'red'} compact onClick={ this.removeReviewAdmin(review.id) }/>
                                        </Comment.Action>
                                    </Comment.Actions>
                                );
                            }
                        })()
                    }
                </Comment.Content>
            </Comment>
        );

    };

    handleChangeFormComment = (e) => {
        this.setState({ formComment: e.target.value });
    };

    handleChangeFormRating = (e, { rating, maxRating }) => {
        this.setState({ formRating: rating });
    };

    saveReview = () => {
        axios.get(`${ApiList.default_saveReview}`, {
            params: {
                token: this.props.userReducer.userToken,

                userId: this.props.userReducer.userData.id,
                placeId: this.props.placeId,
                comment: this.state.formComment,
                rating: this.state.formRating
            }
        }).then((response) => {
            this.edit = false;
            this.setState({
                formComment: '',
                formRating: 0
            });
            this.updateReviews();
        })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    removeReview = () => {
        axios.get(`${ApiList.review_removeReview}`, {
            params: {
                token: this.props.userReducer.userToken,

                userId: this.props.userReducer.userData.id,
                placeId: this.props.placeId,
            }
        }).then((response) => {
            console.log(this.review);
            delete this.review;
            console.log(this.review);
            this.updateReviews();
        })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    removeReviewAdmin = id => () => {
        axios.get(`${ApiList.admin_removeReview}`, {
            params: {
                token: this.props.userReducer.userToken,

                reviewId: id,
            }
        }).then((response) => {
            delete this.review;
            this.updateReviews();
        })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    editReview = () => {
        this.edit = true;
        const comment = this.review.comment;
        const rating = this.review.rating;
        this.review = null;

        this.setState({
            formComment: comment,
            formRating: rating
        });
    };

    viewFormReview = () => {
        if (this.review && !this.edit) {
            return;
        }

        if (this.props.userReducer.userData.type !== 'default') {
            return;
        }

        return (
            <Form reply>
                <Comment>
                    {
                        (()=>{
                            if (this.props.userReducer.userData.photo) {
                                return <Comment.Avatar as='a' src={ `${conf.domainServer}${this.props.userReducer.userData.photo}` } />
                            }
                        })()
                    }
                    <Comment.Content>
                        <Comment.Author>{ this.props.userReducer.userData.username }</Comment.Author>
                        <Comment.Metadata>
                            <div><Rating maxRating={5} icon='star' rating={this.state.formRating} onRate={ this.handleChangeFormRating }/></div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <Form.TextArea rows={2} placeholder='Ваш отзыв' value={this.state.formComment}
                                           onChange={ this.handleChangeFormComment }/>
                        </Comment.Text>
                        <Comment.Actions>
                            <Button content='Отправить' labelPosition='left' icon='edit' primary onClick={ this.saveReview }/>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            </Form>
        );
    };



    render() {
        return (
            <div>
                <h3>Отзывы</h3>
                <Segment>
                    <Comment.Group>
                        {
                            this.props.reviews.map( this.viewOneReview )
                        }
                        {
                            (()=>{
                                if (!this.props.reviews.length) {
                                    return 'Отзывов ещё нет'
                                }
                            })()
                        }
                        {
                            this.viewFormReview()
                        }
                    </Comment.Group>
                </Segment>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reviews);
