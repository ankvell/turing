 var should = require('chai').should();
 var expect = require('chai').expect;

 var turing = require('../src/index');

 describe('turing', function() {

     describe('the turing object', function() {

         it('should be accesible', function() {
             turing.should.exist;
         });

         it('should have a VERSION', function() {
             turing.VERSION.should.exist;
         });
     });

     describe('utility methods', function() {

         describe('extend', function() {

             it('should copy properties from source to destination', function() {
                 var dest = {};
                 var sour = {
                     a: 'a'
                 };

                 turing.extend(dest, sour);

                 dest.should.have.property('a');
             });
         });

         describe('create Class', function() {

             var User, SuperUser;

             beforeEach(function() {
                 User = turing.Class({
                     initialize: function(args) {
                         this.name = args;
                     },

                     getName: function() {
                         return this.name;
                     }
                 });

                 SuperUser = turing.Class(User, {
                     initialize: function() {
                         this.uber('initialize', arguments);
                     },

                     getRole: function() {
                         return 'super user';
                     }
                 });
             });

             it('should inherit properties of one class to another', function() {
                 var supu = new SuperUser('name');

                 supu.should.have.property('getName');
                 supu.should.have.property('getRole');
             });

             it('should always have initialize method', function() {
                 var Horse = turing.Class();
                 var h = new Horse('h');

                 h.should.have.property('initialize');
             });

             it('should have an ability to call parent method (uber)', function() {
                 var u = new User('An')
                 var su = new SuperUser('su');

                 u.getName().should.equal('An');
                 su.getName().should.equal('su');
             });
         });
     });

     describe('enumerable', function() {

         describe('turing.enumerable object', function() {
             it('should be accesible', function() {
                 turing.enumerable.should.exist;
             });
         });

         describe('an array', function() {
             var a = {
                 one: '1',
                 two: '2',
                 three: '3'
             };
             var b = [5, 6, 7, 8, 9, 10];

             it('should iterate with each', function() {
                 var count = 0;
                 turing.enumerable.each(a, function(n) {
                     count += 1;
                 });
                 count.should.equal(3);
             });

             it('should iterate with map', function() {
                 var mapped = turing.enumerable.map(a, function(elem) {
                     return elem + 1;
                 });
                 return mapped.toString.should.equal([11, 21, 31].toString);
             });

             it('should filter arrays', function() {
                 var filtered = turing.enumerable.filter(b, function(elem) {
                     return elem % 2 == 0;
                 });
                 return filtered.toString.should.equal([6, 8, 10].toString);
             });

             it('should filter objects and return a multi-dimensional array', function() {

                 var filteredObj = turing.enumerable.filter(a, function(v, i) {
                     return v > 2;
                 })[0][0];
                 return filteredObj.should.equal('one');

             });

             it('should detect item', function() {
                 var detected = turing.enumerable.detect(['bob', 'sam', 'bill'], function(name) {
                     return name === 'sam';
                 });
                 return detected.should.equal('sam');
             });
         });

     });

 });