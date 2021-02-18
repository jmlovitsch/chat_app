import consumer from "./consumer";

document.addEventListener("turbolinks:load", () => {
  const room_element = document.getElementById("room_id");
  const room_id = Number(room_element.getAttribute("data-room-id"));

  consumer.subscriptions.subscriptions.forEach((subscription) => {
    console.log(subscription);
    consumer.subscriptions.remove(subscription);
  });

  consumer.subscriptions.create(
    { channel: "RoomChannel", room_id: room_id },
    {
      connected() {
        console.log(consumer.subscriptions);
        console.log("connected to " + room_id);
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        console.log("disconnected from " + room_id);
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        const user_element = document.getElementById("user_id");
        const user_id = Number(user_element.getAttribute("data-user-id"));
        const message_user_id = data.message.user_id;
        let stringToHTML = function (str) {
          let parser = new DOMParser();
          let doc = parser.parseFromString(str, "text/html");
          return doc.body.firstChild;
        };

        if (user_id == message_user_id) {
          const newData = stringToHTML(data.html);
          newData.className = "message me";
          const newerData = newData.getElementsByClassName("author");
          newerData[0].innerText = "You";
          const stringed = newData.outerHTML;
          const messageContainer = document.getElementById("messages");
          return (messageContainer.innerHTML += stringed);
        } else {
          const messageContainer = document.getElementById("messages");
          return (messageContainer.innerHTML += data.html);
        }
      },
    }
  );
});
