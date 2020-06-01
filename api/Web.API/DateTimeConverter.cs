using System;
using Newtonsoft.Json;

namespace Web.API
{
    public class DateTimeConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(DateTime)
                   || objectType == typeof(DateTime?);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue,
            JsonSerializer serializer)
        {
            if (reader.Value != null && DateTime.TryParse(reader.Value.ToString(), out var date))
                return Convert.ToDateTime(reader.Value);
            if (objectType == typeof(DateTime))
            {
                return new DateTime();
            }

            if (objectType == typeof(DateTime?))
            {
                return null;
            }

            return null;
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(value);
        }
    }
}