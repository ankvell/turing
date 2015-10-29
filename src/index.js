module.exports = {
    VERSION: '0.0.1',

    extend: function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
    },
    Class: function(parent, props) {
        if (arguments.length < 2) {
            props = parent;
            parent = function() {};
        }

        function klass() {
            this.initialize.apply(this, arguments);
        }

        this.extend(klass.prototype, parent.prototype);
        this.extend(klass.prototype, props);

        if (!klass.prototype.initialize) {
            klass.prototype.initialize = function() {};
        }

        klass.prototype.uber = function(method, args) {
            if (method in parent.prototype) {
                parent.prototype[method].apply(this, args);
            } else {
                throw new Error('No such method in parent');
            }
        }
        return klass;
    },

    enumerable: {
        breaker: {},
        isNumber: function(num) {
            return (num === +num) || (toString.call(num) === '[object Number]');
        },
        each: function(array, action) {
            try {
                if (Array.prototype.forEach && array.forEach === Array.prototype.forEach) {
                    array.forEach(action);
                } else if (this.isNumber(array.length)) {
                    for (var ii = 0; ii < array.length; ii++) {
                        action(array[ii]);
                    }
                } else {
                    for (var key in array) {
                        if (hasOwnProperty.call(array, key)) {
                            action(array[key]);
                        }
                    }
                }
            } catch (e) {
                if (e != this.breaker) {
                    throw e;
                }
            }
            return array;
        },
        map: function(array, action) {
            if (Array.prototype.map && array.map === Array.prototype.map) {
                return array.map(action);
            }

            var results = [];
            this.each(array, function(elem) {
                results.push(action(elem));
            });
            return results;
        },
        filter: function(array, action) {
            if (Array.prototype.filter && array.filter === Array.prototype.filter) {
                array.filter(action);
            }

            var results = [];
            this.each(array, function(elem) {
                results.push(action(elem));
            });
            return results;
        }
    }
};