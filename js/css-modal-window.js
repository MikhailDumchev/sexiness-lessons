function ModalWindow() {
    "use strict";
    var modalWindowClassName = "modal-window";
    var callerClassName = "modal-window-caller";
    var activeWindowClassName = "active";
    var hidingClassName = "hiding";
    var modalWindow = new Object();
    this.initilize = function() {
        var counter = 0;
        var additoryVariable = selectElementByClassName(modalWindowClassName);
        if (additoryVariable.status) {
            modalWindow = additoryVariable.element;
            additoryVariable = document.getElementsByClassName(callerClassName);
            if (additoryVariable.length) {
                for (counter; counter < additoryVariable.length; counter++)
                    additoryVariable[counter].addEventListener("click", this, true);
            }
        }
    };
    this.handleEvent = function(event) {
        event = event || window.event;
        var element = event.target;
        var additoryVariable = searchContainer(element, "class", callerClassName);
        if (additoryVariable.status) element = additoryVariable.element;
        if (testClassName(element, callerClassName)) {
            if (testClassName(modalWindow, activeWindowClassName)) {
                clearClassName(document.body, hidingClassName);
                clearClassName(modalWindow, activeWindowClassName);
            } else {
                setValues(element);
                addClassName(document.body, hidingClassName);
                addClassName(modalWindow, activeWindowClassName);
            }
        }
    };
    var setValues = function(element) {
        var idAttribute = "data-id";
        var titleAttribute = "data-title";
        var targetElementName = "id";
        var titleClassName = "modal-title";
        var additoryVariable = selectElementByClassName(titleClassName, modalWindow);
        if (additoryVariable.status && element.hasAttribute(titleAttribute)) {
            additoryVariable.element.textContent = element.getAttribute(titleAttribute);
        }
        additoryVariable = modalWindow.getElementsByTagName("form")[0];
        if (additoryVariable && element.hasAttribute(idAttribute)) {
            additoryVariable.elements[targetElementName].value = element.getAttribute(idAttribute);
        }
    };
}