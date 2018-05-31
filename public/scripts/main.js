"use strict";

$(document).ready(function () {

    var num = 0;

    //get value entered by user

    $("#plantForm").submit(function (event) {
        event.preventDefault();
        var userPlant = $("#plant").val().toLowerCase();
        console.log(userPlant);

        newIcon(userPlant);
    });

    var newIcon = function newIcon(query) {
        return $.ajax({
            url: "https://noun-project-proxy.herokuapp.com/v1",
            method: 'GET',
            data: {
                url: "icons/" + query,
                params: JSON.stringify({})
            }
        }).then(function (response) {
            console.log(response);
            var image = response.icons[0].preview_url;
            // $("#container1").append(`<div class="resizeDiv"></div>`)
            $("#container1").append("\n            <div class=\"resizeDiv\">\n                <img class=\"veg-image\" id='veg" + num + "' src=\"" + image + "\">\n            </div>");
            // $(`#veg${num}`).attr("src", image)

            // num = num + 1;
            // $("#container1").append(`<div class="resizeDiv"><img class="veg-image" src="${image}" crossOrigin='anonymous'></div>`);

            // drag and drop 

            var currentParent;

            $(".resizeDiv").resizable({
                containment: "parent"
            }).draggable({
                revert: 'invalid',
                snap: false,
                grid: false,
                start: function start() {
                    currentParent = $(this).parent().attr('id');
                }
            });

            $('#container1, #container2').droppable({

                drop: function drop(event, ui) {
                    // var element = document.elementFromPoint(event.clientX, event.clientY);

                    if (currentParent != $(this).attr('id')) {
                        $(ui.draggable).appendTo($(this)).removeAttr('style');
                    }
                }
            });
        });
    };

    //save to computer

    $("#save").on("click", function () {
        html2canvas(document.getElementById('container2'), { letterRendering: 1, allowTaint: true }).then(function (canvas) {
            document.body.appendChild(canvas);
            Canvas2Image.saveAsImage(canvas, 100, 100, "png");
            // let dataURL = canvas.toDataURL();
            console.log(dataURL);
        });
    });

    //reset
    $("#reset").on("click", function () {
        $("#container2").html("");
    });

    //add to community garden


    //delete plant

});