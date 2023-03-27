var locationForm = document.getElementById("location-form")

locationForm.addEventListener("submit",GeoCode)

function GeoCode(e){
    e.preventDefault()
var location = document.getElementById('location-input').value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params :{
        address: location,
        key :'AIzaSyDO8JRhZQF5jZ8TGUMAw3qY-abCdxx2xm0'
    }
})
.then(function(response){ 
    console.log(response)

var formatted_Address =response.data.results[0].formatted_address

var formattedAddressOutput =`
<ul class ='list-group'>
<li class ="list-group-item">${formatted_Address}</li>
</ul>
`


var addressComponents = response.data.results[0].address_components
var addressComponentsOutput ='<ul class ="list-group-item">'
for(var i=0; i<addressComponents.length;i++){
addressComponentsOutput +=`
<li
class ="list-group-item"><strong>${addressComponents[i].types[0]}</strong>
:${addressComponents[i].long_name}
`
}
addressComponents+='</ul>'



var lat =response.data.results[0].geometry.location.lat
var lng =response.data.results[0].geometry.location.lng

var geometryOutput =`
<ul class ='list-group'>
<li class ="list-group-item"><strong>Latitude:</strong> ${lat}</li>
<li class ="list-group-item"><strong>Longitude:</strong> ${lng}</li>

</ul>`

document.getElementById("output").innerHTML = formattedAddressOutput
document.getElementById("addressComponents").innerHTML = addressComponentsOutput
document.getElementById("Geo").innerHTML = geometryOutput

document.getElementById('location-input').value =''

})
.catch(function(error){
    console.log(error)
})
}
