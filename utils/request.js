
const request = require('request')
    , fs = require('fs')
    ;

const _ = {
    /**
     * 基础请求方式
     * @param options
     */
    base: (options)=>new Promise((resolve, reject)=> {
        let _ = { // 构造请求体
            method: options.method || 'post'
            , json: true
            // , headers: {
            //     accesstoken: options.token
            // }
        };
        // 组装url，get方法的参数放在url中
        let url = options.url
        if (_.method === 'get' && 'data' in options) {
            url += '?';
            for (let k in options.data) {
                if (options.data.hasOwnProperty(k)) {
                    url += k + '=' + options.data[k] + '&';
                }
            }
            url = url.substr(0, url.length - 1);
        } else {
            _.form = options.data;
        }
        _.url = url;
        request(_, (error, resp, body)=> {
            if (error) {
                reject('获取数据出错');
            } else if (resp.statusCode === 200) {
                if (typeof body === 'object' && 'status' in body) {
                    resolve(body);
                } else {
                    reject('message' in body ? body.message : '获取数据失败*');
                }
            } else {
                reject('获取数据失败');
            }
        });
    }),
};

module.exports = _;