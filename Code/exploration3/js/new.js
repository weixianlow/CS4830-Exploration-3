//use this to initializa firebase
firebase.initializeApp(config);

//this line is used to check if user is authenticated
firebase.auth().onAuthStateChanged(function(user){
  if (user){
    //grabbing user ID
    const userUid = user.uid;
    //creating reference to database based off user's ID
    const databaseRef = firebase.database().ref().child("posts/"+userUid);

    var titleField = document.getElementById("Title");
    var bodyField = document.getElementById("Body");

    var uploadBtn = document.getElementById("uploadBtn");

    uploadBtn.addEventListener("click", function(){
      var d = new Date();
      var date = d.getFullYear().toString()+d.getMonth().toString()+d.getDate().toString()+"-"+d.getHours()+":"+d.getMinutes();
      var titleFieldContent = document.getElementById("title").value;
      var bodyFieldContent = document.getElementById("Body").value;
      //referencing to a child in the database
      const databaseUpload = databaseRef.child(date);
      //calling update will add content into the database.
      //if value is null, key that exist in the database will be deleted.
      databaseUpload.update({
        title: titleFieldContent,
        body: bodyFieldContent
      });



      console.log("Uploaded to server");
      //calling on will initialize and start the synchronization with data on the database
      databaseRef.on("value", function(snap){
        alert("Your post has been uploaded.");
        window.location.replace("/exploration3/home.html");
      });


    });


  }else{
    //redirect if user is not logon.
    window.location.replace("/exploration3");
  }
});
