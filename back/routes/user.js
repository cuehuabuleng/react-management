const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/api/user')

//订单列表
router.get('/list', async (ctx, next) => {
    console.log('员工页面请求的页数是', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "message": "",
        "result": {
            "item_list|10": [{
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
//编辑员工
router.get('/edit', async (ctx, next) => {
    console.log('编辑后的员工是', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "result": 'Ok'
      })
    ctx.body = data
})

//删除员工
router.get('/delete', async (ctx, next) => {
    console.log('需要删除的员工是', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "result": 'Ok'
      })
    ctx.body = data
})
//创建员工
router.get('/add', async (ctx, next) => {
    console.log('创建的员工是', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "result": "Ok"
      })
    ctx.body = data
})
//
module.exports = router
