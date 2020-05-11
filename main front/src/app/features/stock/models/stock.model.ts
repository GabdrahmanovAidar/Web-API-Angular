import { Box } from '../../box/models/box.model';
import { Quest } from '../../quest/models/quest.model';

export class Stock {
    id: number;
    amountPercent: number;
    description: string;
    from: string;
    until:string;
    status: string;
    title:string;
    boxModels:Box[]
    questModels: Quest[]
}
