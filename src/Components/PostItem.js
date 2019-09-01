import React from 'react'
import {Link} from 'react-router-dom';
import {ReactComponent as VideoIcon} from './../svgs/video.svg';
import {ReactComponent as ImageIcon} from './../svgs/image.svg';

export const PostItem = ({ link, title, thumb, type }) => {
    
    // Download file directly to device
    const download = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", link, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = title + (type == 'profile' ? '.jpg' : '');
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();
    }

    return (
        <Link className = "post-item" to='#' onClick={() => download()}>
            {type === 'GraphVideo' ? <VideoIcon className="post-type-icon"/> : <ImageIcon className="post-type-icon"/>}
            <img src={thumb} alt={title}/>
            <div className="info">
                <p> { title } </p>
            </div>
        </Link>
    );
};