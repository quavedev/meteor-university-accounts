# Meteor University - Section 3 - Login and Accounts

This repository is the code behind the Section 3 - Login and Accounts of Meteor University.

We started from [Section 2 final code](https://github.com/dyarleniber/collections-and-schemas-in-meteor/tree/main/10-collection-hooks-with-collection-hooks-package/meteor-wallet).

On each folder we have the code that corresponds with the final state in each video.

Below we list a summary of the changes made on each video, but you should check https://university.meteor.com for full details.

## Folders

### 02 - Update Meteor, TailwindCSS and Set up Prettier & ESLint

Video: 3.2

- Updated Meteor from 2.5.1 to 2.7.3
- Updated TailwindCSS from v2 to v3
- Set up Prettier and ESLint

After the video I also changed a few things:

- Removed tests
- Fixed ESLint errors and set up
- Fixed Prettier set up
- Renamed jsx files to js

### 03 - Remove imports folder

Video: 3.3

- Removed imports folder

### 04 - Update React to 18

Video: 3.4

- Updated React from 17 to 18


### 05 - Update heroicons to 2

Video: 3.5

- Updated heroicons from 1 to 2

### 06 - Sign up with Password

Video: 3.6

- Added accounts-password package
- Sign up implementation with Accounts.createUser from accounts-password
- Installed React Router
- Set up our main routes
- Installed quave:logged-user-react to get logged user from Meteor with a nice React Hook
- Meteor.logout

### 07 - Sign In with Password

Video: 3.7

- Sign in implementation with Meteor.loginWithPassword

### 08 - Reset Password

Video: 3.8

- Started the process with Accounts.forgotPassword
- Sent the email using quave:email-postmark
- Customized the route using Accounts.urls.resetPassword
- Showed alerts across routes with quave:alert-react-tailwind
  - added classes from Alert to tailwind.config.js `safelist`
- Called Accounts.resetPassword with token and new password

### 09 - Customizing user creation

Video: 3.9

- Removed startup wallet creation
- Created Wallet when the user is created using Accounts.onCreateUser
- Added userId to Wallet, Transaction and Contact
- Changed publications of wallet and contacts to filter by userId
- Changed home page to a Welcome page when no user is logged in
- Added a new email property to the user using Accounts.onCreateUser
- Changed the way to publish user fields using Accounts.setDefaultPublishFields

### 10 - Protected Routes

Video: 3.10

- New component LoggedUserOnly: only render the route element for logged users, otherwise redirects.
- New component AnonymousOnly: only render the route element for non-logged users, otherwise redirects.
