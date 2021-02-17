class User < ApplicationRecord

    validates_uniqueness_of :username

    def self.generate
        adjectives = ['Ancient', 'Broken', 'Creative', 'Dangerous', 'Effective', 'Flying', 'Guilded']
        nouns = ['Highway', 'Intern', 'House', 'Pot', 'Hammer', 'Screw', 'Lion', 'Master']
        number = rand.to_s[2..4]
        username = "#{adjectives.sample}-#{nouns.sample}-#{number}"
        create(username: username)
    end


end
