---
title: "GitHub Actions and OICD with AWS"
date: 2022-06-12T13:09:27+01:00
draft: false
tags: ["aws", "github"]
---

# The Module

This is a simple Terraform module to deploy an IAM Role which is assumable by GitHub Actions for a specific user or organisation. The module can be found [here](https://github.com/liamshort/tf-mod-github-oidc-role).

To consume the module, invoke as shown below:

```
module "github" {
  source = "github.com/liamshort/tf-mod-github-oidc-role"

  name_prefix       = "MY_NAME_PREFIX"
  github_username   = "MY_GITHUB_USERNAME"
  github_thumbprint = "6938fd4d98bab03faadb97b34396831e3780aea1"
}
```

# Getting the Thumbprint

The process for retrieving the Thumbprint can be found [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc_verify-thumbprint.html).

Run:

```
openssl s_client -servername token.actions.githubusercontent.com -showcerts -connect token.actions.githubusercontent.com:443
```

Copy the cert `1` (from `-----BEGIN CERTIFICATE-----` to `-----END CERTIFICATE-----`), not `0` and paste into the following local file `certificate.crt`. Then Run:

```
openssl x509 -in certificate.crt -fingerprint -noout | cut -f2 -d'=' | tr -d ':' | tr '[:upper:]' '[:lower:]'
```

The resulting string is the Thumbprint for GitHub OIDC.

# Links

More information on GitHub OIDC and Cloud Providers can be found [here](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-cloud-providers).

As noted in their [blog post](https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/), it is possible for the GitHub thumbprint to change. If this changes, users must update the thumprint to maintain access to AWS.
