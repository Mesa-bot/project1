import Button from "sap/m/Button";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";
import UI5Element from "sap/ui/core/Element";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace project1.controller
 */
export default class home extends Controller {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  public onInit(): void {
    console.log("Controller Init!");
  }

  public onShowMessage(): void {
    const input = this.getView()?.byId("inputField") as Input;
    const userInput = input.getValue();
    const button = this.getView()?.byId("button1") as Button;
    const newText =
      button.getText() === "Press me lol!" ? "Click Me!" : "Press me lol!";
    if (userInput.trim() !== "") {
      MessageToast.show(`You entered: ${userInput}`);
    } else {
      MessageToast.show("Please enter a message first.");
    }
    input.setValue("");
    button.setText(newText);
  }
}
