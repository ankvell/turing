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
        isNumber: function(n) {
            return (n === +n) || (toString.call(n) === '[object Number]');
        },
        each: function(obj, iterator, context) {
            try {
                if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
                    obj.forEach(iterator, context);
                } else if (this.isNumber(obl.length)) {
                    for (var i = 0, l = obj.length; i < l; i++) {
                        iterator.call(context, obj[i], i, obj);
                    }
                } else {
                    for (var key in obj) {
                        if (hasOwnProperty.call(obj, key)) {
                            iterator.call(context, obj[key], key, obj);
                        }
                    }
                }
            } catch (e) {
                if (e != this.breaker) {
                    throw e;
                }
            }
            return obj;
        },
        map: function(obj, iterator, context) {
            if (Array.prototype.map && obj.map === Array.prototype.map) {
                return obj.map(iterator, context);
            }

            var results = [];
            this.obj.each(obj, function(value, index, list) {
                results.push(iterator.call(context, value, index, list));
            });
            return results;
        }
    }
};