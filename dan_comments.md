Ontima,

Good work completing the project. It seems like you are well on your way to learning Angular.

My biggest comment regards the organization of your controller. Several functions are declared on the window scope! Instead of declaring functions such as:
   getEmployees = function() {...};

Make sure to add them as methods on the controller's $scope   
   $scope.getEmployees = function() {...};

This will vastly improve your app and make it more bug-resistant.

Speaking of, remember to include some error handling for your $http requests.You can do this many ways. You may pass in callback success and callback fail functions when you create your factory functions (like we talked about last week), or add a catch statement on an Express use() declaration for starters. 

Keep it up, I'll see you tomorrow!

-Dan