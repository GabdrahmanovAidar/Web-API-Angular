interface News {
    id?: string;
    title: string;
    description: string;
    covers: Cover[];
    videos: Videos[];
    createdDat?: Date;
    status: string;
}

interface Cover {
    id: string;
    extension: string;
    source: string;
    sizeInBytes?: number;
    width?: number;
    height?: number;
}

interface Videos {
    id: string;
    extension: string;
    source: string;
    sizeInBytes?: number;
    width?: number;
    height?: number;
    duration: number;
    contentType: string;
}
