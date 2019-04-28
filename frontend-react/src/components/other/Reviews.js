import React, { Component } from 'react';

import {
    SegmentGroup,
    Rating
} from "semantic-ui-react";

class Reviews extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {
        return (
            <div>
                <h3>Отзывы</h3>
                {
                    this.props.reviews.map( (review) => {
                        return (

                            <SegmentGroup>
                                { review.comment }
                                <Rating maxRating={5} defaultRating={review.rating} icon='star'/>
                            </SegmentGroup>
                        );
                    } )
                }
            </div>
        );
    }
}

export default Reviews;
