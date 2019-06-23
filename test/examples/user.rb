module MyApp
  class User
    def initialize(name, last_name)
      @name = name
      @last_name = last_name
    end

    def name
      @name
    end

    def last_name
      @last_name
    end

    def full_name
      "#{self.name} #{self.last_name}"
    end

  end
end
