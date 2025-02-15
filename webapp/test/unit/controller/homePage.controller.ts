/*global QUnit*/
import Controller from "project1/controller/home.controller";

QUnit.module("home Controller");

QUnit.test("I should test the home controller", function (assert: Assert) {
	const oAppController = new Controller("home");
	oAppController.onInit();
	assert.ok(oAppController);
});