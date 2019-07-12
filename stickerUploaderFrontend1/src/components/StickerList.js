import React from 'react';
import './StickerList.scss';
import { Row, Col } from 'reactstrap';

export default class StickerList extends React.Component {
    render() {
        const {
            image,
            title,
            singleLink
        } = this.props

        return(
            <Col md="3" className="sticker-list">
                <a href={singleLink}>
                <div className="wrapper">
                    <img src={image}/>
                    <h2>{title}</h2>
                </div>
                </a>
            </Col>
        )
    }

}