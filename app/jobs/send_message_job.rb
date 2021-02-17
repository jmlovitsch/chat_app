class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message, user)
    html = ApplicationController.render(
        partial: 'messages/message',
        locals: {
            message: message
         }
    )
    ActionCable.server.broadcast "room_channel_#{message.room_id}", html: html, message: message, user: user
    end
end
