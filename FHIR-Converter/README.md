# FHIR Converter VS Code extension

[![Build Status](https://microsofthealth.visualstudio.com/Health/_apis/build/status/Resolute/Converter/microsoft.vscode-azurehealthcareapis-tools?branchName=personal%2Fyankhuan%2Fconverter-vsc-extension)](https://microsofthealth.visualstudio.com/Health/_build/latest?definitionId=531&branchName=personal%2Fyankhuan%2Fconverter-vsc-extension)

FHIR Converter VS Code Extension accompanies the following Microsoft products:
1. [Azure API for FHIR](https://azure.microsoft.com/en-us/services/azure-api-for-fhir/):  A managed, standards-based, compliant API for clinical health data that enables solutions for actionable analytics and machine learning. 
1. [FHIR Server for Azure](https://github.com/microsoft/fhir-server): An open-source implementation of the [HL7 FHIR](https://www.hl7.org/fhir/) specification designed for the Microsoft cloud.
1. [FHIR Converter OSS](https://github.com/microsoft/FHIR-Converter): An open-source project that enables  conversion of health data from legacy format to FHIR. 
 
The three products have the capability to convert HL7v2 data to FHIR bundles using [Liquid](https://shopify.github.io/liquid/) templates. Microsoft publishes ready-to-use Liquid templates for HL7v2 to FHIR conversion.

This extension provides an interactive editing and verification experience to create new templates and customize the default templates to meet specific needs.

## Getting started

After you have installed the extension, follow these steps to edit the templates:

1. Obtain [sample HL7v2 data files](https://github.com/microsoft/FHIR-Converter/tree/dotliquid/data/SampleData), and put it in a local folder.
1. Fetch [default templates](https://github.com/microsoft/FHIR-Converter/tree/dotliquid/data/Templates) published by Microsoft and store it in another folder.
1. Go to VS Code, and create a new converter workspace by pressing CTRL+W. Select the template and the data folder during the process.
1. Select root template file and the test data file using context menu. 
1. Convert data by pressing CTRL+R or context menu. After converting, the extension should open a 3-pane view having data, template, and converted FHIR bundle in the views.
1. Edit template, and/or data files and press CTRL+R to refresh the output. The output pane should get refreshed and highlight changes in the output.
1. Save the changed templates for subsequent use.

See relevant service documentation for using the templates in data conversion process: 

1. [FHIR Converter with Liquid Engine](https://github.com/microsoft/FHIR-Converter/tree/dotliquid)


## How to guide

### 1. Create a converter workspace

If the converter workspace has not been created, you need to create a new converter workspace by triggering the command `FHIR Converter: Create a converter workspace (Ctrl + W)` .

After triggering the command, some actions need to be completed for creating a converter workspace as follows:

- First, select a root template folder.

- Second, select a root data folder.
  
- Third, select a workspace folder to store the workspace configuration file, and then input the file name for the workspace (*.fhir-converter.code-workspace).

After that, the configuration file of the converter workspace will be saved in the workspace path, and the converter workspace will be opened in the window, which will contain the template folder and the data folder. 

The first folder in the workspace is default to template folder and you can add multiple data folders after template folder in a converter workspace.
  
![workspace](FHIR-Converter/assets/workspace.gif)

### 2. Open/Switch a converter workspace

If there is already a converter workspace in the file system, we can start it in many ways such as, double-clicking on the workspace configuration file, or opening the VS Code to trigger the commands `Workspaces: Open Workspace` and `File: Open Recent`.

If a converter workspace is already opened and you want to switch to another converter workspace, you can do so by triggering the commands `Workspaces: Open Workspace` and `File: Open Recent`. It will close the current workspace and open the new workspace.

![open-switch-workspace](FHIR-Converter/assets/open-switch-workspace.gif)

### 3. Convert the HL7v2 messages into FHIR bundles

In a converter workspace, template files and data files are shown in the explorer view. To start template editing, select a template file and a data file.

To select a dotliquid file having extension `.liquid` as the root template file, right click on the file in the explorer view and select the menu item `FHIR Converter: Select as template (*.liquid)`. Similarly, to select a data file, right click on the data file having extension `.hl7` and select the menu item `FHIR Converter: Select as data file (*.hl7)`.

Both templates and data are necessary, and you can view the selected files in the status bar before converting Data. If one of them is missing, you will be prompted to select the missing one. If both template and data file are selected, you can convert data by selecting the context menu item `FHIR Converter: Convert data` or using the keyboard shortcut (`Ctrl + R`), and the result will be shown in results pane.

![conversion](FHIR-Converter/assets/conversion.gif)

### 4. Modify the selected data and templates

After modifying the templates or the data, you can convert data by selecting the context menu item `FHIR Converter: Convert data` or using the keyboard shortcut (`Ctrl + R`) in the same way. A differential view for the conversion result will be shown in the result tab highlighting the differences from the last run. You can jump to the previous or the next changes using the icons in the upper right corner. Differential view is turned on by default, and if you don't need this feature, you can deselect the option called `Enable Diff View` in `Preferences > Settings > Workspace > Extensions > FHIR Converter` or add a setting `"microsoft.health.fhir.converter.enableDiffView": false` in the workspace settings.

After modifying the templates or data, remember to save the template files or data because the templates and data on the file system are used during the conversion process. If there are some unsaved templates or data, the user will be prompted to save these unsaved templates or data.


![editing](FHIR-Converter/assets/editing.gif)

If you want to jump into the snippet templates to make some modification, you can select the context menu item `Go to Definition (F12)`  or using the keyborad shortcut `Ctrl + Click` when hovering over the snippet templates. If you just hover over the snippet templates and press `Ctrl`, a quick content preview of snippet templates will be shown for you.

Currently, the following features for snippet templates editing are supported:

- Jumping into the snippet templates
- Quick content preview of snippet templates
- Checking if snippet templates exist
- Auto completion of snippet templates

![snippet-templates-editing](FHIR-Converter/assets/snippet-templates-editing.gif)

### 5. Update the template folder

You can use the command `FHIR Converter: Update template folder (Ctrl + U)` to update the template folder. In addition, you can also set it through the setting panel of VS Code.
![update-template-folder](FHIR-Converter/assets/update-template-folder.gif)

## Other useful extensions

You may want to install other extensions from the marketplace to obtain some language support, such as syntax highlighting, for `.hl7` and `.liquid` files.

- `HL7Tools` provides some basic language support for `.hl7` files
- `Liquid Languages Support` provides some basic language support for `.liquid` files.

## Contributing

### Legal

Before we can accept your pull request you will need to sign a **Contribution License Agreement**. All you need to do is to submit a pull request, then the PR will get appropriately labelled (e.g. `cla-required`, `cla-norequired`, `cla-signed`, `cla-already-signed`). If you already signed the agreement we will continue with reviewing the PR, otherwise system will tell you how you can sign the CLA. Once you sign the CLA all future PR's will be labeled as `cla-signed`.

### Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Telemetry

VS Code collects usage data and sends it to Microsoft to help improve our products and services. Read our [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) to learn more. If you don't wish to send usage data to Microsoft, you can set the `telemetry.enableTelemetry` setting to `false`. Learn more in our [FAQ](https://code.visualstudio.com/docs/supporting/faq#_how-to-disable-telemetry-reporting).

## License

[MIT](FHIR-Converter/LICENSE)
