// ===============================
// Football World API Manager
// ===============================

// API-Football
async function fetchApiFootball(endpoint){

    try{

        const response = await fetch(API_URL + endpoint,{
            method:"GET",
            headers:{
                "x-apisports-key":API_KEY
            }
        });

        const data = await response.json();

        // Daily API Limit
        if(data.errors && data.errors.requests){

            return{
                success:false,
                error:"LIMIT"
            };

        }

        return{
            success:true,
            data:data
        };

    }catch(error){

        console.log(error);

        return{
            success:false,
            error:"NETWORK"
        };

    }

}

// GNews
async function fetchNews(endpoint){

    try{

        const response = await fetch(GNEWS_API_URL + endpoint);

        if(!response.ok){

            throw new Error("News API Error");

        }

        return await response.json();

    }catch(error){

        console.log(error);

        return null;

    }

}