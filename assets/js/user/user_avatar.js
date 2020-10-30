$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2. 点击上传按钮,触发文件选择框的单机事件
    $('#btnChooseImage').on('click', function () {
        $('#file').trigger('click')
    })

    // 3. 更换裁剪区域的图片
    var layer = layui.layer
    $('#file').on('change', function (e) {
        // 获取选择的文件
        var file = e.target.files[0]
        // 非空校验
        if (file === undefined) {
            return layer.msg('请选择图片!')
        }
        var imgUrl = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgUrl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 4. 点击确定按钮,渲染图片到用户头像
    $('#btnUpload').on('click', function () {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 发起ajax请求,更换头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar : dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!')
                }
                layer.msg('更换头像成功!')
                // 重新渲染父页面用户头像
                window.parent.getUserInfo()
            }

        })
    })
})