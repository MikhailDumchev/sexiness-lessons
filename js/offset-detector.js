function OffsetDetector() {
    var activeClassName = "active";
    var targetClassName = "a";
    var attributeTitle = "data-delay";
    var container = "m";
    var containers = new Array();
    this.initialize = function() {
        var counter = 0;
        var additoryVariable = document.getElementsByClassName(container);
        for (counter = 0; counter < additoryVariable.length; counter++) {
            containers.push(additoryVariable[counter]);
        }
        document.addEventListener("scroll", this, true);
    };
    this.handleEvent = function(event) {
        event = event || window.event;
        var currentScrolling = 0;
        var screenHeight = document.documentElement.clientHeight;
        var counter = 0;
        var internalCounter = 0;
        var element = new Array();
        var additoryVariable = new Object();
        if (event.type === "scroll") {
            currentScrolling = window.pageYOffset || document.documentElement.scrollTop;
            for (counter = 0; counter < containers.length; counter++) {
                additoryVariable = calculateOffset(containers[counter]);
                if (currentScrolling + screenHeight >= additoryVariable.top + screenHeight / 2) {
                    additoryVariable = containers[counter].getElementsByClassName(targetClassName);
                    for (internalCounter = 0; internalCounter < additoryVariable.length; internalCounter++) {
                        element = additoryVariable[internalCounter];
                        if (element.hasAttribute(attributeTitle)) {
                            (function(element) {
                                window.setTimeout(function() {
                                    addClassName(element, activeClassName);
                                }, element.getAttribute(attributeTitle) * 50);
                            })(element);
                        } else {
                            addClassName(element, activeClassName);
                        }
                    }
                }
            }
        }
    };
}