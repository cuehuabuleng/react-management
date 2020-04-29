import Jsonp from 'jsonp';
import axios from 'axios';
import utils from '../utils/utils';
import { Modal } from 'antd';
export default class Axios{

    static requestList(_this, url, params, isMock){
        var data = {
            params:params,
            isMock:isMock
        }
        this.ajax({
            url,
            data
        }).then(((data) => {
            if (data&&data.result) {
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                _this.setState({
                    list:list,
                    pagination:utils.pagination(data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        }))
    }

    static jsonp(options){
        return new Promise((resolve, reject) => {
            Jsonp(options.url, {
                param:'callback'
            }, function (err, response) {
                if (response.status && response.status === 'success') {
                    resolve(response);
                }else{
                    reject(err);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if (options.data.isMock) {
             baseApi = 'http://localhost:8005/api'
        }else{
             baseApi = 'http://localhost:8005/api'
        }
      
        return new Promise ((resolve, reject) => {
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ''
            }).then((response) => {
               
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res);
                    }else{
                        Modal.info({
                            title: '修改的标题',
                            content: res.msg,
                        })
                    }
                } else {
                    reject(response.data)
                }
            })
        })

    }
}