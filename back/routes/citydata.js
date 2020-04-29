const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/api/city')

router.get('/open_city', async (ctx, next) => {
    console.log('请求的页数是',ctx.query)
    let data = Mock.mock({
        "code": 0,
        "msg": "报错",
        "result": {
            "page": 1,
            "page_size": 10,
            "total": 60,
            "page_count": 6,
            "item_list|1-50": [{
                "id|+1": 1,
                "name": "@city",
                "mode|1-2": 1,
                "op_mode|1-2": 1,
                "franchisee_id": 77,
                "franchisee_name": "松果自营",
                "city_admins|1-2": [{
                    "user_name": "@cname",
                    "user_id|+1": 10001
                }],
                "open_time": "@datetime",
                "sys_user_name": "@cname",
                "update_time": 1520476737000
            }]
        }
    })
    ctx.body = data
})

router.get('/open', async (ctx, next) => {
    console.log('请求的页数是',ctx.query)
    let data = {
        code:0,
        result:'开通成功'
    }
    ctx.body = data
})

module.exports = router
