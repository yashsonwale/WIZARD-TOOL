/*global QUnit*/

sap.ui.define([
	"form/controller/wizardForm.controller"
], function (Controller) {
	"use strict";

	QUnit.module("wizardForm Controller");

	QUnit.test("I should test the wizardForm controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
