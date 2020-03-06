const submit = document.querySelector("input[value='Register']");
const message = document.querySelector('#response');

submit.addEventListener('click' , (e)=>{
    e.preventDefault();


    //Matching-passwords verification
    password = document.querySelector("input[name='password']").value;
    password2 = document.querySelector("input[name='password2'").value;
    if(password !== password2){
        return document.querySelector('#response').innerHTML="The passwords do not match";
    }


    const request = new XMLHttpRequest();
   
    //Data formation
    const data = {
        name:document.querySelector("input[name='name']").value,
        email:document.querySelector("input[name='email']").value,
        password:document.querySelector("input[name='password']").value

    }
    
    //Sending request
    request.open('POST' , 'http://localhost:3000/users/register' , true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));

    //Procesing response
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const response = JSON.parse(this.response)
            if(response.error){
                return message.innerHTML=response.error
            }

            message.innerHTML=response.success;
            localStorage.setItem('token' , response.token);
            localStorage.setItem('user' , response.user);
            window.location.href = "http://localhost:3000/login.html";
        }
    }
})
    
