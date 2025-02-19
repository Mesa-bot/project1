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

  public updateTaskCount(): void {
    const tasks = this.taskModel.getProperty("/tasks") as {
      task: string;
    }[];
    this.taskModel.setProperty("/taskCount", tasks.length);
  }

  public onInit(): void {
    console.log("Controller Init!");
    this.taskModel = new JSONModel({
      tasks: [
        { task: "learn SAP UI5", completed: false },
        { task: "Practice TypeScript", completed: true },
        { task: "Build a UI5 App", completed: true },
      ],
      taskCount: 0,
    });

    this.getView()?.setModel(this.taskModel);
  }

  public onBeforeRendering(): void | undefined {
    console.log("onBeforeRendering triggered!");
    this.updateTaskCount();
  }
  public onAddTask() {
    const input = this.getView()?.byId("idTaskInput") as Input;
    const newTask = input.getValue().trim();

    //get the current tasks
    const tasks = this.taskModel.getProperty("/tasks") as {
      task: string;
    }[];

    // Function to check if the task already exists
    function checkCopy(): boolean {
      return tasks.some(
        (taskObj: { task: string }) => taskObj.task === newTask
      );
    }

    //check if input ist empty
    if (!newTask) {
      MessageToast.show("Please enter a Task!");
      return;
    }

    //check if task already exists
    if (checkCopy()) {
      MessageToast.show("That task already exists!");
      return;
    }
    //enable button after valid input

    tasks.push({ task: newTask });
    this.taskModel.setProperty("/tasks", tasks);

    //success message clear input
    MessageToast.show("Added Task!");
    this.updateTaskCount();
    input.setValue("");

    //disable button
  }

  public onInputChange(): void {
    const input = this.getView()?.byId("idTaskInput") as Input;
    const newTask = input.getValue().trim();
    const button = this.getView()?.byId("addTaskButton") as Button;
    const tasks = this.taskModel.getProperty("/tasks") as {
      task: string;
    }[];
    function checkCopy(): boolean {
      return tasks.some(
        (taskObj: { task: string }) => taskObj.task === newTask
      );
    }
    if (!newTask || checkCopy()) {
      button.setProperty("enabled", false);
      return;
    }

    button.setProperty("enabled", true);
    return;
  }
}
