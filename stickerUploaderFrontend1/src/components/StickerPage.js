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
            stickerURL: ''
        }
    }

    stickerInfo() {
        const { stickerName } = this.props.match.params;
        getStickerByName(stickerName)
        .then(result => {
            console.log(result);
            this.setState({
                stickerId: result._id,
                stickerName: result.name,
                stickerContent: result.stickerContent,
                stickerURL: result.stickerURL
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
                    {/* <Button color="success" size="lg">Install Stickers</Button> */}
                    <a href={this.state.stickerURL} className="btn btn-success btn-lg" target="_blank">Install Sticker</a>
                    <Button color="danger" size="lg">Report</Button>
                </div>

                <div className="stickers-page">
                    {
                        this.state.stickerContent.map((_sticker) => {
                            return(
                                <Col xs="6" sm="4" md="3" className="sticker-img">
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