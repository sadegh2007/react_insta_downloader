import React, { Component } from 'react'
import appLocaleStorage from './../Utilities/appLocalStorage';
import {PostItem} from './../Components/PostItem';

class PreviousDownloads  extends Component {

    state = {
        items: []
    }

    async componentDidMount() {
        await appLocaleStorage.get(appLocaleStorage.PREV_DOWNLOADS_KEY).then(res => {
            this.setState({items: res});
        });
    }

    render() {
        return (
            <main>
                <section className="hero text-center">
                    <div className="container-sm">
                        <h1 className="hero-title h2-mobile mt-0 is-revealing downloaded-text">Downloaded</h1>
                        <p className="help-text">Link expired after 1 hour</p>
                        <br/>
                        <div className='post-container'>
                            {
                                (this.state.items && this.state.items.length > 0) ? this.state.items.map((el) => {
                                return <PostItem key={el.title} link={el.link} thumb={el.thumb} title={el.title} type={el.type} />
                            }) : <p>there is no item</p> }
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default PreviousDownloads;
