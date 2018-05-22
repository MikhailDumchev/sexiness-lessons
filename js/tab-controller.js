function TabController() {
    var containerClassName = "tab-controller";
    this.ContainerClassName = function(value) {
        if (!arguments.length) return containerClassName;
        else containerClassName = value;
    };
    var pageClassName = "tab";
    this.PageClassName = function(value) {
        if (!arguments.length) return pageClassName;
        else pageClassName = value;
    };
    var callerClassName = "tab-caller";
    var attributeTitle = "data-reference";
    var activeClassName = "active";
    var indicatorTitle = "data-indicator";
    var internalContainerClassName = "tabs-panel";
    var internalContainer = new Object();
    var container = new Object();
    this.initialize = function(element) {
        var additoryVariable = new Object();
        var indicator = false;
        var counter = 0;
        if (!element) {
            additoryVariable = selectElementByClassName(containerClassName);
            if (additoryVariable.status) {
                container = additoryVariable.element;
                indicator = true;
            } else notify(containerClassName, 2);
        } else {
            if (testClassName(element, containerClassName)) {
                container = element;
                indicator = true;
            } else notify(containerClassName, 1);
        }
        if (indicator) {
            additoryVariable = container.getElementsByClassName(callerClassName);
            for (counter = 0; counter < additoryVariable.length; counter++) {
                if (additoryVariable[counter].hasAttribute(attributeTitle)) {
                    additoryVariable[counter].addEventListener("click", this, true);
                }
            }
            additoryVariable = selectElementByClassName(internalContainerClassName, container);
            if (additoryVariable.status) {
                internalContainer = additoryVariable.element;
                additoryVariable = container.getElementsByClassName(pageClassName);
                internalContainer.style.height = calculateHeight(additoryVariable) + "px";
            }
        }
    };
    var calculateHeight = function(elements) {
        var element = new Object();
        var counter = 0;
        var maximumHeight = elements[counter].clientHeight;
        var indicator = false;
        for (counter = 1; counter < elements.length; counter++) {
            element = elements[counter];
            if (window.getComputedStyle(element, "").display === "none") {
                element.style.position = "absolute";
                element.style.width = 100 + "%";
                element.style.left = -100 + "%";
                element.style.display = "block";
                indicator = true;
            }
            if (maximumHeight < element.clientHeight) {
                maximumHeight = element.clientHeight;
            }
            if (indicator) {
                clearStyleAttribute(element, ["display", "left", "position", "width"]);
                indicator = false;
            }
        }
        return maximumHeight;
    };
    this.changeTab = function(element) {
        var additoryVariable = selectElementByClassName(pageClassName + " " + activeClassName, container);
        if (additoryVariable.status) {
            opacityAnimationCall(additoryVariable.element, 500, 0);
            window.setTimeout(function() {
                clearClassName(additoryVariable.element, activeClassName);
                clearStyleAttribute(additoryVariable.element, ["opacity"]);
                additoryVariable = document.getElementById(element.getAttribute(attributeTitle));
                if (additoryVariable) {
                    additoryVariable.style.display = "block";
                    additoryVariable.style.opacity = 0;
                    opacityAnimationCall(additoryVariable, 500, 1);
                    window.setTimeout(function() {
                        addClassName(additoryVariable, activeClassName);
                        clearStyleAttribute(additoryVariable, ["opacity", "display"]);
                        document.body.removeAttribute(indicatorTitle);
                    }.bind(this), 500 + 10);
                }
            }.bind(this), 500 + 10);
        }
    };
    var activateCaller = function(element) {
        var additoryVariable = selectElementByClassName(callerClassName + " " + activeClassName, container);
        if (additoryVariable.status) {
            clearClassName(additoryVariable.element, activeClassName);
        }
        addClassName(element, activeClassName);
    };
    this.handleEvent = function(event) {
        event = event || window.event;
        var element = event.target;
        if (event.type === "click") {
            if (!document.body.hasAttribute(indicatorTitle)) {
                document.body.setAttribute(indicatorTitle, true);
                activateCaller(element);
                this.changeTab(element);
            }
        }
    };
}