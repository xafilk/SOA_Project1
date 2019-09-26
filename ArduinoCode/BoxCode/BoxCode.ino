#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
 
const char* ssid = "Loaiza Puerta";
const char* password = "margarita123";
String url = "http://192.168.1.115:3000";
char JSONmessageBuffer[300];
unsigned int Door = 16;
HTTPClient http;  //Declare an object of class HTTPClient

void setup () {
  pinMode(Door, OUTPUT);
  char JSONmessageBuffer[300];
 
  Serial.begin(9600);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print("Connecting..");
  }
  
  /*JSON Serialization for HTTP POST*/
  const int capacity = JSON_OBJECT_SIZE(1);
  StaticJsonDocument<capacity> doc;
  doc["BoxId"] = "A2D2";
  serializeJsonPretty(doc, JSONmessageBuffer);
  Serial.println(JSONmessageBuffer);
}
 
void loop() {
  //Check WiFi connection status
  if (WiFi.status() == WL_CONNECTED) 
  {     
    ServerRequest(); 
  }
  delay(5000);    //Send a request every 30 seconds
}

void ServerRequest()
{
  try
  {
     http.begin(url + "/Box/IsOpen");
     http.addHeader("Content-Type", "application/json"); //Specify content-type header 
     int httpCode = http.POST(JSONmessageBuffer); //Send the request 
     if (httpCode > 0) 
     {
        String response = http.getString();   //Get the request response payload
        const int capacity = JSON_OBJECT_SIZE(4);
        StaticJsonDocument<capacity> doc;
        DeserializationError err = deserializeJson(doc, response);
        bool success = doc["Success"];
        if(success)
        {
          int toOpen = doc["Result"];
          MakeAcction(toOpen);
        }
        Serial.println(response);  
     }
     http.end();   //Close connection
  }
  catch(...)
  {
    int a = 1;
  }
}

void MakeAcction(int toOpen)
{
  if(toOpen == 1)
  {
    Serial.println("Abierto");
    digitalWrite(Door, HIGH);
    delay(10000);
    CloseBox();
    digitalWrite(Door, LOW); 
  } 
  else
  {
    Serial.println("Cerrado");  
  }
}

void CloseBox()
{
  try
  {
    http.begin(url + "/Box/CloseBox");
    http.addHeader("Content-Type", "application/json"); //Specify content-type header 
    int httpCode = http.POST(JSONmessageBuffer); //Send the request 
    http.end();
  }
  catch(...)
  {
   int i = 1; 
  }
 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;  //Declare an object of class HTTPClient
    http.begin("http://192.168.1.115:3000/Box/IsOpen");
    /*Content Type Header*/
    http.addHeader("Content-Type", "application/json"); //Specify content-type header 
    int httpCode = http.POST(JSONmessageBuffer); //Send the request 
      if (httpCode > 0) { //Check the returning code
        String payload = http.getString();   //Get the request response payload
        const int capacity = JSON_OBJECT_SIZE(2);
        StaticJsonDocument<capacity> doc;
        DeserializationError err = deserializeJson(doc, payload);
        bool success = doc["Success"];
        if(success)
        {
          int open = doc["Result"];
          if(open == 1)
          {
            Serial.println("Abierto");
          } 
          else
          {
            Serial.println("Cerrado");
          }
        }
        Serial.println(payload);                     //Print the response payload
      }
 
      http.end();   //Close connection
 
  }
  delay(5000);    //Send a request every 30 seconds
}
