function Preloader() {
    "use strict";
    var container = new Object();
    this.Container = function(value) {
        if (!arguments.length) return container;
        else container = value;
    };
    var element = new Object();
    this.Element = function(value) {
        if (!arguments.length) return element;
        else element = value;
    };
    var background = new Object();
    this.Background = function(value) {
        if (!arguments.length) return background;
        else background = value;
    };
    var indicator = false;
    this.Indicator = function(value) {
        if (!arguments.length) return indicator;
        else indicator = value;
    };
    var preloaderClassName = "preloader";
    var backgroudClassName = "preloader-background";
    var figureID = "figure-";
    var figuresAmount = 9;
    var duration = 400;
    var maskedClassName = "passive";
    this.appendPreloader = function() {
        var counter = 0;
        var figure = new Object();
        background = document.createElement("div");
        background.className = backgroudClassName;
        if (indicator) addClassName(background, maskedClassName);
        element = document.createElement("div");
        element.className = preloaderClassName;
        for (counter; counter < figuresAmount; counter++) {
            figure = document.createElement("div");
            figure.id = figureID + (counter + 1);
            element.appendChild(figure);
        }
        container.appendChild(background);
        window.setTimeout(function () {
            try {
                opacityAnimationCall(background, duration / 2, 1);
                window.setTimeout(function () {
                    background.appendChild(element);
                    opacityAnimationCall(element, duration / 2, 1);
                }.bind(this), duration / 2 + 10);
            } catch (error) {
                if (error instanceof  ReferenceError) {
                    console.error("Не подключен скрипт 'opacity-animation.js';");
                }
            }
        }.bind(this, duration / 2 + 10));
    };
    this.removePreloader = function() {
        background.removeChild(element);
        container.removeChild(background);
    };
    this.showPreloader = function() {
        clearClassName(background, maskedClassName);
    };
    this.hidePreloader = function() {
        addClassName(background, maskedClassName);
    };
}