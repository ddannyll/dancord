# Dancord

## MVP Features
- Authentication
    - Login with google + username/password encryption
- Create server
    - Server Name + Image
    - Server invite link
- Create channel within server
    - Channels can be grouped into Categories
- Messages
    - Mentions
    - Sending messages within a server
    - Editing a message
    - Embeds
    - Ability to search for messages
- Reactions
- Notifications
- Realtime communication (socket.io)
    - online/offline
    - is typing...
- Friends
    - DMs
    - Search for friend 
    - Unique Username + Nickname
- Users can update profile
    - Profile Statuses



## Data Types
| Name    | Type  | Notes |
| -------- | -------- | -------- |
| Text     | Text     | Text     |



## Endpoints/Sockets
| Endpoints          | Description                                                      | HTTP Method | Data Types | Exceptions |
| ------------------ | ---------------------------------------------------------------- | ----------- | ---------- | ---------- |
| auth/login         | Login to dancord via unique username, password                   | POST        |            |            |
| auth/register      | Register into dancord via unique username, password              | POST        |            |            |
| auth/logout        | Logs out the current user                                        | POST        |            |            |
| server/create      | Creates a server, returning server id attached to the new server | POST        |            |            |
| server/list        | Returns a list of ids pertaining to all servers                  | GET         |            |            |
| server/details     | Get the details for a server                                     | GET         |            |            |
| server/join        | Join a server using a unique join id                             | POST        |            |            |
| server/join/create | Generates a unique join id pertaining to a server                | POST        |            |            |
| server/details     | Updates details of a server                                      | PUT         |            |            |
| server/delete      | Deletes a server given the current user is the owner of it       | DELETE      |            |            |
| channel/create     | Creates a channel in a server                                    | POST        |            |            |
| channels/details   | Returns the details of a channel                                 | GET         |            |            |
| channels/details   | Updates details of a channel                                     | PUT         |            |            |
| channels/search    | Search for messages within a channel                             | GET         |            |            |
| channels/messages  | Returns the messages in a channel specified by a range           | GET         |            |            |
| message/send       | Sends a message to a channel or user                             | POST        |            |            |
| message/edit       | Edits a message given a messageId                                | PUT         |            |            |
| message/delete     | Deletes a message given a messageId                              | DELETE      |            |            |
| message/react      | Reacts to a message given a messageId                            | PUT         |            |            |
| message/details    | Returns the details of a message given a messageID               | GET         |            |            |
| friends/add        | Adds a friend based on unique username                           | POST        |            |            |
| friends/get        | Returns a list of all friends                                    | GET        |            |            |
| profile/details    | Updates the current user's profile details                       | PUT         |            |            |
| profile/details    | Returns a user's profile details                                 | GET         |            |            |




| Socket Room Name    | identifier        | Description                         |
| ------- | --------------------- | ----------------------------------- |
| user    | `user-[userId]`       | Info only visible to specific user  |
| channel | `channel-[channelId]` | Info visible to channel             |
| server  | `server-[serverId]`   | Info visibile to specific server    |



| Socket Event      | Description | Sent To Room    | Data Types |
| ----------------- | ----------- | --------------- | ---------- |
| 'channel-created' |             | server          |            |
| 'message-sent'    |             | channel \| user |            |
| 'message-edited'  |             | channel \| user |            |
| 'message-deleted' |             | channel \| user |            |
| 'message-reacted' |             | channel \| user |            |
|                   |             |                 |            |
|                   |             |                 |            |