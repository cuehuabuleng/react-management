const router = require('koa-router')()
const Mock = require('mockjs')

router.prefix('/api/role')

//角色列表
router.get('/list', async (ctx, next) => {
    console.log('角色页面请求的页数是', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "result": {
            "page": 1,
            "page_size": 10,
            "total": 25,
            "page_count": 3,
            "item_list|7": [{
                "id|+1": 1,
                "role_name": /(管理人员)|(客服专员)|(财务专员)|(市场专员)|(人力专员)|(研发)|(测试)|(系统管理员)/,
                "status|0-1": 1,
                "authorize_user_name": "@cname",
                "authorize_time": 1521270166000,
                "create_time": 1499305790000,
                "menus": ["/home", "/ui/buttons", "/ui/modals", "/ui/loadings", "/ui/notification", "/ui/messages", "/ui/tabs", "/ui/gallery", "/ui/carousel", "/ui"]
            }]
        }
    })
    ctx.body = data
})
//角色用户列表
router.get('/user_list', async (ctx, next) => {
    console.log('角色用户列表请求的数据', ctx.query)
    let data = Mock.mock({
        "code": 0,
        "result|20": [{
            "status|0-1": 0,
            "user_id|+1": 1,
            "user_name": "@cname"
        }]
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
        "code":0
    })
    ctx.body = data
})
module.exports = router
