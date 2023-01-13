version="5.1.0.7"

if [ ! -d "engine-tmp" ]; then
    mkdir ./engine-tmp
fi
curl --location --request GET "https://pkgs.dev.azure.com/microsofthealthoss/FhirConverter/_apis/packaging/feeds/FhirConverterPublic/nuget/packages/Microsoft.Health.Fhir.Liquid.Converter.Tool/versions/${version}/content?api-version=6.0-preview.1" -o ./engine-tmp/engine.nupkg
unzip -o ./engine-tmp/engine.nupkg -d ./engine-tmp
if [ ! -d "engine" ]; then
    mkdir ./engine
else
    rm -r ./engine/*
fi
mv ./engine-tmp/contentFiles/any/netcoreapp*/Microsoft.Health.Fhir.Liquid.Converter.Tool/* ./engine/
rm -r engine-tmp