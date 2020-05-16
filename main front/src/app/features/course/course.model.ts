interface Course {
    id?: string;
    name: string;
    description: string;
    courseDuration: string;
    level: string;    
    covers: Cover[];
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

