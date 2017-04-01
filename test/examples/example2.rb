class MyClass

  before_validation(on: :create) do
    ...
  end

  after_initialize do
    ...
  end

  loop do
    ...
  end

  scope :within, ->(time) do
    where('created_at >= ?', time.ago)
  end

  def hi
    12
  end

  def hi2
    "do"
  end

end
