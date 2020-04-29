const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/api/')

//地图-车辆地图分布
router.get('/map/bike_list', async (ctx, next) => {
    console.log('地图-车辆地图分布', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "result": {
            "total_count|100-200": 100,
            "bike_list": ['116.356619,40.017782', '116.437107,39.975331', '116.34972,40.070808', '116.323849,39.964714', '116.404912,40.015129', '116.365243,39.958078'],
            "route_list": ['116.353101,40.067835', '116.357701,40.053699', '116.374086,40.027626', '116.397801,40.01641'],
            "service_list": [{
                "lon": "116.274737",
                "lat": "40.139759",
                "ts": null
            },
            {
                "lon": "116.316562",
                "lat": "40.144943",
                "ts": null
            },
            {
                "lon": "116.351631",
                "lat": "40.129498",
                "ts": null
            },
            {
                "lon": "116.390582",
                "lat": "40.082481",
                "ts": null
            },
            {
                "lon": "116.38742",
                "lat": "40.01065",
                "ts": null
            },
            {
                "lon": "116.414297",
                "lat": "40.01181",
                "ts": null
            },
            {
                "lon": "116.696242",
                "lat": "39.964035",
                "ts": null
            },
            {
                "lon": "116.494498",
                "lat": "39.851306",
                "ts": null
            },
            {
                "lon": "116.238086",
                "lat": "39.848647",
                "ts": null
            },
            {
                "lon": "116.189454",
                "lat": "39.999418",
                "ts": null
            },
            {
                "lon": "116.244646",
                "lat": "39.990574",
                "ts": null
            },
            {
                "lon": "116.281441",
                "lat": "40.008703",
                "ts": null
            },
            {
                "lon": "116.271092",
                "lat": "40.142201",
                "ts": null
            },
            {
                "lon": "116.271092",
                "lat": "40.142201",
                "ts": null
            }
            ]
        }
    })
    ctx.body = data
})
//基础表格
router.get('/table/list', async (ctx, next) => {
    console.log('基础表格请求的数据', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "message": "",
        "result": {
          "list|10": [{
            "id|+1": 1,
            "username": "@cname",
            "sex|1-2": 1,
            "state|1-5": 1,
            "like|1-8": 1,
            "isMarried|0-1": 1,
            "birthday": "2000-01-01",
            "address": "北京市海淀区",
            "time": "09:00:00"
          }],
          page: 1,
          page_size: 10,
          total_count: 30
        }
      })
    ctx.body = data
})

//用户角色设置提交
router.get('/user_role_edit', async (ctx, next) => {
    console.log('用户角色设置提交的数据', ctx.query)
    let data = Mock.mock({
        "code": 0
    })
    ctx.body = data
})
//权限设置
router.get('/permission/edit', async (ctx, next) => {
    console.log('用户权限设置的请求信息', ctx.query)
    let data = Mock.mock({
        "code": 0
    })
    ctx.body = data
})
//创建角色
router.get('/create', async (ctx, next) => {
    console.log('创建的角色是', ctx.query)
    let data = Mock.mock({
        "code": 0
    })
    ctx.body = data
})
module.exports = router
