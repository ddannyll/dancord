# Dancord
[![Frontend CI](https://github.com/ddannyll/dancord/actions/workflows/frontend.node.js.yml/badge.svg?branch=main)](https://github.com/ddannyll/dancord/actions/workflows/frontend.node.js.yml)
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

> :warning: **API DOCS OUTDATED (since the backend is going to be rewritten using Go)!

## Data Types 


| Name                | Type                                                                                                                       | Notes                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Auth                | `{ username: string, password: string }`                                                                                   |                            |
| Token               | `{ token: string }`                                                                                                        |                            |
| ServerBasicDetails  | `{ name: string, image: string }`                                                                                          | Sent by client to server   |
| Id                  | `string`                                                                                                                   |                            |
| ServerDetails       | ServerBasicDetails &`{ serverId: Id, channelIds: Id[] }`                                                                   | Sent from server to client |
| ChannelDetails      | `{ channelId: Id, name: string }`                                                                                          |                            |
| MessageBasicDetails | `{ receiverId: string, message: string }`                                                                                  |                            |
| Reaction            | `{ reaction: string, reactors: Id[] }`                                                                                     |                            |
| MessageDetails      | MessageBasicDetails AND`{ messageId: Id, reactions: Reaction[], timeSent: string, lastEdited: string OR null, sentBy:Id }` | Sent from server to client |
| UserDetails         | `{ username: string, image: string }`                                                                                      |                            |

## Endpoints/Sockets


| Endpoints          | Description                                                                                                                                                                                                                                                                                                                   | HTTP Method | Params                                               | Return             | Exceptions                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------ | -------------------- | -------------------------------------------------------------- |
| auth/login         | Login to dancord via unique username, password                                                                                                                                                                                                                                                                                | POST        | Auth                                                 | `{token: Token}`   | 403: Invalid credentials                                     |
| auth/register      | Register into dancord via unique username, password                                                                                                                                                                                                                                                                           | POST        | Auth                                                 | `{token: Token}`   | 400: Username/Email is already taken OR password is too weak |
| auth/logout        | Logs out the current user                                                                                                                                                                                                                                                                                                     | POST        |                                                      |                    |                                                              |
| server/create      | Creates a server, making the current user the owner                                                                                                                                                                                                                                                                           | POST        | ServerBasicDetails                                   | `{serverId: Id}`   |                                                              |
| server/list        | Returns a list of ids pertaining to all servers the user is in                                                                                                                                                                                                                                                                | GET         |                                                      | `{servers: Id[]}`  |                                                              |
| server/details     | Get the details for a server                                                                                                                                                                                                                                                                                                  | GET         | `{serverId: Id}`                                     | ServerDetails      | 400: Invalid ServerId                                        |
| server/join        | Join a server using a unique join id                                                                                                                                                                                                                                                                                          | POST        | `{joinId: Id}`                                       | ServerDetails      | 400: Invalid Join Id                                         |
| server/join/create | Generates a unique join id pertaining to a server                                                                                                                                                                                                                                                                             | POST        | `{serverId: Id}`                                     | `{joinId: Id}`     |                                                              |
| server/details     | Updates details of a server                                                                                                                                                                                                                                                                                                   | PUT         | `{serverId: Id}` & `ServerBasicDetails`              | ServerDetails      | Invalid ServerId                                             |
| server/delete      | Deletes a server given the current user is the owner of it                                                                                                                                                                                                                                                                    | DELETE      | `{serverId: Id}`                                     |                    | Invalid ServerId\| User is not owner                         |
| channel/create     | Creates a channel in a server given current user is server owner                                                                                                                                                                                                                                                              | POST        | `{serverId: Id}`                                     | `{channelId: Id}`  | Invalid ServerId\| User is not server owner                  |
| channels/details   | Returns the details of a channel                                                                                                                                                                                                                                                                                              | GET         | `{channelId: Id}`                                    | ChannelDetails     | Invalid ChannelId                                            |
| channels/details   | Updates details of a channel                                                                                                                                                                                                                                                                                                  | PUT         | `{channelId: Id}` & ChannelDetails                   |                    | Invalid ChannelId                                            |
| channels/search    | Search for messages within a channel                                                                                                                                                                                                                                                                                          | GET         |                                                      |                    |                                                              |
| channels/messages  | Returns a number of messages before a specfic messageId. The number of messages returned is specified by a parameter. If this parameter is omitted, the default count - 25 is used instead. If the channelId is supplied instead of messageId, the returned messages will start from the most recent message in that channel. | GET         | ` { count?: number, channelId?: Id messageId?: Id }` | `{messages: Id[]}` | Invalid ChannelId, Invalid messageId                         |
| channels/delete    | Deletes a channel in a server given current user is server owner                                                                                                                                                                                                                                                              | DELETE      | `{channelId: Id}`                                    |                    | Invalid ChannelId\| User is not server owner                 |
| message/send       | Sends a message to a channel or user                                                                                                                                                                                                                                                                                          | POST        | MessageBasicDetails                                  | `{messageId: Id}`  | Invalid ReceiverId\| Not friends with user receiver          |
| message/edit       | Edits a message given a messageId                                                                                                                                                                                                                                                                                             | PUT         | `{messageId: Id}` & MessageBasicDetails              |                    | Invalid MessageId\| User was not poster                      |
| message/react      | Reacts to a message given a messageId                                                                                                                                                                                                                                                                                         | PUT         | `{ messageId: Id,reaction: string }`                 |                    |                                                              |
| message/details    | Returns the details of a message given a messageID                                                                                                                                                                                                                                                                            | GET         | `{ messageId: Id}`                                   | MessageDetails     | Invalid MessageId                                            |
| message/delete     | Deletes a message given a messageId                                                                                                                                                                                                                                                                                           | DELETE      | `{ messageId: Id}`                                   |                    | Invalid MessageId\| User was not poster                      |
| friends            | Returns a list of all friends                                                                                                                                                                                                                                                                                                 | GET         |                                                      | `{users: Id[]}`    |                                                              |
| friends/add        | Adds a friend based on unique username                                                                                                                                                                                                                                                                                        | POST        | `{ userId: Id }`                                     |                    | Invalid Username                                             |
| friends/remove     | Removes a friend based on unique username                                                                                                                                                                                                                                                                                     | DELETE      | `{ userId: Id }`                                     |                    | Invalid Username                                             |
| profile            | Returns a user's profile details                                                                                                                                                                                                                                                                                              | GET         | `{ userId: Id }`                                     | UserDetails        | User is not logged in                                        |
| profile/update     | Updates the current user's profile details                                                                                                                                                                                                                                                                                    | PUT         | `{ userId: Id }` & UserDetails                       |                    | User is not logged in                                        |

NOTE: All endpoints can return `400` in the event that params/body is in the incorrect format. Additionally, endpoints except login/register require a Bearer token in the `Authorization` header field. If this is invalid, `403` is returned.


| Socket Room Name | identifier            | Description                        |
| ------------------ | ----------------------- | ------------------------------------ |
| user             | `user-[userId]`       | Info only visible to specific user |
| channel          | `channel-[channelId]` | Info visible to channel            |
| server           | `server-[serverId]`   | Info visibile to specific server   |


| Socket Event      | Description | Sent To Room  | Data Types |
| ------------------- | ------------- | --------------- | ------------ |
| 'channel-created' |             | server        |            |
| 'message-sent'    |             | channel\|user |            |
| 'message-edited'  |             | channel\|user |            |
| 'message-deleted' |             | channel\|user |            |
| 'message-reacted' |             | channel\|user |            |
|                   |             |               |            |
|                   |             |               |            |


| Socket Event      | Description | Sent To Room   | Data Types |
| ------------------- | ------------- | ---------------- | ------------ |
| 'channel-created' |             | server         |            |
| 'message-sent'    |             | channel\| user |            |
| 'message-edited'  |             | channel\| user |            |
| 'message-deleted' |             | channel\| user |            |
| 'message-reacted' |             | channel\| user |            |
