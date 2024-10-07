Steps to run the app correctly

Install the dependencies
`npm i`

Add your radar key: 
ios > App > App > AppDelegate.swift

Install pods
`cd ios/App; pod install --repo-update`

Running with xcode (debug)
`ionic build; ionic capacitor copy ios; ionic capacitor open ios`