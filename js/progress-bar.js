var progressBar = (function() {
    "use strict";
    var targetClassName = "progress-indicator";
    var target = new Object();
    return {
        create: function() {
            var additoryVariable = selectElementByClassName(targetClassName);
            if (additoryVariable.status) {
                target = additoryVariable.element;
                window.addEventListener("scroll", this, true);
            } else notify(targetClassName, 2);
        },
        handleEvent: function(event) {
            event = event || window.event;
            var currentScrolling = 0;
            var currentProgress = 0;
            var documentHeight = document.body.offsetHeight;
            var screenHeight = document.documentElement.clientHeight;
            if (event.type === "scroll") {
                currentScrolling = window.pageYOffset || document.documentElement.scrollTop;
                currentProgress = currentScrolling / ((documentHeight - screenHeight) / 100);
                target.style.width = currentProgress + "%";
            }
        }
    };
}());