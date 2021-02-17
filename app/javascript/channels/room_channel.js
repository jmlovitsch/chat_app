import consumer from "./consumer";

consumer.subscriptions.create(
  { channel: "RoomChannel", room_id: 1 },
  {
    connected() {
      console.log("connected...");
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      const element = document.getElementById("user_id");
      const user_id = Number(element.getAttribute("data-user-id"));
      const message_user_id = data.message.user_id;

      if (user_id == message_user_id) {
        const newData = data.html.replace("message", "message me");
        const newerData = newData.replace(data.user.username, "You")
        const messageContainer = document.getElementById("messages");
        return (messageContainer.innerHTML += newerData);
      } else {
        const messageContainer = document.getElementById("messages");
        return (messageContainer.innerHTML += data.html);
      }
    },
  }
);
