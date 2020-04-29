using System.IO;
using System.Threading.Tasks;
using TagLib;

namespace Interfaces
{
    public interface IFileMetadataReader
    {
        AudioMeta GetAudioMetaData(byte[] file, string fileName);
        ImageMeta GetPhotoMetaData(byte[] file, string fileName);
        VideoMeta GetVideoMetaData(byte[] file, string fileName);
        MediaTypes GetMediaType(byte[] file, string fileName);
    }

    public class FileMetadataReader : IFileMetadataReader
    {
        public AudioMeta GetAudioMetaData(byte[] file, string fileName)
        {
            var tagFile = TagLib.File.Create(new FileAbstraction(file, fileName));
            return new AudioMeta
            {
                Bitrate = tagFile.Properties.AudioBitrate,
                Duration = tagFile.Properties.Duration.TotalSeconds
            };
        }

        public ImageMeta GetPhotoMetaData(byte[] file, string fileName)
        {
            var tagFile = TagLib.File.Create(new FileAbstraction(file, fileName));

            return new ImageMeta
            {
                Height = tagFile.Properties.PhotoHeight,
                Width = tagFile.Properties.PhotoWidth
            };
        }

        public VideoMeta GetVideoMetaData(byte[] file, string fileName)
        {
            var tagFile = TagLib.File.Create(new FileAbstraction(file, fileName));
            return new VideoMeta
            {
                Duration = tagFile.Properties.Duration.TotalSeconds,
                Height = tagFile.Properties.VideoHeight,
                Width = tagFile.Properties.VideoWidth
            };
        }

        public MediaTypes GetMediaType(byte[] file, string fileName)
        {
            var tagFile = TagLib.File.Create(new FileAbstraction(file, fileName));
            return tagFile.Properties.MediaTypes;
        }
    }

    public class FileAbstraction : TagLib.File.IFileAbstraction
    {
        public FileAbstraction(byte[] file, string fileName)
        {
            File = file;
            Name = fileName;
        }

        public byte[] File { get; }

        public Stream ReadStream => new MemoryStream(File);

        public Stream WriteStream => new MemoryStream(File);

        public string Name { get; }

        public void CloseStream(Stream stream)
        {
            stream.Close();
        }
    }

    public class VideoMeta
    {
        public double Duration { get; set; }
        public int Width { get; internal set; }
        public int Height { get; internal set; }
    }

    public class AudioMeta
    {
        public double Duration { get; internal set; }
        public int Bitrate { get; internal set; }
    }

    public class ImageMeta
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}