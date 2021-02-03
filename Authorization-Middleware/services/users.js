 
 
 const userData = [
    {   id:01,
        firstName: 'Snoop',
        lastName: 'Dog',
        phone: '111-222-3333',
        email: 'snoopydog@dogpound.com'
      }, {
        id:02, 
        firstName: 'Scooby',
        lastName: 'Doo',
        phone: '444-555-6666',
        email: 'scooby.doo@misterymachine.com',
      }, {
        id:03,
        firstName: 'Herbie',
        lastName: 'Husker',
        phone: '402-437-0001',
        email: 'herbie.husker@unl.edu',
      }
    ]
 
 

 const userUpdates = (id)=>{
     return new Promise((resolve, reject)=>{
         let user_info = null;
        for(let i = 0; i<=userData.length; i++ ){
            if (userData[i].id == id){
                user_info = userData[i]
                console.log(user_info)
                resolve(user_info)
                break; 
            } else{reject(Error("failed to get user info"))}
        }
     })
 }


 module.exports = userUpdates