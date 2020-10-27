// 入口函数
$(function () {
    // 1. 点击跳转链接,切换登录表单与注册表单的显示与隐藏
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2. 自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return "对不起,两次密码不一致,请重新输入!"
            }
        }
    })

    // 3. 提交注册表单,发起Ajax请求
    var layer = layui.layer
    $("#form-reg").on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 发起Ajax请求
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg input[name=username]').val(),
                password: $('#form-reg input[name=username]').val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!')
                // 跳转到登录表单
                $('#link-login').trigger('click')
                // 清除表单数据
                $('#form-reg')[0].reset()
            }
        })
    })

    // 4. 提交登录表单,发起Ajax请求
    $('#form-login').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        var data = $(this).serialize()
        // 发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                // 跳转到后台首页
                location.href = '/index.html'
            }
        })
    })
})