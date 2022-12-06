---
title: "S3 Multi-Part Upload"
date: 2022-07-20T13:09:27+01:00
draft: true
tags: ["aws"]
---

- Get the md5 hash of the original file

  - run: `md5 upload.zip`
  - output: `<MD5_HASH_ORIGINAL>`

- Split the original file into chunks

  - run: `split -b 500m upload.zip`

- Get the md5 hash of the new file parts (part 1)

  - run: `md5 xaa`
  - output: `<MD5_HASH_PART_1>`

- Get the md5 hash of the new file parts (part 2)

  - run: `md5 xab`
  - output: `<MD5_HASH_PART_2>`

- Create our multi-part upload

  - run: `aws s3api create-multipart-upload --bucket <BUCKET_NAME> --key upload.zip --metadata md5=<MD5_HASH_ORIGINAL>`

- Check the multi-part upload has been registered

  - run: `aws s3api list-multipart-uploads --bucket <BUCKET_NAME>`

- Upload the part 1:

  - run: `aws s3api upload-part --bucket <BUCKET_NAME> --key upload.zip --part-number 1 --body xaa --upload-id "<UPLOAD_ID>"`
  - output: `etag - \<MD5_HASH_PART_1>\`

- Upload the part 2:

  - run: `aws s3api upload-part --bucket <BUCKET_NAME> --key upload.zip --part-number 2 --body xab --upload-id "<UPLOAD_ID>"`
  - output: `etag - \<MD5_HASH_PART_2>\`

- Confirm the parts have been uploaded to S3 (check MD5s from S3 against the locals)

  - run: `aws s3api list-parts --bucket <BUCKET_NAME> --key upload.zip --upload-id <UPLOAD_ID>`

- Extract the Parts section of the previous output and put them in a new `parts.json` file

```
{
    "Parts": [
        {
            "PartNumber": 1,
            "ETag": "\"<MD5_HASH_PART_1>\""
        },
        {
            "PartNumber": 2,
            "ETag": "\"<MD5_HASH_PART_2>\""
        }
    ]
}
```

- Complete the upload:
  - run: `aws s3api complete-multipart-upload --multipart-upload file://parts.json --bucket <BUCKET_NAME> --key upload.zip --upload-id <UPLOAD_ID>`
  - output:

```
{
    "Location": "https://<BUCKET_NAME>.s3.<AWS_REGION>.amazonaws.com/upload.zip",
    "Bucket": "<BUCKET_NAME>",
    "Key": "upload.zip",
    "ETag": "\"5a6bd7c9a7514dfadd8c9a38bb0074cd-2\""
}
```

- Confirm the upload is no longer showing in the Bucket
  - run: `aws s3api list-multipart-uploads --bucket <BUCKET_NAME>`
  - output: none if successful
