downloadExtractPackage() {
	url=$1
	folder=$2
	if [ ! -d ${folder} ]; then
		mkdir -p ${folder}
	else
		rm -r ${folder}/*
	fi
	curl -L ${url} | tar -xz -C ${folder}
}

ccdaPackageName="CcdaDefaultTemplates.tar.gz"
hl7v2PackageName="Hl7v2DefaultTemplates.tar.gz"
templatesFolder="templates"
releaseUrlPrefix="https://github.com/microsoft/FHIR-Converter/releases/latest/download"
ccdaTemplatesUrl="${releaseUrlPrefix}/${ccdaPackageName}"
hl7v2TemplatesUrl="${releaseUrlPrefix}/${hl7v2PackageName}"
ccdaFolder="${templatesFolder}/C-CDA"
hl7v2Folder="${templatesFolder}/Hl7v2"

downloadExtractPackage ${ccdaTemplatesUrl} ${ccdaFolder}
downloadExtractPackage ${hl7v2TemplatesUrl} ${hl7v2Folder}
