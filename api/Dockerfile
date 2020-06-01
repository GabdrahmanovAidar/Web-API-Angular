FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 5000

FROM microsoft/dotnet:2.1-sdk AS build

WORKDIR /api
COPY ["Web.API/Web.API.csproj", "Web.API/"]
RUN dotnet restore "Web.API/Web.API.csproj"
COPY . .

WORKDIR "/api/Web.API"
RUN dotnet build "Web.API.csproj" -c Release -o /app
FROM build AS publish
CMD dotnet ef database update

RUN dotnet publish "Web.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Web.API.dll"]

