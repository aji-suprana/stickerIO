import React from 'react';
import {Container} from 'reactstrap';
import './home.scss';
import { getStickers } from '../api/fetch';

import StickerList from './StickerList';

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            stickerList: [],
            loading: true
        }
    }

    componentDidMount() {
        document.title = "Telegram Animated Stickers";

        getStickers()
        .then(result => {
            let stickerList = result.stickers.map( (_sticker) => {
                return (
                    <StickerList
                        singleLink={_sticker.name}
                        image={_sticker.thumbnailURL}
                        title={_sticker.name}
                        key={_sticker._id}
                    />
                )
            })
            this.setState({
                loading: false,
                stickerList: stickerList
            });
        })
    }


    render() {
        let loading = <img className="loading" src={'loading.gif'}/>
        return(
            <Container>
                <h1>Telegram Animated Stickers</h1>

                <div className="filter">
                    <h2 className="active">ALL STICKERS</h2>
                </div>

                <div className="stickers">
                    {this.state.loading? loading: this.state.stickerList}
                </div>
            </Container>
        )
    }
}