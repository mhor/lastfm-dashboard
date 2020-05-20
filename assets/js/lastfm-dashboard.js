var MhorLastFmDashboard = MhorLastFmDashboard || {};

MhorLastFmDashboard.commonMethod = {
    username: "",
    apiKey: ""
};

function LastFmApiClient(username, apiKey) {
    this.endpoint = "https://ws.audioscrobbler.com/2.0/?method=";
    this.format = "json";
    this.apiKey = apiKey;
    this.username = username;
}

LastFmApiClient.prototype.addQueryParameters = function () {
    return this.addAppkeyParameter() + this.addFormatParameter();
};

LastFmApiClient.prototype.addAppkeyParameter = function () {
    return "&api_key=" + this.apiKey;
};

LastFmApiClient.prototype.addFormatParameter = function () {
    return "&format=" + this.format;
};

LastFmApiClient.prototype.callApi = function (url, callback) {
    $.get(url, function (data) {
        callback(data);
    });
};

LastFmApiClient.prototype.getUserInfo = function (callback) {
    this.callApi(this.endpoint + "user.getinfo&user=" + this.username + this.addQueryParameters(), callback);
};

LastFmApiClient.prototype.getArtistCount = function (callback) {
    this.callApi(this.endpoint + "library.getArtists&user=" + this.username + "&limit=1" + this.addQueryParameters(), callback);
};

LastFmApiClient.prototype.getLastFiveTracks = function (callback) {
    this.callApi(this.endpoint + "user.getRecentTracks&user=" + this.username + "&limit=5" + this.addQueryParameters(), callback)
};

LastFmApiClient.prototype.getPlayCount = function (from, to, callback) {
    this.callApi(this.endpoint + "user.getRecentTracks&user=" + this.username + "&limit=1&from=" + from + "&to=" + to + this.addQueryParameters(), callback)
};
