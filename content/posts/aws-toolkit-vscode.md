---
title: "Aws Toolkit and VSCode"
date: 2022-05-12T13:09:27+01:00
draft: false
tags: ["devops"]
---

# Overview

This website references APIs hosted on AWS, utilising both Lambda Functions and API Gateway. To improve development and testing times I recently started using the AWS Toolkit for Visual Studio Code. This is an extension that allows users to interact directly with the following services from their IDE:

- AWS Elastic Beanstalk
- AWS Lambda and Amazon API Gateway
- Amazon Elastic Container Service
- AWS Explorer
- CloudFormation Editor
- Project Templates

More information on the AWS Toolkit for Visual Studio Code fro [AWS](https://aws.amazon.com/visualstudio/) and [Microsoft](https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode).

# Installation

Installation of the extension is easy. Within Visual Studio Code > Extensions > Search for `AWS Toolkit` > Install. Once installed, open the extension from the AWS icon in the same panel as the Extensions icon. Users can select a profile from their existing setup, whatever is in `~/.aws/config`.

Users can now interact with the above AWS services directly from their IDE.

# Usage

One way i've streamlined my own development is invoking Lambda Functions with test events which are stored alognside the Function code.

The Toolkit has streamlined my development in the following ways:

- Invoke Lambda Functions with custom test events which I now store alongside my code
- Viewing CloudWatch Log Streams for Lambda Functions
- View the content of S3 Buckets (including images)
