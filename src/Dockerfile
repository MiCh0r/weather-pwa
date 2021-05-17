#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#Build angular ionic
FROM node:16-alpine as buildPwa
WORKDIR /pwa
COPY ./weather-pwa/package*.json /pwa/
RUN npm install npm@latest
RUN npm install -g ionic
RUN npm install
COPY ./weather-pwa /pwa/
RUN npm run-script build --prod --aot

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["WeatherAPI/WeatherAPI.csproj", "."]
RUN dotnet restore "./WeatherAPI.csproj"
COPY ./WeatherAPI .
WORKDIR "/src/."
RUN dotnet build "WeatherAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WeatherAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=buildPwa /pwa/www/ /app/wwwroot
ENTRYPOINT ["dotnet", "WeatherAPI.dll"]