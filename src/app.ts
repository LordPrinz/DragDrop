// autobind decorator

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

// ProjectInput Class

class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = <HTMLTemplateElement>(
			document.querySelector("#project-input")!
		);
		this.hostElement = <HTMLDivElement>document.querySelector("#app")!;

		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = <HTMLFormElement>importedNode.firstElementChild;
		this.element.id = "user-input";

		this.titleInputElement = <HTMLInputElement>(
			this.element.querySelector("#title")!
		);
		this.descriptionInputElement = <HTMLInputElement>(
			this.element.querySelector("#description")!
		);
		this.peopleInputElement = <HTMLInputElement>(
			this.element.querySelector("#people")!
		);

		this.configure();
		this.attach();
	}

	private gatherUserInput(): [string, string, number] | never {
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		if (
			enteredTitle.trim().length === 0 ||
			enteredDescription.trim().length === 0 ||
			enteredPeople.trim().length === 0
		) {
			throw new Error("Invalid input, please try again!");
		}

		return [enteredTitle, enteredDescription, +enteredPeople];
	}

	private clearInputs() {
		this.titleInputElement.value = "";
		this.descriptionInputElement.value = "";
		this.peopleInputElement.value = "";
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (!Array.isArray(userInput)) {
			return;
		}
		const [title, description, people] = userInput;
		console.log(title, description, people);
		this.clearInputs();
	}

	private configure() {
		this.element.addEventListener("submit", this.submitHandler);
	}

	private attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.element);
	}
}

const projectInput = new ProjectInput();
