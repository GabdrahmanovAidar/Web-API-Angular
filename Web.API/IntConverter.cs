using System;
using Newtonsoft.Json;

namespace Web.API
{
    public class IntConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(int)
                   || objectType == typeof(int?)
                   || objectType == typeof(long)
                   || objectType == typeof(long?);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue,
            JsonSerializer serializer)
        {
            return reader.Value == null ? 0 : TryGetValue(reader.Value);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                writer.WriteValue(0);
            }
            else
            {
                writer.WriteValue(value);
            }
        }

        private int TryGetValue(object value)
        {
            try
            {
                return Convert.ToInt32(value);
            }
            catch
            {
                return 0;
            }
        }
    }
}