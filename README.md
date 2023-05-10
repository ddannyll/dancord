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
| Name                | Type                                              | Notes                                   |
| ------------------- | ------------------------------------------------- | --------------------------------------- |
| Auth                | `{ username: string, password: string }`          |                                         |
| Token               | `{ token: string }`                               |                                         |
| ServerBasicDetails  | `{ name: string, image: string }`                 |                                         |
| Id                  | `{ id: string }`                                  |                                         |
| IdList              | `[string]`                                        |                                         |
| ServerDetails       | ServerBasicDetails & `{ channelIds: idList }`     |                                         |
| ChannelDetails      | `{ name: string }`                                |                                         |
| MessageBasicDetails | `{ receiverId: string, message: string }`         | receiverId can be a channelId or userId |
| Reaction            | `{ reaction: string, reactors: idList }`          |                                         |
| MessageDetails      | MessageBasicDetails & `{ reactions: [Reaction] }` |                                         |
| UserDetails         | `{ username: string }`                            |                                         |



## Endpoints/Sockets
| Endpoints          | Description                                                      | HTTP Method | Params                      | Return          | Exceptions                                           |
| ------------------ | ---------------------------------------------------------------- | ----------- | --------------------------- | --------------- | ---------------------------------------------------- |
| auth/login         | Login to dancord via unique username, password                   | POST        | Auth                        | Token           |                                                      |
| auth/register      | Register into dancord via unique username, password              | POST        | Auth                        | Token           |                                                      |
| auth/logout        | Logs out the current user                                        | POST        |                             |                 | User is not logged in                                |
| server/create      | Creates a server, making the current user the owner              | POST        | ServerBasicDetails          | Id              |                                                      |
| server/list        | Returns a list of ids pertaining to all servers                  | GET         |                             | IdList          |                                                      |
| server/details     | Get the details for a server                                     | GET         | Id                          | ServerDetails   | Invalid ServerId                                     |
| server/join        | Join a server using a unique join id                             | POST        | Id                          |                 | Invalid Join Id                                      |
| server/join/create | Generates a unique join id pertaining to a server                | POST        |                             | Id              |                                                      |
| server/details     | Updates details of a server                                      | PUT         | Id & ServerBasicDetails     |                 | Invalid ServerId                                     |
| server/delete      | Deletes a server given the current user is the owner of it       | DELETE      | Id                          |                 | Invalid ServerId \| User is not owner                |
| channel/create     | Creates a channel in a server given current user is server owner | POST        | Id                          | Id              | Invalid ServerId \| User is not server owner         |
| channels/details   | Returns the details of a channel                                 | GET         | Id                          | ChannelDetails  | Invalid ChannelId                                    |
| channels/details   | Updates details of a channel                                     | PUT         | Id & ChannelDetails         |                 | Invalid ChannelId                                    |
| channels/search    | Search for messages within a channel                             | GET         |                             |                 |                                                      |
| channels/messages  | Returns the messages in a channel specified by a range           | GET         | Id & `{ range: number }`    | IdList          | Invalid ChannelId                                    |
| channels/delete    | Deletes a channel in a server given current user is server owner | DELETE      | Id                          |                 | Invalid ChannelId \| User is not server owner        |
| message/send       | Sends a message to a channel or user                             | POST        | MessageBasicDetails         | Id              | Invalid ReceiverId \| Not friends with user receiver |
| message/edit       | Edits a message given a messageId                                | PUT         | Id & MessageDetails         |                 | Invalid MessageId \| User was not poster             |
| message/react      | Reacts to a message given a messageId                            | PUT         | Id & `{ reaction: string }` |                 |                                                      |
| message/details    | Returns the details of a message given a messageID               | GET         | Id                          | MessageDetails  | Invalid MessageId                                    |
| message/delete     | Deletes a message given a messageId                              | DELETE      | Id                          |                 | Invalid MessageId \| User was not poster             |
| friends/           | Returns a list of all friends                                    | GET         |                             | `[UserDetails]` |                                                      |
| friends/add        | Adds a friend based on unique username                           | POST        | UserDetails                 |                 | Invalid Username                                     |
| friends/remove     | Removes a friend based on unique username                        | DELETE      | UserDetails                 |                 | Invalid Username                                     |
| profile/           | Returns a user's profile details                                 | GET         |                             | UserDetails     | User is not logged in                                |
| profile/update     | Updates the current user's profile details                       | PUT         | UserDetails                 |                 | User is not logged in                                |




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

