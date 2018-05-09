# Audio Recorder for Web Browser

This Single Page Javascript Application allows users to record and share audio files directly from the browser.

Deployed Version can be found at: [https://aqueous-headland-54385.herokuapp.com/](https://aqueous-headland-54385.herokuapp.com/)

## Design and Methodology

The application was built using ReactJS with the material-ui-next library. Audio files are streamed and recorded in mp3 format using [WebRTC's Technology](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API). The files are then stored in a publicly accessible AWS S3 Bucket .

## Requirements:

* Web Browser that supports Web RTC (Firefox, Chrome and Opera)
* Machine with working microphone

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need the following programs installed in your machine for the code to work locally:

* Node.js (nodejs.org)
* React.js (reactjs.org)
* Git (git-scm.com)
* AWS Account _with Admin Credentials to create S3 Bucket_
* An IDE _(VSCode, Atom, Sublime, IntelliJ)_
* Command Line Terminal

### Installing

You can setup the repository locally using the following commands:

```
$ git clone https://github.com/danielchengml/audio-recorder
$ cd audio-recorder
$ npm run start
```

* Note that you will need the `AccessId` and `secretAccessKey` which will be same as the S3 bucket for audio storage to work. The credentials can be stored in `/src/config/keys_dev.js` in the following format:

```
module.exports = {
  accessKeyId: "YOUR_AWS_ACCESS_ID",
  secretAccessKey: "YOUR_AWS_SECRET_ACCESS_KEY"
};
```

### Configuring S3 Bucket

The S3 bucket will be configured for public access to allow ease of access. The _Bucket Policy_ and _CORS Configuration_ will be shown below:

#### S3 Bucket Policy

```
{
    "Version": "2012-10-17",
    "Id": "Policy1525826218831",
    "Statement": [
        {
            "Sid": "Stmt1525826211475",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::upload-audio-recording/*",
            "Condition": {
                "StringLike": {
                    "aws:Referer": [
                        "https://aqueous-headland-54385.herokuapp.com/*",
                        "http://localhost:3000/*"
                    ]
                }
            }
        }
    ]
}
```

#### S3 CORS Configuration

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>GET</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

## Ideas for Future Expansion:

Here are some ideas to add functionalities to the application:

### Without User Login Feature

* Add Social Media Sharing capability
* Add Digital Timer
* Add Audio Waveform
* Adding Video Record and storage feature.
* Make the app compatible with Safari and IE

###- Add User Registration and Login Features permanent access to user's files.

* Allow sorting and filtering of audio/video files.
* Allow Users to write/edit notes to each audio/video files.
* Allow keyword Tagging for each audio file.
* Allow Users to communicate and send files to others via the platform.

## Built with

* ReactJS - The Web Framework Used
* NPM - Dependency Management
* AWS S3 - Cloud Storage System

## Versioning

1.0.0

## Authors

* Daniel C Lean - [github.com/danielchengml](github.com/danielchengml)

## Licence

This project is licensed under the MIT License
