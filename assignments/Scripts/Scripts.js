weatherForecast("Alnavar");
    function Click(){
        let City=document.getElementById("city").value;
        weatherForecast(City);
    }

    async function weatherForecast(city){
        try{
            let cnt=document.getElementById("days").value;
            let x=await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&q=${city}&cnt=${cnt}&appid=e189303d3545f9760b7c79f8c8a51ec7&units=metric`);
            let data=await x.json();
            let daily=data.list;
            console.log(daily);
            dailyForecast(daily);

            let y=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e189303d3545f9760b7c79f8c8a51ec7&units=metric`)
            let data1=await y.json();
            console.log(data1);
            fullReport(data1);
            
        }catch(e){
            console.log("Error:",e);
        }
    }

    function dailyForecast(data){
        document.getElementById("dayView").innerHTML="";
        data.forEach(function(ele){
            let div=document.createElement("div");
            let temp=document.createElement("h1");
            temp.innerText=ele.main.temp+" *C";
            let humid=document.createElement("h5");
            humid.innerText="humidity: "+ele.main.humidity+"%";
            let press=document.createElement("h5");
            press.innerText="pressure: "+ele.main.pressure+"hPa";
            div.append(temp,humid,press);
            document.getElementById("dayView").append(div)
        })
    }

    function fullReport(data){
        document.getElementById("gmap_canvas").src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        document.querySelector("#name").innerText=data.name;
        document.getElementById("temp").innerText=`${data.main.temp}  *C`;
        document.getElementById("humid").innerText=`${data.main.humidity} %`;
        document.getElementById("windspeed").innerText=`${data.wind.speed}m/s`;
        document.getElementById("pressure").innerText=`${data.main.pressure}hPa`;
        document.getElementById("desc").innerText=data.weather[0].description;
        document.getElementById("weather").innerText=data.weather[0].main;
        document.getElementById("visibility").innerText=`${(data.visibility)/1000} km`;
    }