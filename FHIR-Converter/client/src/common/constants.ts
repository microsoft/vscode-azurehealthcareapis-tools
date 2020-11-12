import * as path from 'path';

export const TemplateFileExt = '.liquid';
export const ConfigurationTemplateFolderKey = 'templateFolder';
export const ConfigurationResultFolderKey = 'resultFolder';
export const ConfigurationSection = 'fhirConverter';
export const DefaultResultFolderName = 'fhirConverterResult';
export const WorkspaceStateTemplateKey = 'microsoft.health.fhir.converter.activeTemplatePath';
export const WorkspaceStateDataKey = 'microsoft.health.fhir.converter.activeDataPath';
export const DefaultEngineResultFile = 'temp.json';
export const DefaultHl7v2ExePath = path.join(__dirname, '../../engine/Microsoft.Health.Fhir.Converter.Tool.exe');
