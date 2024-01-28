// export const BASE_URL = 'http://localhost:8080/';


class Config {
    // get variable from browser url
    private static baseUrl =  `${window.location.protocol}//${window.location.host}/`

    public get BASE_URL() {
        if(Config.baseUrl.includes('localhost')) {
            return 'http://localhost:8080/';
        }
        return Config.baseUrl;
    }
}

export const config = new Config();