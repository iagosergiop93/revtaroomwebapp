import { TrainingType } from './training-type';

export class UserBio {
	id:number;
	description:string;
	trainingType: TrainingType;

	constructor(id?:number, abtMe?:string, train?:TrainingType){
		this.id = id || 1;
		this.description = abtMe || " ";
		this.trainingType = train || new TrainingType(4,'ANGULAR');
	}
}
