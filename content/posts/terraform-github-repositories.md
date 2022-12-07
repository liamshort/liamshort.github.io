---
title: "Terraform and Git Repositories"
date: 2022-02-05T13:09:27+01:00
draft: false
tags: [
    "terraform",
    "github"
]
---

# Overview

Just had a great idea for a new project and want to get coding ASAP? The first task is often setting up a Git repository to host the code. If you're like me and love to tinkerer, you can quickly accumulate repositories which makes things feel cluttered! Why not manage your repositories via Terraform?

[Terraform](https://www.terraform.io/intro), the open source Infrastructure as Code (IaC) tool developed by Hashicorp. Terraform uses Hashicorp Configuration Language (HCL) to define and deploy all manner of things and allows users to create and consume Providers, which are plugins for services like AWS, GCP, Azure, DigitalOcean. You can view all the Official, Verified and community Providers [here](https://registry.terraform.io/browse/providers). Terraform also allows users to create and share their own Modules, bundles of Terraform code designed to perform a specific task. For example, if we needed a CICD pipeline for AWS, we could use [this](https://registry.terraform.io/modules/cloudposse/cicd/aws/latest) module created by CloudPosse. For more information on Terraform modules, look [here](https://www.terraform.io/language/modules).

My first real exposure to Terraform was in 2020, when preparing for a new client engagement I got my Hashicorp Terraform Associate Certification. Before this time I had been working mostly with AWS CloudFormation, which in comparison now feels clunky. To name a few of the features which makes Terraform attractive to me:

- Cloud agnostic, meaning it can be used across all the major CSPs with no vendor lock in
- HCL is logical, it just makes sense
- Modules are insanely useful
- State management is controlled by the user (glad I haven't touched a CloudFormation Stack in years)

[GitHub](https://github.com) is the most popular Git provider, synonymous with Git itself. We can use the [GitHub Provider](https://registry.terraform.io/providers/integrations/github/latest/docs) for Terraform to create and manage various things like Repositories, Actions and User / Organization permissions.

# The Module

I put together a simple Terraform Module which can be used to manage Git repositories for GitHub (the same logic can be applied for other Git management tools such as CodeCommit or Gitea):
- [GitHub](https://github.com/liamshort/tf-mod-github-repos)

## Usage

The modules all follow the same configuration, containing a `config.yml` file which contains the definitions of our repositories in HCL. Based on the contents of this file we can create, update or delete repositories. Below is an example of a GitHub repository definition from the `config.yml`:

```
my-super-cool-repo:
description: Code glorious code
visibility: public
topics: [
    "stuff"
]
has_wiki: true
has_projects: true
has_issues: true
vulnerability_alerts: true
```

## Importing

We can import existing repositories that were created manually, to do this add a definition to the `config.yml` which matches the configuration of the existing repository. The repository can then be imported to the Terraform state by running the `terraform import` command, as shown below:

```
terraform import 'module.github.github_repository.this["my-super-cool-repo"]' my-super-cool-repo
```

Voila! Your repo can now be managed using Terraform. After the import run a `terraform plan` to confirm what differences (if any) Terraform has detected between your code and the actual repository configuration. Terraform will try to resolve these if we run a subsequent `terraform apply`.
