const taskTable = ["asd", "233r"];

class Builder {
	constructor(element) {
		this.element = element;
	}

	static createP(text) {
		const p = document.createElement("p");

		p.textContent = text;

		return p;
	}

	deleteTasks() {
		while (this.element.firstChild) {
			this.element.removeChild(this.element.firstChild);
		}

		return this;
	}

	addTasks(table) {
		table.forEach((e) => {
			this.element.appendChild(Builder.createP(e));
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
