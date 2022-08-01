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

	private submitHandler(event: Event) {
		event.preventDefault();
	}

	private configure() {
		this.element.addEventListener("submit", this.submitHandler.bind(this));
	}

	private attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.element);
	}
}

const projectInput = new ProjectInput();
