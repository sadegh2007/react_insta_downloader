import Dexie from "dexie";

const db = new Dexie('instagram_downloder_db');
db.version(1).stores({
    DOWNLOADS_DB: '++id,title,type,thumb,link,created_at'
});

const appLocalStorage = {
    PREV_DOWNLOADS_KEY: 'DOWNLOADS_DB',
    save: (key, data) => {
        db.table(key).add(data);
    },
    async get (key) {
        try {
            return db.table(key).toArray().then(data  => {
                return data.filter(element => {
                    var diff = Math.abs(new Date(element.created_at) - new Date());
                    var minutes = Math.floor((diff / 1000) / 60);

                    const hasExpired = minutes >= 60;

                    if (hasExpired) {
                        db.table(key).delete(element.id);
                    }

                    return !hasExpired;
                });
            });
        } catch {}
    },

    append: (key, dataAppend) => {
        appLocalStorage.save(key, dataAppend);
    }
}

export default appLocalStorage;