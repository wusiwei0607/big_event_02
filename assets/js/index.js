// 入口函数
$(function () {
    getUserInfo()
})


// 封装函数获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}

// 封装函数渲染用户信息与头像
function renderAvatar(user) {
    // 渲染用户信息
    var name = user.nickname || user.username
    $('#wellcome').html('欢迎&nbsp;&nbsp;' + name)

    // 渲染头像
    if (user.user_pic !== null) {
        // 显示图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 显示文字头像
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(first)
    }
}