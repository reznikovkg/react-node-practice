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
        if (!this.review && review.user.id === this.props.userReducer.userData.id && !this.edit) {
            this.review = review;
        }

        if (review.user.id === this.props.userReducer.userData.id) {

            return (
                <Comment key={review.id}>
                    <Comment.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment.Content>
                        <Comment.Author>{ review.user.username } (Это вы)</Comment.Author>
                        <Comment.Metadata>
                            <div><Rating maxRating={5} defaultRating={review.rating} icon='star' disabled/></div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>
                                { review.comment }
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
                <Comment.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                <Comment.Content>
                    <Comment.Author>{ review.user.username }</Comment.Author>
                    <Comment.Metadata>
                        <div><Rating maxRating={5} defaultRating={review.rating} icon='star' disabled/></div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <p>
                            { review.comment }
                        </p>
                    </Comment.Text>
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
            this.updateReviews();
            this.edit = false;
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
            this.review = null;
            this.updateReviews();
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
        if (this.review) {
            return;
        }

        if (this.props.userReducer.userData.type !== 'default') {
            return;
        }

        return (
            <Form reply>
                <Comment>
                    <Comment.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                    <Comment.Content>
                        <Comment.Author>{ this.props.userReducer.userData.username }</Comment.Author>
                        <Comment.Metadata>
                            <div><Rating maxRating={5} icon='star' defaultRating={this.state.formRating} onRate={ this.handleChangeFormRating }/></div>
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
