(function(){

  var $env = (function(){
    
    var $env = {};
    var $master;

    var $public = (function(){
      var $public = {};
      return $public;
    })();

    var $platform = function(master){

      var $platform = {};

      $platform.new_global = function() {
        return $master.new_global();
      };

      $platform.set_global = function(global) {
        return $master.set_global(global);
      };

      $platform.new_split_global_outer = function() {
        return $master.new_split_global_outer();
      };

      $platform.new_split_global_inner = function(proxy) {
        return $master.new_split_global_inner(proxy,undefined);
      };

      ( master.window_index === undefined ) && ( master.window_index = 0 );

      $platform.init_window = function(window) {
        var index = master.window_index++;
        window.toString = function(){
          return "[object Window "+index+"]";
        };
      };

      return $platform;
    };

    $env.new_window = function(proxy){
      if(!proxy){
        proxy = $platform.new_split_global_outer();
      }
      $master.proxy = proxy;
      new_window = $platform.new_split_global_inner(proxy,undefined);
      new_window.$master = $master;
      for(var index in $master.symbols) {
        var symbol = $master.symbols[index];
        new_window[symbol] = $master[symbol];
      }
      new_window.load = function(){
        for(var i = 0; i < arguments.length; i++){
          var f = arguments[i];
          $master.load(f,new_window);
        }
      };
      return [ proxy, new_window ];
    };

    $env.init = function(){
      $master = this.$master;
      delete this.$master;
      $platform = $platform($master);
      var options = this.$options;
      delete this.$options;
      $env.$master = $master;
      $env.init_window.call(this,options);
    };

    $env.init_window = function(options){
      $platform.init_window(this);

      var print = $master.print;

      // print("set",this);
      // print("set",this.window);
      if ( !this.window) {
        this.window = this;
      }
      // print("setx",this);
      // print("setx",this.window);

      options = options || {};

      var $w = this;