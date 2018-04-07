class MyClass
  def method1
    result = begin
      something_something
      something_else
    end
    result.save
  end

  def method2
    begin
      "begin"
      something_else
    end
  end
end
