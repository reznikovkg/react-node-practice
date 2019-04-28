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

        this.state = {
            userReview: null,
            formComment: ''
        };

    }

    viewOneReview = (review) => {
        if (!this.state.userReview && review.user.id === this.props.userReducer.userData.id) {
            this.setState({userReview: review});
        }

        if (review.user.id === this.props.userReducer.userData.id) {
            if (!this.state.userReview) {
                this.setState({userReview: review});
            }

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
                                <Button content='Редактировать' labelPosition='left' icon='edit' color={'blue'} compact/>
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

        });
    };

    viewFormReview = () => {
        if (!this.state.userReview) {
            return (
                <Form reply>
                    <Comment>
                        <Comment.Avatar as='a' src='/images/avatar/small/joe.jpg' />
                        <Comment.Content>
                            <Comment.Author>{ this.props.userReducer.userData.username }</Comment.Author>
                            <Comment.Metadata>
                                <div><Rating maxRating={5} defaultRating={0} icon='star' onRate={ this.handleChangeFormRating }/></div>
                            </Comment.Metadata>
                            <Comment.Text>
                                <Form.TextArea rows={2} placeholder='Ваш отзыв' value={this.state.formContactEmail}
                                               onChange={ this.handleChangeFormComment }/>
                            </Comment.Text>
                            <Comment.Actions>
                                <Button content='Отправить' labelPosition='left' icon='edit' primary onClick={ this.saveReview }/>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    {/*<span>Ваша оценка </span><Rating maxRating={5} defaultRating={0} icon='star'/>*/}
                    {/*<Form.TextArea rows={2} placeholder='Ваш отзыв'/>*/}
                    {/*<Button content='Отправить' labelPosition='left' icon='edit' primary />*/}
                </Form>
            );
        }
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
                            this.viewFormReview()
                        }
                    </Comment.Group>
                </Segment>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Reviews);
