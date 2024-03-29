let taskObject;

"lista" in localStorage ? (taskObject = JSON.parse(localStorage.getItem("lista"))) : (taskObject = { taskTable: [], addedTasks: 0, deletedTasks: 0 });

console.log(localStorage.getItem("lista"));
console.log(taskObject);

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

	static addDeleteListeners() {
		document.querySelectorAll(".task-delete").forEach((e, index) => {
			e.addEventListener("click", () => {
				e.parentElement.remove();

				taskObject.taskTable.splice(index, 1);

				showStats();

				localStorage.setItem("lista", JSON.stringify(taskObject));

				Builder.addDeleteListeners();
			});
		});
	}

	displayTasks() {
		while (this.element.firstChild) {
			this.element.firstChild.remove();
		}

		taskObject.taskTable.forEach((e) => {
			this.element.appendChild(Builder.createTask(e));
		});

		document.querySelectorAll(".task-delete").forEach((e) => {
			e.addEventListener("click", () => {
				taskObject.deletedTasks++;
			});
		});

		showStats();

		Builder.addDeleteListeners();
	}
}

const TaskEntity = new Builder(document.querySelector(".task-display"));

TaskEntity.displayTasks();

const addButton = document.querySelector(".task-add");

addButton.addEventListener("click", () => {
	let input = document.querySelector(".task-input");

	if (!input.value) return;

	taskObject.taskTable.push(input.value);
	taskObject.addedTasks++;

	localStorage.setItem("lista", JSON.stringify(taskObject));

	console.log(localStorage.getItem("lista"));
	console.log(taskObject);

	TaskEntity.displayTasks();

	input.value = "";
});

function showStats() {
	document.querySelector(".stats-added > h1").textContent = taskObject.addedTasks;
	document.querySelector(".stats-deleted > h1").textContent = taskObject.deletedTasks;
}
