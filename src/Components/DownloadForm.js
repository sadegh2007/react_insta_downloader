import React from 'react';
import {ReactComponent as DownloadIcon} from './../svgs/download.svg';
import {Link} from 'react-router-dom';

const DownloadForm = ({invalid, handleDownload, downloading, download_link, handleLink}) => {
    return (
        <form onSubmit={handleDownload} className='hero-form field field-grouped is-revealing'>
            <div className="control-expanded control">
                <label htmlFor="link"></label>
                <input value={download_link} disabled={downloading} onChange={handleLink} className={'input' + (invalid ? ' invalid-input' : '')} type="link" name="link" placeholder="instagram link or username&hellip;"/>
                { invalid ? (<small className="invalid-link">Invalid Link (make sure account has been public)</small>) : '' }
                
            </div>
            <div className="download-control">
                <Link onClick={event => handleDownload(event)} className="button button-primary button-block button-shadow" to="#"><DownloadIcon className="download-item-icon"/></Link>
            </div>
        </form>
    )
}

export default DownloadForm;