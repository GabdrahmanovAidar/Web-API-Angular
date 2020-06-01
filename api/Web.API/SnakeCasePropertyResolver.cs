using System;
using System.Collections.Generic;
using System.Text;
using System.Reflection;
using System.Linq.Expressions;
using FluentValidation.Internal;

namespace Web
{
    public class SnakeCasePropertyResolver
    {
        public static string ResolvePropertyName(Type type, MemberInfo memberInfo, LambdaExpression expression)
        {
            return ToSnakeCase(DefaultPropertyNameResolver(type, memberInfo, expression));
        }

        private static string DefaultPropertyNameResolver(Type type, MemberInfo memberInfo, LambdaExpression expression)
        {
            if (expression == null) return memberInfo != null ? memberInfo.Name : null;
            var chain = PropertyChain.FromExpression(expression);
            if (chain.Count > 0) return chain.ToString();

            return memberInfo != null ? memberInfo.Name : null;
        }

        public static string GetSerializedName(string propertyName)
        {
            return ToSnakeCase(propertyName);
        }

        private static string ToSnakeCase(string propertyName)
        {
            var parts = new List<string>();
            var currentWord = new StringBuilder();

            foreach (var c in propertyName)
            {
                if (char.IsUpper(c) && currentWord.Length > 0)
                {
                    parts.Add(currentWord.ToString());
                    currentWord.Clear();
                }

                currentWord.Append(char.ToLower(c));
            }

            if (currentWord.Length > 0)
            {
                parts.Add(currentWord.ToString());
            }

            return string.Join("_", parts.ToArray());
        }
    }
}