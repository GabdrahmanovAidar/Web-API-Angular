import { Photo } from '../../stock/models/photo.model';
import { Stock } from '../../box/models/stock.model';

export class Quest {
    public id: number;
    public name: string;
    public cost: number;
    public mainImage: Photo[];
    public description: string;
    public type: string;
    public newCost: number;
    public isShowCSS = false;
    public questModels: Stock[]
    public checkpointsCount: number;
    public rating?: number;

}