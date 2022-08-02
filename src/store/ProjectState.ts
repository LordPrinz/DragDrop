class ProjectState {
	private listeners: any[] = [];
	private projects: any[] = [];
	private static instance: ProjectState;
	private id = this.countGenerator();

	private constructor() {}

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	addListener(listenerFn: Function) {
		this.listeners.push(listenerFn);
	}

	addProject(title: string, description: string, numOfPeople: number) {
		const newProject = {
			id: this.id.next().value!.toString(),
			title: title,
			description: description,
			people: numOfPeople,
		};
		this.projects.push(newProject);
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	}

	private *countGenerator() {
		let counter = 0;

		while (true) {
			yield counter++;
		}
	}
}

export default ProjectState;
