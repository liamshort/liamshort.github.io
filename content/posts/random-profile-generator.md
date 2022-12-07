---
title: "Random Profile Generator"
date: 2022-03-04T13:09:27+01:00
draft: false
tags: ["aws"]
---

# Overview

The website [thispersondoesnotexist.com](thispersondoesnotexist.com) is amazing, displaying a truly lifelike image of someone who does not exist. Developer by Nividia, this technology was intended for game design. The underlying code for the face generation can be found at [SyleGen](https://github.com/NVlabs/stylegan?fbclid=IwAR1qJiZfqcWipbv-LP0sWtw7IdnXzCN0lr9j8M9d2v1y40N41PZuPOeiOl0).

Upon seeing this website back in 2019, the first thing that came to my mind was a random profile generator. What if we could associate some realistic details with a completely non-existent person, making it very tricky to discern if the person actually exists. To accomplish this, I set out to build an API that would return a randomly generated profile.

The API backend comprises of two Lambda Functions, the first is triggered on a schedule to generate profiles, the second queries the database and returns data to the website. The Lambda Function which generates the profile, first queries the [thispersondoesnotexist.com](thispersondoesnotexist.com) to retrieve our random face. The bytes from this image are passed into the AWS Rekognition service to be analysed, returning the estimated `gender` and an `age range` of the face. The age of the face is a random number from the low and high ends of the age range.

We now have an image of a face, a gender and an age. The [randomuser.me](https://randomuser.me/api/) API is queried, passing in the estimated gender, which returns a profile consisting of the following useful details:

- first name
- middle name
- last name
- residence
  - Street
  - City
  - State / County
  - Postcode
  - Country
  - TimeZone
- email address
- nationality

Further information can be found in their [API documentation](https://randomuser.me/documentation).

The image is then uploaded to an S3 Bucket, with a corresponding entry made in a DynamoDB Table. This entry contains the URL of the image along with the name, place of residence and email address of our fictional friend. To facilitate cleanup of old profiles, the S3 Bucket has an associated lifecycle policy to delete objects after 1 day and the DynamoDB Table uses a `ttl` key to delete items after 1 day. This ensures that generated profiles are not retained for more than 1 day.

Originally the API would return a newly generated profile upon each invocation. However, to avoid getting spammed with profile requests, the Lambda Function which generates new profiles is scheduled to run every four hours by an EventBridge Rule. This ensures that the profiles on display are frequently updated.

My website at [liamshort.dev](https://liamshort.dev/profiles) uses JavaScript to invoke the API, which queries the DynamoDB Table and returns the content to the user.
