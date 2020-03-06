const message = document.querySelector('#response');


if(localStorage.getItem('user')){
    document.querySelector('#userName').textContent= localStorage.getItem('user');
}


document.querySelector('#test-header').addEventListener('click' , ()=>{
    const request = new XMLHttpRequest();
    
    //Sending request
    request.open('GET' , 'http://localhost:3000/users/me' , true);
    request.setRequestHeader("Authorization" , 'Bearer '+localStorage.getItem('token'));
    request.send();

    //Procesing response
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const response = JSON.parse(this.response)
            console.log(response)
            message.innerHTML=response.user;
            message.innerHTML+= " "+response.email;
        }
    }
})