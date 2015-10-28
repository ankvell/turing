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
             var a = [1, 2, 3, 4, 5];

             it('should iterate with each', function() {
                 var count = 0;
                 turing.enumerable.each(a, function(n) {
                     count += 1;
                 });
                 return count.should.equal(5);
             });

             it('should iterate with map', function() {
                 return turing.enumerable.map(a, function(n) {
                     return n + 1;
                 });
             });
         });

     });

 });