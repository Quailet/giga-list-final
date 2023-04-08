import Cookies from "../js/js.cookie.mjs";

let taskTable;

Cookies.get("lista") ? (taskTable = JSON.parse(Cookies.get("lista"))) : (taskTable = ["your tasks"]);

class Builder {
	constructor(element) {
		this.element = element;
	}

	static createP(text) {
		const p = document.createElement("p");

		p.textContent = text;
		p.setAttribute("class", "task-display-p");

		return p;
	}

	static createDiv() {
		const div = document.createElement("div");

		div.setAttribute("class", "task-display-div");

		return div;
	}

	static createButton() {
		const button = document.createElement("button");

		button.setAttribute("class", "task-delete");
		button.textContent = "Delete task";

		return button;
	}

	static createTask(text) {
		const task = Builder.createDiv();

		task.appendChild(Builder.createP(text));
		task.appendChild(Builder.createButton());

		return task;
	}

	deleteTask() {}

	displayTasks() {
		while (this.element.firstChild) {
			this.element.firstChild.remove();
		}

		taskTable.forEach((e) => {
			this.element.appendChild(Builder.createTask(e));
		});

		addDeleteListeners();
	}
}

function addDeleteListeners() {
	document.querySelectorAll(".task-delete").forEach((e, index) => {
		e.addEventListener("click", () => {
			e.parentElement.remove();

			taskTable.splice(index, 1);

			Cookies.set("lista", taskTable, { expires: 54 });

			addDeleteListeners();
		});
	});
}

const TaskEntity = new Builder(document.querySelector(".task-display"));

TaskEntity.displayTasks();

const addButton = document.querySelector(".task-add");

addButton.addEventListener("click", () => {
	let input = document.querySelector(".task-input");

	if (!input.value) return;

	taskTable.push(input.value);

	Cookies.set("lista", taskTable, { expires: 54 });

	console.log(Cookies.get("lista"));

	TaskEntity.displayTasks();

	input.value = "";
});
