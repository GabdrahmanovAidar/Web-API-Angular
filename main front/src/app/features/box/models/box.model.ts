import { Photo } from '../../stock/models/photo.model';

export class Box {
    public id: number;
    public name: string;
    public cost: number;
    public avaliability: string;
    public checkpointsCount: number;
    public createdDate: string;
    public description: string;
    public status: string;
    public newCost: number;
    public mainImage: Photo[];
    public isShowCSS = false;
    public rating?: number;
}