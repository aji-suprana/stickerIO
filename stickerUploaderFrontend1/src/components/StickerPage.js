import React from 'react';
import {getStickerByName} from '../api/fetch';
import {Container, Button, Col} from 'reactstrap';

import './StickerPage.scss';


export default class StickerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stickerId: '',
            stickerName: '',
            stickerContent: [],
        }
    }

    stickerInfo() {
        const { stickerName } = this.props.match.params;
        getStickerByName(stickerName)
        .then(result => {
            this.setState({
                stickerId: result._id,
                stickerName: result.name,
                stickerContent: result.stickerContent
            })
        })
    }

    componentDidMount() {
        this.stickerInfo();
    }

    render() {
        return(
            <Container>
                <h1>"{this.state.stickerName}" stickers pack</h1>
                <div className="button-group">
                    <Button color="success" size="lg">Install Stickers</Button>
                    <Button color="danger" size="lg">Report</Button>
                </div>

                <div className="stickers-page">
                    {
                        this.state.stickerContent.map((_sticker) => {
                            return(
                                <Col md="3" className="sticker-img">
                                    <img src={_sticker}/>
                                </Col>
                            )
                        })
                    }
                </div>
            </Container>
        )
    }
}