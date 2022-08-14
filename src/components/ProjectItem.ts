import Component from "./Component.js";
import Project from "./Project.js";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
	private project: Project;

	constructor(hostId: string, project: Project) {
		super("single-project", hostId, false, project.id);
		this.project = project;

		this.configure();
		this.renderContent();
	}

	configure() {}

	renderContent() {
		console.log(this.project.title);
		this.element.querySelector("h2")!.textContent = this.project.title;
		this.element.querySelector("h3")!.textContent = this.project.people.toString();
		this.element.querySelector("p")!.textContent = this.project.description;
	}
}

export default ProjectItem;
