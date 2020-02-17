$(document).ready(function() {
  console.log("Support is executed");
  $("#list-1-value-1").on("click", function() {
    $("#model-heading").text("Final price different from estimated");
    $("#model-pragraph").text(
      "In Flash Ride we guarantee that, in most cases, the price you see before accepting the journey is what you pay when you arrive at your destination."
    );
  });
  $("#list-1-value-2").on("click", function() {
    $("#model-heading").text("I have various charges");
    $("#model-pragraph").text(
      'When you order a Flash Ride we will automatically perform a transaction identified as "pre-authorization" that goes to the issuers of your payment method. This is to ensure that your payment method, either bank card or PayPal, works correctly and also has sufficient funds to meet the payment of the journey you’re about to make.'
    );
  });
  $("#list-1-value-3").on("click", function() {
    $("#model-heading").text("My discount wasn't applied");
    $("#model-pragraph").text(
      "We're so sorry you're having trouble with your discount! "
    );
  });
  $("#list-1-value-4").on("click", function() {
    $("#model-heading").text("Driver took the wrong route");
    $("#model-pragraph").text(
      "We're really sorry the driver took you the wrong way. However, we also want you to know that the price should not vary from what we showed you when you ordered the journey, as long as none of the following happened."
    );
  });
  $("#list-1-value-6").on("click", function() {
    $("#model-heading").text("I had an accident");
    $("#model-pragraph").text(
      "We hope this will never happen to you but if you have had an accident, please make sure that everyone involved is safe and, if necessary, call the local authorities. You can share the details of the accident below and we will contact you as soon as possible."
    );
  });
  $("#list-1-value-5").on("click", function() {
    $("#model-heading").text("I cancelled and was charged");
    $("#model-pragraph").text(
      "Bear in mind that sometimes there may be a reason why you could have been charged for a journey you didn’t make."
    );
  });
  $("#list-1-value-7").on("click", function() {
    $("#model-heading").text("Others");
    $("#model-pragraph").text(
      "Can't find a title that relates to your problem? Look no further, this is the place to report it. Tell us what happened to you and we will review it to give you the best solution in the shortest possible time. Flash Ride Commitment."
    );
  });

  $("#list-2-value-1").on("click", function() {
    $("#model-heading").text("Vehicle was damaged");
    $("#model-pragraph").text(
      "If the vehicle in which you have traveled was in poor condition, please tell us. We aim to ensure that the vehicles we offer you are modern and in good condition."
    );
  });

  $("#list-2-value-2").on("click", function() {
    $("#model-heading").text("Poor or dangerous driving");
    $("#model-pragraph").text(
      "If you think the driver drove dangerously during your journey, please tell us. Your safety is our priority and for this we put all possible technological means and select drivers who share our concern for this aspect."
    );
  });

  $("#list-2-value-3").on("click", function() {
    $("#model-heading").text("Innappropriate conduct");
    $("#model-pragraph").text(
      "If you think the driver's behavior has been inappropriate, please tell us. We want to ensure you always have an excellent experience with us."
    );
  });

  $("#list-2-value-4").on("click", function() {
    $("#model-heading").text("Arrived late to pick up");
    $("#model-pragraph").text(
      "If the driver arrives at your reservation late, due to traffic conditions or for any other reason, please contact us and we will evaluate how we can best compensate you. In addition, if the driver does not arrive at the reservation and you want to cancel it, we assume the error and if charged for the cancellation, you will be given a refund if you let us know what happened."
    );
  });

  $("#list-2-value-5").on("click", function() {
    $("#model-heading").text("Vehicle was unclean");
    $("#model-pragraph").text(
      "If the vehicle you traveled in did not meet your expectations of cleanliness, please let us know. We want your ride to meet the highest quality standards."
    );
  });

  $("#list-2-value-6").on("click", function() {
    $("#model-heading").text("Other problem");
    $("#model-pragraph").text(
      "Can't find a title that relates to your problem? Look no further, this is the place to report it. Tell us what happened to you and we will review it to give you the best solution in the shortest possible time. Flash Ride Commitment."
    );
  });

  $("#list-3-value-1").on("click", function() {
    $("#model-heading").text("My account has been suspended");
    $("#model-pragraph").text(
      "If the app seems to be working properly but you can’t order a journey, your account may have been temporarily suspended. Please tell us in this form and we will help you solve your problem as soon as possible."
    );
  });

  $("#list-3-value-2").on("click", function() {
    $("#model-heading").text("I've forgotten my password");
    $("#model-pragraph").html(
      "Don't worry, it happens to the best of us! And more than once. But everything has a solution:<br>" +
        "Click on 'I forgot my password' on the home screen...and follow the instructions we give you. It's as simple as that!"
    );
  });

  $("#list-3-value-3").on("click", function() {
    $("#model-heading").text("I can't order a vehicle");
    $("#model-pragraph").html(
      "If you can't order a vehicle it could be for several reasons:<br><ul><li>That you have a pending payment.</li><li>Your payment method has been rejected.</li><li>That there are no vehicles or that we do not operate in the area where you want to order the journey.</li></ul>To solve problems with payment methods, just enter a valid one"
    );
  });

  $("#list-3-value-4").on("click", function() {
    $("#model-heading").text("I want to delete my account");
    $("#model-pragraph").text(
      "We're so sorry to say goodbye! But of course we respect your decision and that's why you can unsubscribe whenever you want. We will delete all your personal data, deactivate your account and send you a confirmation email."
    );
  });

  $("#list-3-value-5").on("click", function() {
    $("#model-heading").text("Change password");
    $("#model-pragraph").html(
      "In Flash Ride it is possible to access your details (including your password) and modify them whenever you want. All you have to do is follow the steps below:<ul><li>Open the menu and press the option 'My account'.</li><li>Select 'My info’.</li><li>Click on 'Change password' and follow the steps indicated. And that's it!</li></ul>"
    );
  });

  $("#list-3-value-6").on("click", function() {
    $("#model-heading").text("Changes in my account");
    $("#model-pragraph").html(
      "In Flash Ride it is possible to access your details (including your password) and modify them whenever you want. All you have to do is follow the steps below:<ul><li>Open the menu and press the option 'My account'.</li><li>Select 'My info and change whatever details you want to.</li></ul>"
    );
  });
  $("#list-3-value-7").on("click", function() {
    $("#model-heading").text("Change financial/bank details");
    $("#model-pragraph").html(
      "Select 'My info and change whatever details you want to.<ul><li>Select 'My Company' from the menu.</li><li>Review the information in the 'Company details' section.</li><li>And finally, save your changes.</li></ul>"
    );
  });
  $("#list-3-value-8").on("click", function() {
    $("#model-heading").text(" Someone accessed my account without my consent");
    $("#model-pragraph").text(
      "If you believe that someone may have obtained the password for your Flash Ride account or accessed the account somehow, please change the password immediately."
    );
  });

  $("#list-4-value-1").on("click", function() {
    $("#model-heading").text("I can't add a payment method");
    $("#model-pragraph").text(
      "If you are a corporate user you cannot add personal payment methods because your account has been set up by your company, which is responsible for paying for your journey." +
        "If you want to add a payment method, you will have to do it through a personal account and not through your corporate account."
    );
  });

  $("#list-4-value-2").on("click", function() {
    $("#model-heading").text("More info about payment methods");
    $("#model-pragraph").text("");
  });

  $("#list-4-value-3").on("click", function() {
    $("#model-heading").text("I have a charge that isn't mine");
    $("#model-pragraph").text(
      "We recommend that you check the exact day and time of the charge and consider whether a family member or friend may have used your payment method to make a journey in Flash Ride; in most cases, it is only a misunderstanding with a person you share the account with, or simply forgetfulness."
    );
  });

  var title; //gloable
  $("a").on("click", function() {
    title = $("#model-heading").text();
  });

  $("#support-form").on("submit", function(e) {
    e.preventDefault();
    var rideDetail = $("#inputState :selected").text();
    var message = $("textarea").val();
    var data = {
      subject: title,
      text1: rideDetail,
      text2: message
    };
    $.post("/supportemail", data, function() {
      alert("request register successfully");
      $("#close").click();
    });
  });
});
