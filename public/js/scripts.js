const submit = document.querySelector("input[value='Go']");

submit.addEventListener('click' , (e)=>{
    e.preventDefault();
    const request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.querySelector('#response').innerHTML=this.responseText;
        }
    }
    const data = {
        name:document.querySelector("input[name='test']").value
    }
    request.open('POST' , 'http://localhost:3000/users/me' , true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));
})
    

    