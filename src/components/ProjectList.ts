import ProjectState from "../store/ProjectState.js";
import Component from "./Component.js";
import Project, { ProjectStatus } from "./Project.js";

const projectState = ProjectState.getInstance();

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
	assignedProjects: Project[];

	constructor(private type: "active" | "finished") {
		super("project-list", "app", false, `${type}-project`);
		this.assignedProjects = [];

		this.configure();
		this.renderContent();
	}
	configure() {
		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((prj) => {
				if (this.type === "active") {
					return prj.status === ProjectStatus.Active;
				}
				return prj.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector("ul")!.id = listId;
		this.element.querySelector("h2")!.textContent =
			this.type.toUpperCase() + " PROJECTS";
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = "";
		for (const prjItem of this.assignedProjects) {
			const listItem = document.createElement("li");
			listItem.textContent = prjItem.title;
			listEl.appendChild(listItem);
		}
	}
}

export default ProjectList;
