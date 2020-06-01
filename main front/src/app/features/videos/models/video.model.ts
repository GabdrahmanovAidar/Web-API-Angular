interface Video {
    id: string;
    extension: string;
    source: string;
    sizeInBytes?: number;
    width?: number;
    height?: number;
    duration: number;
    contentType: string;
}
