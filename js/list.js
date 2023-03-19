const taskTable = [
	"asd",
	"233rsdfaaaaaaaaaaaaaaaaaaaaaaaaa afsdasfdasfsfsfdsafasdsdioioioioioioioioioioioioioioioioioioioioioioioioioioiob aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfg fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
	"233rsdfaaaaaaaaaaaaaaaaaaaaaaaaa afsdasfdasfsfsfdsafasdsdioioioioioioioioioioioioioioioioioioioioioioioioioioiob aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfg fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
	"233rsdfaaaaaaaaaaaaaaaaaaaaaaaaa afsdasfdasfsfsfdsafasdsdioioioioioioioioioioioioioioioioioioioioioioioioioioiob aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfg fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
	"233rsdfaaaaaaaaaaaaaaaaaaaaaaaaa afsdasfdasfsfsfdsafasdsdioioioioioioioioioioioioioioioioioioioioioioioioioioiob aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfg fsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
];

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

		button.setAttribute("class", "task-display-button");
		button.textContent = "Delete task";

		return button;
	}

	static createTask(text) {
		const task = Builder.createDiv();

		task.appendChild(Builder.createP(text));
		task.appendChild(Builder.createButton());

		return task;
	}

	deleteTasks() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}

		return this;
	}

	addTasks(table) {
		table.forEach((e) => {
			this.element.appendChild(Builder.createTask(e));
		});

		return this;
	}

	displayTasks() {
		this.deleteTasks().addTasks(taskTable);
	}
}

const TaskEntity = new Builder(document.querySelector(".task-display"));

TaskEntity.displayTasks();

addButton = document.querySelector(".task-add");

addButton.addEventListener("click", () => {
	input = document.querySelector(".task-input");

	taskTable.push(input.value);

	TaskEntity.displayTasks();

	input.value = "";
});
