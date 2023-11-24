export class TrainingType {

	id: number;
	name: string;

	constructor(id: number, type: string) {
		this.id = id;
		this.name = type;
	}

	toString() {
		return "TrainingType [trainingId=" + this.id + ", trainingType=" + this.name + "]";
	}
}
