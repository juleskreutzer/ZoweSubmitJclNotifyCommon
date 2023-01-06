See `extension.ts` for the main code. A command ("Hello World" and "Another Hello World") can be activate to test the code.

## Hello World command
This command submits a job using the `SubmitJobs.submitJclNotifyCommon` method. 

## Another Hello World commnad
This commnad submits a job using the `SubmitJobs.submitJclCommon` method and then wait for the status using the `MonitorJobs.waitForStatusCommon` method.

## What we try to accomplish:
When submitting a job, we want to be notified when the job is complete, e.g. has the OUTPUT status. For this, we use the SubmitJobs class to execute the submitJclNotifyCommon method.

What we expect is that this method will return once the job on the mainframe has reached the OUTPUT status. Instead, the method throws that it is unable to find the job based on the job ID and the job number. We can verify that the job has actually been executed successfully on the mainframe.

