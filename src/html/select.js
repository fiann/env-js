$debug("Defining HTMLSelectElement");
/*
* HTMLSelectElement - DOM Level 2
*/
var HTMLSelectElement = function(ownerDocument) {
    this.HTMLTypeValueInputs = HTMLTypeValueInputs;
    this.HTMLTypeValueInputs(ownerDocument);

    this._oldIndex = -1;
};
HTMLSelectElement.prototype = new HTMLTypeValueInputs;
__extend__(HTMLSelectElement.prototype, inputElements_dataProperties);
__extend__(HTMLButtonElement.prototype, inputElements_size);
__extend__(HTMLSelectElement.prototype, inputElements_onchange);
__extend__(HTMLSelectElement.prototype, inputElements_focusEvents);
__extend__(HTMLSelectElement.prototype, {

    // over-ride the value setter in HTMLTypeValueInputs
    set value(newValue) {
        var options = this.options,
            i, index;
        for (i=0; i<options.length; i++) {
            if (options[i].value == newValue) {
                index = i;
                break;
            }
        }
        if (index !== undefined) {
            this.setAttribute('value', newValue);
            this.selectedIndex = index;

            var event = document.createEvent();
            event.initEvent("change");
            this.dispatchEvent( event );
        }
    },
    get value() {
        var value = this.getAttribute('value');
        if (value === undefined || value === null) {
            var index = this.selectedIndex;
            return (index != -1) ? this.options[index].value : "";
        } else {
            return value;
        }
    },


    get length(){
        return this.options.length;
    },
    get multiple(){
        return this.getAttribute('multiple');
    },
    set multiple(value){
        this.setAttribute('multiple',value);
    },
    get options(){
        return this.getElementsByTagName('option');
    },
    get selectedIndex(){
        var options = this.options;
        for(var i=0;i<options.length;i++){
            if(options[i].selected){
                return i;
            }
        };
        return -1;
    },
    
    set selectedIndex(value) {
        var i;
        for (i=0; i<this.options.length; i++) {
            this.options[i].selected = (i == Number(value));
        }
    },
    get type(){
        var type = this.getAttribute('type');
        return type?type:'select-one';
    },

    add : function(){
        __add__(this);
    },
    remove : function(){
        __remove__(this);
    }
});

$w.HTMLSelectElement = HTMLSelectElement;

