const chat = document.getElementById("chat");


function addMessage(text,type){

    const div=document.createElement("div");

    div.className="message "+type;

    div.textContent=text;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}



async function sendMessage(){

    const box=document.getElementById("message");

    const text=box.value.trim();


    if(!text) return;


    addMessage(text,"user");

    box.value="";


    addMessage("Thinking...","ai");


    try {


        const response = await fetch(CONFIG.apiUrl,{

            method:"POST",

            headers:{


                "Authorization":
                "Bearer "+CONFIG.apiKey,


                "Content-Type":
                "application/json"

            },


            body:JSON.stringify({


                model:CONFIG.model,


                messages:[

                    {

                    role:"system",

                    content:
                    "You are a helpful coding assistant. Help with programming and explain code."

                    },


                    {

                    role:"user",

                    content:text

                    }

                ],


                temperature:CONFIG.temperature,

                max_tokens:CONFIG.maxTokens


            })

        });



        const data=await response.json();



        chat.lastChild.remove();



        if(data.choices){

            addMessage(
                data.choices[0].message.content,
                "ai"
            );

        }else{

            addMessage(
                "Error: "+JSON.stringify(data),
                "ai"
            );

        }



    }catch(error){

        chat.lastChild.remove();

        addMessage(
            "Connection error: "+error,
            "ai"
        );

    }

}
