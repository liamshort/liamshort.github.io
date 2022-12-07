---
title: "Aws Toolkit and VSCode"
date: 2022-05-12T13:09:27+01:00
draft: false
tags: ["devops"]
---

# Overview

This website uses custom APIs hosted in AWS, built using API Gateway and backend Lambda Functions. To reduce the time taken for development and testing, I recently started using the AWS Toolkit extension for Visual Studio Code, which allows users to interact directly with the following services from their IDE:
- AWS Lambda and Amazon API Gateway
- AWS Elastic Beanstalk
- Amazon Elastic Container Service
- AWS Explorer
- CloudFormation Editor
- Project Templates

Although it is possible to interact with these services via the AWS API, the extension does provide a nice UI.

More information on the AWS Toolkit for Visual Studio Code fro [AWS](https://aws.amazon.com/visualstudio/) and [Microsoft](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode).

# Installation

Installation of the extension is easy. Within Visual Studio Code > Extensions > Search for `AWS Toolkit` > Install. Once installed, open the extension from the AWS icon in the same panel as the Extensions icon. To authenticate, users can choose an existing profile from their config file (`~/.aws/config`). Once authenticated, users can start interacting with services in their AWS account.

# Usage

Store Lambda test payloads alongside your application code, this ensures the test payloads are easily accessibe and version controlled. To test a Lambda Function, open up the toolkit > `Lambda` > right click on my function > `Invoke on AWS` > either paste the payload or upload from file > `Invoke`. The response will be returned in the OUTPUT console of Visual Studio Code.

If CloudWatch Logs are permitted for the Lambda Function, users can view these by opening up the toolkit > `CloudWatch Logs` > right click on a Log Group > `View Log Stream...` > select a Log Stream.

As some of my APIs interact with S3, I can check the contents of a bucket by going into the toolkit > `S3` > select a bucket > select an object. Most filetypes can be viewed using the toolkit, including images.

In addition to interacting with specific AWS services, the toolkit allows users to view the configuration of their AWS resources. Go to the toolkit > `Resources` > select options (the gear) > select a resource (such as S3 bucket, CloudFront Distribution, SNS Topic etc...) > once loaded select the resource instance from the dropdown. Users can now view the configuration of specific resource instances in JSON.