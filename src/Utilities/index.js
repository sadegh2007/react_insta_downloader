import axios from 'axios';
import appLocaleStorage from './../Utilities/appLocalStorage';

export const validateUrl = (url) => {
    let pattern = new RegExp('(https?:\\/\\/(?:www\\.)?instagram\\.com\\/([^/?#&]+)).*', 'i'); // fragment locator
    return !!pattern.test(url);
}

export function urlify(text) {
    if (new RegExp("(?<http>(http:[/][/]|www.)([a-z]|[A-Z]|[0-9]|[/.]|[~])*)").test(text)) {
        return true;
    }
    return false;
}

export function instagramJsonFeed(url) {
    return axios.get(url).then(res => {
        const jsonObject = res.data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1);
        return JSON.parse(jsonObject);
    });
}

export function downloadAndSaveLink(insta_link) {
    return instagramJsonFeed(insta_link).then(res => {
        let type = 'profile';
        if (insta_link.includes('/p/')) {
            type = 'post';
        }

        if (type == 'post') {
            const entryData = res.entry_data.PostPage[0].graphql.shortcode_media;
            if (entryData.__typename == 'GraphVideo') {
                appendData(entryData);
            } else if (entryData.__typename == 'GraphImage') {
                appendData(entryData);
            } else if (entryData.__typename == 'GraphSidecar') {
                entryData.edge_sidecar_to_children.edges.forEach(element => {
                    appendData(element.node);
                });
            }
        } else if (type == 'profile') {
            const entryData = res.entry_data.ProfilePage[0].graphql.user;
            handleProfileImage(entryData);
        }

        return res;
    });
}

const appendData = (entryData) => {
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

    let item = {
        type: entryData.__typename,
        thumb: entryData.display_url,
        title: entryData.shortcode,
        link: '',
        created_at: formatted_date
    };

    if (item.type == 'GraphVideo') {
        item = {
            type: entryData.__typename,
            thumb: entryData.display_url,
            title: entryData.shortcode,
            link: entryData.video_url,
            created_at: formatted_date
        };
    } else if (item.type == 'GraphImage') {
        item = {
            type: entryData.__typename,
            thumb: entryData.display_url,
            title: entryData.shortcode,
            link: entryData.display_url,
            created_at: formatted_date
        };
    } else {
        return;
    }

    appLocaleStorage.save(appLocaleStorage.PREV_DOWNLOADS_KEY, item);
}

const handleProfileImage = (userData) => {
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();

    const item = {
        type: 'profile',
        thumb: userData.profile_pic_url,
        title: userData.username,
        link: userData.profile_pic_url_hd,
        created_at: formatted_date
    };

    appLocaleStorage.save(appLocaleStorage.PREV_DOWNLOADS_KEY, item);
}