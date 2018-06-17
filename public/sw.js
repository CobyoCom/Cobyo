self.addEventListener("install", function(event) {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", function(event) {
  console.log("Service Worker activating.");
});

self.addEventListener("push", function(event) {
  console.log("Service Worker pushing.");
  console.log(event);
  self.registration.showNotification(
    "Cobyo Push Test",
    { body: "This is a test notification" }
  );
});
