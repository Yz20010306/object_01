$(function () {
    // 文本框获得焦点 点击回车 存储本地数据
    load();
    $("#title").on("keydown", function (event) {
        // 判断键盘是否按下了回车键
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您的代办事项")
            } else {
                var local = getDate();
                // console.log(local);
                // 更新数组
                local.push({
                    title: $(this).val(),
                    done: false,
                });
                // 将数组存入本地
                saveDate(local);
                load();
                $(this).val("");
            }
        };

    });
    // 删除操作
    $("ol,ul").on("click", "a", function () {
        // 先获取本地数据
        var date = getDate();
        // 获取索引号
        var index = $(this).attr("index");
        //修改数据
        date.splice(index, 1);
        // 存储数据
        saveDate(date);
        // 重新渲染数据
        load();

    });
    // 正在进行和已经完成的操作
    $("ol,ul").on("click", "input", function () {
        // 先获取本地数据
        var date = getDate();
        // 获取索引号
        var index = $(this).siblings("a").attr("index");
        // console.log(index);
        // 修改数据
        date[index].done = $(this).prop("checked");
        console.log(date);
        // 存储数据
        saveDate(date);
        // 重新渲染数据列表
        load();
    })
    // 定义一个获取本地数据的函数
    function getDate() {
        var data = localStorage.getItem("todolist");
        // 先判断本地是否存在数据
        if (data !== null) {
            // 本地数据存储的是字符串格式,获取时需要转换为数据格式
            return JSON.parse(data);
        } else {
            return [];
        }
    };
    // 封装一个存储数据的函数
    function saveDate(date) {
        localStorage.setItem("todolist", JSON.stringify(date))
    };
    // 封装一个自动渲染数据的函数
    function load() {
        // 读取本地数据
        var date = getDate();
        // 每次渲染前先清除本地ol
        $("ol,ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        // 遍历这个数据
        $.each(date, function (i, n) {
            // 给ol动态添加li
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' index=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' index=" + i + "></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})