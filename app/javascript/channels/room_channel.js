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
      let stringToHTML = function (str) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, "text/html");
        return doc.body;
      };

      // console.log(stringToHTML(data.html).outerHTML.replace("<body>", "").replace("</body>", ""))

      if (user_id == message_user_id) {
        const newData = stringToHTML(data.html);

        const classname_node = newData.getElementsByClassName("message");

        classname_node[0].className = "message me";
        const newerData = newData.getElementsByClassName("author");
        newerData[0].innerText = "You";
        const stringed = newData.outerHTML
          .replace("<body>", "")
          .replace("</body>", "");
        const messageContainer = document.getElementById("messages");
        return (messageContainer.innerHTML += stringed);
      } else {
        const messageContainer = document.getElementById("messages");
        return (messageContainer.innerHTML += data.html);
      }
    },
  }
);
