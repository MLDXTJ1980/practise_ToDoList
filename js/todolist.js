$(function() {
    //1 input todo and press enter, the todo item will be saved in the window.localStorage

    load()
    $(".title input").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() === "") {
                alert("Please input your todo")
            } else {
                var localData = getData()
                var data = {
                    title: $(".title input").val(),
                    done: false,
                }
                localData.push(data)
                saveData(localData)
                load()
                $(this).val("")
            }
        }
    })

    // delete the todo items
    $(".todo ul,.done ul").on("click", "i", function() {
        var localData = getData()
        var index = $(this).attr("id")
        localData.splice(index, 1)
        saveData(localData)
        load()
    })

    // click the checkbox in the todo/done list
    $(".todo ul, .done ul").on("click", "input", function() {
        var localData = getData()
        var index = $(this).siblings("i").attr("id")
        localData[index].done = $(this).prop("checked")
        saveData(localData)
        console.log(localData)
        load()
    })

    // get localStorage als a array of obj
    function getData() {
        var data = localStorage.getItem("todolist")
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }

    // change a obj to String and save it in the window.localStorage
    function saveData(data) {
        window.localStorage.setItem("todolist", JSON.stringify(data))
    }

    // get all the data from localStorage and rendering on the page
    function load() {
        var data = getData()
        $(".todo ul,.done ul").empty()
        $.each(data, function(i, el) {
            if (el.done === false) {
                var li = $("<li></li>")
                li.html(
                    "<span></span><input type='checkbox'/>" +
                    "<p>" +
                    el.title +
                    "</p><i class='far fa-trash-alt' id=" +
                    i +
                    "></i>"
                )
                $(".todo ul").prepend(li)
            } else {
                var li = $("<li></li>")
                li.html(
                    "<span></span><input type='checkbox' checked='checked'/><p>" +
                    el.title +
                    "</p><i class='far fa-trash-alt' id=" +
                    i +
                    "></i>"
                )
                $(".done ul").prepend(li)
            }
        })
        $(".todo>h3>span").text($(".todo>ul>li").length)
        $(".done>h3>span").text($(".done>ul>li").length)
    }
})