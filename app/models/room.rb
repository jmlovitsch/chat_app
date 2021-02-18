class Room < ApplicationRecord
    has_many :messages, dependent: :delete_all, validate: false
end
