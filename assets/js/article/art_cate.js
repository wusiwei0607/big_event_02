$(function () {
    var layer = layui.layer
    var form = layui.form
    // 1. 初始化文章分类列表
    initArtCateList()
    function initArtCateList() {
        // 发起ajax请求,获取文章列表
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 2. 点击添加列表按钮,弹出添加表单
    var addindex = null
    $('#btnAddCate').on('click', function () {
        addindex = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })

    // 3. 点击确认添加按钮,提交表单数据,渲染表格(事件委托)
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章分类列表失败!')
                }
                layer.msg('添加文章分类列表成功!')
                initArtCateList()
                layer.close(addindex)
            }
        })
    })

    // 4. 点击编辑按钮弹出修改表单弹出框
    var editindex = null
    $('tbody').on('click', '.btn-edit', function () {
        editindex = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        });

        // 数据回填
        // 获取id值
        var id = $(this).data('id')
        $.ajax({
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 5. 提交修改的表单,渲染表格
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类列表失败!')
                }
                layer.msg('更新文章分类列表成功!')
                initArtCateList()
                layer.close(editindex)
            }
        })
    })

    // 6. 点击删除按钮,删除当前文章分类
    $('tbody').on('click', '.btn-delete', function () {
        // 获取id值
        var id = $(this).data('id')
        // 弹出询问框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败!')
                    }
                    layer.msg('删除成功!')
                    initArtCateList()
                    layer.close(index);
                }
            })
        });
    })
})