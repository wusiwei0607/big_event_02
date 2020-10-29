$(function () {
    // 1. 定义校验规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户名称长度为 1 ~ 6 个字符'
            }
        }
    })

    // 2. 获取用户信息,初始化用户信息
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 渲染数据到页面
                form.val('formUserInfo', res.data)
            }
        })
    }


    // 3. 点击重置按钮重置用户信息
    $('#btnReset').on('click', function (e) {
        // 阻止默认事件
        e.preventDefault()
        // 重置为修改前的信息,即重新渲染用户信息
        initUserInfo()
    })

    // 4. 提交修改的用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功!')
                // 调用父页面上的方法,渲染头像与用户名
                window.parent.getUserInfo()
            }
        })
    })
})