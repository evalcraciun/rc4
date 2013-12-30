var RC4 =  {
        /** RC4.encrypt(key,str)
         *  return String encoded data 
         */
        encrypt: function (key, str) {
                var s = [], j = 0, aux, res = '';
                
                for (var i = 0; i < 256; i++){
                       s[i] = i;
                }
                
                for (var i = 0; i < 256; i++) {
                    
                    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
                    
                    aux = s[i];
                    s[i] = s[j];
                    s[j] = aux;
                    
                }
                
                i=0;j=0;
                for (var y = 0; y < str.length; y++){
                    i = (i+1) % 256;
                    j = (j+s[i]) % 256;
                    aux = s[i];
                    s[i] = s[j];
                    s[j] = aux;
                    
                    res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
                    
                }
                
                return res;
                
            },
    
            /** RC4.decode(key, res)
             * @return  String  decoded data
             */
            decrypt:function (key, res) {
                return this.encrypt(key, res);
            },
    
            /** RC4.randomKey(len, msg, charSet)
             *  len key length
             *  msg optional
             *  charSet - optional charset
             */
            randomKey: function(len, msg, charSet) {
                var text='';
                var message = msg || "Securitate";
                var charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                //document.writeln(charSet.length);
                    for (var j=0; j< len; j++) {
                        var randomPoz = Math.floor(Math.random() * charSet.length) ;
                        text += charSet.substring(randomPoz,randomPoz+1);
                        
                    }
                return RC4.keyStream(text,msg);
            
            },
            
            /** 
             * RC4.keyStream(key, str)
             * @return kp
             */
            keyStream: function(key, str) {
                var s = [], j = 0, aux, kp = [];
                
                for (var i = 0; i < 256; i++){
                       s[i] = i;
                }
                
                for (var i = 0; i < 256; i++) {
                    
                    j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
                    
                    aux = s[i];
                    s[i] = s[j];
                    s[j] = aux;
                    
                }
                i=0;j=0;
                for (var y = 0; y < str.length; y++){
                   
                    i = (i+1) % 256;
                    j = (j+s[i]) % 256;
                    
                    aux = s[i];
                    s[i] = s[j];
                    s[j] = aux;
                    kp[y]=[(s[i] + s[j]) % 256];
                    
                }
            
                //document.writeln(kp.length);
                
                return kp;
            },
            
            /**
             * RC4.generateKeys(len, keyLength, message)
             * len - Array length
             * keyLength - the dimmension of String from Array
             * message - original message used on encryption
             * @return keys array
             */
            generateKeys: function(len, keyLength,message) {
                var keys = [];
                for (var i=0; i< len; i++){
                    keys.push(RC4.randomKey(keyLength, message));
                }
                
                return keys;
            },
            
            /* RC4.init() method
             * return all calls to the browser window
             */
            init: function() {
                document.writeln("Encoded string is: " +RC4.encrypt("test","Securitate"));
                document.writeln("<br/>");
                
                document.writeln("Decoded string is: " +RC4.decrypt("test",RC4.encrypt("test","Securitate")));
                
                var message = "Securitate";
                var keyLength = 5;
                var keyCount = 10000;
                var streamKeysArray = RC4.generateKeys(keyCount, keyLength, message);                
                var zeroCount= [];
                
                for(var i=0;i<message.length;i++)
                {
                    zeroCount[i]=0;
                }
                
                document.writeln("<br/>");
                document.writeln("Number of random keys: " +streamKeysArray.length);
                document.writeln("<br/>");
                document.writeln("Random Keys are:" + "<br/>");
                
                for (var i=0;i<streamKeysArray.length;i++)
                {
                    document.writeln(streamKeysArray[i]);
                    document.writeln("<br/>");
                    for(var j = 0; j<streamKeysArray[i].length;j++)
                    {
                        if(streamKeysArray[i][j] == 0)
                        {
                            zeroCount[j]++;
                        }
                    }
                }
                
                 document.writeln("<br/>");
                 document.writeln("Showing 0: " + "<br/>");
                 document.writeln(zeroCount);
                
            }

};
// call my method init()
RC4.init();

