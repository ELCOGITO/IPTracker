

class IPTracker{
    constructor(){
        this.ipAddress = null;
        this.apiKey = null;
        this.request = null;
        this.ip = null;
        this.location=null;
        this.timezone=null;
        this.isp=null;
        this.city=null;
        this.country=null;
        this.postalCode=null;
        this.timezoneApi=null;
        this.ispApi=null;
        this.lat=null;
        this.lng=null;
        this.map=null;
        this.setResult();
    }
    setResult(){
        this.ip=document.querySelector("[data-ip]");
        this.location=document.querySelector("[data-location]");
        this.timezone=document.querySelector("[data-timezone]");
        this.isp=document.querySelector("[data-isp]");
        this.map=document.querySelector("#mapid");
    }
    setIp(ip){
        this.ipAddress=ip;
        this.apiKey = "at_YRp7ebRsm6cv8tokBfGnvVFSPadY4";
        this.request=`https://geo.ipify.org/api/v1?apiKey=${this.apiKey}&ipAddress=${this.ipAddress}`;
        this.requestApi();
    }
    requestApi(){
        fetch(this.request)
            .then(res => res.json())
            .then(data => {
                const {location}=data;
                if(!location.city) return;
                const {city,country,postalCode,timezone,lat,lng}=location;
                this.city=city;
                this.country=country;
                this.postalCode=postalCode;
                this.timezoneApi=timezone;
                this.ispApi=data.isp;
                this.lng=lng;
                this.lat=lat;
                this.intoHTML();
                this.makeMap();
            });
    }
    intoHTML(){
        this.ip.innerHTML=this.ipAddress;
        this.location.innerHTML=`${this.city},${this.country},${this.postalCode}`;
        this.timezone.innerHTML=this.timezoneApi;
        this.isp.innerHTML=this.ispApi;
    }
    makeMap(){
        if(this.map.classList.contains('leaflet-container')){
            this.map.remove();
            const div = document.createElement('div');
            div.id="mapid";
            wrapper.appendChild(div);
        }
        const mymap = L.map('mapid').setView([this.lat, this.lng], 13);
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=drCOpXx1CAftuNXXuaec',{
            attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(mymap);
        const marker = L.marker([this.lat,this.lng]).addTo(mymap);
        
    }
}



const form = document.querySelector(".form");
const wrapper = document.querySelector(".wrapper");

form.addEventListener('submit',function(e){
    e.preventDefault();
    const ipTracker = new IPTracker();
    if(this.children[0].value){
        ipTracker.setIp(this.children[0].value);
        this.children[0].value="";
    }
})