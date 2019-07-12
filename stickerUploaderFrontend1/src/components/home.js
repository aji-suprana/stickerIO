import React from 'react';
import {Container} from 'reactstrap';
import './home.scss';
import { getStickers } from '../api/fetch';

import StickerList from './StickerList';

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stickerList: []
        }
    }

    componentDidMount() {
        getStickers()
        .then(result => {
            let stickerList = result.stickers.map( (_sticker) => {
                return (
                    <StickerList
                        image={_sticker.thumbnailURL}
                        title={_sticker.name}
                    />
                )
            })
            this.setState({ stickerList: stickerList });
        })
    }


    render() {
        return(
            <Container>
                <h1>Telegram Stickers Directory</h1>

                <div className="filter">
                    <h2 className="active">ALL STICKERS</h2>
                </div>

                <div className="stickers">
                    {this.state.stickerList}
                </div>
            </Container>
        )
    }
}