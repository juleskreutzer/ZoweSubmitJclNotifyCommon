// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as zowe from '@zowe/cli';
import * as path from 'path';
import * as os from 'os';

let jcl = "//KT#JZOWE JOB NLD999910001,'DOREN,H.VAN G1501065',CLASS=F,MSGCLASS=1,\n" +
    "// MSGLEVEL=(1,1),                                                    \n" + 
    "// NOTIFY=ROSPHD,                                                     \n" +
    "// TIME=(00,40)                                                       \n" +
    "//* *******************************************************           \n" +
    "//* **************  VSC GENERATED ZOWE JOB  ***************           \n" +
    "//* *******************************************************           \n" +
    "//ZOWEJOB EXEC PGM=BSZOWE1P,PARMDD=PARMIN                             \n" +
    "//STEPLIB  DD DSN=NL09412W.BTC30.E4638VLP,DISP=SHR                    \n" +
    "//         DD DSN=NL09412W.BTC30.E4638,DISP=SHR        :W/T OMGEVING  \n" +
    "//         DD DSN=NL09412T.BTC30.E4638,DISP=SHR                       \n" +
    "//         DD DSN=NL09412C.BTC30.E4638,DISP=SHR                       \n" +
    "//         DD DSN=SYS1.IDMS.LOAD.ACP,DISP=SHR                         \n" +
    "//W0809O   DD SYSOUT=(1,INTRDR)            : COMPILE JOB DDN          \n" +
    "//PARMIN   DD *                                                       \n" +
    "R276404,GET-INFO,GBR276404,USER";


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zowesubmitjclnotifycommontest" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('zowesubmitjclnotifycommontest.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		await test();
	});

	context.subscriptions.push(disposable);
}


async function test(): Promise<void> {
	const profileInfo = new zowe.imperative.ProfileInfo('zowe');
	await profileInfo.readProfilesFromDisk({
		homeDir: path.join(os.homedir(), '.zowe'),
		projectDir: false
	});

	const zosmfProfAttr = profileInfo.getDefaultProfile('zosmf');
	if (zosmfProfAttr === null) {
		console.error('Unable to load ZOSMF profile');
		return;
	}

	const mergedArgs = profileInfo.mergeArgsForProfile(zosmfProfAttr, { getSecureVals: true } );
	const session = zowe.imperative.ProfileInfo.createSession(mergedArgs.knownArgs);
	try {
		const response = await zowe.SubmitJobs.submitJclNotifyCommon(session, {
			jcl: jcl
		});
		console.log(response);
		vscode.window.showInformationMessage('Job submitted OK, check console log');
	} catch (err) {
		vscode.window.showErrorMessage('Error catched, see log');
		console.error(err);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {}
