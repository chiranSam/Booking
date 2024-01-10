
//hotel room booking

//introducing variables
const singleroomCost = 25000;
const doubleroomCost = 35000;
const tripleroomCost = 40000;
const extrabedsCost = 8000;
const kidsCost = 5000;
const loyalty_pointsPerRoom = 20;
let totalCost;
let nights;

// let totalCost = (singleroomCost*numSingle.value) + (tripleroomCost*numTriple.value) +(doubleroomCost*numDouble.value)+
//                         (extrabedsCost*extraBeds.value) + (kidsCost*numKids.value);

//get references to the interactive elements...

const  roomForm = document.getElementById("room_booking form");
const fieldset= document.getElementById("output-field");
const currentBooking = document.getElementById("output-1");
const overallBookingSec = document.getElementById("output-field-2");
const overallBooking = document.getElementById("output-2");
const btnbookNow = document.getElementById("bookNow");
const btnaddfav = document.getElementById("favourite");
const btnloyalty = document.getElementById("loyalty");
 

//Booking details

const name =document.getElementById("name");
const email =document.getElementById("email");
const numAdults = document.getElementById("num_ad");
const optNationality = document.getElementById("nationality");
const checkWiFi = document.getElementById("Wi-Fi");
const checkPoolView = document.getElementById("Pool_View");
const checkGardenView = document.getElementById("Garden_View");
const checkInDate =new Date(document.getElementById("CheckInDate").value) ;
const checkOutDate =new Date( document.getElementById("CheckOutDate").value);
//total number of rooms displaying input
const totalNumRooms = document.getElementById("num_rooms");
//total number of nights display input
const nightsDisplayInput = document.getElementById("nights");



//for total cost calculation

const numSingle = document.getElementById("single");
const numDouble = document.getElementById("double");
const numTriple = document.getElementById("triple");
const numKids = document.getElementById("num_kids");
const extraBeds = document.getElementById("beds");
const promoCode = document.getElementById("promocode");

//extra requirements

const exReq = document.getElementsByName("ex_req");


//Listen for events

window.addEventListener("load",init);
roomForm.addEventListener('input',updateOutput);
btnbookNow.addEventListener("click",diplayOverallbooking);
// btnaddfav.addEventListener("click",addToFav);
// btnloyalty.addEventListener("click",calculayeLoyaltyPoints);


function getdate(date){
    nextDay = new Date(date);
    nextDay.setDate(date.getdate()+1);
    return nextDay.toISOString().split('T')[0];
}




// event listner for total rooms input
var roomNumberInput = document.querySelectorAll('.input-number');
    roomNumberInput.forEach(function(input){
    input.addEventListener('input',calTotalRooms);
})
//function for total room calculation input
function calTotalRooms() {
    console.log('Calculate rooms');

    var numSingle =parseInt(document.getElementById("single").value) ||0 ;
    var numDouble = parseInt(document.getElementById("double").value) ||0;
    var numTriple =parseInt( document.getElementById("triple").value)||0;

    var totalRooms = numSingle + numDouble + numTriple;
    

    totalNumRooms.value = totalRooms;

   
}


//night calculating 

var enteredDates = document.querySelectorAll('.date-input');
    enteredDates.forEach(function(inputDates){
        inputDates.addEventListener('input',calNumNights);
    })

function calNumNights(){

        
        console.log('Calculate nights');
        const checkInDate =new Date(document.getElementById("CheckInDate").value);
        const checkOutDate =new Date( document.getElementById("CheckOutDate").value);
        
        var days = (checkOutDate-checkInDate)/(1000*60*60*24);
        var nights = Math.ceil(days);

   
        nightsDisplayInput.value= nights;
        
        
    

    

    }




//Function for init

function init(){
    totalCost = 0;
    localStorage.clear();
 }

// room booking real time uptaing table with calculations
function updateOutput(){
    const checkInDate =new Date(document.getElementById("CheckInDate").value) ;
    const checkOutDate =new Date( document.getElementById("CheckOutDate").value);
    
    const onlyCheckInDate = checkInDate.toLocaleDateString();
    const onlyCheckOutDate = checkOutDate.toLocaleDateString();
        
        var days = (checkOutDate-checkInDate)/(1000*60*60*24);
        var nights = Math.ceil(days);
        
        totalCost = ((singleroomCost*numSingle.value) + 
                    (tripleroomCost*numTriple.value) +
                    (doubleroomCost*numDouble.value)+
                    (extrabedsCost*extraBeds.value) + 
                    (kidsCost*numKids.value))*nights;

        if(promoCode.value === '123'){
            console.log('promo code accepted');
            totalCost *= 0.95; 
        }
             // Real time updating output with total cost calculation (table fomat)
                    currentBooking.innerHTML = `<table>
                                                    <tr>
                                                        <th>Options</th>
                                                        <th>Booking Details</th>

                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Check In Date</td>
                                                        <td id="result">${onlyCheckInDate}</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Check Out Date</td>
                                                        <td id="result">${onlyCheckOutDate}</td>
                                                    </tr>
                                                    <tr>    
                                                        <td id="opt">> No. of Adults</td>
                                                        <td id="result">${numAdults.value}</td>    
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> No. of Kids</td>
                                                        <td id="result">${numKids.value}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td id="opt"> > Kids cost</td>
                                                        <td id="result"><b>LKR ${kidsCost*numKids.value}<b></td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> No. of Single Rooms</td>
                                                        <td id="result">${numSingle.value}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Single Rooms cost</td>
                                                        <td id="result"><b>LKR ${singleroomCost*numSingle.value}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> No. of Double Rooms</td>
                                                        <td id="result">${numDouble.value}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Double Rooms Cost</td>
                                                        <td id="result"><b>LKR ${doubleroomCost*numDouble.value}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> No. of Triple Rooms</td>
                                                        <td id="result">${numTriple.value}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Triple Rooms cost</td>
                                                        <td id="result"><b>LKR${tripleroomCost*numTriple.value}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> No. of Extra Beds</td>
                                                        <td id="result">${extraBeds.value}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Extra Beds cost</td>
                                                        <td id="result"><b>LKR${extrabedsCost*extraBeds.value}</b></td>
                                                     </tr>
                                                    <tr>
                                                        <td id="extraReq" colspan="2" >Extra Requirements</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Need Wi-Fi ?</td>
                                                        <td id="result">${checkWiFi.checked ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Need Pool view ?</td>
                                                        <td id="result">${checkPoolView.checked ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Need Gargen View ?</td>
                                                        <td id="result">${checkGardenView.checked ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td id="opt">> Discount</td>
                                                        <td id="result">${promoCode.value === '123' ? '5%' : 'No any discount'}</td>
                                                    </tr>

                                                    
                                                    <tr>
                                                        <td id="cost">Total Booking Cost</th>
                                                        <td id="costInt" >${totalCost.toFixed(2)}</th>
                                        
                                                    </tr>
                                                </table>`;

                                                fieldset.style.display ='flex'; //until the user start doing changes of the form real time updating calcultions are nt showing
                                                                                    


                                               

    }
    
//Function for Book Now button
function diplayOverallbooking(event){
    if(roomForm.checkValidity()){
        event.preventDefault();
        console.log("overall booking cost");

        const checkInDate =new Date(document.getElementById("CheckInDate").value) ;
        const checkOutDate =new Date( document.getElementById("CheckOutDate").value);

        let onlyCheckInDate = checkInDate.toLocaleDateString();
        let onlyCheckOutDate = checkOutDate.toLocaleDateString();
            
            var days = (checkOutDate-checkInDate)/(1000*60*60*24);
            var nights = Math.ceil(days);

        totalCost = ((singleroomCost*numSingle.value) + (tripleroomCost*numTriple.value) +(doubleroomCost*numDouble.value)+
                        (extrabedsCost*extraBeds.value) + (kidsCost*numKids.value))*nights;

        if(promoCode.value === '123'){
            totalCost *= 0.95; 
        }
        // to save room booking data to a local storage

        var formData ={
            nationality: document.getElementById("nationality").value,
            num_ad:document.getElementById("num_ad").value,
            num_kids:document.getElementById("num_kids").value,
            beds:document.getElementById("beds").value,
            sigle:document.getElementById("single").value,
            double: document.getElementById("double").value,
            triple: document.getElementById("triple").value,
            num_rooms:document.getElementById("num_rooms").value,
            exReq: document.querySelectorAll('input[name="ex_req"]:checked').length>0


        };

        

        //save to local storage
        localStorage.setItem('roomBookingData',JSON.stringify(formData));

        var roomBookingData = localStorage.getItem('roomBookingData');

        if (roomBookingData) {
            var parseInfo = JSON.parse(roomBookingData);
            var num_rooms = parseInfo.num_rooms;

            if(num_rooms && parseInt(num_rooms)>3){

                loyaltyPoints = parseInt(num_rooms )*loyalty_pointsPerRoom;
                localStorage.setItem('loyaltyPoints',loyaltyPoints);

            }
            
        }




             // Final output with total cost calculation (table fomat)
            overallBooking.innerHTML =`<table>
                                            <tr>
                                                <th>Options</th>
                                                <th>Booking Details</th>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Check In Date</td>
                                                <td id="result">${onlyCheckInDate}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Check Out Date</td>
                                                <td id="result">${onlyCheckOutDate}</td>
                                            </tr>
                                            <tr>    
                                                <td id="opt">> Nationality</td>
                                                <td id="result">${optNationality.value}</td>    
                                            </tr>
                                            <tr>    
                                                <td id="opt">> No. of Adults</td>
                                                <td id="result">${numAdults.value}</td>    
                                            </tr>
                                            <tr>
                                                <td id="opt">> No. of Kids</td>
                                                <td id="result">${numKids.value}</td>
    
                                            </tr>
                                            <tr>
                                                <td id="opt">> Kids cost</td>
                                                <td id="result"><b>LKR ${kidsCost*numKids.value}</b></td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> No. of Single Rooms</td>
                                                <td id="result">${numSingle.value}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Single Rooms cost</td>
                                                <td id="result"><b>LKR ${singleroomCost*numSingle.value}</b></td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> No. of Double Rooms</td>
                                                <td id="result">${numDouble.value}</td>
                                                
                                            </tr>
                                            <tr>
                                                <td id="opt">> Double Rooms Cost</td>
                                                <td id="result"><b>LKR ${doubleroomCost*numDouble.value}</b></td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> No. of Triple Rooms</td>
                                                <td id="result">${numTriple.value}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Triple Rooms cost</td>
                                                <td id="result"><b>LKR ${tripleroomCost*numTriple.value}</b></td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> No. of Extra Beds</td>
                                                <td id="result">${extraBeds.value}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Extra Beds cost</td>
                                                <td id="result"><b>LKR ${extrabedsCost*extraBeds.value}</b></td>
                                            </tr>
                                            <tr>
                                                <td id="extraReq" colspan="2" >Extra Requirements</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Need Wi-Fi ?</td>
                                                <td id="result">${checkWiFi.checked ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Need Pool view ?</td>
                                                <td id="result">${checkPoolView.checked ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Need Gargen View ?</td>
                                                <td id="result">${checkGardenView.checked ? 'Yes' : 'No'}</td>
                                            </tr>
                                            <tr>
                                                <td id="opt">> Discount</td>
                                                <td id="result">${promoCode.value === '123' ? '5%' : 'No any discount'}</td>
                                            </tr>


                                            <tr>
                                                <td id="cost">> Total Booking Cost</th>
                                                <td id="costInt" >${totalCost.toFixed(2)}</th>

                                            </tr>
                                        </table>`;

                                       //reset form
                                        currentBooking.innerHTML ="";
                                        roomForm.reset();
                                        overallBookingSec.style.display = 'flex';
                                      //Book now button clicked page scroll to the output section
                                        overallBookingSec.scrollIntoView({ behavior: 'smooth' });
                                        
                                        
           
                            
    }else{
        alert("Please fill the all fields"); //Every input should be filled
    }
} 


    
    










///book adventure

//variables for adventure booking
let numAdults_ad;
let numHrs;
let numKids_ad;


const localAdultCost = 5000;
const localKidCost = 2000;
const foreignAdultCost = 10000;
const foreignKidCost = 5000;

const adultGuideCost = 1000;
const kidGuideCost = 500;
let adventureTotalCost;


//get references to the interactive elements...
const adventureForm = document.getElementById("form_ad");
const nationalityAd = document.getElementById("nationalityAd");
const adventureRealtimeCal = document.getElementById("output_ad");

const hours = document.getElementById("time"); 
const adultsInAd = document.getElementById("num_ad_adventure");
const kidsAd = document.getElementById("num_kids_adventure");
    
const nameAd = document.getElementById("name_ad");
const emailAd = document.getElementById("email_ad");
const date = document.getElementById("date");
const phoneNum = document.getElementById("number");

//Guide requirements

const guideKid = document.getElementById("for_kids");
const guideAdult = document.getElementById("for_adults");

//adventure booking output

const adventureOutput = document.getElementById("adventuresOutput");


//inputs and selectors 
    //document.getElementById('name').addEventListener('input', updateOutput);
    phoneNum.addEventListener('input', updateOutputAd);
    date.addEventListener('change', updateOutputAd);
    nationalityAd.addEventListener('change', updateOutputAd);
    adultsInAd.addEventListener('input', updateOutputAd);
    kidsAd.addEventListener('input', updateOutputAd);
    guideKid.addEventListener('change', updateOutputAd);
    guideAdult.addEventListener('change', updateOutputAd);

 window.addEventListener("load",load);



function load(){
    adventureTotalCost = 0;

}


//function for adventure real time booking calculation
function updateOutputAd(){

    numHrs = parseInt(hours.value) || 1;
    numAdults_ad = parseInt(adultsInAd.value) || 0;
    numKids_ad = parseInt(kidsAd.value) || 0;
    

    if (nationalityAd.value === "Local"){
        adventureTotalCost = (numAdults_ad*localAdultCost + numKids_ad*localKidCost )* numHrs +
                             (guideKid.checked ? kidGuideCost : 0)*numHrs + (guideAdult.checked ? adultGuideCost : 0)*numHrs;
    }else if(nationalityAd.value ==="Foreign"){
        adventureTotalCost = (numAdults_ad*foreignAdultCost + numKids_ad*foreignKidCost )* numHrs +
                            (guideKid.checked ? kidGuideCost : 0)* numHrs+(guideAdult.checked ? adultGuideCost : 0)*numHrs;
    }

    //for local storage

    var formData = {

        nationalityAd: document.getElementById('nationalityAd').value,
        num_ad_adventure:document.getElementById('num_ad_adventure').value,
        num_kids_adventure:document.getElementById('num_kids_adventure').value,
        time : document.getElementById('time').value,
        for_adults:document.getElementById('for_adults').checked,
        for_kids: document.getElementById('for_kids').checked

    };

    localStorage.setItem('adventureBookingData',JSON.stringify(formData));


//Real time calculation of adventure current booking
    adventureOutput.innerHTML= `<table>
                                    <tr>
                                        <th>Options</th>
                                        <th>Booking Details</th>
                                    </tr>
                                    <tr>
                                        <td id="opt">Date</td>
                                        <td id="result">${date.value}</td>
                                    </tr>
                                    <tr>
                                        <td id="opt">Nationality</td>
                                        <td id="result">${nationalityAd.value}</td>
                                    </tr>
                                    <tr>    
                                        <td id="opt">No. of Adults</td>
                                        <td id="result">${adultsInAd.value}</td>    
                                    </tr>
                                    <tr>    
                                        <td id="opt">No. of kids</td>
                                        <td id="result">${kidsAd.value}</td>   
                                    </tr>
                                    <tr>
                                        <td id="opt">Hours</td>
                                        <td id="result">${hours.value}</td>
                                    </tr>
                                    <tr>
                                        <td id="opt">Need adult guide?</td>
                                        <td id="result">${guideAdult.checked ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <td id="opt">Need kid guide?</td>
                                        <td id="result">${guideKid.checked ? 'Yes' : 'No'}</td>
                                    </tr>    
                                    <tr>
                                        <td id="cost">Total Booking Cost</th>
                                        <td id="costInt">${adventureTotalCost.toFixed(2)}</th>    
                                    </tr>
                                <table>`;

                                adventureRealtimeCal.style.display ='flex';


}



//get popUp by id
const btnAdventure =document.getElementById("book_ad");
const popup = document.getElementById("popupContainer");
const okbtn = document.getElementById("ok");
const popUpContent = document.getElementById("popUpDetails");
const popUpSummery =document.getElementById("summery");


btnAdventure.addEventListener("click",openPopup);//adevnture book now button
okbtn.addEventListener("click",closePopup);//pop up ok button


function openPopup(event) {
    if(adventureForm.checkValidity()){
        event.preventDefault();
        console.log("Adventure Pop Up");

        numHrs = parseInt(hours.value) || 1;
        numAdults_ad = parseInt(adultsInAd.value) || 1;
        numKids_ad = parseInt(kidsAd.value) || 0;

        popUpContent.innerHTML = `${nameAd.value} your Diving Adventure is Successfully Booked <br>
                                Booking Summery as follows`;
//pop up massage booking details
        popUpSummery.innerHTML = `Date :--------------------------\t\t\t${date.value}<br>
                                 Nationality :------------------\t\t\t ${nationalityAd.value}<br>
                                 No. of Adults :---------------\t\t\t${numAdults_ad}<br>
                                 No. of Kids :-----------------\t\t\t${numKids_ad}<br>
                                 Adult Guide :----------------\t\t\t ${guideAdult.checked ? 'Needed' : 'Not needed'}<br>
                                 Kid Guide :------------------\t\t\t ${guideKid.checked ? 'Needed' : 'Not needed'}<br>
                                 Hours :------------------------ ${hours.value} hrs<br>
                                 <hr>
                                 <b>Total Adventure Cost :----\t\tLKR ${adventureTotalCost.toFixed(2)}</b>
                                 <hr>
                                  `;

                                  adventureOutput.innerHTML =""; //current booking reset

                                  adventureForm.reset();//form reset  

        document.body.style.pointerEvents = 'none';//pointer events deactivate untill closing the pop up massage
        popup.classList.add("open-popupContainer");// add pop pop up container css
        popup.style.pointerEvents = 'auto'; //pointer events activate in pop up for close button
        

 

    }else {
        alert("Please fill the form completely");
    }


}
function closePopup() {
    popup.classList.remove("open-popupContainer");//pop up massage closing
    document.body.style.pointerEvents = 'auto'; //pointer events activate
}

//add to favourite  script

//get references to the interactive elements...

const addToFavBtn = document.getElementById('favourite');
const FavPopupBtn = document.getElementById('okFav');

const favPopup = document.getElementById('addedToFav');


//add event listner
addToFavBtn.addEventListener('click',addToFavourite);
FavPopupBtn.addEventListener('click',closeFavPopUp);

//listning to the event

function addToFavourite() {

        var roomBookingData = localStorage.getItem('roomBookingData');
        var adventureBookingData = localStorage.getItem('adventureBookingData');

    if (!roomBookingData && !adventureBookingData){
        
        alert('No booking data available. Please complete a booking first');
        return;

    }else{
        console.log('Room Booking Data: ' ,roomBookingData);
        console.log('Adventure Booking Data: ',adventureBookingData);

        localStorage.removeItem('roomBookingData');
        localStorage.removeItem('adventureBookingData');

        favPopup.classList.add("open-FavpopupContainer");
        document.body.style.pointerEvents = 'none'; //pointer events deactivate untill closing the pop up massage
        favPopup.style.pointerEvents = 'auto'; //pointer events activate in pop up for close button
    }

    


}

function closeFavPopUp(){
    favPopup.classList.remove("open-FavpopupContainer");
    document.body.style.pointerEvents = 'auto'; //pointer events activate
}



// get loyalty points button and output

const checkLoyaltyPoints = document.getElementById('loyalty');
const displayLoyaltyPoints = document.getElementById('loyaltyPointsDetails');

// add event listner to the loyalty 

checkLoyaltyPoints.addEventListener("click",checkLoyalty);

// function for loyalty poits button

function checkLoyalty() {
   loyaltyPoints = localStorage.getItem('loyaltyPoints');

   if (loyaltyPoints !== null && loyaltyPoints !== undefined){
    alert('Your Loyalty Points: '+loyaltyPoints);

   }else{
    alert('No Loyalty Points Found');
   }
    
}
 