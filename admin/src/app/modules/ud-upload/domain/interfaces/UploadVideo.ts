export interface UploadVideo {
    id?: string;
    width?: number;
    height?: number;
    extension: string;
    source: string;
    size_in_bytes: number;
    duration: number;
    contentType: string;
}
