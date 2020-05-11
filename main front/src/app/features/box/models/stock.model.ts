import { Box } from './box.model';
import { Quest } from '../../quest/models/quest.model';

export class Stock {
    public id: number;
    public name: string;
    public boxModels: Box[];
    public questModels: Quest[];

}