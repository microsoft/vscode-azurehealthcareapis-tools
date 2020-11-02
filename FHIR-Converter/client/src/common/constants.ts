export enum ConverterError{
	createConverterWorkspaceError = "error.createConverterWorkspace",
	refreshPreviewError = "error.refreshPreview",
	selectDataError = "error.selectData",
	selectTemplateError = "error.selectTemplate",
	updateTemplateFolderError = "error.selectTemplate",
	updateConfiguration = "error.updateConfiguration"
}

export enum Status { 
    Fail = "Fail", 
    OK = "OK" 
}

export enum FileType { 
    template = 'template', 
    data = 'data' 
}
