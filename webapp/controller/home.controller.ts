import Button from "sap/m/Button";
import Input from "sap/m/Input";
import MessageToast from "sap/m/MessageToast";
import UI5Element from "sap/ui/core/Element";
import Controller from "sap/ui/core/mvc/Controller";
import StandardListItem from "sap/m/StandardListItem";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace project1.controller
 */
export default class home extends Controller {
  /*eslint-disable @typescript-eslint/no-empty-function*/
  private taskModel!: JSONModel;

  public onInit(): void {
    console.log("Controller Init!");
    this.taskModel = new JSONModel({
      tasks: [
        { task: "learn SAP UI5", completed: false },
        { task: "Practice TypeScript", completed: true },
        { task: "Build a UI5 App", completed: true },
      ],
    });

    this.getView()?.setModel(this.taskModel);
  }

  public onAddTask() {
    const input = this.getView()?.byId("idTaskInput") as Input;
    const newTask = input.getValue().trim();

    if (!newTask) {
      MessageToast.show("Please enter a Task!");
      return;
    }

    const tasks = this.taskModel.getProperty("/tasks") as {
      task: string;
    }[];

    tasks.push({ task: newTask });

    this.taskModel.setProperty("/tasks", tasks);

    input.setValue("");
  }
}
