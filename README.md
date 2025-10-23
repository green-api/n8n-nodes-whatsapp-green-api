# n8n-nodes-whatsapp-green-api

Integration node for [Green API](https://green-api.com/) in [n8n](https://n8n.io).  
This community node allows automation of WhatsApp interactions using Green API — including messaging, file transfer, contacts, groups, statuses, and instance management.

---

## 📖 Overview

The **GreenAPI Node** provides full access to Green API endpoints, enabling you to send messages, manage chats, groups, and retrieve account information.

---

## Installation
### Install community node
Go to `Settings` → `Community Nodes` → `Install`, then enter `n8n-nodes-whatsapp-green-api`


### Install via npm
```bash
npm install n8n-nodes-whatsapp-green-api
```

Restart n8n after installation.

### Manual installation
1. Copy repository into `~/.n8n/custom/`
2. Run:
   ```bash
   npm install
   npm run build
   ```
3. Restart n8n

---

You can also check out the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

---

## Authentication

To use this node, you need to have an instance and token from [Green-API](https://green-api.com/en) platform and WhatsApp account:

- Sign up at [Green-API](https://green-api.com/en)
- Create an instance
- Get idInstance and apiTokenInstance
- Authorize the instance in the [Console](https://console.green-api.com/instanceList)

## 🧩 Features

| Category | Methods |
|-----------|----------|
| 👤 **Account** | getSettings, setSettings, getStateInstance, reboot, logout, getWaSettings |
| ✉️ **Sending** | sendMessage, sendPoll, sendFileByUrl, sendLocation, sendContact, forwardMessages, sendInteractiveButtons, sendInteractiveButtonsReply |
| 📥 **Receiving** | webhookTrigger, downloadFile |
| 📜 **Journals** | getChatHistory, getMessage, lastIncomingMessages, lastOutgoingMessages |
| 🧾 **Queues** | showMessagesQueue, clearMessagesQueue |
| 👥 **Groups** | createGroup, updateGroupName, getGroupData, addGroupParticipant, deleteGroupParticipant, setGroupAdmin, removeGroupAdmin, leaveGroup |
| 📣 **Statuses** | sendTextStatus, sendVoiceStatus, sendMediaStatus, deleteStatus, getStatusStatistic, getIncomingStatuses, getOutgoingStatuses |
| ✅ **Readmark** | readChat |
| 🧩 **Service** | getContacts, getContactInfo, editMessage, deleteMessage, archiveChat, unarchiveChat, setDisappearingChat |

---

## ⚙️ Usage Examples

### 💬 Send Message
```json
{
  "operation": "sendMessage",
  "chatId": "79001234567@c.us",
  "message": "Hello from n8n and Green API!"
}
```

### 📎 Send File by URL
```json
{
  "operation": "sendFileByUrl",
  "chatId": "79001234567@c.us",
  "urlFile": "https://example.com/image.jpg",
  "fileName": "photo.jpg"
}
```

### 📣 Send Text Status
```json
{
  "operation": "sendTextStatus",
  "message": "Working with Green-API and n8n!",
  "backgroundColor": "#228B22",
  "font": "SERIF",
  "participants": []
}
```

### 📤 Send Interactive Buttons Reply
```json
{
  "operation": "sendInteractiveButtonsReply",
  "chatId": "79001234567@c.us",
  "header": "",
  "body": "Do you confirm the appointment for tomorrow?",
  "footer": "",
  "buttons": [
        {
            "buttonId": "1",
            "buttonText": "Yes"
        },
        {
            "buttonId": "2",
            "buttonText": "No"
        }
    ]
}
```

### 👥 Create Group
```json
{
  "operation": "createGroup",
  "groupName": "My Team",
  "participants": ["79001234567@c.us", "79007654321@c.us"]
}
```

### 🧭 Send Location
```json
{
  "operation": "sendLocation",
  "chatId": "79001234567@c.us",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "name": "New York",
  "address": "NY, USA"
}
```

### 🔄 Check Whatsapp
```json
{
  "operation": "checkWhatsapp",
  "phoneNumber": 79000000000
}
```
---

## 🔗 Resources

- 🌐 [Green API Documentation](https://green-api.com/en/docs/)
- 📘 [n8n Documentation](https://docs.n8n.io)
- 💬 [n8n Community Forum](https://community.n8n.io)

---

## 👤 Author

Developed by [Green API](https://green-api.com/)  
📧 support@green-api.com  
🌍 https://green-api.com/en/

---

## 🪪 License

[MIT License](LICENSE)