import { IPlatformData } from './platform-data';

export class WindowsPlatformData implements IPlatformData {
	public get orasExecCmd() {
		return 'oras.exe';
	}

	public get openFolderCmd() {
		return 'explorer.exe';
	}

	public get defaultWorkspaceFile() {
		return '';
	}
}
