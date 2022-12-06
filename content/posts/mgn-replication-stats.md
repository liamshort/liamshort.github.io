---
title: "Get MGN Replication Statistics"
date: 2022-06-18T13:09:27+01:00
draft: false
tags: ["aws", "python"]
---

# Overview

There's no easy way to retrieve the total volume of data replicated via MGN, so i wrote a wee script.

The below Python script fetches data on all source servers replicated to MGN, including disk sizes. It then parses the data and outputs to a CSV file in the local directory.

Users can define in the following parameters:
| Parameter | Description | Default |
|-----------|-------------------------------------------|-----------|
| region | The AWS Region | eu-west-1 |
| output | Name of the CSV output file | mgn_data |
| exclude | List of Source Server IDs to exclude | [] |
| max | Maximum number of Source Servers to Parse | 100 |

The script can be found [here](https://github.com/liamshort/mgn-parser-tool).

# Preqrequisites

- Using Python3
- Assumed into the target AWS account with an identity that permits the `mgn:DescribeSourceServers` action

# Usage

- `gh repo clone liamshort/mgn-parser-tool`
- `cd mgn-parser-tool`
- `pip install -r requirements.txt`
- `python script.py -r <REGION>`
