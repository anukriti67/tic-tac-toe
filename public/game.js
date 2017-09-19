(() => {
        var dirty = 0;
        const cross = "cross.png"
        const circle = "circle.png"
        const horizontal = "-webkit-linear-gradient(90deg, transparent 49%, red 49%, red 52%, transparent 51%)"
        const vertical = "-webkit-linear-gradient(0deg, transparent 49%, red 49%, red 52%, transparent 51%)"
        const diagonal1 = "-webkit-linear-gradient(45deg, transparent 49%, red 49%, red 52%, transparent 51%)"
        const diagonal2 = "-webkit-linear-gradient(135deg, transparent 49%, red 49%, red 52%, transparent 51%)"
        var arr = [
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]
        ]
        var last_image = 0;

        function drawaImage(x, y) {
            dirty = 1;
            arr[x][y] = last_image;
            for (j = 0; j < 3; j++) {
                for (k = 1; k < 3; k++) {
                    if (arr[j][k] === -1 || arr[j][k] !== arr[j][k - 1])
                        break;
                }
                if (k == 3) {

                    for (k = 0; k < 3; k++) {
                        document.getElementById('t1').zIndex = "-1"
                        document.getElementById('t1').rows[j].cells[k].style.background = horizontal;

                    }

                    return true;
                }
            }
            for (let j = 0; j < 3; j++) {
                for (k = 1; k < 3; k++) {
                    if (arr[k][j] === -1 || arr[k][j] !== arr[k - 1][j])
                        break;
                }
                if (k == 3) {
                    for (k = 0; k < 3; k++) {
                        document.getElementById('t1').zIndex = "-1"
                        document.getElementById('t1').rows[k].cells[j].style.background = vertical;

                    }
                    return true;

                }
            }
            if (arr[0][0] != -1 && arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) {
                for (k = 0; k < 3; k++) {
                    document.getElementById('t1').zIndex = "-1"
                    document.getElementById('t1').rows[k].cells[k].style.background = diagonal1;
                }
                return true;
            }
            if (arr[2][0] != -1 && arr[2][0] == arr[1][1] && arr[1][1] == arr[0][2]) {
                for (k = 0; k < 3; k++) {
                    document.getElementById('t1').zIndex = "-1"
                    document.getElementById('t1').rows[k].cells[2 - k].style.background = diagonal2;

                }
                return true;
            }
            dirty = 0;
            return false;
        }

        function validateMove(x, y) {
            if (dirty)
                alert("Start a new game");
           if (arr[x][y] != -1 || dirty)
                return false;
            return true;
        }

        class MyGame {

            constructor() {
                this.gameInit()

            }


            displayImg(e) {
                if (e.target !== e.currentTarget) {
                      var def = $.Deferred();
                      var col = $(e.target).index()
                      var row = $(e.target).closest("tr").index()
                      var promise = (function() {
                        
                        if (!validateMove(row, col)) {
                            e.stopPropagation();
                            def.reject();
                        } else
                            def.resolve();
                        return def.promise();
                    }());

                    promise.done(function() {
                      let temp;
                            if (last_image === 0) {
                                last_image = 1;
                                temp = circle;
                            } else {
                                last_image = 0;
                                temp = cross;
                            }
                            var prom = new Promise(
                                (resolve, reject) => {
                                    $(e.target).prepend($('<img>', { src: temp, class: 'shape' }));
                                    resolve(true);
                                });
                            prom.then((argument) => {
                                e.stopPropagation();
                                if (drawaImage(row, col)) {
                                  alert("you have won");
                                    return true;
                                }
                            });

                        }).fail(function(){
                          console.log("invalid move");
                        })

                    
            }
            return false;
        }

        attachEvent() {
            var p = $(".tic_tac_toe");
            p.click(this.displayImg);

        }

        gameInit() {
            this.attachEvent();
            var b = $("#start")
            b.on("click",function() {
                dirty=0;
                $("img").each(function() {
                    $(this).remove();
                });
                arr = [
                    [-1, -1, -1],
                    [-1, -1, -1],
                    [-1, -1, -1]
                ]
                this.last_Image = 0;
                $("td").each(function() {
                    $(this).css("background", "");
                });
            });

        }
    }
    let game = new MyGame();
})();