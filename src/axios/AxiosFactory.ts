import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export default class AxiosFactory {
    static createInstance<T = any>(config?: CreateAxiosDefaults<T>) {
        // const basePath = "http://192.120.16.108:8080/";
        const basePath = "https://chawlacomponents.com/";
        const _config = config ? config : ({} as CreateAxiosDefaults<any>);
        const burl = _config.baseURL ? _config.baseURL : "";
        _config.baseURL = basePath + burl;
        return axios.create(_config);
    }
}
