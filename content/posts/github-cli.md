---
title: "GitHub CLI"
date: 2022-05-04T13:09:27+01:00
draft: false
tags: ["github"]
---

# Overview

I recently wanted to clone all my repositories from GitHub, easy right? Well, I couldn't find a nice way around it. Apparently there's no built in GitHub functionality for this. So, i tried to write my own Python script to clone all repos via the GitHub API. No Joy. I then stumbled upon the GitHub CLI.

# Installation

The GitHub CLI can be downloaded on a Mac or Linux machine with brew:

```
brew install gh
```

Once installed users can run through the initial setup by running the following and authenticating to GitHub:

```
gh auth login
```

I used a Personal Access Token to authenticate with the above.

# Bulk Operations

Once we have the CLI downloaded and initialised, we can use the power of bash to loop through all our repositories and perform actions in bulk.

To clone all repositories for a personal account, run:

```
gh repo list MY_USERNAME | while read -r repo _; do
    gh repo clone "$repo"
done
```

To break the above command down, we're first listing all repositories for our user, loop through each of the returned repositories, cloning each as we loop through.

To delete all repositories for a personal account (DANGEROUS), run:

```
gh repo list MY_USERNAME | while read -r repo _; do
    gh repo delete "$repo" --confirm
done
```

# Viewing Workflows

To view GitHub Actions workflows for a local repository, run:

```
gh workflow view
```

To check a non local repository, run:

```
gh workflow view --repo MY_REPO_NAME
```
