import React, { Component } from 'react'
import { validateUrl, downloadAndSaveLink }  from './../Utilities/index';
import DownloadForm from './../Components/DownloadForm';
import Loading from '../Components/Loading';

export default class Index extends Component {

    state = {
        download_link: '',
        validate_url: false,
        downloading: false,
        invalid: false
    };

    handleLink = (e) => {
        this.setState({ download_link: e.target.value });
    }

    handleDownload = (e) => {
        e.preventDefault();
        this.setState({invalid: false});

        let insta_link = this.state.download_link;
        let validate = validateUrl(insta_link);

        if (validate) {
            this.setState({downloading: true, download_link: ''});
            try {
                downloadAndSaveLink(insta_link).then(() => {
                    this.setState({downloading: false, download_link: ''});
                    this.props.history.push('/downloads');
                }).catch(() => {
                    this.setState({downloading: false, download_link: ''});
                });
            } catch {
                this.setState({invalid: true});
            }
        } else {
            this.setState({invalid: true});
        }
    }

    render() {
        const { downloading, invalid, download_link } = this.state;
        return (
        <main>
            <section className="hero text-center">
                <div className="container-sm">
                    <div className="hero-inner">
                        <h1 className="hero-title h2-mobile mt-0 is-revealing">Instagram Downloader</h1>
                        { this.state.downloading ? (
                            <Loading />
                        ) : (
                            <DownloadForm download_link={download_link} 
                                invalid={invalid} 
                                downloading={downloading} 
                                handleLink={this.handleLink}
                                handleDownload={this.handleDownload}/>
                        )}
                        
                        <p className="hero-paragraph is-revealing mt-32">Our app can download photo, profile picture, video and post with multiple item only with instagram public account link</p>
                    </div>
                </div>
            </section>
        </main>
        )
    }
}
