const input1  = document.querySelector('#div1 input');
const far  = document.querySelector('#div1 h2');
let latit =1;
let logn =2;
let val=4;
let count = 0;
let val2 = 5;
let p1,p2,p3,p4;


getLocation();

function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
   { 
    far.innerHTML = "Location not supported in Your Browser";
   }
}

  function showPosition(position) {
   latit = position.coords.latitude;
   logn =position.coords.longitude;

   fetch(
    `https://www.mapquestapi.com/geocoding/v1/reverse?key=SxQtVE7Z0qbYHcACmhd3HAvgThLCTlzH&location=${latit}%2C${logn}&outFormat=json&thumbMaps=false`,
     )
    .then((response) => response.json())
    .then((responseJson) => {
         const city =  JSON.stringify(responseJson).split(',')[15].split(':')[1];
       
         val = city.substring(1,city.length-1);

         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=65001cc0e337cda82aac927a6fa9d24e`)
         .then(data => data.json())
         .then(fetcheddata =>
            {
               
                input1.value = "";
                input1.classList.add('inp');
                const div1 = document.querySelector('#div1 h1');
                div1.innerText = fetcheddata.name+","+fetcheddata.sys.country;

                
                const div2 = document.querySelector('#div1 h2');
                p1 = fetcheddata.main.temp;
                 div2.innerText = (Math.round((p1)-273.15))+" ℃";
      
                const div3 = document.querySelector("#firstdiv .circle div:first-child h3") ;
                p2 = fetcheddata.wind.speed;
                div3.innerText = p2+ " meter/sec";
      

                 const div4 = document.querySelector("#firstdiv .circle div:nth-of-type(2) h3") ;
                 div4.innerText = fetcheddata.main.humidity +" %";


                 const div5 = document.querySelector("#firstdiv .circle #maxtemp h3") ;
                 p3 = fetcheddata.main.temp_max;
                 div5.innerText = Math.round((p3)-273.15) +" ℃" ;
        
                 const div6 = document.querySelector("#firstdiv .circle #mintemp h3") ;
                 p4 = fetcheddata.main.temp_min;
                 div6.innerText =Math.round((p4)-273.15) + " ℃";

           
              
                 const div7 = document.querySelector("#seconddiv .circle div:first-child h2") ;
                 div7.innerText = fetcheddata.weather[0].main;
                 const div8 = document.querySelector("#seconddiv .circle div:nth-of-type(2) h2");
                 var date1 = Date();
                 var dat1 = date1.substr(16,7).split(':');
                 dat1.pop();
                 if(12-dat1[0]>0 && dat1[0]<12)
                 {
                  dat1[0] = Math.abs(dat1[0]);
                  div8.innerText =dat1.join(':')+" AM";
                 }
                 else if(dat1[0]==12)
                 {
                  
                  div8.innerText =dat1.join(':')+" PM";
                 }
                 else if(12-dat1[0]<0 && dat1[0]<24)
                 {
                  dat1[0] = Math.abs(12-dat1[0]);
                  div8.innerText =dat1.join(':')+" PM";
                 }
                 else
                 {
                  div8.innerText =dat1.join(':')+" AM";
                 }
                 const div9 = document.querySelector("#seconddiv .circle div:nth-of-type(2) h3");
                 div9.innerText = date1.substr(0,10);
        
                
                })
               .catch(e =>
               {
                 input1.setAttribute("placeholder","Location not allowed");
                } );

              });  
                }  

   input1.addEventListener('keypress',event1);

   function event1(e){
 
   if((e!=null ) && (e.which==13 && input1.value!=""))
    {
   
  
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input1.value}&appid=65001cc0e337cda82aac927a6fa9d24e`)
       .then(data => data.json())
       .then(fetcheddata =>
    {
      
        input1.value = "";
        input1.classList.add('inp');
        const div1 = document.querySelector('#div1 h1');
        div1.innerText= fetcheddata.name+","+fetcheddata.sys.country;
      

        const div2 = document.querySelector('#div1 h2');
        p1 = fetcheddata.main.temp;
        div2.innerText = (Math.round((p1)-273.15))+" ℃";
      
        const div3 = document.querySelector("#firstdiv .circle div:first-child h3") ;
        p2 = fetcheddata.wind.speed;
        div3.innerText = p2+ " meter/sec";
      

        const div4 = document.querySelector("#firstdiv .circle div:nth-of-type(2) h3") ;
        div4.innerText = fetcheddata.main.humidity +" %";


         const div5 = document.querySelector("#firstdiv .circle #maxtemp h3") ;
         p3 = fetcheddata.main.temp_max;
         div5.innerText = Math.round((p3)-273.15) +" ℃" ;
        
         const div6 = document.querySelector("#firstdiv .circle #mintemp h3") ;
         p4 = fetcheddata.main.temp_min;
         div6.innerText =Math.round((p4)-273.15) + " ℃";
      
         const div7 = document.querySelector("#seconddiv .circle div:first-child h2") ;
         div7.innerText = fetcheddata.weather[0].main;
        
       

        count=1;
     
       })
      .catch(e =>
       {
       input1.setAttribute('placeholder',"Entered Wrong City");
       } );

       }
     else
     {
     const div2 = document.querySelector('#div1 h2');
    
     div2.innerText = (Math.round((p1)-273.15))+" ℃";
  
     const div3 = document.querySelector("#firstdiv .circle div:first-child h3") ;
  
     div3.innerText = p2+ " meter/sec";

     const div5 = document.querySelector("#firstdiv .circle #maxtemp h3") ;
    
     div5.innerText = Math.round((p3)-273.15) +" ℃" ;
    
     const div6 = document.querySelector("#firstdiv .circle #mintemp h3") ;
     
     div6.innerText =Math.round((p4)-273.15) + " ℃";
     count =0;

     }
  

     }


   far.addEventListener('click',()=> {
   if(count==0)
      {
  
        const div2 = document.querySelector('#div1 h2'); 
        div2.innerText = Math.round(( ((p1)-273.15) *9/5)+32)+" °F";
      
        const div3 = document.querySelector("#firstdiv .circle div:first-child h3") ;
        div3.innerText = Math.round((p2)*18/5)+ " km/h";
      


         const div5 = document.querySelector("#firstdiv .circle #maxtemp h3") ;
        div5.innerText =  Math.round(( ((p3)-273.15) *9/5)+32) + " °F";
        
         const div6 = document.querySelector("#firstdiv .circle #mintemp h3") ;
         div6.innerText =  Math.round(( ((p4)-273.15) *9/5)+32) + " °F";
        
        count=1;
  
     }
    else
    {
      event1();
     }
    });
